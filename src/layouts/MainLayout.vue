<template>
  <q-layout>
    <q-header reveal elevated class="bg-dark text-white">
      <q-toolbar>
        <q-toolbar-title> Coupons </q-toolbar-title>
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
import { defineComponent, ref } from 'vue'
import DropDownButton from 'src/components/DropDownButton.vue'
import InfoPopup from 'src/components/InfoPopup.vue'

export default defineComponent({
  name: 'MainLayout',

  components: {
    DropDownButton,
    InfoPopup
  },

  setup() {
    const leftDrawerOpen = ref(false)

    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
})
</script>
