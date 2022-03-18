<template>
  <section id="cart_items">
    <div class="container">
      <div class="step-one">
        <h2 class="heading" style="padding-left: 5px !important">
          Step1: Choose Shipping
        </h2>
        <div v-if="this.error_message != ''" class="alert alert-danger">
          {{ this.error_message }}
        </div>
        <ul
          v-if="this.validation_errors.length"
          class="sufee-alert alert with-close alert-danger alert-dismissible"
        >
          <li v-for="(error, index) in this.validation_errors" :key="index">
            {{ error }}
          </li>
        </ul>
      </div>

      <p v-if="!this.shipping_addresses.length" class="alert alert-info">
        No shipping addresses!
        <nuxt-link to="/shipping-addresses">Add Shipping Address</nuxt-link>
      </p>

      <div v-if="this.shipping_addresses.length" class="shipping-addresses">
        <ul class="nav">
          <li
            v-for="address in this.shipping_addresses"
            :key="address.id"
            style="display: block"
          >
            <label
              ><input
                v-model="selected_shipping_address"
                type="radio"
                name="shipping_address_id"
                :value="address.id"
              />
              <span>
                <strong
                  >{{ address.country }} - {{ address.city }} - ({{
                    address.postal_code
                  }}) - {{ address.address }} (Primary)</strong
                >
                <span>{{ address.mobile }}</span>
              </span>
            </label>
          </li>
        </ul>
      </div>

      <div class="review-payment">
        <h2>Review Cart</h2>
      </div>

      <div class="table-responsive cart_info">
        <table class="table table-condensed">
          <thead>
            <tr class="cart_menu">
              <td class="image" width="15%">Item</td>
              <td class="description" width="35%"></td>
              <td class="price" width="10%">Price</td>
              <td class="quantity" width="15%">Quantity</td>
              <td class="total" width="10%">Total</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in this.cart" :key="item.id">
              <td class="cart_product">
                <nuxt-link
                  :to="'/p/' + item.product_id + '/' + item.product.slug"
                  ><img
                    :src="item.product.gallery[0].image_url.cart_thumb"
                    :alt="item.title"
                /></nuxt-link>
              </td>
              <td class="cart_description" width="30%">
                <h4>
                  <nuxt-link
                    :to="'/p/' + item.product_id + '/' + item.product.slug"
                    ><span>{{ item.product.title_short }}</span></nuxt-link
                  >
                </h4>
                <p v-if="item.product.product_code != ''">
                  Product Code: {{ item.product.product_code }}
                </p>
              </td>
              <td class="cart_price">
                <p>${{ item.product.price_after_discount }}</p>
              </td>
              <td class="cart_quantity">
                <div class="cart_quantity_button">
                  <input
                    class="cart_quantity_input"
                    type="text"
                    name="quantity"
                    :value="item.amount_temp"
                    autocomplete="off"
                    size="2"
                    disabled
                  />
                </div>
              </td>
              <td class="cart_total">
                <p class="cart_total_price">
                  ${{ item.total_price_formatted }}
                </p>
              </td>
            </tr>

            <tr>
              <td colspan="3">&nbsp;</td>
              <td colspan="2">
                <table class="table table-condensed total-result">
                  <tbody>
                    <tr>
                      <td>Total</td>
                      <td>
                        <span>${{ this.getCartTotal() }}</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="step-one">
        <h2 class="heading" style="padding-left: 5px !important">
          Step2: Choose Payment
        </h2>
      </div>

      <div class="payment-options">
        <span v-for="method in this.payment_methods" :key="method.id">
          <label
            ><input
              v-model="selected_payment_method"
              type="radio"
              name="payment_method"
              :value="method.slug"
              @change="toggleButton()"
            />
            {{ method.name }}</label
          >
        </span>
      </div>
      <a
        href="#"
        class="btn btn-lg btn-default check_out pull-right"
        :style="
          'margin-bottom: 20px;display:' + (this.showButton ? 'block' : 'none')
        "
        @click.prevent="payCash()"
        >Proceed</a
      >

      <Paypal
        v-if="
          this.selected_payment_method == 'paypal' &&
          this.selected_shipping_address != ''
        "
        :cart="this.cart"
        :shipping-addresses="this.shipping_addresses"
        :shipping-address="this.selected_shipping_address"
        :payment-method="this.selected_payment_method"
      ></Paypal>
    </div>
  </section>
</template>

<script>
import { ShippingAddressApi } from '../api/shipping-address'
import { PaymentMethodsApi } from '../api/payment-method'
import Paypal from '../components/checkout-components/Paypal'
import { OrdersApi } from '../api/order'

export default {
  name: 'Checkout',
  components: { Paypal },
  middleware: 'auth',
  data() {
    return {
      shipping_addresses: [],
      payment_methods: [],
      selected_shipping_address: '',
      selected_payment_method: '',
      error_message: '',
      validation_errors: [],
      showButton: false,
    }
  },
  head() {
    return {
      title: 'Online Shop | Checkout',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Checkout Page',
        },
      ],
      script: [
        {
          type: 'text/javascript',
          src:
            'https://www.paypal.com/sdk/js?client-id=' +
            process.env.PAYPAL_CLIENT_ID +
            '&currency=USD&disable-funding=credit,card',
        },
      ],
    }
  },
  computed: {
    cart() {
      return this.$store.state.cart.cart
    },
  },
  mounted() {
    if (this.cart.length === 0) {
      alert('You must have items in the cart in order to checkout!')
      this.$router.push('/')
    }

    ShippingAddressApi.list(this.$axios).then((response) => {
      this.shipping_addresses = response.shipping_addresses.filter(
        (item) => item.is_primary === 1
      )
    })

    PaymentMethodsApi.list(this.$axios).then((response) => {
      this.payment_methods = response.payment_methods
    })
  },
  methods: {
    toggleButton() {
      if (this.selected_payment_method !== 'paypal') {
        this.showButton = true
      } else {
        this.showButton = false
      }
    },
    getCartTotal() {
      let total = 0
      // eslint-disable-next-line array-callback-return
      this.$store.state.cart.cart.map((item) => {
        total += item.total_price_numeric
      })

      return total.toFixed(1)
    },
    payCash() {
      this.error_message = ''
      this.validation_errors = []

      if (this.cart.length === 0) {
        alert('You must have items in the cart in order to checkout!')
        return
      }

      if (this.shipping_addresses.length === 0) {
        alert('You must have at least one main shipping address')
        return
      }

      if (!this.selected_shipping_address) {
        alert('Please select shipping address')
        return
      }

      if (!this.selected_payment_method) {
        alert('Please select payment method')
        return
      }

      // skip for paypal
      if (this.selected_payment_method === 'paypal') {
        return
      }

      if (confirm('Confirm sending the payment request?')) {
        const data = {
          shipping_address_id: this.selected_shipping_address,
          payment_method: this.selected_payment_method,
          status_message: 'Order added and waiting for delivery',
        }

        OrdersApi.store(this.$axios, data)
          .then((response) => {
            this.$store.commit('cart/clear')

            this.$router.push('/checkout-thanks')
          })
          .catch((err) => {
            this.error_message = err.response.data.message
            if (err.response.data.errors) {
              const errors = []
              for (const key in err.response.data.errors) {
                errors.push(err.response.data.errors[key][0])
              }

              this.validation_errors = errors
            }
          })
      }
    },
  },
}
</script>

<style scoped>
.shipping-addresses label {
  font-weight: normal !important;
}

.payment-options {
  margin-bottom: 20px !important;
}
</style>
