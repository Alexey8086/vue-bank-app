<template>
  <!-- при загрузке данных из БД показывается компонент loader иначе всё остальное -->
  <app-loader v-if="loading" />

  <!-- компонент обертка, используется как ui-контейнер -->
  <app-page title="Список заявок" v-else>
    <template #header>
      <button @click="modal = true" class="btn primary">Создать</button>
    </template>

    <!-- компонент фильтрации данных, отображаемых в request-table -->
    <request-filter v-model="filter"></request-filter>
    <!-- компонент отображения заявок (таблица с данными из firebase) -->
    <request-table :requests="requests"></request-table>

    <teleport to="body">
      <!-- ui компонент - модальное окно -->
      <app-modal v-if="modal" @close="modal = false" title="Создание новой заявки">
        <!-- компонент - форма создания новой заявки (сохранение её в vuex store) -->
        <request-modal @created="modal = false"/>
      </app-modal>
    </teleport>
  </app-page>
</template>
  
<script>
  import { ref, computed, onMounted } from 'vue'
  import { useStore } from 'vuex'
  import AppPage from '@/components/ui/AppPage'
  import RequestTable from '@/components/request/RequestTable'
  import RequestModal from '@/components/request/RequestModal'
  import AppModal from '@/components/ui/AppModal'
  import AppLoader from '@/components/ui/AppLoader'
  import RequestFilter from '@/components/request/RequestFilter'

  export default {
    name: 'Home',
    components: { AppPage, RequestTable, AppModal, RequestModal, AppLoader, RequestFilter, },

    setup () {
      const store = useStore()
      const modal = ref(false)
      // флаг для лоадера
      const loading = ref(false)
      const filter = ref({})

      onMounted(async () => {
        // флаг - идёт загрузка данных из БД
        loading.value = true
        // выполнения action 'load', который делает запрос на получение заявок из БД
        // и последующее сохранение данных в state
        await store.dispatch('request/load')
        // загрузка данных завершена
        loading.value = false
      })

      // фильтрация значений из vuex store по значению переменной 'filter'
      const requests = computed(() =>
        store
        .getters['request/requests']
        .filter(request => {
          if (filter.value.name) {
            return request.fio.includes(filter.value.name)
          }
          return request
        })
        .filter(request => {
          if (filter.value.status) {
            return filter.value.status === request.status
          }
          return request
        })
      )

      return {
        modal,
        requests,
        loading,
        filter,
      }
    }
    
  }
</script>
  