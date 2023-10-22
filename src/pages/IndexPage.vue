<template>
  <div class="main-page">
    <StaffTable />
    <div class="main-page__statistics">
      <div class="main-page__statistics-coupon-chart"><StaffCouponChart /></div>
      <div class="main-page__statistics-percent-chart"><StaffCouponPercent /></div>
    </div>
  </div>
</template>

<script>
import { defineComponent, defineAsyncComponent } from 'vue'
import StaffTable from '../components/StaffTable.vue'
import StaffCouponChart from 'src/components/StaffCouponChart.vue'
import StaffCouponPercent from 'src/components/StaffCouponPercent.vue'
export default defineComponent({
  name: 'IndexPage',
  components: {
    StaffTable,
    StaffCouponChart,
    StaffCouponPercent
  }
})
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
