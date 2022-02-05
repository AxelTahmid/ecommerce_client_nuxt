<template>
  <div class="category-tab">
    <div class="col-sm-12">
      <ul class="nav nav-tabs">
        <li
          v-for="(category, index) in this.featuredCategories"
          :key="index"
          :class="{ active: index == 0 }"
        >
          <a :href="'#' + category.id + '-' + category.id" data-toggle="tab">{{
            category.title
          }}</a>
        </li>
      </ul>
    </div>
    <div class="tab-content">
      <div
        v-for="(category, index) in this.featuredCategories"
        :id="category.id + '-' + category.id"
        :key="index"
        :class="'tab-pane fade ' + (index == 0 ? 'active in' : '')"
      >
        <template v-if="category.products.length">
          <div
            v-for="product in category.products"
            :key="product.id"
            class="col-sm-3"
          >
            <ProductTemplateSmall :item="product"></ProductTemplateSmall>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import ProductTemplateSmall from '../product-templates/ProductTemplateSmall'
export default {
  name: 'FeaturedCategories',
  components: { ProductTemplateSmall },
  // eslint-disable-next-line vue/require-prop-types
  props: ['featuredCategories'],
}
</script>
