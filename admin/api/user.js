const UserApi = {
  create: (axios, payload) => {
    return axios.$post('/api/user', payload)
  },
  list: (axios, payload = null) => {
    const payloadArr = []

    if (payload) {
      for (const key in payload) {
        payloadArr.push(key + '=' + payload[key])
      }
    }

    return axios.$get('/api/user?' + payloadArr.join('&'))
  },
  getAll: (axios) => {
    return axios.$get('/api/user?all=1')
  },
  delete: (axios, id) => {
    return axios.$delete('/api/user/' + id)
  },
  show: (axios, id) => {
    return axios.$get('/api/user/' + id)
  },
  update(axios, payload, id) {
    return axios.$put('/api/user/' + id, payload)
  },
}

export { UserApi }
