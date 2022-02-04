<template>
  <tr>
    <td>{{ this.user.id }}</td>
    <td>{{ this.user.name }}</td>
    <td>{{ this.user.email }}</td>
    <td>
      <span v-if="this.user.is_super_admin == 1" class="badge badge-info"
        >Yes</span
      >
      <span v-if="this.user.is_super_admin == 0" class="badge badge-warning"
        >No</span
      >
    </td>
    <td>{{ this.user.create_date }}</td>
    <td>
      {{ this.user.products.length > 0 ? this.user.products.length : 'none' }}
    </td>
    <td>
      {{ this.user.orders.length > 0 ? this.user.orders.length : 'none' }}
    </td>
    <td>
      <nuxt-link :to="'/user/' + this.user.id" class="btn btn-info btn-sm"
        ><i class="fa fa-edit"></i
      ></nuxt-link>
      <a
        href="#"
        class="btn btn-danger btn-sm"
        @click.prevent="removeUser(user.id)"
        ><i class="fa fa-remove"></i
      ></a>
    </td>
  </tr>
</template>

<script>
export default {
  name: 'UserRow',
  // eslint-disable-next-line vue/require-prop-types
  props: ['user'],
  methods: {
    removeUser(userId) {
      this.$emit('removeUser', userId)
    },
  },
}
</script>

<style scoped></style>
