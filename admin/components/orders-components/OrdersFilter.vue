<template>
  <form method="get" action="#" style="margin-bottom: 10px">
    <div class="row">
      <div class="col-3">
        <input
          type="text"
          class="form-control"
          placeholder="#order Id"
          name="orderId"
          :value="this.$store.state.orders.filterData.orderId"
          @change="handleFiltering($event)"
        />
      </div>
      <div v-if="this.pageType == 'allOrders'" class="col-3">
        <select
          id="status"
          name="status"
          class="form-control"
          :value="this.$store.state.orders.filterData.status"
          @change="handleFiltering($event)"
        >
          <option value="">All Orders</option>
          <option value="pending">Pending Orders</option>
          <option value="success">Completed Orders</option>
          <option value="cancelled">Cancelled Orders</option>
        </select>
      </div>
      <div class="col-3">
        <input
          type="text"
          class="form-control"
          placeholder="#user Id"
          name="userId"
          :value="this.$store.state.orders.filterData.userId"
          @change="handleFiltering($event)"
        />
      </div>
      <a
        v-if="
          this.$store.state.orders.filterData.userId ||
          this.$store.state.orders.filterData.orderId ||
          this.$store.state.orders.filterData.status
        "
        href="#"
        @click.prevent="resetFilter"
        >Reset</a
      >
    </div>
  </form>
</template>

<script>
export default {
  name: 'OrdersFilter',
  props: ['pageType'],
  methods: {
    handleFiltering(event) {
      this.$emit('Filtering', event.target.name, event.target.value)
    },
    resetFilter() {
      this.$emit('resetFilter')
    },
  },
}
</script>
