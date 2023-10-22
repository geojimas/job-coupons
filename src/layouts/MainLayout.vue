<template>
  <q-layout>
    <q-header reveal elevated class="bg-dark text-white">
      <q-toolbar>
        <q-toolbar-title></q-toolbar-title>
        <ToggleLanguage />
        <InfoPopup />
        <DropDownButton />
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent } from 'vue'
import DropDownButton from 'src/components/DropDownButton.vue'
import ToggleLanguage from 'src/components/ToggleLanguage.vue'
import InfoPopup from 'src/components/InfoPopup.vue'

export default defineComponent({
  name: 'MainLayout',

  components: {
    DropDownButton,
    ToggleLanguage,
    InfoPopup
  }
})
</script>
