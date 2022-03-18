<template>
  <tr>
    <td>{{ this.order.id }}</td>
    <td>
      {{ this.order.user.name }} <br />
      <span style="color: #700099">#{{ this.order.user.id }}</span>
    </td>
    <td>
      <label
        v-if="this.order.status == 'success'"
        class="badge bg-success badge-status"
        >{{ this.order.status }}</label
      >
      <label
        v-if="this.order.status == 'cancelled'"
        class="badge bg-danger badge-status"
        >{{ this.order.status }}</label
      >
      <label
        v-if="this.order.status == 'pending'"
        class="badge bg-info badge-status"
        >{{ this.order.status }}</label
      >
    </td>
    <td>{{ this.order.payment_method.name }}</td>
    <td>
      {{
        this.order.shipping_address.address +
        ' ' +
        this.order.shipping_address.country
      }}
      <br />Id #{{ this.order.shipping_address.id }}
    </td>
    <td>${{ this.order.total_price }}</td>
    <td>{{ this.order.paypal_order_identifier }}</td>
    <td>
      <div class="btn-group" role="group" aria-label="">
        <a
          href="#"
          class="btn btn-info btn-sm action-btn"
          title="View Order"
          @click.prevent="viewOrder(order.id)"
          >View</a
        >
        <a
          v-if="this.order.status == 'pending'"
          href="#"
          class="btn btn-success btn-sm action-btn"
          @click.prevent="updateStatus(order.id, 'success')"
          >Completed</a
        >
        <a
          v-if="this.order.status == 'pending'"
          href="#"
          class="btn btn-danger btn-sm action-btn"
          @click.prevent="updateStatus(order.id, 'cancelled')"
          >Cancelled</a
        >
      </div>
    </td>
  </tr>
</template>

<script>
export default {
  name: 'OrdersRow',
  props: ['order'],
  methods: {
    viewOrder(orderId) {
      this.$store.dispatch('orders/showOrder', orderId)

      this.$emit('viewOrder', orderId)
    },
    updateStatus(orderId, status) {
      this.$store.dispatch('orders/updateOrder', { status, id: orderId })
    },
  },
}
</script>

<style scoped>
.badge-status {
  color: #fff;
}

.action-btn {
  font-size: 9px;
}
</style>
