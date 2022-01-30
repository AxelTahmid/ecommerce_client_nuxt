<template>
  <!-- eslint-disable vue/no-v-html  -->
  <tr>
    <td>{{ this.product.id }}</td>
    <td>{{ this.product.title }}</td>
    <td><div class="row" v-html="displayImages(this.product)"></div></td>
    <td>
      <span class="badge badge-info">{{ this.product.price }} $</span>
    </td>
    <td>
      <strong class="inventory">{{ this.product.amount }}</strong>
    </td>
    <td>
      <nuxt-link :to="'/category/' + this.product.category_id">{{
        this.product.category.title
      }}</nuxt-link>
    </td>
    <td>{{ this.product.user ? this.product.user.name : '' }}</td>
    <td>
      <ul class="nav nav-tabs options-dropdown">
        <li class="nav-item dropdown">
          <a
            class="nav-link"
            data-toggle="dropdown"
            href="#"
            role="button"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <svg
              width="1em"
              height="1em"
              viewBox="0 0 16 16"
              class="bi bi-three-dots-vertical"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"
              />
            </svg>
          </a>
          <div class="dropdown-menu">
            <nuxt-link
              :to="'/product/' + this.product.id"
              class="dropdown-item btn btn-info btn-sm"
              ><i class="fa fa-edit"></i> Edit</nuxt-link
            >
            <a
              href="#"
              class="dropdown-item btn btn-danger btn-sm"
              @click.prevent="removeProduct(product.id)"
              ><i class="fa fa-remove"></i> Remove</a
            >
          </div>
        </li>
      </ul>
    </td>
  </tr>
</template>

<script>
export default {
  name: 'ProductRow',
  props: ['product'],
  methods: {
    removeProduct(productId) {
      this.$emit('removeProduct', productId)
    },
    displayImages(product) {
      let images = ''

      for (let i = 0; i < product.gallery.length; i++) {
        images += `<div class="col-md-8" style="margin: 5px"><img src="${product.gallery[i].image_url.small}" /></div>`
      }

      return images
    },
  },
}
</script>

<style scoped>
.inventory {
  color: red;
}

.options-dropdown {
  font-size: 29px;
}

.options-dropdown svg {
  color: #000;
}
</style>
