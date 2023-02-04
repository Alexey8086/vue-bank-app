<template>
  <div @click.self="$emit('close')" class="modal-backdrop">
    <div class="modal">
      <h3 v-if="title">{{ title }}</h3>

      <slot />
    </div>
  </div>
</template>

<script>
  export default {
    emits: ['close'],
    props: ['title']
  }

</script>

<style scoped lang='scss'>



</style> 