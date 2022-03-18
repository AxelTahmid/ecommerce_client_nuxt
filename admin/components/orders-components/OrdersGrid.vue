<template>
  <div class="row">
    <div class="col-md-12">
      <loader></loader>
      <status-messages></status-messages>

      <OrdersFilter
        :page-type="this.pageType"
        @Filtering="handleFiltering"
        @resetFilter="resetFilter"
      ></OrdersFilter>
    </div>
    <div class="col-md-12">
      <!-- DATA TABLE-->
      <div class="table-responsive m-b-40">
        <table class="table table-borderless table-data3">
          <thead>
            <tr>
              <th>#</th>
              <th>User</th>
              <th>Status</th>
              <th>Payment Method</th>
              <th>Shipping Address</th>
              <th>Total Price</th>
              <th>Paypal Indentifier</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            <template v-if="ordersList.data && ordersList.data.length > 0">
              <OrdersRow
                v-for="order of ordersList.data"
                :key="order.id"
                :order="order"
                @viewOrder="showDetailModal"
              ></OrdersRow>
            </template>
            <tr
              v-if="
                !ordersList.data ||
                (ordersList.data && ordersList.data.length == 0)
              "
            >
              <td colspan="8">
                <p class="text-center">No data</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <Pagination
        v-if="ordersList.data"
        :data="ordersList"
        @handlePagination="handlePagination"
      ></Pagination>
    </div>

    <OrderDetailsModal
      v-if="this.showModal"
      @closeDetailModal="dismissModal"
    ></OrderDetailsModal>
  </div>
</template>

<script>
import Loader from '../helpers/loader'
import StatusMessages from '../helpers/statusMessages'
import Pagination from '../helpers/Pagination'
import OrdersFilter from './OrdersFilter'
import OrdersRow from './OrdersRow'
import OrderDetailsModal from './OrderDetailsModal'

export default {
  name: 'OrdersGrid',
  components: {
    OrderDetailsModal,
    Pagination,
    OrdersRow,
    OrdersFilter,
    StatusMessages,
    Loader,
  },
  props: ['pageType'],
  data() {
    return {
      showModal: false,
    }
  },
  computed: {
    ordersList() {
      return this.$store.state.orders.ordersList
    },
  },
  methods: {
    showDetailModal(orderId) {
      this.showModal = true
    },
    dismissModal() {
      this.showModal = false
    },
    // eslint-disable-next-line camelcase
    handlePagination(page_number) {
      this.$store.commit('orders/setPage', page_number)

      this.$store.dispatch('orders/listOrders', this.getPayload())
    },
    handleFiltering(field, value) {
      this.$store.commit('orders/setFilterData', { key: field, val: value })
      this.$store.commit('orders/setPage', 1)

      this.$store.dispatch('orders/listOrders', this.getPayload())
    },
    resetFilter() {
      this.$store.commit('orders/setPage', 1)
      this.$store.commit('orders/resetFilter')
      this.$store.dispatch('orders/listOrders', this.getPayload())
    },
    getPayload() {
      const payload = []

      payload.push('page=' + this.$store.state.orders.page)

      for (const field in this.$store.state.orders.filterData) {
        if (this.$store.state.orders.filterData[field] !== '')
          payload.push(field + '=' + this.$store.state.orders.filterData[field])
      }

      if (this.pageType === 'pending') {
        payload.push('status=pending')
      }

      return payload.join('&')
    },
  },
}
</script>
