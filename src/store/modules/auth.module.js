// кастомная обработка ошибок
import { error } from '@/utils/error'
import axios from 'axios'
const TOKEN_KEY = 'jwt-token'

export default {
    namespaced: true,
    state() {
        return {
            token: localStorage.getItem(TOKEN_KEY)
        }
    },
    mutations: {
        setToken(state, token) {
            state.token = token
            localStorage.setItem(TOKEN_KEY, token)
        },
        setlogout(state) {
            state.token = null
            localStorage.removeItem(TOKEN_KEY)
        }
    },
    actions: {
        async login({commit, dispatch}, payload) {
            try {
                const uri = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.VUE_APP_FB_KEY}`
                // стучимся в firebase по паролю и просим предоставить токен авторизации
                const {data} = await axios.post(uri, {...payload, returnSecureToken: true})
                // сохраняем в state токен авторизации, полученный от firebase (в случае успеха)
                commit('setToken', data.idToken)
                // при успешном логине очищаем сообщения
                commit('setClearMessage', null, {root: true})
            } catch (e) {
                // добавляем сообщение об ощибки в store с помощью экшена 'addMessage'
                dispatch('addMessage', {
                    value: error(e.response.data.error.message),
                    type: 'danger'
                }, {root: true})
                console.log(error(e.response.data.error.message))
                throw new Error()
            }
        }
    },
    getters: {
        token(state) {
            return state.token
        },
        // первый параметр 'state' не используется - вместо него _
        isAuthenticated(_, getters) {
            // если токен есть - true, если нет - false
            return !!getters.token
        }
    }
}