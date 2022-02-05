const CategoryApi = {
  getById: (axios, categoryId) => {
    return axios.$get('/api/category/' + categoryId)
  },
}

export { CategoryApi }
