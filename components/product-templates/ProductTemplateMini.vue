<template>
  <div class="product-image-wrapper">
    <div class="single-products">
      <div class="productinfo text-center">
        <img
          :src="item.gallery[0].image_url.small"
          :alt="item.title"
          style="width: auto !important"
        />
        <h2>${{ item.price_after_discount }}</h2>
        <del v-if="item.is_discount_active">${{ item.price }}</del>
        <p>
          <nuxt-link
            class="item-title"
            :to="'/p/' + item.id + '/' + item.slug"
            >{{ item.title_short }}</nuxt-link
          >
        </p>
        <a
          v-if="!this.isProductAddedToCart(item.id)"
          href="javascript:void(0);"
          class="btn btn-default add-to-cart"
          @click.prevent="addToCart(item.id)"
          ><i class="fa fa-shopping-cart"></i>Add to cart</a
        >
        <a
          v-if="this.isProductAddedToCart(item.id)"
          href="javascript:void(0);"
          class="btn btn-default add-to-cart"
          @click.prevent="removeFromCart(item.id)"
          ><i class="fa fa-shopping-cart"></i>Remove from cart</a
        >
      </div>
      <div v-if="item.is_discount_active" class="discount-ribbon">
        <span>{{ item.discount }}%</span>
      </div>
    </div>
  </div>
</template>

<script>
import {
  addToCart,
  removeFromCartByProductId,
  isProductInCart,
} from '../../helpers/cart'

export default {
  name: 'ProductTemplateMini',
  props: ['item'],
  methods: {
    addToCart(productId) {
      addToCart(productId, 1, this.$store, this.$router)
    },
    isProductAddedToCart(productId) {
      return isProductInCart(productId, this.$store)
    },
    removeFromCart(productId) {
      removeFromCartByProductId(productId, this.$store, this.$router)
    },
  },
}
</script>

<style scoped>
.item-title {
  color: #696763;
}
</style>
