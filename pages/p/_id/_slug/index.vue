<template>
  <section>
    <div class="container">
      <div class="row">
        <div v-if="this.product" class="col-sm-12 padding-right">
          <div class="product-details">
            <!--product-details-->
            <div class="col-sm-5">
              <div
                v-if="this.product.gallery.length"
                id="similar-product"
                class="carousel slide"
                data-ride="carousel"
              >
                <div
                  v-if="this.$store.state.cart.success_message != ''"
                  class="alert alert-success"
                >
                  {{ this.$store.state.cart.success_message }}
                </div>
                <div
                  v-if="this.$store.state.cart.error_message != ''"
                  class="alert alert-danger"
                >
                  {{ this.$store.state.cart.error_message }}
                </div>

                <div
                  v-if="this.$store.state.cart.validation_errors.length"
                  class="sufee-alert alert with-close alert-danger alert-dismissible"
                >
                  <ul
                    v-for="(error, index) in this.$store.state.cart
                      .validation_errors"
                    :key="index"
                  >
                    <li>{{ error }}</li>
                  </ul>
                </div>

                <!-- Wrapper for slides -->
                <div class="carousel-inner">
                  <div
                    v-for="(imageItem, index) in this.product.gallery"
                    :key="imageItem"
                    :class="'item ' + (index == 0 ? 'active' : '')"
                  >
                    <a href=""
                      ><img
                        :src="imageItem.image_url.product_gallery_preview"
                        alt=""
                    /></a>
                  </div>
                </div>

                <!-- Controls -->
                <a
                  class="left item-control"
                  href="#similar-product"
                  data-slide="prev"
                >
                  <i class="fa fa-angle-left"></i>
                </a>
                <a
                  class="right item-control"
                  href="#similar-product"
                  data-slide="next"
                >
                  <i class="fa fa-angle-right"></i>
                </a>
              </div>
            </div>
            <div class="col-sm-7">
              <div class="product-information">
                <!--/product-information-->
                <div
                  v-if="this.product.is_discount_active"
                  class="discount-ribbon-details"
                >
                  <span>{{ this.product.discount }}%</span>
                </div>
                <h2>{{ this.product.title }}</h2>
                <p v-if="this.product.product_code">
                  Item Code: {{ this.product.product_code }}
                </p>
                <del
                  v-if="this.product.is_discount_active"
                  style="display: block"
                  >Price before: ${{ this.product.price }}</del
                >
                <span>
                  <span>${{ this.product.price_after_discount }}</span>
                  <span
                    v-if="
                      this.product.amount > 0 &&
                      !isProductAddedToCart(this.product.id)
                    "
                  >
                    <label>Quantity:</label>
                    <input v-model="cart_quantity" type="text" min="1" />
                    <button
                      type="button"
                      class="btn btn-fefault cart"
                      @click="addToCart(product.id)"
                    >
                      <i class="fa fa-shopping-cart"></i>
                      Add to cart
                    </button>
                  </span>
                  <button
                    v-if="isProductAddedToCart(product.id)"
                    type="button"
                    class="btn btn-fefault cart"
                    @click="removeFromCart(product.id)"
                  >
                    <i class="fa fa-trash-o"></i> Remove from cart
                  </button>
                </span>
                <p>
                  <b>Availability:</b>
                  {{
                    this.product.amount > 0
                      ? 'In Stock (' + this.product.amount + ' items available)'
                      : 'Not Available'
                  }}
                </p>
                <p v-if="this.product.brand">
                  <b>Brand:</b> {{ this.product.brand.title }}
                </p>
                <a href=""
                  ><img
                    src="/images/product-details/share.png?f3345d&f3345d"
                    class="share img-responsive"
                    alt=""
                /></a>
              </div>
              <!--/product-information-->
            </div>
          </div>
          <!--/product-details-->

          <div class="category-tab shop-details-tab">
            <!--category-tab-->
            <div class="col-sm-12">
              <ul class="nav nav-tabs">
                <li v-if="this.product.description" class="active">
                  <a href="#details" data-toggle="tab">Description</a>
                </li>
                <li
                  v-if="this.features.length"
                  :class="this.product.description ? '' : 'active'"
                >
                  <a href="#specifications" data-toggle="tab"
                    >product specifications</a
                  >
                </li>
              </ul>
            </div>
            <div class="tab-content">
              <div
                v-if="this.product.description"
                id="details"
                class="tab-pane fade active in"
              >
                <!-- eslint-disable-next-line vue/no-v-html -->
                <div class="tab-body" v-html="this.product.description"></div>
              </div>

              <div
                v-if="this.features.length"
                id="specifications"
                :class="
                  'tab-pane fade ' +
                  (this.product.description ? '' : 'active in')
                "
              >
                <div class="tab-body">
                  <ul class="specifications">
                    <li
                      v-for="feature in this.features"
                      :key="feature.id"
                      :title="feature.value"
                    >
                      <strong>{{ feature.title }}:</strong>
                      <span v-if="feature.type === 1">
                        {{ feature.value }}</span
                      >
                      <span
                        v-else
                        :style="'background-color: ' + feature.value"
                        class="color-box"
                      ></span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <!--/category-tab-->

          <div v-if="similarProducts.length" class="recommended_items">
            <h2 class="title text-center">similar items</h2>

            <div
              id="recommended-item-carousel"
              class="carousel slide"
              data-ride="carousel"
            >
              <div class="carousel-inner">
                <div
                  v-for="(item, index) in this.similarProducts"
                  :key="item.id"
                  :class="'item ' + (index == 0 ? 'active' : '')"
                >
                  <div
                    v-for="productarr in item.products"
                    :key="productarr.id"
                    class="col-sm-4"
                  >
                    <ProductTemplateMini
                      :item="productarr"
                    ></ProductTemplateMini>
                  </div>
                </div>
              </div>
              <a
                class="left recommended-item-control"
                href="#recommended-item-carousel"
                data-slide="prev"
              >
                <i class="fa fa-angle-left"></i>
              </a>
              <a
                class="right recommended-item-control"
                href="#recommended-item-carousel"
                data-slide="next"
              >
                <i class="fa fa-angle-right"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
/* eslint-disable no-undef */
import { ProductApi } from '../../../../api/product'
import { ShopApi } from '../../../../api/shop'
import ProductTemplateMini from '../../../../components/product-templates/ProductTemplateMini'
import {
  addToCart,
  removeFromCartByProductId,
  isProductInCart,
} from '../../../../helpers/cart'

export default {
  name: 'ProductDetails',
  components: { ProductTemplateMini },
  validate({ params }) {
    return /^\d+$/.test(params.id)
  },
  async asyncData(context) {
    const features = []

    const response = await ProductApi.getProduct(
      context.app.$axios,
      context.params.id
    )

    const productFeatures = response.product.features
    const categoryFeatures = response.product.category.features

    if (productFeatures.length) {
      productFeatures.forEach((item) => {
        const featureDetail = categoryFeatures.find(
          (f) => f.id === item.field_id
        )
        features.push({
          id: item.field_id,
          title: featureDetail.field_title,
          value: item.field_value,
          type: featureDetail.field_type,
        })
      })
    }

    return {
      product: response.product,
      features,
    }
  },
  data() {
    return {
      similarProducts: [],
      cart_quantity: 1,
    }
  },
  head() {
    return {
      title:
        'Online Shop | ' +
        this.product.category.title +
        ' | ' +
        this.product.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.product.title,
        },
      ],
    }
  },
  mounted() {
    setTimeout(() => {
      // re-initialize carousal
      if ($('#similar-product').length) {
        $('#similar-product').carousel()
      }

      // load similar products
      ShopApi.search(
        this.$axios,
        'category_id=' + this.product.category_id + '&except=' + this.product.id
      ).then((res) => {
        const productsData = res.products.data

        if (productsData.length === 0) {
          this.similarProducts = []
        } else {
          const totalProducts = productsData.length
          const numCarousalItems = Math.ceil(totalProducts / 3)

          for (let i = 0; i < numCarousalItems; i++) {
            this.similarProducts.push({
              id: i + '-' + i + '-' + i,
              products: [],
            })
          }

          for (let i = 0; i < productsData.length; i++) {
            const itemIndex = parseInt(i / 3)
            if (this.similarProducts[itemIndex].products.length === 3) {
              this.similarProducts[itemIndex + 1].products.push(productsData[i])
            } else {
              this.similarProducts[itemIndex].products.push(productsData[i])
            }
          }
        }

        // re-initialize the boostrap carousal
        $('#recommended-item-carousel').carousel()
      })
    }, 200)
  },
  methods: {
    addToCart(productId) {
      if (isNaN(parseInt(this.cart_quantity))) {
        alert('Please enter an integer value')
        return
      }

      if (parseInt(this.cart_quantity) <= 0) {
        alert('Please enter a value greater than or equal 1')
        return
      }

      addToCart(
        productId,
        parseInt(this.cart_quantity),
        this.$store,
        this.$router
      )
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
#similar-product .carousel-inner .item img {
  margin-left: 26% !important;
}

.tab-pane {
  border: 1px solid #fe980f;
}

.tab-body {
  color: #000;
  background: #fff;
  margin-top: 4px !important;
  padding-left: 11px;
}

.tab-body ul {
  background: #fff !important;
  list-style: none outside none;
  margin-top: 0 !important;
  border-bottom: none !important;
}

.tab-body ul.specifications {
  list-style: auto !important;
}

.tab-body ul.specifications li {
  list-style-type: disc !important;
  padding-bottom: 6px;
}

.color-box {
  width: 16px;
  height: 16px;
  display: inline-block;
  vertical-align: middle;
}
</style>
