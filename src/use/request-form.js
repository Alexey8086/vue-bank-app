import {computed, watch} from 'vue'
// подключаем библиотеку для валидации форм-контролов
import { useField, useForm } from 'vee-validate'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import * as yup from 'yup'

export function useRequestForm (func) {
    const store = useStore()
    const router = useRouter()

    const { handleSubmit, isSubmitting } = useForm({
        initialValues: {
            status: 'active'
        }
    })

    const {value: fio, errorMessage: fioError, handleBlur: fioBlur} = useField(
        'fio',
        yup.string().trim().required('Введите ваше имя')
    )
    const {value: phone, errorMessage: phoneError, handleBlur: phoneBlur} = useField(
        'phone',
        yup.string().trim().required('Введите свой номер телефона')
    )
    const {value: amount, errorMessage: amountError, handleBlur: amountBlur} = useField(
        'amount',
        yup.number().required('Введите сумму').min(0, 'Сумма не может быть отрицательной')
    )
    const {value: status} = useField('status')
    
    const onSubmit = handleSubmit(func)

    return {
        status,
        isSubmitting,
        fio,
        phone,
        amount,
        status,
        fioError,
        phoneError,
        amountError,
        fioBlur,
        phoneBlur,
        amountBlur,
        onSubmit,
    }
}