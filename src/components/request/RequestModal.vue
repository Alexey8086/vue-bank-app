<template>
    <form @submit.prevent="onSubmit">
        <div class="form-control" :class="{ invalid: fioError }">
            <label for="">ФИО:</label>
            <input type="text" id="fio" v-model="fio" @blur="fioBlur">
            <small v-if="fioError">{{ fioError }}</small>
        </div>

        <div class="form-control" :class="{ invalid: phoneError }">
            <label for="">Телефон:</label>
            <input type="text" id="phone" v-model="phone" @blur="phoneBlur">
            <small v-if="phoneError">{{ phoneError }}</small>
        </div>

        <div class="form-control" :class="{ invalid: amountError }">
            <label for="amount">Сумма:</label>
            <input type="number" id="amount" v-model.number="amount" @blur="amountBlur">
            <small v-if="amountError">{{ amountError }}</small>
        </div>

        <div class="form-control">
            <label for="status">Статус:</label>
            <select name="" id="status" v-model="status">
                <option value="done">Завершено</option>
                <option value="cancelled">Отменено</option>
                <option value="active">Активно</option>
                <option value="pending">Выполняется</option>
            </select>
        </div>

        <button class="btn primary" :disabled="isSubmitting">Создать</button>
    </form>
</template>

<script>
    import { useRequestForm } from '@/use/request-form'
    import { useStore } from 'vuex'

    export default {
        emits: ['created'],

        setup(_, { emit }) {
            const store = useStore()

            const submit = async (values) => {
                await store.dispatch('request/create', values)
                emit('created')
            }

            return {
                // валидация формы и последующее сохранение её значений в vuex store
                ...useRequestForm(submit)
            }
        }
    }

</script>

<style scoped lang='scss'>

</style> 