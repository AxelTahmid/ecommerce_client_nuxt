<template>
  <tr>
    <td>{{ this.category.id }}</td>
    <td>{{ this.category.title }}</td>
    <td>{{ this.category.parent ? this.category.parent.title : 'none' }}</td>
    <td>{{ this.category.featured == 1 ? 'Yes' : 'No' }}</td>
    <td>
      <nuxt-link
        :to="'/category/' + this.category.id"
        class="btn btn-info btn-sm"
        ><i class="fa fa-edit"></i
      ></nuxt-link>
      <a
        href="#"
        class="btn btn-danger btn-sm"
        @click.prevent="removeCategory(category.id)"
        ><i class="fa fa-remove"></i
      ></a>
    </td>
  </tr>
</template>

<script>
export default {
  name: 'CategoryRow',
  props: ['category'],
  methods: {
    removeCategory(categoryId) {
      this.$emit('removeCategory', categoryId)
    },
  },
}
</script>

<style scoped></style>
