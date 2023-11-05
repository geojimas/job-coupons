<template>
  <q-layout>
    <q-header reveal elevated class="bg-dark text-white">
      <q-toolbar>
        <img src="../assets/tickets.png" width="60" alt="coupons">
        <q-toolbar-title class="text-h5 text-bold">{{ $t('coupons') }}</q-toolbar-title>
        <ToggleLanguage />
        <DropDownButton v-if="isUserAuth" />
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { computed } from 'vue'
import DropDownButton from 'src/components/DropDownButton.vue'
import ToggleLanguage from 'src/components/ToggleLanguage.vue'
import { useUserStore } from 'src/stores/userStore'

const store = useUserStore()

const isUserAuth = computed(() => {
  return store.isAuthenticated
})
</script>
