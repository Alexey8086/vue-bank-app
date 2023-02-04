<template>

  <!-- <div class="card">

  </div> -->

  <!-- <main-layout></main-layout> -->
  <!-- <auth-layout></auth-layout> -->

  <!-- Динамические компонеты, конкатенация строк в :is для изменения layout -->
  <component v-if="layout" :is="layout + '-layout'"/>

</template>

<script>
  import { useRoute } from 'vue-router'
  import { ref, computed } from 'vue'
  import MainLayout from './layout/MainLayout.vue'
  import AuthLayout from './layout/AuthLayout.vue'

  export default {
    components: { MainLayout, AuthLayout },
    setup() {
      const route = useRoute()
      const layout = computed(() => route.meta.layout)

      return {
        layout
      }
    },
    

  }
</script>
