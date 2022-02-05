<template>
  <section>
    <div class="container">
      <h2 class="title text-left">Search results for "{{ this.keyword }}"</h2>
      <div class="row">
        <div class="col-sm-3">
          <ShopSidebar page-type="search"></ShopSidebar>
        </div>

        <div
          v-if="this.products.data && this.products.data.length"
          class="col-sm-9 padding-right"
        >
          <div class="features_items">
            <div
              v-for="(item, index) in this.products.data"
              :key="index"
              class="col-sm-4"
            >
              <ProductTemplateNormal :item="item"></ProductTemplateNormal>
            </div>

            <FrontPagination
              :data="this.products"
              @handlePagination="paginate"
            ></FrontPagination>
          </div>
        </div>
        <div v-else class="col-sm-9 padding-right">
          <p class="text-center no-products">
            <i class="fa fa-exclamation-triangle"></i> No products available
            found that match your search criteria!
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import ShopSidebar from '../components/shop-components/ShopSidebar'
import ProductTemplateNormal from '../components/product-templates/ProductTemplateNormal'
import FrontPagination from '../components/helpers/FrontPagination'
import { paginate } from '../helpers/functions'

export default {
  name: 'Search',
  components: {
    FrontPagination,
    ProductTemplateNormal,
    ShopSidebar,
  },
  data() {
    return {
      keyword: '',
    }
  },
  head() {
    return {
      title: 'Online Shop | Search',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Search Page',
        },
      ],
    }
  },
  computed: {
    products() {
      return this.$store.state.general.shop.products
    },
    page() {
      return this.$store.state.general.shop.page
    },
  },
  mounted() {
    // reset shop filter
    this.$store.dispatch('general/resetShopFilter')

    if (this.$route.query.keyword) {
      this.keyword = this.$route.query.keyword

      this.$store.commit('general/setKeyword', this.$route.query.keyword)
    }

    if (this.$route.query.page) {
      this.$store.commit('general/setPage', this.$route.query.page)
    }

    if (this.$route.query.from_price) {
      this.$store.commit('general/setFromPrice', this.$route.query.from_price)
    }

    if (this.$route.query.to_price) {
      this.$store.commit('general/setToPrice', this.$route.query.to_price)
    }

    this.$nextTick(() => {
      this.$nuxt.$loading.start()

      this.$store.dispatch('general/fetchShopProducts').then(() => {
        this.$nuxt.$loading.finish()
      })
    })
  },
  methods: {
    paginate(pageNumber) {
      paginate(this, pageNumber)
    },
  },
}
</script>

<style scoped>
.col-sm-4 {
  height: 437px !important;
  margin-bottom: 30px !important;
}
.no-products {
  color: #696763;
  font-size: 15px;
  font-family: 'Roboto', sans-serif;
}
</style>
