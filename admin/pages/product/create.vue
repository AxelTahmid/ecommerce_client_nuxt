<template>
  <div class="main-content">
    <div class="section__content section__content--p30">
      <div class="container-fluid">
        <loader></loader>
        <status-messages></status-messages>
        <form
          method="post"
          action="#"
          enctype="multipart/form-data"
          @submit.prevent="save()"
        >
          <ProductForm></ProductForm>

          <div class="row">
            <button type="submit" class="btn btn-lg btn-info btn-block">
              <i class="fa fa-save fa-lg"></i> Save
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Loader from '../../components/helpers/loader'
import statusMessages from '../../components/helpers/statusMessages'
import ProductForm from '../../components/product-components/Form'

export default {
  name: 'Create',
  components: {
    ProductForm,
    Loader,
    statusMessages,
  },
  fetch() {
    this.$store.dispatch('category/getCategoryHtmlTree')
    this.$store.dispatch('brand/getAllBrands')
  },
  mounted() {
    this.$store.commit('product/resetProduct')
  },
  methods: {
    save() {
      this.$store.dispatch('product/create', { router: this.$router })
    },
  },
}
</script>

<style scoped></style>
