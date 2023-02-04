<template>
    <nav class="navbar">
        <h3>Bank app</h3>

        <ul class="navbar-menu">
            <li> <router-link to="/">Заявки</router-link> </li>
            <li> <router-link to="/help">Помощь</router-link> </li>
            <li> <a @click.prevent="open" href="#">Сообщения</a> </li>
            <li> <a @click.prevent="logout" href="#">Выход</a> </li>
        </ul>
    </nav>
</template>

<script>
  import { useRouter } from 'vue-router'
  import { useStore } from 'vuex'

  export default {
    setup() {
      const router = useRouter()
      const store = useStore()
    
    return {
      logout: () => {
        console.log('LOGOUT')
        store.commit('auth/setlogout')
        router.push('/auth')
      },
      open: () => store.commit('setOpenSidebar'),
    }
  }
  }

</script>

<style scoped lang='scss'>



</style> 