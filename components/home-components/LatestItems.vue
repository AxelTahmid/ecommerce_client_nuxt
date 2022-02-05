<template>
  <div class="features_items">
    <h2 class="title text-center">Latest Items</h2>

    <div
      v-for="(item, index) in this.latestProducts"
      :key="index"
      class="col-sm-3"
    >
      <ProductTemplateNormal :item="item"></ProductTemplateNormal>
    </div>
  </div>
</template>

<script>
import ProductTemplateNormal from '../product-templates/ProductTemplateNormal'
export default {
  name: 'LatestItems',
  components: { ProductTemplateNormal },
  // eslint-disable-next-line vue/require-prop-types
  props: ['latestProducts'],
}
</script>

<style scoped></style>
