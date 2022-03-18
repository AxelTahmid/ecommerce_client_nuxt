<template>
  <div class="container">
    <div class="bg">
      <div class="row">
        <div class="col-sm-12">
          <h2 class="title text-center">My Orders</h2>
        </div>
      </div>

      <div class="row">
        <div class="col-md-3">
          <account-sidebar></account-sidebar>
        </div>
        <div class="col-sm-9 col-md-9">
          <table class="table table-responsive table-bordered">
            <thead>
              <tr style="background: #ccc">
                <th>#OrderId</th>
                <th>Status</th>
                <th>Price</th>
                <th>Payment Method</th>
                <th>Date</th>
                <th>Shipping Address</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <template v-for="order in myOrders">
                <tr :key="order.id">
                  <td>#{{ order.id }}</td>
                  <td>{{ order.status }}</td>
                  <td>${{ order.total_price }}</td>
                  <td>{{ order.payment_method.name }}</td>
                  <td>{{ order.created_at }}</td>
                  <td>{{ order.shipping_address.address }}</td>
                  <td>
                    <a
                      href="#"
                      class="btn btn-primary btn-sm"
                      title="View details"
                      @click.prevent="toggleDetails(order)"
                      ><i class="fa fa-chevron-down"></i
                    ></a>
                  </td>
                </tr>
                <tr
                  class="detail-row"
                  v-if="order.show_details"
                  :key="orderDetails"
                >
                  <td colspan="7">
                    <div class="order-items">
                      <h4 style="color: #6a6a57">Products</h4>
                      <ul>
                        <li
                          v-for="orderDetails in order.order_details"
                          :key="orderDetails"
                          style="border-bottom: 1px solid #fff"
                        >
                          <img
                            :src="
                              orderDetails.product.gallery[0].image_url
                                .product_gallery_slider
                            "
                            v-bind:alt="orderDetails.product.title"
                          />
                          <strong style="font-size: 13px">{{
                            orderDetails.product.title
                          }}</strong>
                          <p>Unit Price: ${{ orderDetails.price }}</p>
                          <p>Quantity: {{ orderDetails.amount }}</p>
                        </li>
                      </ul>
                    </div>
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AccountSidebar from '../components/account-components/AccountSidebar'
import { OrdersApi } from '../admin/api/orders'
export default {
  name: 'orders',
  components: { AccountSidebar },
  middleware: 'auth',
  data() {
    return {
      myOrders: [],
    }
  },
  mounted() {
    OrdersApi.list(this.$axios).then((response) => {
      response.orders.map((item) => {
        item.show_details = false
      })

      this.myOrders = response.orders
    })
  },
  methods: {
    toggleDetails(order) {
      order.show_details = !order.show_details
    },
  },
}
</script>
