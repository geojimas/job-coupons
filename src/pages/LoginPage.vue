<template>
  <q-page class="flex flex-center bg-grey-4">
    <q-card class="q-pa-md shadow-2 my_card" bordered>
      <q-card-section class="text-center">
        <div class="text-grey-9 text-h4 text-weight-bold">Admin Login</div>
      </q-card-section>
      <q-card-section>
        <q-input dense outlined v-model="email" label="email"></q-input>
        <q-input
          dense
          outlined
          class="q-mt-md"
          v-model="password"
          type="password"
          label="Password"></q-input>
      </q-card-section>
      <q-card-section>
        <q-btn
          style="border-radius: 8px"
          @click.prevent="handleLogin"
          color="dark"
          rounded
          size="md"
          label="Sign in"
          no-caps
          class="full-width"></q-btn>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useUserStore } from '../stores/userStore'

const store = useUserStore()

const email = ref(import.meta.env.VITE_ADMIN_EMAIL)
const password = ref(import.meta.env.VITE_ADMIN_PASSWORD)

const handleLogin = () => {
  try {
    store.loginUser(email.value, password.value)
  } catch (error) {
    alert(error)
  }
}
</script>

<style scoped lang="scss">
.my_card {
  width: 25rem;
  border-radius: 8px;
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
}
</style>
