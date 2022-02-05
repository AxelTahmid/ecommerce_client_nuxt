<template>
  <div class="product-image-wrapper">
    <div class="single-products">
      <div class="productinfo text-center">
        <img
          :src="item.gallery[0].image_url.medium"
          :alt="item.title"
          style="width: auto !important"
        />
        <h2>${{ item.price_after_discount }}</h2>
        <del v-if="item.is_discount_active">${{ item.price }}</del>
        <p>{{ item.title_short }}</p>
        <a
          href="javascript:void(0);"
          class="btn btn-default add-to-cart"
          @click.prevent="addToCart(item.id)"
          ><i class="fa fa-shopping-cart"></i>Add to cart</a
        >
      </div>
      <div class="product-overlay">
        <div class="overlay-content">
          <h2>${{ item.price_after_discount }}</h2>
          <del v-if="item.is_discount_active">${{ item.price }}</del>
          <p>{{ item.title_short }}</p>
          <a
            href="javascript:void(0);"
            class="btn btn-default add-to-cart"
            @click.prevent="addToCart(item.id)"
            ><i class="fa fa-shopping-cart"></i>Add to cart</a
          >
        </div>
      </div>
      <div v-if="item.is_discount_active" class="discount-ribbon">
        <span>{{ item.discount }}%</span>
      </div>
    </div>
    <div class="choose">
      <ul class="nav nav-pills nav-justified">
        <li>
          <a href="javascript:void(0);" @click.prevent="addToWishList(item.id)"
            ><i class="fa fa-plus-square"></i>Add to wishlist</a
          >
        </li>
        <li>
          <nuxt-link :to="'/p/' + item.id + '/' + item.slug"
            ><i class="fa fa-eye"></i>view item</nuxt-link
          >
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductTemplateNormal',
  props: ['item'],
  methods: {
    methods: {
      addToCart(productId) {},
      addToWishList(productId) {},
    },
  },
}
</script>

<style scoped></style>
