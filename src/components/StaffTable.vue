<template>
  <div class="q-pa-xl">
    <q-table
      flat
      bordered
      title="Treats"
      :rows="rows"
      :columns="columns"
      :loading="loadingState"
      color="primary"
      row-key="name">
      <template v-slot:top-right>
        <q-btn
          color="primary"
          icon-right="archive"
          label="Export to csv"
          no-caps
          @click="exportTable" />
      </template>
    </q-table>
  </div>
</template>

<script setup>
import { exportFile, useQuasar } from 'quasar'
import { ref, onMounted, computed } from 'vue'
import { supabase } from '../boot/supabase'

const $q = useQuasar()
const loadingState = ref(true)
const rows = ref([])

onMounted(() => {
  handleRequest()
})

const handleRequest = async () => {
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
  const content = [columns.map(col => wrapCsvValue(col.label))]
    .concat(
      rows.value.map(row =>
        columns
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

const columns = [
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
    field: row => row.contract_term,
    format: val => `${val}`,
    sortable: true
  },
  {
    name: 'coupon_rights',
    label: 'Coupon right',
    align: 'center',
    field: row => row.coupon_rights,
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
  }
]
</script>
