<template>
  <header id="header">
    <!--header-->

    <div class="header-middle">
      <!--header-middle-->
      <div class="container">
        <div class="row">
          <div class="col-sm-4">
            <div class="logo pull-left">
              <nuxt-link to="/"
                ><img src="/images/home/logo.png?f3345d&f3345d" alt=""
              /></nuxt-link>
            </div>
          </div>
          <div class="col-sm-8">
            <div class="shop-menu pull-right">
              <ul class="nav navbar-nav">
                <li>
                  <nuxt-link to="/account"
                    ><i class="fa fa-user"></i> Account</nuxt-link
                  >
                </li>
                <li>
                  <a href="#"><i class="fa fa-star"></i> Wishlist</a>
                </li>
                <li>
                  <nuxt-link to="/orders"
                    ><i class="fa fa-list"></i> My Orders</nuxt-link
                  >
                </li>
                <li>
                  <nuxt-link to="/cart"
                    ><i class="fa fa-shopping-cart"></i> Cart
                    <span
                      v-if="this.cart.length > 0"
                      class="badge badge-danger"
                      >{{ this.cart.length }}</span
                    ></nuxt-link
                  >
                </li>
                <li v-if="!this.isLogged">
                  <nuxt-link to="/login"
                    ><i class="fa fa-sign-in"></i> Login</nuxt-link
                  >
                </li>
                <li v-if="this.isLogged">
                  <a href="#" @click.prevent="signout()"
                    ><i class="fa fa-sign-out"></i> Sign out</a
                  >
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--/header-middle-->

    <div class="header-bottom">
      <!--header-bottom-->
      <div class="container">
        <div class="row">
          <div class="col-sm-9">
            <div class="navbar-header">
              <button
                type="button"
                class="navbar-toggle"
                data-toggle="collapse"
                data-target=".navbar-collapse"
              >
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
              </button>
            </div>
            <div class="mainmenu pull-left">
              <ul class="nav navbar-nav collapse navbar-collapse">
                <li>
                  <nuxt-link
                    to="/"
                    :class="{ active: this.$route.path === '/' }"
                    >Home</nuxt-link
                  >
                </li>
                <li>
                  <nuxt-link
                    to="/shop"
                    :class="{ active: this.$route.path.indexOf('shop') !== -1 }"
                    >Shop</nuxt-link
                  >
                </li>
                <li class="dropdown">
                  <a href="#">Categories<i class="fa fa-angle-down"></i></a>
                  <CategoryTree
                    v-if="this.categoriesTree.length"
                    :data-tree="categoriesTree"
                  ></CategoryTree>
                </li>
                <li>
                  <nuxt-link
                    to="/contactus"
                    :class="{
                      active: this.$route.path.indexOf('contactus') !== -1,
                    }"
                    >Contact</nuxt-link
                  >
                </li>
              </ul>
            </div>
          </div>
          <div class="col-sm-3">
            <form method="get" @submit.prevent="search()">
              <div class="search_box pull-right">
                <input
                  v-model="keyword"
                  type="text"
                  name="keyword"
                  placeholder="Search"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <!--/header-bottom-->
  </header>
</template>

<script>
import CategoryTree from '../../components/partials/CategoryTree'
export default {
  name: 'FrontHeader',
  components: { CategoryTree },
  data() {
    return {
      keyword: '',
    }
  },
  computed: {
    categoriesTree() {
      return this.$store.state.general.categoriesTree
    },
    isLogged() {
      return this.$store.state.general.auth.is_logged
    },
    cart() {
      return this.$store.state.cart.cart
    },
  },
  mounted() {
    this.$store.dispatch('general/fetchCategoryTree')
  },
  methods: {
    search() {
      // reset shop filter
      this.$store.dispatch('general/resetShopFilter')

      this.$store.commit('general/setKeyword', this.keyword)

      this.$router.push({ path: '/search', query: { keyword: this.keyword } })

      this.$store.dispatch('general/fetchShopProducts')
    },
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

            this.onAfterSignout()

            this.$router.push('/')
          }
        })
        .catch((err) => {
          console.log(err.response)
          this.onAfterSignout()
        })
    },
    onAfterSignout() {
      this.$store.commit('cart/clear')
    },
  },
}
</script>

<style scoped>
.search_box input {
  font-size: 18px;
  color: #424040;
}

.badge-danger {
  color: #fff;
  background-color: #dc3545;
}
</style>
