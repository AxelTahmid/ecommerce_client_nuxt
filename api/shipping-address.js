const ShippingAddressApi = {
  setAuthToken: (axios) => {
    axios.setHeader(
      'Authorization',
      'Bearer ' + localStorage.getItem('auth_token')
    )
  },
  store: (axios, payload) => {
    ShippingAddressApi.setAuthToken(axios)
    return axios.$post('/api/shippingAddress', payload)
  },
  update: (axios, payload, id) => {
    ShippingAddressApi.setAuthToken(axios)

    const formData = new FormData()
    for (const field in payload) {
      formData.append(field, payload[field])
    }

    formData.append('_method', 'put')

    return axios.$post('/api/shippingAddress/' + id, formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
  },
  list: (axios) => {
    ShippingAddressApi.setAuthToken(axios)
    return axios.$get('/api/shippingAddress')
  },
  delete: (axios, id) => {
    ShippingAddressApi.setAuthToken(axios)
    return axios.$delete('/api/shippingAddress/' + id)
  },
  show: (axios, id) => {
    ShippingAddressApi.setAuthToken(axios)
    return axios.$get('/api/shippingAddress/' + id)
  },
}

export { ShippingAddressApi }
