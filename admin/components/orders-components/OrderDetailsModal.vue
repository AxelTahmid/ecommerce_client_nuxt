<template>
  <div
    class="modal fade show order-details-modal"
    tabindex="-1"
    role="dialog"
    style="padding-right: 12px; display: block; top: 50px"
  >
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">
            View Order #{{ orderDetails.id }}

            <label
              v-if="orderDetails.status == 'success'"
              class="badge badge-success"
              >{{ orderDetails.status }}</label
            >
            <label
              v-if="orderDetails.status == 'cancelled'"
              class="badge badge-danger"
              >{{ orderDetails.status }}</label
            >
            <label
              v-if="orderDetails.status == 'pending'"
              class="badge badge-info"
              >{{ orderDetails.status }}</label
            >
          </h5>

          <div style="margin-left: 50%">
            Total Price:
            <strong style="color: #000">${{ orderDetails.total_price }}</strong>
          </div>

          <button
            type="button"
            class="close"
            aria-label="Close"
            @click="dismiss()"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-4">
              <div id="list-tab" class="list-group" role="tablist">
                <a
                  id="list-home-list"
                  class="list-group-item list-group-item-action active"
                  data-toggle="list"
                  href="#list-home"
                  role="tab"
                  aria-controls="home"
                  >Details</a
                >
                <a
                  id="list-products-list"
                  class="list-group-item list-group-item-action"
                  data-toggle="list"
                  href="#list-products"
                  role="tab"
                  aria-controls="home"
                  >Order Products
                  <span class="badge badge-danger badge-pill">{{
                    orderDetails.order_details
                      ? orderDetails.order_details.length
                      : ''
                  }}</span></a
                >
              </div>
            </div>
            <div class="col-8">
              <div id="nav-tabContent" class="tab-content">
                <div
                  id="list-home"
                  class="tab-pane fade show active"
                  role="tabpanel"
                  aria-labelledby="list-home-list"
                >
                  <ul>
                    <li>
                      <strong>#orderId:</strong>
                      <label class="badge badge-info">{{
                        orderDetails.id
                      }}</label>
                    </li>
                    <li>
                      <strong>User:</strong>
                      {{
                        orderDetails.user
                          ? orderDetails.user.name +
                            ' - # ' +
                            orderDetails.user.id
                          : ''
                      }}
                    </li>
                    <li>
                      <strong>Status message:</strong>
                      {{ orderDetails.status_message }}
                    </li>
                    <li>
                      <strong>Payment method:</strong>
                      {{
                        orderDetails.payment_method
                          ? orderDetails.payment_method.name
                          : ''
                      }}
                    </li>
                    <li>
                      <strong>Shipping address:</strong>
                      {{
                        orderDetails.shipping_address
                          ? orderDetails.shipping_address.address +
                            ' ' +
                            orderDetails.shipping_address.country +
                            ' #' +
                            orderDetails.shipping_address.id
                          : ''
                      }}
                    </li>
                    <li>
                      <strong>Paypal Identifier:</strong>
                      {{ orderDetails.paypal_order_identifier }}
                    </li>
                    <li>
                      <strong>Paypal Email:</strong>
                      {{ orderDetails.paypal_email }}
                    </li>
                    <li>
                      <strong>Paypal Given Name:</strong>
                      {{ orderDetails.paypal_given_name }}
                    </li>
                    <li>
                      <strong>Paypal Payer Id:</strong>
                      {{ orderDetails.paypal_payer_id }}
                    </li>
                    <li>
                      <strong>Created Date:</strong>
                      {{ orderDetails.created_at }}
                    </li>
                    <li>
                      <strong>Updated Date:</strong>
                      {{ orderDetails.updated_at }}
                    </li>
                  </ul>
                </div>
                <div
                  id="list-products"
                  class="tab-pane fade"
                  role="tabpanel"
                  aria-labelledby="list-products-list"
                  style="max-height: 350px !important; overflow-y: scroll"
                >
                  <ul v-if="orderDetails.order_details">
                    <li
                      v-for="orderDetails in orderDetails.order_details"
                      style="
                        border-bottom: 1px solid #ccc;
                        padding-bottom: 6px;
                        margin-bottom: 20px;
                      "
                    >
                      <img
                        :src="
                          orderDetails.product.gallery[0].image_url
                            .product_gallery_slider
                        "
                      />
                      <strong style="font-size: 13px">{{
                        orderDetails.product.title
                      }}</strong>
                      <p>Unit Price: ${{ orderDetails.price }}</p>
                      <p>Quantity: {{ orderDetails.amount }}</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="dismiss()">
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OrderDetailsModal',
  computed: {
    orderDetails() {
      return this.$store.state.orders.orderDetails
    },
  },
  methods: {
    dismiss() {
      this.$emit('closeDetailModal')
    },
  },
}
</script>
