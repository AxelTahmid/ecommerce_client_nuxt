<template>
  <div class="recommended_items">
    <!--recommended_items-->
    <h2 class="title text-center">Featured items</h2>

    <div
      id="recommended-item-carousel"
      class="carousel slide"
      data-ride="carousel"
    >
      <div class="carousel-inner">
        <div
          v-for="(item, index) in this.featuredItems"
          :key="item.id"
          :class="'item ' + (index == 0 ? 'active' : '')"
        >
          <div
            v-for="product in item.products"
            :key="product.id"
            class="col-sm-4"
          >
            <ProductTemplateMini :item="product"></ProductTemplateMini>
          </div>
        </div>
      </div>
      <a
        class="left recommended-item-control"
        href="#recommended-item-carousel"
        data-slide="prev"
      >
        <i class="fa fa-angle-left"></i>
      </a>
      <a
        class="right recommended-item-control"
        href="#recommended-item-carousel"
        data-slide="next"
      >
        <i class="fa fa-angle-right"></i>
      </a>
    </div>
  </div>
</template>

<script>
import ProductTemplateMini from '../product-templates/ProductTemplateMini'
export default {
  name: 'FeaturedProducts',
  components: { ProductTemplateMini },
  // eslint-disable-next-line vue/require-prop-types
  props: ['featuredItems'],
  mounted() {
    console.info(this.featuredItems)
    // re-initialize the boostrap carousal
    // eslint-disable-next-line no-undef
    $('#recommended-item-carousel').carousel()
  },
}
</script>

<style scoped></style>
