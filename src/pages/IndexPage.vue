<template>
  <q-page class="flex flex-center">
    <StaffTable />
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import StaffTable from 'src/components/staffTable.vue'

export default defineComponent({
  name: 'IndexPage',
  components: {
    StaffTable
  }
})
</script>
