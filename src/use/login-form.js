import {computed, watch} from 'vue'
// подключаем библиотеку для валидации форм-контролов
import { useField, useForm } from 'vee-validate'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import * as yup from 'yup'

export function useLoginForm () {
    const store = useStore()
    const router = useRouter()
    const { handleSubmit, isSubmitting, submitCount } = useForm()

        const PASS_LENGTH = {
            min: 6,
            max: 15
        }

        // переименовываем свойства, чтобы не было конфликтов имен и вызываем валидаторы
        const { value: email, errorMessage: emailError, handleBlur: emailBlur } = useField(
            'email',
            yup.string().trim()
                .required('Поле email обязательное!')
                .email('Некорректный email!')
        )
        const { value: password, errorMessage: passwordError, handleBlur: passwordBlur } = useField(
            'password',
            yup.string().trim()
                .required('Поле пароль обязательное!')
                .min(PASS_LENGTH.min, `Пароль должен содержать не менее ${PASS_LENGTH.min} символов`)
                .max(PASS_LENGTH.max, `Паполь должен содержать не более ${PASS_LENGTH.max} символов`)
        )

        // отвечает за количество попыток 'слишком много попыток на отправку формы'
        const isTooManySubmits = computed(() => submitCount.value >= 3)

        // обнуляем кол-во попыток (через определённое время)
        watch(isTooManySubmits, value => {
            if (value) {
                setTimeout(() => submitCount.value = 0, 1500)
            }
        })

        // функция - управление событием submit, получение значений контролов
        const onSubmit = handleSubmit(async (values) => {
            // чтобы избежать редирект в случае неудачной авторизации используем trycatch
            // в случае неудачи action - login выкидывает ошибку и блок try не выполняется
            try {
                // выполняем асинхронный action 'login' из модуля 'auth'
                await store.dispatch('auth/login', values)
                console.log('logginnnnnnnn')
                router.push('/')
            } catch (e) {}

        })

        return {
            email,
            emailError,
            emailBlur,
            password,
            passwordError,
            passwordBlur,
            onSubmit,
            isSubmitting,
            isTooManySubmits,
        }
}