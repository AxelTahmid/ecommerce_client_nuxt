const ShopApi = {
  search: (axios, searchParams = '') => {
    return axios.$get(
      '/api/product/search-products' + (searchParams ? '?' + searchParams : '')
    )
  },
  getBrandsByCategory: (axios, categoryId) => {
    return axios.$get('/api/brand/brands-by-category?category_id=' + categoryId)
  },
}

export { ShopApi }
