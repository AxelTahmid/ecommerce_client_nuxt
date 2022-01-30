<template>
  <!-- eslint-disable vue/no-v-html  -->
  <form method="get" action="#" style="margin-bottom: 10px">
    <h4>Filter</h4>
    <div class="row">
      <div class="col-1">
        <input
          type="text"
          class="form-control"
          placeholder="Id"
          name="id"
          :value="this.$store.state.product.filterData.id"
          @change="handleFiltering($event)"
        />
      </div>
      <div class="col-3">
        <input
          type="text"
          class="form-control"
          placeholder="Title"
          name="title"
          :value="this.$store.state.product.filterData.title"
          @change="handleFiltering($event)"
        />
      </div>
      <div class="col-3">
        <select
          class="form-control"
          name="category_id"
          :value="this.$store.state.product.filterData.category_id"
          @change="handleFiltering($event)"
          v-html="this.$store.state.category.categoryHtmlTree"
        >
          <option value="">select category</option>
        </select>
      </div>
      <div class="col-2">
        <input
          type="text"
          class="form-control"
          placeholder="From price"
          name="from_price"
          :value="this.$store.state.product.filterData.from_price"
          @change="handleFiltering($event)"
        />
      </div>
      <div class="col-2">
        <input
          type="text"
          class="form-control"
          placeholder="To price"
          name="to_price"
          :value="this.$store.state.product.filterData.to_price"
          @change="handleFiltering($event)"
        />
      </div>
      <div class="col-2">
        <input
          type="text"
          class="form-control"
          placeholder="Product code"
          name="product_code"
          :value="this.$store.state.product.filterData.product_code"
          @change="handleFiltering($event)"
        />
      </div>
      <div class="col-2">
        <input
          type="text"
          class="form-control"
          placeholder="Inventory"
          name="amount"
          :value="this.$store.state.product.filterData.amount"
          @change="handleFiltering($event)"
        />
      </div>
      <div class="col-3">
        <select
          id="brand_id"
          name="brand_id"
          class="form-control"
          :value="this.$store.state.product.filterData.brand_id"
          @change="handleFiltering($event)"
        >
          <option value="">Brand</option>
          <option
            v-for="brand in this.$store.state.brand.allBrands"
            :key="brand.id"
            :value="brand.id"
          >
            {{ brand.title }}
          </option>
        </select>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <nuxt-link to="/product/create" class="btn btn-success pull-right"
          ><i class="fa fa-plus-square"></i> Create</nuxt-link
        >
      </div>
    </div>
  </form>
</template>

<script>
/* eslint-disable vue/no-v-html */
export default {
  name: 'ProductFilter',
  methods: {
    handleFiltering(event) {
      this.$emit('Filtering', event.target.name, event.target.value)
    },
  },
}
</script>

<style scoped>
.col-3,
.col-2,
.col-1 {
  padding: 2px !important;
}
</style>
