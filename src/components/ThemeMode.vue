<template>
  <div :class="dynamicClass">
    <q-toggle
      v-model="setTheme"
      :true-value="true"
      :false-value="false"
      checked-icon="dark_mode"
      size="4em"
      color="secondary"
      unchecked-icon="light_mode" />
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue'
import { useQuasar } from 'quasar'
const $q = useQuasar()

const setTheme = ref(false)

watch(
  () => setTheme.value,
  newTheme => {
    $q.dark.set(newTheme)
  }
)

const dynamicClass = computed(() => {
  return $q.screen.gt.sm ? 'q-mr-lg' : ''
})
</script>
