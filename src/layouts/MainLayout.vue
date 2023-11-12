<template>
  <q-layout>
    <q-header reveal class="bg-dark text-white">
      <div class="row no-wrap	justify-around items-center">
        <img src="../assets/tickets.png" width="60" alt="coupons" />
        <q-toolbar-title v-if="$q.screen.gt.xs" class="text-bold">{{
          $t('coupons')
        }}</q-toolbar-title>
        <q-toolbar-title v-if="$q.screen.gt.sm" />
        <ThemeMode />
        <ToggleLanguage />
        <DropDownButton v-if="isUserAuth" />
      </div>
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
import ThemeMode from 'src/components/ThemeMode.vue'

const store = useUserStore()

const isUserAuth = computed(() => {
  return store.isAuthenticated
})
</script>
