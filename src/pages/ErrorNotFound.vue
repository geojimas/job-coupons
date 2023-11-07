<template>
  <div class='fullscreen bg-secondary text-white text-center q-pa-md flex flex-center'>
    <div>
      <div style='font-size: 20vh'>
        404
      </div>

      <div class='text-h2' style='opacity:.4'>
        {{ $t('notFound') }} 😔
      </div>

      <q-btn
        class='q-mt-xl'
        size='xl'
        color='white'
        text-color='dark'
        to='/'
        :label="`${$t('ReturnHome')}`"
        no-caps
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'ErrorNotFound'
}
</script>
