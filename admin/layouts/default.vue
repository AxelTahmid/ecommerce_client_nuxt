<template>
  <div class="page-wrapper">
    <mobile-header></mobile-header>
    <admin-sidebar></admin-sidebar>
    <div class="page-container">
      <admin-header></admin-header>
      <Nuxt />
    </div>
  </div>
</template>
<script>
import MobileHeader from '../components/partials/MobileHeader'
import AdminSidebar from '../components/partials/AdminSidebar'
import AdminHeader from '../components/partials/AdminHeader'
export default {
  components: { AdminHeader, AdminSidebar, MobileHeader },
  mounted() {
    const script = document.createElement('script')
    script.src = '/js/main.js'
    script.type = 'text/javascript'
    document.head.appendChild(script)
  },
  methods: {
    checkUserLogin() {
      // send request to check if the user is logged otherwise redirect him to login screen
      if (
        localStorage.getItem('auth_token') !== null &&
        localStorage.getItem('auth_token') !== undefined
      ) {
        this.$axios.setHeader(
          'Authorization',
          'Bearer ' + localStorage.getItem('auth_token')
        )
        this.$axios
          .$get('api/check-login')
          .then((response) => {
            if (response.success !== 1) {
              localStorage.removeItem('auth_token')
              localStorage.removeItem('is_authenticated')
              localStorage.removeItem('user_data')
              this.$router.push('/login')
            }
          })
          .catch((err) => {
            localStorage.removeItem('auth_token')
            localStorage.removeItem('is_authenticated')
            localStorage.removeItem('user_data')
            this.$router.push('/login')
            console.log(err)
          })
      }
    },
  },
}
</script>
<style scoped></style>
