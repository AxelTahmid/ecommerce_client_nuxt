<template>
  <div class="login-form">
    <!--login form-->
    <h2>Login to your account</h2>
    <div v-if="this.error_message" class="alert alert-danger">
      {{ this.error_message }}
    </div>
    <div
      v-for="item in this.validation_errors"
      :key="item"
      class="alert alert-danger"
    >
      {{ item }}
    </div>
    <form action="#" method="post" @submit.prevent="login()">
      <input
        v-model="login_data.email"
        type="email"
        name="email"
        placeholder="Email Address"
      />
      <input
        v-model="login_data.password"
        type="password"
        name="password"
        placeholder="Password"
      />
      <button type="submit" class="btn btn-default">Login</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'FrontLogin',
  data() {
    return {
      login_data: {
        email: '',
        password: '',
      },
      error_message: '',
      validation_errors: [],
    }
  },
  methods: {
    login() {
      this.validation_errors = []
      this.error_message = ''

      this.clearStorage()

      this.$axios
        .$post('api/login', this.login_data)
        .then((response) => {
          this.saveIntoStorage(response)

          this.$store.dispatch('general/storeAuthData', {
            auth_token: response.access_token,
            user_data: response.user,
          })

          this.onAfterLogin(response)

          this.$router.push('/')
        })
        .catch((error) => {
          this.error_message = error.response.data.message

          if (error.response.data.errors) {
            for (const key in error.response.data.errors) {
              this.validation_errors.push(error.response.data.errors[key][0])
            }
          }
        })
    },
    clearStorage() {
      localStorage.removeItem('is_authenticated')
      localStorage.removeItem('auth_token')
      localStorage.removeItem('user_data')
    },
    saveIntoStorage(response) {
      localStorage.setItem('is_authenticated', 1)
      localStorage.setItem('auth_token', response.access_token)
      localStorage.setItem('user_data', JSON.stringify(response.user))
    },
    onAfterLogin(res) {
      // todo (we will use this when working with the shopping cart)
    },
  },
}
</script>
