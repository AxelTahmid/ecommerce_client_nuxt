import { BrandApi } from '../api/brand'

export const state = () => ({
  brand: {
    title: '',
    id: '',
  },
  filterData: {
    id: '',
    title: '',
  },
  page: 1,
  brandList: {},
  allBrands: [], // used to fill brand dropdown in product create screen
})

export const mutations = {
  setTitle(state, title) {
    state.brand.title = title
  },
  setId(state, id) {
    state.brand.id = id
  },
  resetBrand(state) {
    state.brand = {
      title: '',
      id: '',
    }
  },
  setBrandList(state, data) {
    state.brandList = data
  },
  setPage(state, page) {
    state.page = page
  },
  setFilterData(state, value) {
    state.filterData[value.key] = value.val
  },
  setAllBrands(state, value) {
    state.allBrands = value
  },
}

export const actions = {
  create({ commit, dispatch, state }, options) {},
  listBrands({ commit }, filterData = null) {},
  getAllBrands({ commit }) {},
  deleteBrand({ commit, state }, id) {},
  showBrand({ commit }, payload) {},
  updateBrand({ commit, dispatch, state }, options) {},
}
