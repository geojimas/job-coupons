<template>
  <div class="q-pa-xl">
    <q-table
      :title="`${$t('staffTable')}`"
      :rows="rows"
      :columns="columns"
      :loading="loadingState"
      :pagination.sync="pagination"
      :filter="filter"
      :no-data-label="`${$t('serverNotFound')}`"
      dense
      flat
      bordered
      no-data
      color="secondary"
      class="animate__animated animate__fadeIn"
      row-key="id">
      <template v-slot:top-right="props">
        <StaffDialog @dataFromServer="getDataFromServer" />
        <q-input
          class="q-mr-md"
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
          :label="`${$t('exportToCSV')}`"
          no-caps
          @click="exportTable" />
        <q-btn
          round
          :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
          @click="props.toggleFullscreen"
          class="q-ml-sm" />
      </template>
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn color="secondary" class="q-mr-sm" flat debounce="300" icon="mode_edit"></q-btn>
          <q-btn
            color="negative"
            debounce="300"
            flat
            icon="delete"
            @click="handleDeleteRequest(props.row)"></q-btn>
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script setup>
import { exportFile, useQuasar } from 'quasar'
import { ref, onMounted, computed } from 'vue'
import { supabase } from '../boot/supabase'
import { useI18n } from 'vue-i18n'
import StaffDialog from '../components/StaffDialog.vue'
import dayjs from 'dayjs'

const loadingState = ref(true)
const rows = ref([])
const filter = ref('')
const $q = useQuasar()
const i18n = useI18n()
const pagination = ref({
  sortBy: 'name',
  descending: false,
  rowsPerPage: 10
})

onMounted(() => {
  getDataFromServer()
})
const getDataFromServer = async () => {
  try {
    let { data, error } = await supabase.from('staff').select('*')
    rows.value = data
    loadingState.value = false
    if (error) throw error
  } catch (error) {
    if (error instanceof Error) {
      alert(error.message)
    }
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
    loadingState.value = true
    try {
      const { error } = await supabase.from('staff').delete().eq('id', data.id)
      loadingState.value = false
      if (error) throw error
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message)
      }
    } finally {
      getDataFromServer()
      loadingState.value = false
      $q.notify({
        position: 'top',
        message: i18n.t('deleteMsg', { name: data.surname }),
        color: 'primary',
        type: 'positive',
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
  // naive encoding to csv format
  const content = [columns.value.map(col => wrapCsvValue(col.label))]
    .concat(
      rows.value.map(row =>
        columns.value
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

const columns = computed(() => [
  {
    name: 'name',
    label: i18n.t('username'),
    align: 'center',
    field: row => row.name,
    format: val => `${val}`,
    sortable: true
  },
  {
    name: 'surname',
    label: i18n.t('surname'),
    align: 'center',
    field: row => row.surname,
    format: val => `${val}`,
    sortable: true
  },
  {
    name: 'email',
    label: i18n.t('email'),
    align: 'center',
    field: row => row.email,
    format: val => `${val}`,
    sortable: true
  },

  {
    name: 'phone',
    label: i18n.t('phone'),
    align: 'center',
    field: row => row.phone,
    format: val => `${val}`,
    sortable: true
  },
  {
    name: 'contract_term',
    label: i18n.t('contractExp'),
    align: 'center',
    field: row => (row.contract_term ? dayjs(row.contract_term).format('DD/MM/YYYY') : ''),
    format: val => `${val}`,
    sortable: true
  },
  {
    name: 'coupon_rights',
    label: i18n.t('couponsRights'),
    align: 'center',
    field: row => (row.coupon_rights === false ? i18n.t('no') : i18n.t('yes')),
    format: val => `${val}`,
    sortable: true
  },
  {
    name: 'january',
    label: i18n.t('january'),
    align: 'center',
    field: row => row.january,
    format: val => `${val}`,
    sortable: true
  },
  {
    name: 'february',
    label: i18n.t('february'),
    align: 'center',
    field: row => row.february,
    format: val => `${val}`,
    sortable: true
  },
  {
    name: 'march',
    label: i18n.t('march'),
    align: 'center',
    field: row => row.march,
    format: val => `${val}`,
    sortable: true
  },
  {
    name: 'april',
    label: i18n.t('april'),
    align: 'center',
    field: row => row.april,
    format: val => `${val}`,
    sortable: true
  },
  {
    name: 'may',
    label: i18n.t('may'),
    align: 'center',
    field: row => row.may,
    format: val => `${val}`,
    sortable: true
  },
  {
    name: 'june',
    label: i18n.t('june'),
    align: 'center',
    field: row => row.june,
    format: val => `${val}`,
    sortable: true
  },
  {
    name: 'july',
    label: i18n.t('july'),
    align: 'center',
    field: row => row.july,
    format: val => `${val}`,
    sortable: true
  },
  {
    name: 'august',
    label: i18n.t('august'),
    align: 'center',
    field: row => row.august,
    format: val => `${val}`,
    sortable: true
  },
  {
    name: 'september',
    label: i18n.t('september'),
    align: 'center',
    field: row => row.september,
    format: val => `${val}`,
    sortable: true
  },
  {
    name: 'october',
    label: i18n.t('october'),
    align: 'center',
    field: row => row.october,
    format: val => `${val}`,
    sortable: true
  },
  {
    name: 'november',
    label: i18n.t('november'),
    align: 'center',
    field: row => row.november,
    format: val => `${val}`,
    sortable: true
  },
  {
    name: 'december',
    label: i18n.t('december'),
    align: 'center',
    field: row => row.december,
    format: val => `${val}`,
    sortable: true
  },
  {
    name: 'total_coupons',
    label: i18n.t('totalCoupons'),
    align: 'center',
    field: row => row.total_coupons,
    format: val => `${val}`,
    sortable: true
  },
  {
    name: 'actions',
    align: 'center',
    label: i18n.t('actions')
  }
])
</script>
