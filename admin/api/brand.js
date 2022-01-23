/* eslint-disable camelcase */
const BrandApi = {
  create: (axios, payload) => {
    return axios.$post('/api/brand', payload)
  },
  list: (axios, payload = null) => {
    const payload_arr = []

    if (payload) {
      for (const key in payload) {
        payload_arr.push(key + '=' + payload[key])
      }
    }

    return axios.$get('/api/brand?' + payload_arr.join('&'))
  },
  getAll: (axios) => {
    return axios.$get('/api/brand?all=1')
  },
  delete: (axios, id) => {
    return axios.$delete('/api/brand/' + id)
  },
  show: (axios, id) => {
    return axios.$get('/api/brand/' + id)
  },
  update(axios, payload, id) {
    return axios.$put('/api/brand/' + id, payload)
  },
}

export { BrandApi }
