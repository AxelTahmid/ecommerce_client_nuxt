const OrdersApi = {
  setAuthToken: (axios) => {
    axios.setHeader(
      'Authorization',
      'Bearer ' + localStorage.getItem('auth_token')
    )
  },
  store: (axios, payload) => {
    OrdersApi.setAuthToken(axios)
    return axios.$post('/api/orders', payload)
  },
  list: (axios) => {
    OrdersApi.setAuthToken(axios)
    return axios.$get('/api/orders')
  },
}

export { OrdersApi }
