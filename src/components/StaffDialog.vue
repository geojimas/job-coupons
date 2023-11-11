<template>
  <div class="q-pa-sm q-gutter-sm">
    <q-btn
      :label="`${$t('add')}`"
      @click="openModal()"
      class="q-mr-lg text-bold"
      color="secondary"
      icon="person_add"
      no-caps
      push />
    <q-dialog persistent v-model="toggleModal">
      <q-card-section style="max-height: 65vh" class="bg-white">
        <q-chip
          class="q-mb-sm"
          color="dark"
          :label="$t(`${toggleModalMode}`)"
          text-color="white"
          :icon="chipIcon">
        </q-chip>
        <q-form autofocus @submit="HandleSubmissions">
          <div class="row">
            <div class="col q-ma-sm">
              <q-input
                outlined
                clearable
                maxlength="30"
                autocomplete="off"
                name="name"
                style="max-width: 220px"
                color="secondary"
                :rules="[
                  val => (val && val.length > 0) || `${$t('nameValidation1')}`,
                  val => (val && val.length >= 3) || `${$t('nameValidation2')}`
                ]"
                type="text"
                v-model="formData.name"
                :label="`${$t('username')}`" />
            </div>
            <div class="col q-ma-sm">
              <q-input
                outlined
                clearable
                autocomplete="off"
                maxlength="30"
                name="surname"
                style="max-width: 220px"
                color="secondary"
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
                clearable
                name="email"
                maxlength="45"
                autocomplete="off"
                style="max-width: 220px"
                color="secondary"
                type="email"
                :rules="[(val, rules) => rules.email(val) || `${$t('validEmail')}`]"
                v-model="formData.email"
                :label="`${$t('email')}`" />
            </div>
            <div class="col q-ma-sm">
              <q-input
                outlined
                clearable
                name="phone"
                autocomplete="off"
                maxlength="10"
                style="max-width: 220px"
                color="secondary"
                type="tel"
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
                clearable
                autocomplete="off"
                style="max-width: 220px"
                name="contactTerm"
                color="secondary"
                v-model="formData.contract_term">
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                      <q-date minimal color="secondary" v-model="formData.contract_term">
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
                name="couponsRight"
                v-model="formData.coupon_rights"
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
                autocomplete="off"
                :name="`'${value}'`"
                :style="monthsInputClass"
                color="secondary"
                maxlength="2"
                type="tel"
                :rules="[val => !val || /^-?\d+$/.test(val) || $t('validInteger2')]"
                :disable="formData.coupon_rights === false"
                v-model="numOfCoupons[index]"
                :label="$t(months[index])" />
            </div>
          </div>
          <div style="display: flex; justify-content: end" class="q-pa-sm">
            <q-btn class="q-mr-sm" flat :label="`${$t('cancel')}`" no-caps v-close-popup />
            <q-btn
              type="submit"
              color="secondary"
              push
              no-caps
              :disable="toggleModalMode === Constants.editMode && !isDataChanged"
              :label="`${$t('save')}`" />
          </div>
        </q-form>
      </q-card-section>
    </q-dialog>
  </div>
</template>

<script setup>
import { useQuasar } from 'quasar'
import { ref, watch, computed } from 'vue'
import { supabase } from 'boot/supabase'
import { useI18n } from 'vue-i18n'
import Constants from 'src/constants/index'

const emits = defineEmits(['dataFromServer'])

const $q = useQuasar()
const i18n = useI18n()

const currentItemRowData = ref({})
const toggleModalMode = ref('')
const toggleModal = ref(false)
const sentData = ref({})
const formData = ref({
  name: '',
  surname: '',
  email: '',
  phone: '',
  coupon_rights: false,
  contract_term: null
})
const monthsInputClass = computed(() => {
  return $q.screen.lt.md ? 'width: 85px' : 'width: 110px'
})
const numOfCoupons = ref(['', '', '', '', '', '', '', '', '', '', '', ''])
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

const openModal = payload => {
  if (payload) {
    currentItemRowData.value = payload
    toggleModalMode.value = Constants.editMode

    // Create a separate copy of the data
    formData.value = { ...currentItemRowData.value }

    // Update form with the values in numOfCoupons in FORM
    for (let index = 0; index < numOfCoupons.value.length; index++) {
      const monthKey = Constants[months.value[index].toLowerCase()]
      if (currentItemRowData.value[monthKey] !== null) {
        numOfCoupons.value[index] =
          currentItemRowData.value[monthKey] === 0 ? '' : currentItemRowData.value[monthKey]
      }
    }
  } else {
    toggleModalMode.value = Constants.addMode
  }
  toggleModal.value = true
}

const chipIcon = computed(() => {
  return toggleModalMode.value === 'add' ? 'person_add' : 'drive_file_rename_outline'
})

// Expose value to Parent to Open modal
defineExpose({
  openModal
})

watch(toggleModal, newToggleModal => {
  if (!newToggleModal) {
    // Reset values in modal close
    formData.value.name = ''
    formData.value.surname = ''
    formData.value.email = ''
    formData.value.phone = ''
    formData.value.coupon_rights = false
    formData.value.contract_term = null
    currentItemRowData.value = {}

    for (let index = 0; index < months.value.length; index++) {
      numOfCoupons.value[index] = ''
    }
  }
})

const isDataChanged = computed(() => {
  // Array of field names to compare
  const mainFieldsToCompare = [
    'name',
    'surname',
    'email',
    'phone',
    'contract_term',
    'coupon_rights'
  ]

  const monthsFieldsToCompare = [
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
  ]

  // Use the some method to check if any main field has changed
  const mainFieldsChanged = mainFieldsToCompare.some(
    field => formData.value[field] !== currentItemRowData.value[field]
  )

  const monthsChanged = monthsFieldsToCompare.some(field => {
    const currentIndex = monthsFieldsToCompare.indexOf(field)
    const currentValue = numOfCoupons.value[currentIndex]
    const currentDataValue = currentItemRowData.value[field]

    // Convert empty string to 0 for comparison
    const sanitizedValue = currentValue === '' ? 0 : parseInt(currentValue)

    return sanitizedValue !== currentDataValue
  })
  // Return true if any main field or month-related field has changed
  return mainFieldsChanged || monthsChanged
})

const HandleSubmitRequest = async () => {
  // Update the fields in formData
  sentData.value = {
    name: formData.value.name,
    surname: formData.value.surname,
    email: formData.value.email,
    phone: formData.value.phone,
    contract_term: formData.value.contract_term,
    coupon_rights: formData.value.coupon_rights
  }

  // fill moths data with values
  for (let index = 0; index < months.value.length; index++) {
    sentData.value[months.value[index]] =
      numOfCoupons.value[index] === '' ? 0 : parseInt(numOfCoupons.value[index])
  }

  try {
    console.log(sentData.value)
    const { error: errorData } = await supabase.from('staff').insert(sentData.value)
    if (errorData) {
      throw new Error(errorData.message)
    }
    emits('dataFromServer')
    toggleModal.value = false
    $q.notify({
      position: 'top',
      message: i18n.t('postDataMsg'),
      color: 'positive',
      icon: 'thumb_up',
      progress: true,
      timeout: 1500
    })
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

const HandleUpdateRequest = async () => {
  // Update the fields in formData TO SENT
  sentData.value = {
    name: formData.value.name,
    surname: formData.value.surname,
    email: formData.value.email,
    phone: formData.value.phone,
    contract_term: formData.value.contract_term,
    coupon_rights: formData.value.coupon_rights
  }

  // fill moths data with values
  for (let index = 0; index < months.value.length; index++) {
    sentData.value[months.value[index]] =
      numOfCoupons.value[index] === '' ? 0 : parseInt(numOfCoupons.value[index])
  }

  try {
    const { error: errorData } = await supabase
      .from('staff')
      .update(sentData.value)
      .eq('id', currentItemRowData.value.id)
    if (errorData) {
      throw new Error(errorData.message)
    }
    emits('dataFromServer')
    toggleModal.value = false
    $q.notify({
      position: 'top',
      message: i18n.t('editDataMsg'),
      color: 'positive',
      icon: 'thumb_up',
      progress: true,
      timeout: 1500
    })
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

const HandleSubmissions = () => {
  if (toggleModalMode.value === Constants.addMode) {
    HandleSubmitRequest()
  } else if (toggleModalMode.value === Constants.editMode) {
    HandleUpdateRequest()
  }
}
</script>
