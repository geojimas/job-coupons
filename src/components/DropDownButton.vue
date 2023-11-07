<template>
  <div class="q-pa-md">
    <q-btn-dropdown glossy push color="secondary" icon="manage_accounts">
      <div class="row no-wrap q-pa-sm">
        <!-- <div class="column">
          <div class="text-h6 q-mb-md">Connected as: </div>
          <p> </p>
        </div> -->
        <div class="column items-center">
          <p class="q-mt-sm q-mb-xs text-weight-medium">{{ $t('connectedWith') }}</p>
          <p class="text-primary q-pa-sm q-mb-sm text-weight-bold">{{ currentUser }}</p>
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
import { computed } from 'vue'
import { useUserStore } from 'stores/userStore'

const store = useUserStore()

const currentUser = computed(() => {
  return store.user.email
})
const handleLogout = () => {
  store.logoutUser()
}
</script>
