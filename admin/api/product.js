const ProductApi = {
  create: (axios, payload) => {
    return axios.$post('/api/product', ProductApi.toFormData(payload))
  },
  list: (axios, payload) => {
    const payloadArr = []

    if (payload) {
      for (const key in payload) {
        payloadArr.push(key + '=' + payload[key])
      }
    }

    return axios.$get('/api/product?' + payloadArr.join('&'))
  },
  delete: (axios, id) => {
    return axios.$delete('/api/product/' + id)
  },
  show: (axios, id) => {
    return axios.$get('/api/product/' + id)
  },
  update: (axios, payload, id) => {
    const data = ProductApi.toFormData(payload)
    data.append('_method', 'put')

    return axios.$post('/api/product/' + id, data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
  },
  deleteImage: (axios, id) => {
    return axios.$delete('/api/product/delete-image/' + id)
  },
  toFormData(payload) {
    const formData = new FormData()
    for (const field in payload.product) {
      formData.append(field, payload.product[field])
    }
    for (let i = 0; i < payload.features.length; i++) {
      formData.append(
        'features[' + payload.features[i].field_id + ']',
        payload.features[i].field_value
      )
    }
    for (let i = 0; i < payload.files.length; i++) {
      formData.append('image[' + i + ']', payload.files[i])
    }

    return formData
  },
}

export { ProductApi }
