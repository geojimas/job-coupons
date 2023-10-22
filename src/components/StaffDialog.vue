<template>
  <div class="q-pa-sm q-gutter-sm">
    <q-btn
      :label="`${$t('Add')}`"
      @click="toggleModal = true"
      class="q-mr-lg"
      color="secondary"
      icon="person_add"
      push />
    <q-dialog persistent v-model="toggleModal">
      <q-card-section style="max-height: 65vh" class="bg-white">
        <!-- <q-header reveal elevated class="bg-secondary text-white">
          <q-toolbar>
            <q-toolbar-title>
              <q-avatar>
                <img src="../assets//add-person.png" alt="add Person" />
              </q-avatar>
              {{ $t('Add') }}
            </q-toolbar-title>
          </q-toolbar>
        </q-header> -->
        <!-- <q-btn color="negative" icon="close" @click="toggleModal = false" /> -->
        <q-form autofocus @submit="HandleSubmitRequest">
          <div class="row">
            <div class="col q-ma-sm">
              <q-input
                outlined
                color="secondary"
                lazy-rules
                :rules="[
                  val => (val && val.length > 0) || `${$t('nameValidation1')}`,
                  val => (val && val.length >= 3) || `${$t('nameValidation2')}`
                ]"
                type="text"
                v-model="formData.username"
                :label="`${$t('username')}`" />
            </div>
            <div class="col q-ma-sm">
              <q-input
                outlined
                color="secondary"
                lazy-rules
                :rules="[
                  val => (val && val.length > 0) || `${$t('surnameValidation1')}`,
                  val => (val && val.length >= 3) || `${$t('surnameValidation2')}`
                ]"
                type="text"
                v-model="formData.surname"
                :label="`${$t('surname')}`" />
            </div>
          </div>
          <div class="row">
            <div class="col q-ma-sm">
              <q-input
                outlined
                color="secondary"
                type="email"
                lazy-rules
                :rules="[(val, rules) => rules.email(val) || `${$t('validEmail')}`]"
                v-model="formData.email"
                :label="`${$t('email')}`" />
            </div>
            <div class="col q-ma-sm">
              <q-input
                outlined
                color="secondary"
                type="tel"
                lazy-rules
                :rules="[
                  val => val.length <= 10 || $t('validPhone1'),
                  val => !val || /^\d+$/.test(val) || $t('validPhone2')
                ]"
                v-model="formData.phone"
                :label="`${$t('phone')}`" />
            </div>
          </div>
          <div class="row">
            <div class="col q-ma-sm">
              <q-input
                :label="`${$t('contractExp')}`"
                outlined
                color="secondary"
                v-model="formData.contactTerm">
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                      <q-date
                        minimal
                        mask="DD-MM-YYYY"
                        lazy-rules
                        :options="date => date >= new Date().toISOString().slice(0, 10)"
                        color="secondary"
                        v-model="formData.contactTerm">
                        <div class="row items-center justify-end">
                          <q-btn v-close-popup label="Close" color="secondary" flat />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>
            <div class="col q-ma-sm">
              <q-toggle
                class="q-ml-md"
                keep-color
                v-model="couponsRight"
                left-label
                :label="`${$t('couponsRights')}`"
                checked-icon="check"
                color="secondary"
                unchecked-icon="clear" />
            </div>
          </div>
          <div class="row">
            <div class="q-ma-sm" v-for="(value, index) in numOfCoupons" :key="index">
              <q-input
                outlined
                style="width: 115px"
                color="secondary"
                type="tel"
                v-model="numOfCoupons[index]"
                :label="$t(months[index])" />
            </div>
          </div>
          <div style="display: flex; justify-content: end" class="q-pa-sm">
            <q-btn class="q-mr-sm" flat :label="`${$t('cancel')}`" v-close-popup />
            <q-btn type="submit" color="secondary" push :label="`${$t('save')}`" />
          </div>
        </q-form>
      </q-card-section>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { supabase } from '../boot/supabase'

const emits = defineEmits(['dataFromServer'])

const toggleModal = ref(false)
const couponsRight = ref(false)
const sentData = ref({})
const formData = ref({
  username: '',
  surname: '',
  email: '',
  phone: '',
  contactTerm: ''
})
const numOfCoupons = ref([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
const months = ref([
  'january',
  'february',
  'march',
  'april',
  'may',
  'june',
  'july',
  'august',
  'september',
  'october',
  'november',
  'december'
])

watch(toggleModal, newToggleModal => {
  if (!newToggleModal) {
    formData.value.username = ''
    formData.value.surname = ''
    formData.value.email = ''
    formData.value.phone = ''
    formData.value.contactTerm = ''
  }
})

const HandleSubmitRequest = async () => {
  sentData.value = {
    name: formData.value.username,
    surname: formData.value.surname,
    email: formData.value.email,
    phone: formData.value.phone,
    contract_term: formData.value.contactTerm,
    coupon_rights: couponsRight.value,
    january: numOfCoupons.value[0],
    february: numOfCoupons.value[1],
    march: numOfCoupons.value[2],
    april: numOfCoupons.value[3],
    may: numOfCoupons.value[4],
    june: numOfCoupons.value[5],
    july: numOfCoupons.value[6],
    august: numOfCoupons.value[7],
    september: numOfCoupons.value[8],
    october: numOfCoupons.value[9],
    november: numOfCoupons.value[10],
    december: numOfCoupons.value[11]
  }

  try {
    const { error } = await supabase.from('staff').insert(sentData.value)
    if (error) throw error
  } catch (error) {
    if (error instanceof Error) {
      alert(error.message)
    }
  } finally {
    emits('dataFromServer')
    toggleModal.value = false
  }
}
</script>
