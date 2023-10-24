<template>
  <div class="main-page">
    <StaffTable />
    <div class="main-page__statistics">
      <div class="main-page__statistics-coupon-chart"><StaffCouponChart /></div>
      <div class="main-page__statistics-percent-chart">
        <StaffCouponPercent :dataFromServer="dataFromServer" :loadingState="loadingState" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import StaffTable from '../components/StaffTable.vue'
import StaffCouponChart from 'src/components/StaffCouponChart.vue'
import StaffCouponPercent from 'src/components/StaffCouponPercent.vue'
import { supabase } from '../boot/supabase'

const dataFromServer = ref([])
const loadingState = ref(true)

onMounted(() => {
  getDataFromServer()
})

const getDataFromServer = async () => {
  try {
    let { data, error } = await supabase.from('staff').select('*')
    dataFromServer.value = data
    loadingState.value = false
    if (error) throw error
  } catch (error) {
    if (error instanceof Error) {
      alert(error.message)
    }
  }
}
</script>

<style lang="scss" scoped>
.main-page {
  display: flex;
  justify-content: center;
  flex-direction: column;
  &__statistics {
    display: flex;
    justify-content: center;
    justify-content: space-around;
    flex-wrap: wrap;
  }
}
</style>
