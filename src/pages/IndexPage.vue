<template>
  <div class="main-page">
    <StaffTable
      :loading-state="loadingState"
      :data-from-server="dataFromServer"
      @get-server-back-from-parents="getDataFromServer" />
    <div class="main-page__statistics">
      <div class="main-page__statistics-coupon-chart">
        <StaffCouponChart
          :number-of-people-with-coupon-rights-value="numberOfPeopleWithCouponRightsValue"
          :number-of-people-without-coupon-rights-value="numberOfPeopleWithoutCouponRightsValue"
          :loading-state="loadingState" />
      </div>
      <div class="main-page__statistics-percent-chart">
        <StaffCouponPercent
          :percentage-people-with-coupon-rights="percentagePeopleWithCouponRights"
          :loading-state="loadingState" />
      </div>
    </div>
    <q-inner-loading
      :showing="loadingState"
      :label="`${$t('loading')}`"
      label-class="text-dark"
      label-style="font-size: 2em" />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import StaffTable from '../components/StaffTable.vue'
import StaffCouponChart from 'src/components/StaffCouponChart.vue'
import StaffCouponPercent from 'src/components/StaffCouponPercent.vue'
import { supabase } from 'boot/supabase'
import { useQuasar } from 'quasar'
import { useI18n } from 'vue-i18n'
import { useUserStore } from 'stores/userStore'
const store = useUserStore()

const $q = useQuasar()
const i18n = useI18n()
const dataFromServer = ref([])
const loadingState = ref(true)
const acceptCookies = ref(false)

onMounted(() => {
  getDataFromServer()
  cookieConsent()
})

const numberOfPeopleWithCouponRights = computed(() => {
  return dataFromServer.value.filter(person => person.coupon_rights).length
})

const percentagePeopleWithCouponRights = ref('')
const numberOfPeopleWithCouponRightsValue = ref(0)
const numberOfPeopleWithoutCouponRightsValue = ref(0)

const getDataFromServer = async () => {
  try {
    let { data, error: errorData } = await supabase.from('staff').select('*')
    if (errorData) {
      throw new Error(errorData.message)
    } else {
      dataFromServer.value = data
      loadingState.value = false
      numberOfPeopleWithCouponRightsValue.value = dataFromServer.value.filter(
        person => person.coupon_rights
      ).length
      numberOfPeopleWithoutCouponRightsValue.value = dataFromServer.value.filter(
        person => !person.coupon_rights
      ).length
      percentagePeopleWithCouponRights.value = (
        (numberOfPeopleWithCouponRights.value / data.length) *
        100
      ).toFixed(2)
    }
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
}

const cookieConsent = () => {
  if (!store.getCookieIfExists) {
    $q.notify({
      message: i18n.t('cookieMsg'),
      color: 'secondary',
      timeout: 0,
      textColor: 'white',
      position: 'bottom-right',
      actions: [
        {
          label: i18n.t('accept'),
          color: 'warning',
          handler: () => {
            acceptCookies.value = true
            store.handleCookies(acceptCookies.value)
          }
        },
        {
          label: i18n.t('dismiss'),
          color: 'white',
          handler: () => {
            acceptCookies.value = false
            store.handleCookies(acceptCookies.value)
          }
        }
      ]
    })
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
    justify-content: space-around;
    flex-wrap: wrap;
  }
}
</style>
