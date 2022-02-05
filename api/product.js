const ProductApi = {
  getProduct: (axios, id) => {
    return axios.$get('/api/product/' + id)
  },
}

export { ProductApi }
