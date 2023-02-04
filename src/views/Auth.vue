<template>
    <form @submit.prevent="onSubmit" class="card">
        <h1>Войти в систему</h1>

        <!-- Если в emailError что-то есть, то добавляем класс invalid -->
        <div :class="['form-control', { invalid: emailError }]">
            <label for="email">Email</label>
            <input v-model="email" @blur="emailBlur" type="email" id="email">
            <small v-if="emailError">{{ emailError }}</small>
        </div>

        <div :class="['form-control', { invalid: passwordError }]">
            <label for="password">Пароль</label>
            <input v-model="password" @blur="passwordBlur" type="password" id="password">
            <small v-if="passwordError">{{ passwordError }}</small>
        </div>

        <!-- кнопка блокируется если форма ещё отправляется или превышено число отправок -->
        <button :disabled="isSubmitting || isTooManySubmits" class="btn primary">Войти</button>
        <div v-if="isTooManySubmits" class="text-danger">Слишком много попыток, попробуйте позже</div>
    </form>
</template>

<script>
    import { useLoginForm } from '@/use/login-form.js'
    import { useRoute } from 'vue-router'
    import { useStore } from 'vuex'
    import { error } from '@/utils/error'

    export default {

        setup() {
            const route = useRoute()
            const store = useStore()
            console.log(route.query)

            if (route.query.message) {
                store.dispatch('addMessage', {
                    value: error(route.query.message),
                    type: 'warning'
                })
            }

            return {
                ...useLoginForm()
            }
        }
    }

</script>

<style scoped lang='scss'>

</style> 