<template>
  <div class="signup-form">
    <!--sign up form-->
    <h2>New User Signup!</h2>
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
    <form action="#" method="post" @submit.prevent="register()">
      <input
        v-model="register_data.name"
        type="text"
        placeholder="Name"
        name="name"
      />
      <input
        v-model="register_data.email"
        type="email"
        placeholder="Email Address"
        name="email"
      />
      <input
        v-model="register_data.password"
        type="password"
        placeholder="Password"
        name="password"
      />
      <input
        v-model="register_data.password_confirmation"
        type="password"
        placeholder="Password Confirmation"
        name="password_confirmation"
      />
      <button type="submit" class="btn btn-default">Signup</button>
    </form>
  </div>
  <!--/sign up form-->
</template>

<script>
export default {
  name: 'FrontRegister',
  data() {
    return {
      register_data: {
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
      },
      error_message: '',
      validation_errors: [],
    }
  },
  methods: {
    register() {
      this.validation_errors = []
      this.error_message = ''

      this.clearStorage()

      this.$axios
        .$post('api/register', this.register_data)
        .then((response) => {
          this.saveIntoStorage(response)

          this.$store.dispatch('general/storeAuthData', {
            auth_token: response.access_token,
            user_data: response.user,
          })

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
  },
}
</script>
