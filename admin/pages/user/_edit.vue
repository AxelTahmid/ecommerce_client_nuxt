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
  name: 'EditUser',
  components: {
    Loader,
    statusMessages,
    UserForm,
  },
  middleware: 'auth',
  fetch() {
    if (this.$route.params.edit) {
      this.$store.dispatch('user/show', this.$route.params.edit)
    }
  },
  methods: {
    save() {
      this.$store.dispatch('user/update', {
        router: this.$router,
        id: this.$route.params.edit,
      })
    },
  },
}
</script>

<style scoped></style>
