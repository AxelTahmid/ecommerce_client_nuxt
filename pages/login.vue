<template>
  <section id="form" style="margin-top: 60px !important">
    <!--form-->
    <div class="container">
      <div class="row">
        <div class="col-sm-4 col-sm-offset-1">
          <FrontLogin></FrontLogin>
        </div>
        <div class="col-sm-1">
          <h2 class="or">OR</h2>
        </div>
        <div class="col-sm-4">
          <FrontRegister></FrontRegister>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import FrontLogin from '../components/login-components/FrontLogin'
import FrontRegister from '../components/login-components/FrontRegister'

export default {
  name: 'LoginPage',
  components: {
    FrontRegister,
    FrontLogin,
  },
  head() {
    return {
      title: 'Online Shop | Login',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Login Page',
        },
      ],
    }
  },
  mounted() {
    if (this.$store.state.general.auth.is_logged) {
      this.$router.push('/')
    }
  },
}
</script>
