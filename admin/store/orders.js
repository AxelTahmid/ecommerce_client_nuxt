import { OrdersApi } from '../api/orders'

export const state = () => ({
  filterData: {
    orderId: '',
    userId: '',
    status: '',
  },
  page: 1,
  ordersList: {},
  orderDetails: {},
})

export const mutations = {
  setOrdersList(state, data) {
    state.ordersList = data
  },
  setPage(state, page) {
    state.page = page
  },
  setFilterData(state, value) {
    state.filterData[value.key] = value.val
  },
  resetFilter(state) {
    for (const field in state.filterData) {
      state.filterData[field] = ''
    }
  },
  setOrderDetails(state, orderDetails) {
    state.orderDetails = orderDetails
  },
  setOrderStatus(state, payload) {
    const itemIndex = state.ordersList.data.findIndex(
      (i) => i.id === payload.id
    )
    state.ordersList.data[itemIndex].status = payload.status
  },
  removeOrder(state, id) {
    state.ordersList.data = [
      ...state.ordersList.data.filter((i) => i.id !== id),
    ]
  },
}

export const actions = {
  listOrders({ commit }, filterData = '') {
    OrdersApi.list(this.$axios, filterData)
      .then((response) => {
        commit('setOrdersList', response.orders)
      })
      .catch((err) => {
        console.log(err)
      })
  },
  showOrder({ commit }, id) {
    OrdersApi.show(this.$axios, id)
      .then((response) => {
        if (response.orderDetails) {
          commit('setOrderDetails', response.orderDetails)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  },
  updateOrder({ commit }, payload) {
    commit('shared/resetStatusMessagesParameters', null, { root: true })
    commit(
      'shared/setStatusMessageParameter',
      { key: 'showLoading', val: true },
      { root: true }
    )

    OrdersApi.update(this.$axios, payload.id, payload.status)
      .then((response) => {
        commit(
          'shared/setStatusMessageParameter',
          { key: 'showLoading', val: false },
          { root: true }
        )
        commit(
          'shared/setStatusMessageParameter',
          { key: 'success_message', val: response.message },
          { root: true }
        )

        commit('setOrderStatus', payload)
        commit('removeOrder', payload.id)
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        setTimeout(() => {
          commit('shared/resetStatusMessagesParameters', null, { root: true })
        }, 3000)
      })
  },
}
