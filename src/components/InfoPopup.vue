<template>
  <div class="q-pa-md q-gutter-sm">
    <q-btn color="secondary" @click="icon = true" icon="help_center">
    </q-btn>
    <q-dialog v-model="icon">
      <q-card>
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">{{ $t('info') }}</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus sit voluptate
          voluptas eveniet porro. Rerum blanditiis perferendis totam, ea at omnis vel numquam
          exercitationem aut, natus minima, porro labore.
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  setup() {
    return {
      icon: ref(false)
    }
  }
}
</script>
