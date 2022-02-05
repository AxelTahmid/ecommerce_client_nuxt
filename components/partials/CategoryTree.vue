<template>
  <ul
    role="menu"
    :class="{ 'sub-menu': !isNestedMenu, 'nested-menu': isNestedMenu === '1' }"
  >
    <li
      v-for="item in this.dataTree"
      :key="item.id"
      :class="{ 'has-nested-menu': item.children.length > 0 }"
    >
      <a v-if="item.children.length > 0" href="#">{{ item.title }}</a>
      <i v-if="item.children.length > 0" class="fa fa-angle-right"></i>
      <nuxt-link
        v-if="item.children.length === 0"
        :to="'/category' + item.path"
        >{{ item.title }}</nuxt-link
      >
      <CategoryTree
        v-if="item.children.length > 0"
        :data-tree="item.children"
        is-nested-menu="1"
      ></CategoryTree>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'CategoryTree',
  props: ['dataTree', 'isNestedMenu'],
}
</script>

<style scoped></style>
