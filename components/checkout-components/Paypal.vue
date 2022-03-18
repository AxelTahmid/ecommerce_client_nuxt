<template>
  <div class="row">
    <div class="col-md-6 col-md-offset-3">
      <i
        v-if="show_loading"
        class="fa fa-spinner fa-spin"
        style="font-size: 33px; margin-left: 46%"
      ></i>
      <div id="paypal-button-container"></div>
    </div>
  </div>
</template>

<script>
import { OrdersApi } from '../../api/order'

export default {
  name: 'Paypal',
  props: ['cart', 'shippingAddress', 'paymentMethod', 'shippingAddresses'],
  data() {
    return {
      show_loading: false,
    }
  },
  mounted() {
    const { items, total } = this.getItems()

    const shippingAddress = this.shippingAddresses.find(
      (address) => address.id == this.shippingAddress
    )

    setTimeout(() => {
      paypal
        .Buttons({
          createOrder: (data, actions) => {
            return actions.order.create({
              prefer: 'return=representation',
              purchase_units: [
                {
                  description:
                    'Purchasing items from online shop e-commerce app',
                  amount: {
                    value: total,
                    currency_code: 'USD',
                    breakdown: {
                      item_total: {
                        currency_code: 'USD',
                        value: total,
                      },
                    },
                  },
                  items,
                  shipping: {
                    address: {
                      address_line_1: shippingAddress.address,
                      country_code: shippingAddress.country,
                      postal_code: shippingAddress.postal_code,
                      admin_area_2: shippingAddress.city,
                    },
                  },
                },
              ],
            })
          },
          onApprove: (data, actions) => {
            this.show_loading = true
            return actions.order.capture().then((details) => {
              this.show_loading = false
              alert('Transaction completed by ' + details.payer.name.given_name)
              this.saveOrder({
                status: 'success',
                status_message: 'Order from paypal completed',
                paypal_order_id: details.id,
                paypal_email: details.payer.email_address,
                paypal_given_name: details.payer.name.given_name,
                paypal_payer_id: details.payer.payer_id,
              })
            })
          },
          onCancel: (data) => {
            alert('Payment cancelled')
            this.saveOrder(
              {
                status: 'cancelled',
                status_message: 'Order from paypal cancelled',
                paypal_order_id: data.orderID,
              },
              false
            )
          },
          onError: (err) => {
            alert(err)
          },
        })
        .render('#paypal-button-container')
    }, 1000)
  },
  methods: {
    getItems() {
      const items = []
      let total = 0

      this.cart.map((item) => {
        total += item.product.price_after_discount_numeric * item.amount

        items.push({
          name: item.product.title,
          unit_amount: {
            value: item.product.price_after_discount_numeric,
            currency_code: 'USD',
          },
          quantity: item.amount,
        })
      })

      return { items, total }
    },
    saveOrder(data, success = true) {
      data.shipping_address_id = this.shippingAddress
      data.payment_method = this.paymentMethod

      OrdersApi.store(this.$axios, data).then((response) => {
        this.$store.commit('cart/clear')

        if (success) {
          this.$router.push('/checkout-paid')
        } else {
          this.$router.push('/checkout-cancel')
        }
      })
    },
  },
}
</script>
