import { HomeApis } from '../api/home'
import { ShopApi } from '../api/shop'
import { CategoryApi } from '../api/category'

export const state = () => ({
  categoriesTree: [],
  shop: {
    products: [],
    page: 1,
    brandsByCategory: [],
  },
  shop_filter: {
    categoryId: '',
    brand_id: '',
    from_price: '',
    to_price: '',
    keyword: '',
  },
  category: {},
  auth: {
    is_logged: false,
    user_data: {},
    auth_token: '',
  },
})

export const mutations = {
  setCategoryTree(state, data) {
    state.categoriesTree = data
  },
  setProducts(state, data) {
    state.shop.products = data
  },
  setPage(state, page) {
    state.shop.page = page
  },
  setBrandsByCategory(state, brands) {
    state.shop.brandsByCategory = brands
  },
  setCategoryId(state, categoryId) {
    state.shop_filter.categoryId = categoryId
  },
  setBrand(state, brandId) {
    state.shop_filter.brand_id = brandId
  },
  setFromPrice(state, price) {
    state.shop_filter.from_price = price
  },
  setToPrice(state, price) {
    state.shop_filter.to_price = price
  },
  setKeyword(state, keyword) {
    state.shop_filter.keyword = keyword
  },
  setCategory(state, category) {
    state.category = category
  },
  setAuthData(state, data) {
    state.auth[data.key] = data.value
  },
}

export const actions = {
  fetchCategoryTree({ commit }) {
    HomeApis.getCategoryMenuTree(this.$axios).then((res) => {
      commit('setCategoryTree', res)
    })
  },
  async fetchShopProducts({ commit, state }) {
    const searchParams = []

    if (state.shop.page && parseInt(state.shop.page) >= 1) {
      searchParams.push('page=' + parseInt(state.shop.page))
    }

    if (
      state.shop_filter.categoryId &&
      parseInt(state.shop_filter.categoryId) > 0
    ) {
      searchParams.push('category_id=' + parseInt(state.shop_filter.categoryId))
    }

    if (
      state.shop_filter.brand_id &&
      parseInt(state.shop_filter.brand_id) > 0
    ) {
      searchParams.push('brand_id=' + parseInt(state.shop_filter.brand_id))
    }

    if (state.shop_filter.from_price) {
      searchParams.push('from_price=' + state.shop_filter.from_price)
    }

    if (state.shop_filter.to_price) {
      searchParams.push('to_price=' + state.shop_filter.to_price)
    }

    if (state.shop_filter.keyword) {
      searchParams.push('keyword=' + state.shop_filter.keyword)
    }

    const response = await ShopApi.search(this.$axios, searchParams.join('&'))
    commit('setProducts', response.products)
  },
  async fetchBrandsByCategory({ commit }, categoryId) {
    const response = await ShopApi.getBrandsByCategory(this.$axios, categoryId)

    commit('setBrandsByCategory', response.brands)
  },
  async fetchCategory({ commit }, categoryId) {
    const response = await CategoryApi.getById(this.$axios, categoryId)

    commit('setCategory', response.category)

    return new Promise((resolve) => {
      resolve(response.category)
    })
  },
  resetShopFilter({ commit }) {
    commit('setPage', 1)
    commit('setCategoryId', '')
    commit('setBrand', '')
    commit('setFromPrice', '')
    commit('setToPrice', '')
    commit('setKeyword', '')
    commit('setBrandsByCategory', [])
  },
  storeAuthData({ commit }, { authToken, userData }) {
    commit('setAuthData', { key: 'is_logged', value: true })
    commit('setAuthData', { key: 'auth_token', value: authToken })
    commit('setAuthData', { key: 'user_data', value: userData })
  },
  resetAuthData({ commit }) {
    commit('setAuthData', { key: 'is_logged', value: false })
    commit('setAuthData', { key: 'auth_token', value: '' })
    commit('setAuthData', { key: 'user_data', value: {} })
  },
}
