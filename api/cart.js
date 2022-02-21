const CartApi = {
  setAuthToken: (axios) => {
    axios.setHeader(
      'Authorization',
      'Bearer ' + localStorage.getItem('auth_token')
    )
  },
  store: (axios, payload) => {
    CartApi.setAuthToken(axios)
    return axios.$post('/api/cart', payload)
  },
  update: (axios, payload) => {
    CartApi.setAuthToken(axios)
    return axios.$put('/api/cart', payload)
  },
  list: (axios) => {
    CartApi.setAuthToken(axios)
    return axios.$get('/api/cart')
  },
  delete: (axios, id) => {
    CartApi.setAuthToken(axios)
    return axios.$delete('/api/cart/' + id)
  },
  show: (axios, id) => {
    CartApi.setAuthToken(axios)
    return axios.$get('/api/cart/' + id)
  },
  clear: (axios) => {
    CartApi.setAuthToken(axios)
    return axios.$delete('/api/cart/clearAll')
  },
}

export { CartApi }
