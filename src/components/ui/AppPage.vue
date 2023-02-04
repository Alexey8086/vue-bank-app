<template>
  <div v-if="needBackLink" class="breadcrumbs">
    <router-link to="/">Обратно к заявкам</router-link>
  </div>
  <div class="card">
    <h1 class="app-page__heading">
      {{ title }}
      <slot name="header" />
    </h1>

    <slot />
  </div>
</template>

<script>
  export default {
    props: {
      title: { type: String, required: true },
      // параметр - нужна ли ссылка "назад"
      needBackLink: { type: Boolean, default: false },
    },

    setup (props) {
      document.title = `${props.title} | Bank app`

      return {}
    }
  }

</script>

<style scoped lang='scss'>


</style> 