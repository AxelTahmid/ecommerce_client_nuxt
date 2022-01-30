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
          @submit.prevent="update()"
        >
          <ProductForm></ProductForm>

          <div class="row">
            <button type="submit" class="btn btn-lg btn-info btn-block">
              <i class="fa fa-save fa-lg"></i> Update
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Loader from '../../components/helpers/loader'
import StatusMessages from '../../components/helpers/statusMessages'
import ProductForm from '../../components/product-components/Form'
export default {
  name: 'EditProduct',
  components: {
    ProductForm,
    StatusMessages,
    Loader,
  },
  data() {
    return {
      id: '',
    }
  },
  fetch() {},
  mounted() {},
  methods: {
    update() {},
  },
}
</script>

<style scoped></style>
