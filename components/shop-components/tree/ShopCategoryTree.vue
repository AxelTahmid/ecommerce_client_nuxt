<template>
  <div id="accordion" class="panel-group category-products">
    <div
      v-for="item in this.categoriesTree"
      :key="'shop-category-' + item.id"
      class="panel panel-default"
    >
      <div class="panel-heading">
        <h4 class="panel-title">
          <a
            v-if="item.children.length === 0"
            href="#"
            class="leaf-node"
            @click.prevent="searchByCategory(item.id)"
            >{{ item.title }}</a
          >

          <a
            v-if="item.children.length > 0"
            data-toggle="collapse"
            :href="'#category-' + item.id"
          >
            <span class="badge pull-right"><i class="fa fa-plus"></i></span>
            {{ item.title }}
          </a>
        </h4>
      </div>

      <div
        v-if="item.children.length > 0"
        :id="'category-' + item.id"
        class="panel-collapse collapse"
      >
        <div class="panel-body">
          <ShopCategoryTreeNested
            :categories-tree="item.children"
            :parent-id="item.id"
            :collapse-first-level="true"
            @clickCategory="searchByCategory"
          ></ShopCategoryTreeNested>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-undef */
import ShopCategoryTreeNested from './ShopCategoryTreeNested'

export default {
  name: 'ShopCategoryTree',
  components: { ShopCategoryTreeNested },
  props: ['categoriesTree'],
  mounted() {
    setTimeout(() => {
      if ($('#accordion').length) {
        $('#accordion').collapse()
      }
    }, 200)
  },
  methods: {
    searchByCategory(categoryId) {
      this.$store.commit('general/setCategoryId', categoryId)
      this.$store.commit('general/setPage', 1)
      this.$store.commit('general/setBrand', '')
      this.$store.commit('general/setFromPrice', '')
      this.$store.commit('general/setToPrice', '')
      this.$store.commit('general/setKeyword', '')

      // load brands by this category
      this.$store.dispatch('general/fetchBrandsByCategory', categoryId)

      this.$router.push({ path: 'shop', query: { category_id: categoryId } })

      this.$store.dispatch('general/fetchShopProducts')
    },
  },
}
</script>

<style scoped>
.leaf-node {
  font-weight: bold;
  font-size: 11px;
}
</style>
