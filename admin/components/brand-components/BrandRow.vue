<template>
  <tr>
    <td>{{ this.brand.id }}</td>
    <td>{{ this.brand.title }}</td>
    <td>
      <a
        href="#"
        class="btn btn-info btn-sm"
        @click.prevent="editBrand(brand.id)"
        ><i class="fa fa-edit"></i
      ></a>
      <a
        href="#"
        class="btn btn-danger btn-sm"
        @click.prevent="removeBrand(brand.id)"
        ><i class="fa fa-remove"></i
      ></a>
    </td>
  </tr>
</template>

<script>
export default {
  name: 'BrandRow',
  props: ['brand'],
  methods: {
    editBrand(id) {
      this.$emit('editBrand', id)
    },
    removeBrand(id) {
      this.$emit('removeBrand', id)
    },
  },
}
</script>

<style scoped></style>
