<template>
  <div class="main-content">
    <div class="section__content section__content--p30">
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-12">
            <loader></loader>
            <status-messages></status-messages>

            <ProductFilter @Filtering="handleFiltering"></ProductFilter>
          </div>
          <div class="col-md-12">
            <div class="table-responsive m-b-40">
              <table class="table table-borderless table-data3">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Title</th>
                    <th>Images</th>
                    <th>Price</th>
                    <th>Inventory</th>
                    <th>Category</th>
                    <th>By</th>
                    <th>Options</th>
                  </tr>
                </thead>
                <tbody>
                  <template
                    v-if="productList.data && productList.data.length > 0"
                  >
                    <ProductRow
                      v-for="product of productList.data"
                      :key="product.id"
                      :product="product"
                      @removeProduct="removeProduct"
                    ></ProductRow
                  ></template>

                  <tr v-if="productList.data && productList.data.length === 0">
                    <td colspan="8" class="text-center">No results found</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <Pagination
              v-if="productList.data"
              :data="productList"
              @handlePagination="handlePagination"
            ></Pagination>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-undef */
import ProductFilter from '../../components/product-components/ProductFilter'
import Loader from '../../components/helpers/loader'
import StatusMessages from '../../components/helpers/statusMessages'
import ProductRow from '../../components/product-components/ProductRow'
import Pagination from '../../components/helpers/Pagination'
export default {
  name: 'Index',
  components: {
    Pagination,
    ProductRow,
    StatusMessages,
    Loader,
    ProductFilter,
  },
  fetch() {
    this.$store.dispatch('product/listProducts')
    this.$store.dispatch('category/getCategoryHtmlTree')
    this.$store.dispatch('brand/getAllBrands')
  },
  computed: {
    productList() {
      return this.$store.state.product.product_list
    },
  },

  mounted() {
    // re-initialize tabs
    setTimeout(() => {
      if ($('.options-dropdown').length) {
        $('.options-dropdown').tab()
      }
    }, 300)
  },
  methods: {
    handleFiltering(field, value) {
      this.$store.commit('product/setFilterData', { key: field, val: value })
      this.$store.commit('product/setPage', 1)

      this.$store.dispatch('product/listProducts', this.getPayload())
    },
    removeProduct(id) {
      if (confirm('Are you sure?')) {
        this.$store.dispatch('product/delete', id)
      }
    },
    handlePagination(pageNumber) {
      this.$store.commit('product/setPage', pageNumber)

      this.$store.dispatch('product/listProducts', this.getPayload())
    },
    getPayload() {
      const payload = { ...this.$store.state.product.filterData }

      Object.keys(payload).forEach(
        (key) => payload[key] === '' && delete payload[key]
      )

      payload.page = this.$store.state.product.page

      return payload
    },
  },
}
</script>

<style scoped></style>
