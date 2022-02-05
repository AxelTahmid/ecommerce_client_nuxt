<template>
  <ul
    :id="'category-' + parentId"
    :class="collapseFirstLevel === true ? '' : 'collapse'"
  >
    <li v-for="item in this.categoriesTree" :key="'shop-category-' + item.id">
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
        <span class="badge"><i class="fa fa-plus"></i></span> {{ item.title }}
      </a>
      <ShopCategoryTreeNested
        v-if="item.children.length > 0"
        :categories-tree="item.children"
        :parent-id="item.id"
        @clickCategory="searchByCategory"
      ></ShopCategoryTreeNested>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'ShopCategoryTreeNested',
  props: ['categoriesTree', 'parentId', 'collapseFirstLevel'],
  data() {
    return {
      show_nested: false,
    }
  },
  methods: {
    searchByCategory(itemId) {
      this.$emit('clickCategory', itemId)
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
