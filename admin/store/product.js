import { ProductApi } from '../api/product'

export const state = () => ({
  product: {
    title: '',
    description: '',
    price: '',
    amount: '',
    discount: '',
    discount_start_date: '',
    discount_end_date: '',
    category_id: '',
    product_code: '',
    brand_id: '',
    featured: 0,
  },
  files: [],
  files_preview: [],
  features: [],
  product_list: {},
  page: 1,
  filterData: {
    id: '',
    title: '',
    category_id: '',
    from_price: '',
    to_price: '',
    amount: '',
    product_code: '',
    brand_id: '',
  },
  gallery: [],
})

export const mutations = {
  setProduct(state, payload) {},
  setFiles(state, files) {},
  appendFilesPreview(state, base64) {},
  clearFilesPreview(state) {},
  appendToFeatures(state, data) {},
  resetFeatures(state) {},
  updateFeatureValue(state, data) {},
  resetProduct(state) {},
  setProductList(state, products) {},
  setPage(state, page) {},
  setFilterData(state, value) {},
  setGallery(state, data) {},
}

export const actions = {
  create({ commit, state, dispatch }, payload) {},
  listProducts({ commit }, payload = null) {},
  delete({ commit, state }, id) {},
  show({ commit, state, dispatch, rootState }, id) {},
  update({ commit, dispatch, state }, payload) {},
  removeImage({ commit, state }, id) {},
  showValidationErrors({ commit }, err) {},
}
