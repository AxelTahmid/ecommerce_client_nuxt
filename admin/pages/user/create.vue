<template>
  <div class="main-content">
    <div class="section__content section__content--p30">
      <div class="container-fluid">
        <loader></loader>
        <status-messages></status-messages>
        <form method="post" action="#" @submit.prevent="save()">
          <UserForm></UserForm>

          <div class="row">
            <button type="submit" class="btn btn-lg btn-info btn-block">
              <i class="fa fa-save fa-lg"></i> Save
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Loader from '../../components/helpers/loader'
import statusMessages from '../../components/helpers/statusMessages'
import UserForm from '../../components/user-components/UserForm'

export default {
  name: 'CreateUser',
  components: {
    Loader,
    statusMessages,
    UserForm,
  },
  middleware: 'auth',
  mounted() {
    this.$store.commit('user/resetUser')
  },
  methods: {
    save() {
      this.$store.dispatch('user/create', { router: this.$router })
    },
  },
}
</script>

<style scoped></style>
