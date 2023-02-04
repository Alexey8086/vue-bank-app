<template>
    <div class="filter">
        <div class="form-control">
            <input type="text" placeholder="Введите имя" v-model="name">
        </div>
        <div class="form-control">
            <select v-model="status">
                <option disabled selected>Выберите статус</option>
                <option value="done">Завершен</option>
                <option value="cancelled">Отменен</option>
                <option value="active">Активен</option>
                <option value="pending">Выполняется</option>
            </select>
        </div>
        <button @click="reset" class="btn warning" v-if="isActive">очистить</button>
    </div>
</template>

<script>
import { ref, watch, computed } from 'vue'


export default {
    emits: ['update:modelValue'],
    props: ['modelValue'],

    setup(_, { emit }) {
        const name = ref()
        const status = ref()

        // при изменении моделей 'name' или 'status' эмитим событие update с новыми значениями модели
        // при этом, приписка 'update:' позволяет сразу обновить модель filter в родительском компоненте
        // модель filter является пропсом в данном компоненте, т.е. filter это modelValue здесь
        watch([name, status], values => {
            emit('update:modelValue', {
                name: values[0],
                status: values[1]
            })
        })

        // флаг - имеет truthy когда в инпуты фильтров что-то вводилось
        const isActive = computed(() => name.value || status.value)

        return {
            name,
            status,
            isActive,
            // сбрасывает значения фильтров
            reset: () => {
                name.value = undefined,
                    status.value = undefined
            },
        }
    }

}

</script>

<style scoped lang='scss'>

</style> 