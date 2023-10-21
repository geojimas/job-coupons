<template>
  <q-page class="flex flex-center">
    <StaffTable />
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import StaffTable from '../components/StaffTable.vue'

export default defineComponent({
  name: 'IndexPage',
  components: {
    StaffTable
  }
})
</script>
