<template>
  <div class="q-pa-xl">
    <q-table
      dense
      :title="`${$t('staffTable')}`"
      :rows="rows"
      :columns="columns"
      :loading="loadingState"
      :filter="filter"
      color="secondary"
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
        <!-- <q-select
          v-model="visibleColumns"
          class="q-mr-md"
          multiple
          outlined
          dense
          options-dense
          :display-value="$t('Columns')"
          emit-value
          map-options
          :options="columns"
          option-value="name"
          options-cover
          style="min-width: 150px" /> -->
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
          <q-btn color="negative" debounce="300" flat icon="delete"></q-btn>
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script setup>
import { exportFile } from 'quasar'
import { ref, onMounted, computed } from 'vue'
import { supabase } from '../boot/supabase'
import StaffDialog from '../components/StaffDialog.vue'
import dayjs from 'dayjs'

const loadingState = ref(true)
const rows = ref([])
const filter = ref('')

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

// const visibleColumns = ref([
//   'name',
//   'surname',
//   'email',
//   'phone',
//   'contract_term',
//   'coupon_rights',
//   'january',
//   'february',
//   'march',
//   'april',
//   'may',
//   'june',
//   'july',
//   'august',
//   'september',
//   'october',
//   'november',
//   'august',
//   'december',
//   'total_coupons',
//   'actions'
// ])

const columns = ref([
  {
    name: 'name',
    label: 'Name',
    align: 'center',
    field: row => row.name,
    format: val => `${val}`,
    sortable: true
  },
  {
    name: 'surname',
    label: 'Surname',
    align: 'center',
    field: row => row.surname,
    format: val => `${val}`,
    sortable: true
  },
  {
    name: 'email',
    label: 'E-mail',
    align: 'center',
    field: row => row.email,
    format: val => `${val}`,
    sortable: true
  },

  {
    name: 'phone',
    label: 'Phone',
    align: 'center',
    field: row => row.phone,
    format: val => `${val}`,
    sortable: true
  },
  {
    name: 'contract_term',
    label: 'Contract Termination',
    align: 'center',
    field: row => dayjs(row.contract_term).format('DD/MM/YYYY'),
    format: val => `${val}`,
    sortable: true
  },
  {
    name: 'coupon_rights',
    label: 'Coupon right',
    align: 'center',
    field: row => (row.coupon_rights === false ? 'No' : 'Yes'),
    format: val => `${val}`,
    sortable: true
  },
  {
    name: 'january',
    label: 'January',
    align: 'center',
    field: row => row.january,
    format: val => `${val}`,
    sortable: true
  },
  {
    name: 'february',
    label: 'February',
    align: 'center',
    field: row => row.february,
    format: val => `${val}`,
    sortable: true
  },
  {
    name: 'march',
    label: 'March',
    align: 'center',
    field: row => row.march,
    format: val => `${val}`,
    sortable: true
  },
  {
    name: 'april',
    label: 'April',
    align: 'center',
    field: row => row.april,
    format: val => `${val}`,
    sortable: true
  },
  {
    name: 'may',
    label: 'May',
    align: 'center',
    field: row => row.may,
    format: val => `${val}`,
    sortable: true
  },
  {
    name: 'june',
    label: 'June',
    align: 'center',
    field: row => row.june,
    format: val => `${val}`,
    sortable: true
  },
  {
    name: 'july',
    label: 'July',
    align: 'center',
    field: row => row.july,
    format: val => `${val}`,
    sortable: true
  },
  {
    name: 'august',
    label: 'August',
    align: 'center',
    field: row => row.august,
    format: val => `${val}`,
    sortable: true
  },
  {
    name: 'september',
    label: 'September',
    align: 'center',
    field: row => row.september,
    format: val => `${val}`,
    sortable: true
  },
  {
    name: 'october',
    label: 'October',
    align: 'center',
    field: row => row.october,
    format: val => `${val}`,
    sortable: true
  },
  {
    name: 'november',
    label: 'November',
    align: 'center',
    field: row => row.november,
    format: val => `${val}`,
    sortable: true
  },
  {
    name: 'december',
    label: 'December',
    align: 'center',
    field: row => row.december,
    format: val => `${val}`,
    sortable: true
  },
  {
    name: 'total_coupons',
    label: 'Total Coupons',
    align: 'center',
    field: row => row.total_coupons,
    format: val => `${val}`,
    sortable: true
  },
  {
    name: 'actions',
    align: 'center',
    label: 'Actions',
    field: 'actions',
    sortable: true
  }
])
</script>
