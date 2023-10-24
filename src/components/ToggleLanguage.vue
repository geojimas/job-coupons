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

const i18n = useI18n()
const selectedLang = ref(i18n.locale)

const languages = [
  { label: 'ΕΛ', value: 'el' },
  { label: 'EN', value: 'en' }
]
</script>
