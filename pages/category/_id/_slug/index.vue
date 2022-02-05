<template>
  <section>
    <div class="container">
      <h2 class="title text-left">
        Latest Items In {{ this.category ? this.category.title : '' }}
      </h2>
      <div class="row">
        <div class="col-sm-3">
          <ShopSidebar page-type="category"></ShopSidebar>
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
            <i class="fa fa-exclamation-triangle"></i> No products available in
            this category! Check back later
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import ShopSidebar from '../../../../components/shop-components/ShopSidebar'
import ProductTemplateNormal from '../../../../components/product-templates/ProductTemplateNormal'
import FrontPagination from '../../../../components/helpers/FrontPagination'
import { paginate } from '../../../../helpers/functions'

export default {
  name: 'Category',
  components: {
    FrontPagination,
    ProductTemplateNormal,
    ShopSidebar,
  },
  validate({ params }) {
    return /^\d+$/.test(params.id)
  },
  asyncData(context) {
    context.store.dispatch('general/resetShopFilter')
    context.store.commit('general/setCategoryId', context.params.id)
    return context.store
      .dispatch('general/fetchCategory', context.params.id)
      .then((category) => {
        return {
          categoryDetails: category,
        }
      })
  },
  head() {
    return {
      title:
        'Online Shop | ' +
        (this.categoryDetails ? this.categoryDetails.title : ''),
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.categoryDetails
            ? this.categoryDetails.description
              ? this.categoryDetails.description
              : this.categoryDetails.title
            : '',
        },
      ],
    }
  },

  computed: {
    category() {
      return this.$store.state.general.category
    },
    products() {
      return this.$store.state.general.shop.products
    },
    page() {
      return this.$store.state.general.shop.page
    },
  },

  mounted() {
    // load brands by this category
    this.$store.dispatch('general/fetchBrandsByCategory', this.$route.params.id)

    if (this.$route.query.page) {
      this.$store.commit('general/setPage', this.$route.query.page)
    }

    if (this.$route.query.brand_id) {
      this.$store.commit('general/setBrand', this.$route.query.brand_id)
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
      paginate(pageNumber)
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
