<template>
  <ul class="nav nav-pills nav-stacked">
    <li
      role="presentation"
      :class="{ active: this.$route.path.indexOf('account') !== -1 }"
    >
      <n-link to="/account"><i class="fa fa-user"></i> Account</n-link>
    </li>
    <li
      role="presentation"
      :class="{ active: this.$route.path.indexOf('shipping-addresses') !== -1 }"
    >
      <n-link to="/shipping-addresses"
        ><i class="fa fa-map-marker"></i> Shipping Addresses</n-link
      >
    </li>
    <li
      role="presentation"
      :class="{ active: this.$route.path.indexOf('orders') !== -1 }"
    >
      <n-link to="/orders"><i class="fa fa-list"></i> My Orders</n-link>
    </li>
    <li
      role="presentation"
      :class="{ active: this.$route.path.indexOf('wishlist') !== -1 }"
    >
      <n-link to="/wishlist"><i class="fa fa-star"></i> My Wishlist</n-link>
    </li>
    <li role="presentation">
      <a href="#" @click.prevent="signout()"
        ><i class="fa fa-sign-out"></i> Sign out</a
      >
    </li>
  </ul>
</template>

<script>
export default {
  name: 'AccountSidebar',
  methods: {
    signout() {
      this.$axios.setHeader(
        'Authorization',
        'Bearer ' + localStorage.getItem('auth_token')
      )
      this.$axios
        .get('/api/logout')
        .then((response) => {
          if (response.data.success) {
            localStorage.removeItem('auth_token')
            localStorage.removeItem('is_authenticated')
            localStorage.removeItem('user_data')

            this.$store.dispatch('general/resetAuthData')

            this.$router.push('/')
          }
        })
        .catch((err) => {
          console.log(err.response)
        })
    },
  },
}
</script>

<style scoped>
a {
  color: #fe980f !important;
}
.nav-pills > li.active > a,
.nav-pills > li.active > a:hover,
.nav-pills > li.active > a:focus {
  background-color: #fe980f;
  color: #fff !important;
}
a:hover,
a:focus {
  color: #fff !important;
}
.nav > li > a:hover,
.nav > li > a:focus {
  background-color: #fe980f !important;
}
</style>
