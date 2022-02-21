import { CartApi } from '../api/cart'

export const state = () => ({
  cart: [],
  validation_errors: [],
  success_message: '',
  error_message: '',
})

export const mutations = {
  addToCart(state, item) {
    state.cart.push(item)
  },
  removeFromCart(state, id) {
    const items = [...state.cart]

    state.cart = items.filter((item) => item.id !== id)
  },
  clear(state) {
    state.cart = []
  },
  updateCartItemAmount(state, item) {
    const itemIndex = state.cart.findIndex((i) => i.id === item.id)

    state.cart[itemIndex].amount = item.amount
  },
  updateCartItemTotalPrice(state, item) {
    const itemIndex = state.cart.findIndex((i) => i.id === item.id)

    state.cart[itemIndex].total_price_numeric = item.total_price_numeric
    state.cart[itemIndex].total_price_formatted = item.total_price_formatted
  },
  updateCartItemAmountTemp(state, item) {
    const itemIndex = state.cart.findIndex((i) => i.id === item.id)

    state.cart[itemIndex].amount_temp = item.amount
  },
  setValidationErrors(state, errors) {
    state.validation_errors = errors
  },
  setSuccessMessage(state, message) {
    state.success_message = message
  },
  setErrorMessage(state, message) {
    state.error_message = message
  },
  setSpinner(state, payload) {
    const itemIndex = state.cart.findIndex((i) => i.id === payload.id)

    state.cart[itemIndex].spinner = payload.value
  },
}

export const actions = {
  store({ commit, dispatch, state }, payload) {
    CartApi.store(this.$axios, payload)
      .then((response) => {
        if (response.success === 1) {
          response.item.spinner = false

          commit('addToCart', response.item)

          commit('setSpinner', { id: response.item.id, value: true })

          setTimeout(() => {
            alert(response.message)

            commit('setSpinner', { id: response.item.id, value: false })
          }, 3000)
        }
      })
      .catch((err) => {
        dispatch('handleError', err)
      })
      .finally(() => {
        setTimeout(() => {
          commit('setErrorMessage', '')
          commit('setSuccessMessage', '')
          commit('setValidationErrors', [])
        }, 3000)
      })
  },
  update({ commit, dispatch, state }, payload) {
    CartApi.update(this.$axios, payload)
      .then((response) => {
        if (response.success === 1) {
          commit('setSuccessMessage', response.message)
          commit('setSpinner', { id: response.item.id, value: true })

          commit('updateCartItemAmount', response.item)
          commit('updateCartItemTotalPrice', response.item)

          setTimeout(() => {
            commit('setSpinner', { id: response.item.id, value: false })
          }, 3000)
        }
      })
      .catch((err) => {
        dispatch('handleError', err)
      })
      .finally(() => {
        setTimeout(() => {
          commit('setErrorMessage', '')
          commit('setSuccessMessage', '')
          commit('setValidationErrors', [])
        }, 3000)
      })
  },
  getAll({ commit, state }) {
    CartApi.list(this.$axios).then((response) => {
      commit('clear')
      // eslint-disable-next-line array-callback-return
      response.cart.map((item) => {
        item.spinner = false
        commit('addToCart', item)
      })
    })
  },
  removeCartItem({ commit, dispatch }, id) {
    CartApi.delete(this.$axios, id)
      .then((response) => {
        if (response.success === 1) {
          commit('setSuccessMessage', response.message)
          commit('removeFromCart', id)
        }
      })
      .catch((err) => {
        dispatch('handleError', err)
      })
      .finally(() => {
        setTimeout(() => {
          commit('setErrorMessage', '')
          commit('setSuccessMessage', '')
          commit('setValidationErrors', [])
        }, 3000)
      })
  },
  clearCart({ commit, dispatch }) {
    CartApi.clear(this.$axios)
      .then((response) => {
        if (response.success === 1) {
          commit('setSuccessMessage', response.message)
          commit('clear')
        }
      })
      .catch((err) => {
        dispatch('handleError', err)
      })
      .finally(() => {
        setTimeout(() => {
          commit('setErrorMessage', '')
          commit('setSuccessMessage', '')
          commit('setValidationErrors', [])
        }, 3000)
      })
  },
  handleError({ commit }, err) {
    if (err.response.data) {
      alert(err.response.data.message)
      commit('setErrorMessage', err.response.data.message)
      if (err.response.data.errors) {
        const errors = []
        for (const key in err.response.data.errors) {
          errors.push(err.response.data.errors[key][0])
        }

        commit('setValidationErrors', errors)
      }
    }
  },
}
