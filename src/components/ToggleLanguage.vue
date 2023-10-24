<template>
  <div>
    <q-btn-toggle
      v-model="selectedLang"
      class="q-mr-md"
      no-caps
      rounded
      unelevated
      toggle-color="secondary"
      color="dark"
      text-color="white"
      :options="languages" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import Constants from 'src/constants/index'

const i18n = useI18n()
const selectedLang = ref(i18n.locale)

const languages = [
  { label: Constants.capEl, value: Constants.el },
  { label: Constants.capEN, value: Constants.en }
]
</script>
