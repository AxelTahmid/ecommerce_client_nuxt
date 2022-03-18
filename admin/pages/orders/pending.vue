<template>
  <div class="main-content">
    <div class="section__content section__content--p30">
      <div class="container-fluid">
        <h3>Pending Orders</h3>

        <OrdersGrid page-type="pending"></OrdersGrid>
      </div>
    </div>
  </div>
</template>

<script>
import OrdersGrid from '../../components/orders-components/OrdersGrid'

export default {
  name: 'PendingOrders',
  components: { OrdersGrid },
  middleware: 'auth',
  fetch() {
    this.$store.commit('orders/resetFilter')
    this.$store.dispatch('orders/listOrders', 'status=pending')
  },
}
</script>
