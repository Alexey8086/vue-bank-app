<template>
  <app-page needBackLink title="Часто задаваемые вопросы">
    <question-item
      v-for="item in questions"
      :key="item.title"
      :question="item"
    ></question-item>
  </app-page>
</template>

<script>
  import AppPage from '@/components/ui/AppPage'
  import QuestionItem from '@/components/question/QuestionItem'

  export default {
    components: { AppPage, QuestionItem, },
    setup() {
      const questions = [
        {
          title: 'Что есть в данной системе?',
          text: 'Вам предоставляется возможность просмотра, создания и редактирования заявок, а также их поиск с сортировкой по статусу заявки.',
        },
        {
          title: 'Как работает авторизация?',
          text: 'С помощью возможностей авторизации предоставляемых firebase. А именно с помощью доступа по паролю и jwt токену. При входе в систему создаётся jwt токен, который используется для подтверждения действий пользователя. Т.е. пользователю достаточно один раз ввести свой пароль и работать в системе пока срок жизни токена не истечёт.',
        },
      ]

      return {
        questions,
      }
    },


  }
</script>