<template>
  <div class="left-sidebar">
    <h2 v-if="pageType === 'shop'">Category</h2>
    <ShopCategoryTree
      v-if="pageType === 'shop'"
      :categories-tree="categoriesTree"
    ></ShopCategoryTree>

    <div
      v-if="brands.length && (pageType === 'shop' || pageType === 'category')"
      class="brands_products"
    >
      <!--brands_products-->
      <h2>Brands</h2>
      <div class="brands-name">
        <ul class="nav nav-pills nav-stacked">
          <li v-for="brand in this.brands" :key="brand.brand_id">
            <a href="#" @click.prevent="searchByBrand(brand.brand_id)">
              <span class="pull-right">({{ brand.count_products }})</span
              >{{ brand.title }}</a
            >
          </li>
        </ul>
      </div>
    </div>
    <!--/brands_products-->

    <div class="price-range">
      <!--price-range-->
      <h2>Price Range</h2>
      <div class="well">
        <input
          type="number"
          name="from_price"
          placeholder="From $"
          class="form-control"
          style="margin-bottom: 5px"
          :value="this.$store.state.general.shop_filter.from_price"
          @change="updateFromPrice"
        />
        <input
          type="number"
          name="to_price"
          placeholder="To $"
          class="form-control"
          :value="this.$store.state.general.shop_filter.to_price"
          @change="updateToPrice"
        />
      </div>
    </div>
    <!--/price-range-->
  </div>
</template>

<script>
import { updateRouteQueryString } from '../../helpers/functions'
import ShopCategoryTree from './tree/ShopCategoryTree'

export default {
  name: 'ShopSidebar',
  components: { ShopCategoryTree },
  props: ['categoriesTree', 'pageType'],
  computed: {
    brands() {
      return this.$store.state.general.shop.brandsByCategory
    },
  },
  methods: {
    searchByBrand(brandId) {
      this.$store.commit('general/setPage', 1)
      this.$store.commit('general/setBrand', brandId)
      this.$store.commit('general/setKeyword', '')
      this.$store.commit('general/setFromPrice', '')
      this.$store.commit('general/setToPrice', '')

      if (this.$route.path.includes('shop') !== -1) {
        this.$router.push({
          path: 'shop',
          query: { category_id: this.$route.query.category_id, brandId },
        })
      } else {
        this.$router.push({ path: this.$route.path, query: { brandId } })
      }

      this.$store.dispatch('general/fetchShopProducts')
    },
    updateFromPrice(event) {
      this.$store.commit('general/setFromPrice', event.target.value)

      // update url
      updateRouteQueryString(
        'from_price',
        event.target.value,
        this.$route,
        this.$router
      )

      // fetch
      this.$store.dispatch('general/fetchShopProducts')
    },
    updateToPrice(event) {
      this.$store.commit('general/setToPrice', event.target.value)

      // update url
      updateRouteQueryString(
        'to_price',
        event.target.value,
        this.$route,
        this.$router
      )

      // fetch
      this.$store.dispatch('general/fetchShopProducts')
    },
  },
}
</script>

<style scoped>
.price-range .well {
  padding-top: 10px !important;
}
</style>
