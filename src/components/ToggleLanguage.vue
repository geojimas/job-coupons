<template>
  <div :class="dynamicClass">
    <q-btn-toggle
      v-model="changeLanguage"
      rounded
      toggle-color="secondary"
      color="dark"
      text-color="white"
      :options="languages" />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import Constants from 'src/constants/index'
import { useLanguageStore } from 'stores/languageStore'
import { useQuasar } from 'quasar'
const $q = useQuasar()

const store = useLanguageStore()
const selectedLang = ref(store.getAppLanguage)

const languages = [
  { label: Constants.capEl, value: Constants.el },
  { label: Constants.capEN, value: Constants.en }
]

// Create a computed property to get and set the selected language
const changeLanguage = computed({
  get: () => selectedLang.value,
  set: newLang => {
    store.setAppLanguage(newLang)
    window.location.replace(
      window.location.pathname + window.location.search + window.location.hash
    )
  }
})

const dynamicClass = computed(() => {
  return $q.screen.gt.xs ? 'q-mr-lg' : 'q-mr-sm'
})
</script>
