export const HomeApis = {
  getCategoryMenuTree: (axios) => {
    return axios.$get('/api/category/menutree')
  },
  getSliderProducts: (axios) => {
    return axios.$get('/api/product/slider-products')
  },
  getLatestProducts: (axios) => {
    return axios.$get('/api/product/latest-products')
  },
  getFeaturedCategories: (axios) => {
    return axios.$get('/api/category/featured-categories')
  },
  getFeaturedProducts: (axios) => {
    return axios.$get('/api/product/featured-products')
  },
}
