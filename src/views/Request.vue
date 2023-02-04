<template>
    <app-loader v-if="loading"></app-loader>

    <app-page v-else-if="request" :title="'заявка'" needBackLink>
        <p> <strong>Имя владельца</strong> : {{  request.fio  }} </p>
        <p> <strong>Телефон</strong> : {{  request.phone  }} </p>
        <p> <strong>Сумма</strong> : {{  currency(request.amount)  }} </p>
        <p> <strong>Статус</strong> : <app-status :type="request.status" /> </p>

        <div class="form-control">
            <label for="status">Изменить статус:</label>
            <select name="" id="status" v-model="status">
                <option value="done">Завершено</option>
                <option value="cancelled">Отменено</option>
                <option value="active">Активно</option>
                <option value="pending">Выполняется</option>
            </select>
        </div>

        <button class="btn danger" @click="remove">Удалить</button>
        <button class="btn" @click="update" v-if="needUpdate">Обновить</button>
    </app-page>

    <div v-else class="card">
        <h3 class="text-center">
            Заявка с Id = <b class="text-primary text-light"> {{ id }} </b> не найдена!
        </h3>
    </div>
</template>

<script>
    import { ref, onMounted, computed } from 'vue'
    import { useRoute, useRouter } from 'vue-router'
    import { useStore } from 'vuex'
    import AppPage from '@/components/ui/AppPage'
    import AppLoader from '@/components/ui/AppLoader'
    import AppStatus from '@/components/ui/AppStatus'
    // самописная функция форматирования валюты
    import { currency } from '@/utils/currency'

    export default {
        components: { AppPage, AppLoader, AppStatus },
        setup () {
            const route = useRoute()
            const router = useRouter()
            const store = useStore()
            const request = ref({})
            const status = ref()
            // флаг загрузки
            const loading = ref(false)
            // id заявки (передаётся во время навигации по нажатию на кнопку "открыть" из компонента RequestTable)
            const id = route.params.id

            // подгрузка заявки при перерисовке компонента Request
            onMounted(async () => {
                loading.value = true
                request.value = await store.dispatch('request/loadOne', id)
                // чтобы статус в селекте совпадал со статусом загруженной заявки
                status.value = request.value?.status
                loading.value = false
            })

            // если статус селекта изменился на отличный от статуса заявки возращаем true
            const needUpdate = computed(() => request.value.status !== status.value)

            // удаление заявки
            const remove = async () => {
                await store.dispatch('request/removeOne', id)
                // редирект к заявкам
                router.push('/')
            }

            // редактирование статуса заявки
            const update = async () => {
                // подготавливаем данные
                // (т.к. request это proxy объект или ref, то просто так передавать его дальше некорректно)
                // при этом ещё необходимо передать актуальный статус (так как мы его изменили)
                const requestData = { ...request.value, id: id, status: status.value}
                await store.dispatch('request/updateOne', requestData)
                // локальное обновление статуса на фронте
                request.value.status = status.value
            }

            return {
                loading,
                request,
                id,
                status,
                needUpdate,
                currency,
                remove,
                update,
            }
        }
    }

</script>

<style scoped lang='scss'>
    .text-primary {
        color:rgb(255, 149, 62);
    }

    .text-light {
        font-weight: lighter;
    }
</style> 