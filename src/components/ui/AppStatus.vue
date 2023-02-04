<template>
    <span :class="['badge', className]">
        {{ text }}
    </span>
</template>

<script>
  import { ref, watch } from 'vue'

  export default {
    props: {
        type: {
            type: String,
            require: true,
            // проверяем проп на наличие его значения в массиве
            validator(value) {
                return ['active', 'cancelled', 'done', 'pending'].includes(value)
            }
        }
    },
    setup(props) {
        const classesMap = {
            active: 'primary',
            cancelled: 'danger',
            done: 'primary',
            pending: 'warning',
        }

        const textMap = {
            active: 'Активен',
            cancelled: 'Отменен',
            done: 'Завершен',
            pending: 'Выполняется',
        }

        // в props данного компонента ('type')
        // передаётся статус заявки (active, cancelled, done или pending)
        // при изменении props изменяем текст и style класс в соответствии с новым статусом
        watch(props, newProps => {
            className.value = classesMap[newProps.type]
            text.value = textMap[newProps.type]
        })

        const className = ref(classesMap[props.type])
        const text = ref(textMap[props.type])

        return {
            className,
            text,
        }
    }
  }

</script>

<style scoped lang='scss'>



</style> 