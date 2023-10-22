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
        <div>
          <div class="row">
            <div class="col q-ma-sm">
              <q-input
                outlined
                color="secondary"
                :rules="[val => val.length >= 3 || 'Name is Required']"
                ref="nameInput"
                type="text"
                v-model="username"
                :label="`${$t('username')}`" />
            </div>
            <div class="col q-ma-sm">
              <q-input
                outlined
                color="secondary"
                :rules="[val => val.length >= 3 || 'Surname is Required']"
                ref="nameInput"
                type="text"
                v-model="surname"
                :label="`${$t('surname')}`" />
            </div>
          </div>
          <div class="row">
            <div class="col q-ma-sm">
              <q-input
                outlined
                color="secondary"
                type="email"
                :rules="[(val, rules) => rules.email(val) || 'Please enter a valid email address']"
                v-model="email"
                :label="`${$t('email')}`" />
            </div>
            <div class="col q-ma-sm">
              <q-input
                outlined
                color="secondary"
                type="tel"
                :rules="[val => val.length <= 10 || 'Please use maximum 10 characters']"
                v-model="phone"
                :label="`${$t('phone')}`" />
            </div>
          </div>
          <div class="row">
            <div class="col q-ma-sm">
              <q-input :label="`${$t('contractExp')}`" outlined v-model="contactTerm" mask="date">
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                      <q-date color="secondary" v-model="contactTerm">
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
        </div>
        <div style="display: flex; justify-content: end" class="q-pa-sm">
          <q-btn class="q-mr-sm" flat :label="`${$t('cancel')}`" v-close-popup />
          <q-btn color="secondary" :label="`${$t('save')}`" @click.prevent="submitForm" push />
        </div>
      </q-card-section>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const toggleModal = ref(false)
const username = ref('')
const surname = ref('')
const email = ref('')
const phone = ref(null)
const couponsRight = ref(false)
const contactTerm = ref('')
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

const sentData = ref({})

function submitForm() {
  // Update sentData with the current values
  sentData.value = {
    name: username.value,
    surname: surname.value,
    email: email.value,
    phone: phone.value,
    contract_term: contactTerm.value,
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
  console.log('DATA TO SERVER', sentData.value)
}
</script>
