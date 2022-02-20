<template>
  <section id="form" style="margin-top: 60px !important">
    <!--form-->
    <div class="container">
      <div class="row">
        <div class="col-md-3">
          <account-sidebar></account-sidebar>
        </div>

        <div class="col-sm-9 col-md-9">
          <div class="signup-form" style="margin-top: 0 !important">
            <h2>Edit Profile</h2>
            <div v-if="this.success_message" class="alert alert-success">
              {{ this.success_message }}
            </div>
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
            <form action="#" method="post" @submit.prevent="updateProfile()">
              <input
                v-model="user_data.name"
                type="text"
                placeholder="Name"
                name="name"
              />
              <input
                v-model="user_data.email"
                type="email"
                placeholder="Email Address"
                name="email"
              />

              <a
                href="#"
                class="btn btn-info pull-right"
                @click.prevent="togglePasswordUpdate()"
              >
                Change Password
              </a>

              <div v-if="this.changePassword" style="margin-top: 7px">
                <input
                  v-model="user_data.password"
                  type="password"
                  placeholder="Password"
                  name="password"
                />
                <input
                  v-model="user_data.password_confirmation"
                  type="password"
                  placeholder="Password Confirmation"
                  name="password_confirmation"
                />
              </div>

              <button
                type="submit"
                class="btn btn-primary"
                style="margin-top: 20px"
              >
                <i class="fa fa-save"></i> Save
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import AccountSidebar from '../components/account-components/AccountSidebar'
export default {
  name: 'EditAccountPage',
  components: {
    AccountSidebar,
  },
  middleware: 'auth',
  data() {
    return {
      user_data: {
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
      },
      error_message: '',
      success_message: '',
      validation_errors: [],
      changePassword: false,
    }
  },
  head() {
    return {
      title: 'Edit My Profile',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Edit My Profile',
        },
      ],
    }
  },
  mounted() {
    setTimeout(() => {
      this.user_data.name = this.$store.state.general.auth.user_data.name
      this.user_data.email = this.$store.state.general.auth.user_data.email
    }, 300)
  },
  methods: {
    updateProfile() {
      this.error_message = ''
      this.success_message = ''
      this.validation_errors = []

      this.$axios.setHeader(
        'Authorization',
        'Bearer ' + localStorage.getItem('auth_token')
      )
      this.$axios
        .$post('/api/update-profile', this.user_data)
        .then((response) => {
          this.success_message = response.message

          localStorage.setItem('is_authenticated', 1)
          localStorage.setItem('auth_token', response.access_token)
          localStorage.setItem('user_data', JSON.stringify(response.user))

          this.$store.dispatch('general/storeAuthData', {
            auth_token: response.access_token,
            user_data: response.user,
          })
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
    togglePasswordUpdate() {
      this.changePassword = !this.changePassword
    },
  },
}
</script>

<style scoped></style>
