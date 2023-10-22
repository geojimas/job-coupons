<template>
  <div class="q-pa-md">
    <q-btn-dropdown color="secondary" icon="manage_accounts">
      <div class="row no-wrap q-pa-md">
        <!-- <div class="column">
          <div class="text-h6 q-mb-md">Settings</div>
          <p>Profile</p>
        </div>
        <q-separator vertical inset class="q-mx-lg" /> -->
        <div class="column items-center">
          <p class="q-mt-md q-mb-xs text-weight-medium">{{ currentUser }}</p>
          <q-btn
            color="negative"
            @click.prevent="handleLogout"
            :label="`${$t('logout')}`"
            push
            size="sm"
            v-close-popup />
        </div>
      </div>
    </q-btn-dropdown>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useUserStore } from '../stores/userStore'

const store = useUserStore()

const currentUser = computed(() => {
  return store.user.email
})
const handleLogout = () => {
  try {
    store.logoutUser()
  } catch (error) {
    alert(error)
  }
}
</script>
