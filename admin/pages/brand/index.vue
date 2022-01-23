<template>
  <!-- eslint-disable vue/no-use-v-if-with-v-for  -->
  <div class="main-content">
    <div class="section__content section__content--p30">
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-12">
            <loader></loader>
            <status-messages></status-messages>

            <BrandFilter
              @Filtering="handleFiltering"
              @createBrand="createBrand"
            ></BrandFilter>
          </div>
          <div class="col-md-12">
            <!-- DATA TABLE-->
            <div class="table-responsive m-b-40">
              <table class="table table-borderless table-data3">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Title</th>
                    <th>Options</th>
                  </tr>
                </thead>
                <tbody>
                  <BrandRow
                    v-for="brand of brandList.data"
                    v-if="brandList.data"
                    :key="brand.id"
                    :brand="brand"
                    @removeBrand="removeBrand"
                    @editBrand="editBrand"
                  ></BrandRow>
                </tbody>
              </table>
            </div>
            <Pagination
              v-if="brandList.data"
              :data="brandList"
              @handlePagination="handlePagination"
            ></Pagination>
          </div>
        </div>
      </div>
    </div>
    <FormModal></FormModal>
  </div>
</template>

<script>
import Loader from '../../components/helpers/loader'
import statusMessages from '../../components/helpers/statusMessages'
import BrandRow from '../../components/brand-components/BrandRow'
import Pagination from '../../components/helpers/Pagination'
import BrandFilter from '../../components/brand-components/BrandFilter'
import FormModal from '../../components/brand-components/FormModal'

export default {
  name: 'Index',
  components: {
    FormModal,
    BrandFilter,
    Pagination,
    BrandRow,
    Loader,
    statusMessages,
  },
  middleware: 'auth',
  fetch() {
    this.$store.dispatch('brand/listBrands')
  },
  computed: {
    brandList() {
      return this.$store.state.brand.brandList
    },
  },
  methods: {
    handlePagination(pageNumber) {
      this.$store.commit('brand/setPage', pageNumber)

      this.$store.dispatch('brand/listBrands', this.getPayload())
    },
    handleFiltering(field, value) {
      this.$store.commit('brand/setFilterData', { key: field, val: value })
      this.$store.commit('brand/setPage', 1)

      this.$store.dispatch('brand/listBrands', this.getPayload())
    },
    getPayload() {
      const payload = {}
      for (const field in this.$store.state.brand.filterData) {
        if (
          // eslint-disable-next-line no-prototype-builtins
          this.$store.state.brand.filterData.hasOwnProperty(field) &&
          this.$store.state.brand.filterData[field] !== ''
        )
          payload[field] = this.$store.state.brand.filterData[field]
      }
      payload.page = this.$store.state.brand.page

      return payload
    },
    removeBrand(id) {
      if (confirm('Are you sure?')) {
        this.$store.dispatch('brand/deleteBrand', id)
      }
    },
    createBrand() {
      this.$store.commit('brand/resetBrand')
      // some jquery code
      // eslint-disable-next-line no-undef
      $('.brand-form-modal').modal('show')
    },
    editBrand(id) {
      this.$store.dispatch('brand/showBrand', {
        id,
        // eslint-disable-next-line no-undef
        onSuccess: () => $('.brand-form-modal').modal('show'),
      })
    },
  },
}
</script>

<style scoped></style>
