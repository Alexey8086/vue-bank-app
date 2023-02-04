import axios from "@/axios/request"
import store from '@/store/index'

export default {
    namespaced: true,
    state() {
        return {
            requests: []
        }
    },
    mutations: {
        setRequests(state, requests) {
            state.requests = requests
        },
        setOneRequest(state, request) {
            state.requests.push(request)
        },
        // удаляет из массива заявок одну заявку по её id
        setUpdatedRequests(state, id) {
            const updatedArray = state.requests.filter((item) => item.id !== id)
            // перезаписываем state (массив) с заявками
            state.requests = updatedArray
        },
        // изменяет статус заявки и перезаписывает state с заявками
        setOneUpdatedRequest(state, request) {
            const updatedArray = state.requests.map((item) => {
                if (item.id === request.id) {
                    // item.status = request.status
                    // console.log(item)
                    // console.log('---------------------');
                    // console.log({...item, status: request.status})
                    return { ...item, status: request.status }
                    // return item
                }
                return item
            })
            state.requests = updatedArray
        }
    },
    actions: {
        // Создаёт новую заявку, сохраняет её в БД и добавляет её в store
        async create({ commit, dispatch }, payload) {
            try {
                const token = store.getters['auth/token']
                const { data } = await axios.post(`/requests.json?auth=${token}`, payload)
                commit('setOneRequest', {...payload, id: data.name})
                dispatch('addMessage', {
                    value: 'Заявка успешно создана',
                    type: 'primary'
                }, {root: true})
            } catch (e) {
                dispatch('addMessage', {
                    value: e.message,
                    type: 'danger'
                }, {root: true})
            }
        },
        // Загружаёт все заявки из БД и сохраняет их в state
        async load({ commit, dispatch }) {
            try {
                const token = store.getters['auth/token']
                const { data } = await axios.get(`/requests.json?auth=${token}`)
                const requests = Object.keys(data).map(id => ({ ...data[id], id }))
                commit('setRequests', requests)
            } catch (e) {
                dispatch('addMessage', {
                    value: e.message,
                    type: 'danger'
                }, {root: true})
            }
        },
        // Загружает одну заявку из БД по её id и возвращаёт её
        async loadOne({ commit, dispatch }, id) {
            try {
                const token = store.getters['auth/token']
                // получение заявку из БД по её id
                const { data } = await axios.get(`/requests/${id}.json?auth=${token}`)
                // в итоге возвращаем объект заявки
                return data
            } catch (e) {
                dispatch('addMessage', {
                    value: e.message,
                    type: 'danger'
                }, {root: true})
            }
        },

        // Удаляем одну заявку из БД
        async removeOne({ commit, dispatch }, id) {
            try {
                const token = store.getters['auth/token']
                // удаляем заявку из БД по её id
                await axios.delete(`/requests/${id}.json?auth=${token}`)
                // обновляем state с заявками (удаляя из него одну заявку по её id)
                commit('setUpdatedRequests', id)
                // добавляем сообщение (показывая успешное завершение действия)
                dispatch('addMessage', {
                    value: 'Заявка удалена',
                    type: 'primary'
                }, {root: true})
            } catch (e) {
                dispatch('addMessage', {
                    value: e.message,
                    type: 'danger'
                }, {root: true})
            }
        },

        // Изменяем одну заявку из БД
        async updateOne({ commit, dispatch }, request) {
            try {
                const token = store.getters['auth/token']
                // обновляем данные заявки из БД по её id
                await axios.put(`/requests/${request.id}.json?auth=${token}`, request)
                // обновляем state с заявками (удаляя из него одну заявку по её id)
                commit('setOneUpdatedRequest', request)
                // добавляем сообщение (показывая успешное завершение действия)
                dispatch('addMessage', {
                    value: 'Заявка обновлена',
                    type: 'primary'
                }, {root: true})
            } catch (e) {
                dispatch('addMessage', {
                    value: e.message,
                    type: 'danger'
                }, {root: true})
            }
        }
    },
    getters: {
        requests(state) {
            return state.requests
        }
    }
}