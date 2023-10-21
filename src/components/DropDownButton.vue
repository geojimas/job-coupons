<template>
  <div class="q-pa-md">
    <q-btn-dropdown color="pink" label="kjhb" dropdown-icon="change_history">
      <div class="row no-wrap q-pa-md">
        <div class="column">
          <div class="text-h6 q-mb-md">Settings</div>
          <p>Profile</p>
        </div>

        <q-separator vertical inset class="q-mx-lg" />

        <div class="column items-center">
          <q-avatar size="72px">
            <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
          </q-avatar>

          <div class="text-subtitle1 q-mt-md q-mb-xs">John Doe</div>

          <q-btn
            color="primary"
            @click.prevent="handleLogout"
            label="Logout"
            push
            size="sm"
            v-close-popup />
        </div>
      </div>
    </q-btn-dropdown>
  </div>
</template>

<script setup>
import { useUserStore } from '../stores/userStore'
const store = useUserStore()

const handleLogout = () => {
  try {
    store.logoutUser()
  } catch (error) {
    alert(error)
  }
}
</script>
