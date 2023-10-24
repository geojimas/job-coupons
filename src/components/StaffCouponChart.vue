<template>
  <VueApexCharts
    class="animate__animated animate__fadeIn"
    width="420"
    type="donut"
    :options="options"
    :series="series"></VueApexCharts>
</template>

<script setup>
import { ref, watch, onMounted, computed } from 'vue'
import { getCssVar } from 'quasar'
import VueApexCharts from 'vue3-apexcharts'
import { supabase } from '../boot/supabase'
const loadingState = ref(true)
const stuffData = ref([])

onMounted(() => {
  handleRequest()
})

const handleRequest = async () => {
  try {
    let { data, error } = await supabase.from('staff').select('*')
    stuffData.value = data
    loadingState.value = false
    if (error) throw error
  } catch (error) {
    if (error instanceof Error) {
      alert(error.message)
    }
  }
}

watch(stuffData, newStuffData => {
  if (newStuffData.length > 0) {
    // Calculate the values here
    const numberOfPeopleWithCouponRightsValue = newStuffData.filter(
      person => person.coupon_rights
    ).length
    const numberOfPeopleWithoutCouponRightsValue = newStuffData.filter(
      person => !person.coupon_rights
    ).length

    // Update the data in the series
    series.value = [numberOfPeopleWithCouponRightsValue, numberOfPeopleWithoutCouponRightsValue]
  }
})

const options = ref({
  title: {
    text: 'Κουπόνια προσωπικού',
    align: 'center'
  },
  chart: {
    id: 'apex-donut'
  },
  colors: [getCssVar('primary'), getCssVar('negative')],
  markers: {
    size: 4,
    hover: {
      sizeOffset: 6
    }
  },
  labels: ['Με κουπόνια', 'Χωρίς Κουπόνια'],
  plotOptions: {
    pie: {
      donut: {
        labels: {
          show: true,
          total: {
            show: true,
            showAlways: true,
            label: 'Σύνολο',
            fontSize: '20px',
            fontWeight: 600,
            color: '#373d3f',
            formatter: function (w) {
              return w.globals.seriesTotals.reduce((a, b) => {
                return a + b
              }, 0)
            }
          }
        }
      }
    }
  }
})
const series = ref([0, 0])
</script>
