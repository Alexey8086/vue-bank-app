<template>
    <h4 v-if="requests.length === 0" class="text-center">Заявок пока нет</h4>
    <table v-else class="table">
        <thead>
            <tr>
                <th>#</th>
                <th>ФИО</th>
                <th>Телефон</th>
                <th>Сумма</th>
                <th>Статус</th>
                <th>Действие</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(req, idx) in requests" :key="req.id">
                <td>{{ idx + 1 }}</td>
                <td>{{ req.fio }}</td>
                <td>{{ req.phone }}</td>
                <td>{{ currency(req.amount) }}</td>
                <td> <app-status :type="req.status "/> </td>
                <td>
                    <router-link v-slot="{navigate}" custom :to="{name: 'Request', params: {id: req.id}}">
                        <button class="btn" @click="navigate">Открыть</button>
                    </router-link>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
    // самописная функция форматирования валюты
    import { currency } from '@/utils/currency'
    import AppStatus from '@/components/ui/AppStatus'

    export default {
        props: ['requests'],
        components: { AppStatus },

        setup() {
            

            return {
                currency
            }
        }
    }

</script>

<style scoped lang='scss'>

</style> 