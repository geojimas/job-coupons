<template>
  <div class="q-pa-md">
    <q-table
      :title="`${$t('staffTable')}`"
      title-class="text-h5 text-bold"
      :rows="props.dataFromServer"
      :columns="mainlyColumns"
      :loading="props.loadingState"
      :pagination="pagination"
      :separator="separator"
      :filter="filter"
      no-data
      :no-data-label="`${$t('serverNotFound')}`"
      :rows-per-page-label="`${$t('rowsPerPage')}`"
      :dense="$q.screen.lt.xl"
      row-key="id"
      table-class="animate__animated animate__fadeIn">
      <template v-slot:loading>
        <q-inner-loading showing color="secondary" />
      </template>
      <template v-slot:header-cell-name="props">
        <q-th :props="props">
          <q-icon
            class="q-mr-sm"
            color="secondary"
            name="settings_accessibility"
            :size="$q.screen.lt.xl ? '1.1em' : '1.3em'" />
          {{ props.col.label }}
        </q-th>
      </template>
      <template v-slot:header-cell-surname="props">
        <q-th :props="props">
          <q-icon
            class="q-mr-sm"
            color="secondary"
            name="badge"
            :size="$q.screen.lt.xl ? '1.1em' : '1.3em'" />
          {{ props.col.label }}
        </q-th>
      </template>
      <template v-slot:header-cell-email="props">
        <q-th :props="props">
          <q-icon
            class="q-mr-sm"
            color="secondary"
            name="alternate_email"
            :size="$q.screen.lt.xl ? '1.1em' : '1.3em'" />
          {{ props.col.label }}
        </q-th>
      </template>
      <template v-slot:header-cell-phone="props">
        <q-th :props="props">
          <q-icon
            class="q-mr-sm"
            color="secondary"
            name="call"
            :size="$q.screen.lt.xl ? '1.1em' : '1.3em'" />
          {{ props.col.label }}
        </q-th>
      </template>
      <template v-slot:header-cell-contract_term="props">
        <q-th :props="props">
          <q-icon
            class="q-mr-sm"
            color="secondary"
            name="event"
            :size="$q.screen.lt.xl ? '1.1em' : '1.3em'" />
          {{ props.col.label }}
        </q-th>
      </template>
      <template v-slot:header-cell-coupon_rights="props">
        <q-th :props="props">
          <q-icon
            class="q-mr-sm"
            color="secondary"
            name="card_membership"
            :size="$q.screen.lt.xl ? '1.1em' : '1.3em'" />
          {{ props.col.label }}
        </q-th>
      </template>
      <template v-slot:header-cell-total_coupons="props">
        <q-th :props="props">
          <q-icon
            class="q-mr-sm"
            color="secondary"
            name="all_out"
            :size="$q.screen.lt.xl ? '1.1em' : '1.3em'" />
          {{ props.col.label }}
        </q-th>
      </template>
      <template v-slot:top-right="props">
        <StaffDialog ref="staffDialogRef" @dataFromServer="getDataFromServerParent" />
        <q-input
          :class="$q.screen.lt.md ? 'q-ma-md text-bold' : 'q-mr-lg text-bold'"
          dense
          color="secondary"
          debounce="300"
          v-model="filter"
          :placeholder="`${$t('Search')}`">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
        <q-btn
          color="secondary"
          icon-right="archive"
          class="q-mr-lg text-bold"
          :label="`${$t('exportToCSV')}`"
          no-caps
          @click="exportTable" />
        <q-btn
          round
          class="q-mr-lg"
          color="secondary"
          :icon="props.inFullscreen ? 'close_fullscreen' : 'fullscreen'"
          @click="props.toggleFullscreen" />
      </template>
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td auto-width>
            <q-btn
              size="md"
              dense
              rounded
              :color="props.expand ? 'negative' : 'teal'"
              @click="props.expand = !props.expand"
              :icon="props.expand ? 'expand_less' : 'expand_more'" />
          </q-td>
          <q-td v-for="col in props.cols" :key="col.name" :props="props">
            {{ col.value }}
          </q-td>
          <div style="display: flex; justify-content: center; flex-wrap: nowrap">
            <q-btn
              color="dark"
              rounded
              class="q-ma-sm"
              debounce="300"
              icon="mode_edit"
              @click="callChildOpenModalMethod(props.row)"></q-btn>
            <q-btn
              color="negative"
              class="q-ma-sm"
              rounded
              debounce="300"
              icon="delete"
              @click="handleDeleteRequest(props.row)"></q-btn>
          </div>
        </q-tr>
        <Transition>
          <q-tr v-show="props.expand" :props="props">
            <q-td class="bg-teal-1 rounded-borders" colspan="100%">
              <q-item>
                <q-item-section v-for="month in months" :key="month">
                  <q-item-label class="flex justify-center q-mx-sm">{{
                    $t(`${month}`)
                  }}</q-item-label>
                  <q-item-label class="flex justify-center">
                    <q-badge
                      class="text-bold"
                      :color="props.row[month] === 0 ? 'negative' : 'green'">
                      {{ props.row[month] }}
                    </q-badge></q-item-label
                  >
                </q-item-section>
              </q-item>
            </q-td>
          </q-tr>
        </Transition>
      </template>
    </q-table>
  </div>
</template>

<script setup>
import { exportFile, useQuasar } from 'quasar'
import { ref, computed } from 'vue'
import { supabase } from '../boot/supabase'
import { useI18n } from 'vue-i18n'
import Constants from 'src/constants/index'
import StaffDialog from '../components/StaffDialog.vue'
import dayjs from 'dayjs'

const emits = defineEmits(['getServerBackFromParents'])

const props = defineProps({
  dataFromServer: {
    type: Array,
    required: true
  },
  loadingState: {
    type: Boolean,
    required: true
  }
})
const months = ref([
  Constants.january,
  Constants.february,
  Constants.march,
  Constants.april,
  Constants.may,
  Constants.june,
  Constants.july,
  Constants.august,
  Constants.september,
  Constants.october,
  Constants.november,
  Constants.december
])

const staffDialogRef = ref(null)
const dataForExport = computed(() => {
  return props.dataFromServer
})
const filter = ref('')
const $q = useQuasar()
const separator = ref('cell')
const i18n = useI18n()
const pagination = ref({
  sortBy: 'name',
  descending: false,
  rowsPerPage: 10
})

const getDataFromServerParent = () => {
  emits('getServerBackFromParents')
}

const callChildOpenModalMethod = data => {
  if (staffDialogRef.value) {
    staffDialogRef.value.openModal(data)
  }
}

const handleDeleteRequest = data => {
  $q.dialog({
    color: 'negative',
    title: i18n.t('confirm'),
    message: i18n.t('deleteConf'),
    cancel: true,
    persistent: true,
    ok: {
      push: true,
      label: i18n.t('yes'),
      color: 'secondary'
    },
    cancel: {
      push: true,
      label: i18n.t('no'),
      color: 'negative'
    }
  }).onOk(async () => {
    try {
      const { error: errorData } = await supabase.from('staff').delete().eq('id', data.id)
      if (errorData) {
        throw new Error(errorData.message)
      }
      $q.notify({
        position: 'top',
        message: i18n.t('deleteMsg', { name: data.name }),
        color: 'primary',
        icon: 'thumb_up',
        progress: true,
        timeout: 1500
      })
      getDataFromServerParent()
    } catch (error) {
      $q.notify({
        position: 'top',
        message: error.message,
        color: 'negative',
        icon: 'report_problem',
        progress: true,
        timeout: 1500
      })
    }
  })
}

function wrapCsvValue(val, formatFn, row) {
  let formatted = formatFn !== void 0 ? formatFn(val, row) : val

  formatted = formatted === void 0 || formatted === null ? '' : String(formatted)

  formatted = formatted.split('"').join('""')
  /**
   * Excel accepts \n and \r in strings, but some other CSV parsers do not
   * Uncomment the next two lines to escape new lines
   */
  // .split('\n').join('\\n')
  // .split('\r').join('\\r')

  return `"${formatted}"`
}

function exportTable() {
  // Copy the columns array and exclude the last column
  const columnsToExport = [...mainlyColumns.value, ...secondaryColumns.value]

  // Naive encoding to csv format
  const content = [columnsToExport.map(col => wrapCsvValue(col.label))]
    .concat(
      dataForExport.value.map(row =>
        columnsToExport
          .map(col =>
            wrapCsvValue(
              typeof col.field === 'function'
                ? col.field(row)
                : row[col.field === void 0 ? col.name : col.field],
              col.format,
              row
            )
          )
          .join(',')
      )
    )
    .join('\r\n')

  const status = exportFile('staff-coupons-2023.csv', content, 'text/csv')

  if (status !== true) {
    $q.notify({
      message: 'Browser denied file download...',
      color: 'negative',
      icon: 'warning'
    })
  }
}

const columnFontStyle = ref($q.screen.lt.xl ? 'font-size: 12px' : 'font-size: 15px')
const headerColumnFontStyle = ref(
  $q.screen.lt.xl ? 'font-size: 12px' : 'font-weight: bold; font-size: 15px'
)

const mainlyColumns = computed(() => [
  {},
  {
    name: 'name',
    label: i18n.t('username'),
    align: 'center',
    field: row => row.name,
    format: val => `${val}`,
    sortable: true,
    headerStyle: headerColumnFontStyle.value,
    style: columnFontStyle.value
  },
  {
    name: 'surname',
    label: i18n.t('surname'),
    align: 'center',
    field: row => row.surname,
    format: val => `${val}`,
    sortable: true,
    headerStyle: headerColumnFontStyle.value,
    style: columnFontStyle.value
  },
  {
    name: 'email',
    label: i18n.t('email'),
    align: 'center',
    field: row => row.email,
    format: val => `${val}`,
    sortable: true,
    headerStyle: headerColumnFontStyle.value,
    style: columnFontStyle.value
  },

  {
    name: 'phone',
    label: i18n.t('phone'),
    align: 'center',
    field: row => row.phone,
    format: val => `${val}`,
    sortable: true,
    headerStyle: headerColumnFontStyle.value,
    style: columnFontStyle.value
  },
  {
    name: 'contract_term',
    label: i18n.t('contractExp'),
    align: 'center',
    field: row => (row.contract_term ? dayjs(row.contract_term).format('DD/MM/YYYY') : ''),
    format: val => `${val}`,
    sortable: true,
    headerStyle: headerColumnFontStyle.value,
    style: columnFontStyle.value
  },
  {
    name: 'coupon_rights',
    label: i18n.t('couponsRights'),
    align: 'center',
    field: row => (row.coupon_rights === false ? i18n.t('no') : i18n.t('yes')),
    format: val => `${val}`,
    sortable: true,
    headerStyle: headerColumnFontStyle.value,
    style: columnFontStyle.value
  },
  {
    name: 'total_coupons',
    label: i18n.t('totalCoupons'),
    align: 'center',
    field: row => row.total_coupons,
    format: val => `${val}`,
    sortable: true,
    headerStyle: headerColumnFontStyle.value,
    style: columnFontStyle.value
  }
])

const secondaryColumns = computed(() => [
  {
    name: 'january',
    label: i18n.t('january'),
    align: 'center',
    field: row => (row.january === 0 ? '' : row.january),
    format: val => `${val}`,
    sortable: true
  },
  {
    name: 'february',
    label: i18n.t('february'),
    align: 'center',
    field: row => (row.february === 0 ? '' : row.february),
    format: val => `${val}`,
    sortable: true
  },
  {
    name: 'march',
    label: i18n.t('march'),
    align: 'center',
    field: row => (row.march === 0 ? '' : row.march),
    format: val => `${val}`,
    sortable: true
  },
  {
    name: 'april',
    label: i18n.t('april'),
    align: 'center',
    field: row => (row.april === 0 ? '' : row.april),
    format: val => `${val}`,
    sortable: true
  },
  {
    name: 'may',
    label: i18n.t('may'),
    align: 'center',
    field: row => (row.may === 0 ? '' : row.may),
    format: val => `${val}`,
    sortable: true
  },
  {
    name: 'june',
    label: i18n.t('june'),
    align: 'center',
    field: row => (row.june === 0 ? '' : row.june),
    format: val => `${val}`,
    sortable: true
  },
  {
    name: 'july',
    label: i18n.t('july'),
    align: 'center',
    field: row => (row.july === 0 ? '' : row.july),
    format: val => `${val}`,
    sortable: true
  },
  {
    name: 'august',
    label: i18n.t('august'),
    align: 'center',
    field: row => (row.august === 0 ? '' : row.august),
    format: val => `${val}`,
    sortable: true
  },
  {
    name: 'september',
    label: i18n.t('september'),
    align: 'center',
    field: row => (row.september === 0 ? '' : row.september),
    format: val => `${val}`,
    sortable: true
  },
  {
    name: 'october',
    label: i18n.t('october'),
    align: 'center',
    field: row => (row.october === 0 ? '' : row.october),
    format: val => `${val}`,
    sortable: true
  },
  {
    name: 'november',
    label: i18n.t('november'),
    align: 'center',
    field: row => (row.november === 0 ? '' : row.november),
    format: val => `${val}`,
    sortable: true
  },
  {
    name: 'december',
    label: i18n.t('december'),
    align: 'center',
    field: row => (row.december === 0 ? '' : row.december),
    format: val => `${val}`,
    sortable: true
  }
])
</script>

<style lang="scss" scoped>
.v-enter-active {
  animation: fadeIn 1.5s;
}
.v-leave-active {
  animation: fadeOut 0.15s;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
