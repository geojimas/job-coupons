<template>
  <div>
    <q-btn-toggle
      v-model="changeLanguage"
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
import { ref, computed } from 'vue'
import Constants from 'src/constants/index'
import { useLanguageStore } from '../stores/languageStore'

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
    location.reload()
  }
})

</script>
