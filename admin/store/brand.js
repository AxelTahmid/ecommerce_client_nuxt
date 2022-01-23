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
  create({ commit, dispatch, state }, options) {
    commit('shared/resetStatusMessagesParameters', null, { root: true })
    commit(
      'shared/setStatusMessageParameter',
      { key: 'showLoading', val: true },
      { root: true }
    )

    const payload = {
      title: state.brand.title,
    }

    BrandApi.create(this.$axios, payload)
      .then((response) => {
        commit(
          'shared/setStatusMessageParameter',
          { key: 'showLoading', val: false },
          { root: true }
        )
        if (response.success) {
          commit(
            'shared/setStatusMessageParameter',
            { key: 'success_message', val: response.message },
            { root: true }
          )

          options.onSuccess()

          dispatch('listBrands')
        }
      })
      .catch((err) => {
        commit(
          'shared/setStatusMessageParameter',
          { key: 'showLoading', val: false },
          { root: true }
        )
        dispatch('handleError', err)
      })
      .finally(() => {
        setTimeout(() => {
          commit('shared/resetStatusMessagesParameters', null, { root: true })
          commit('resetBrand')
        }, 3000)
      })
  },
  listBrands({ commit }, filterData = null) {
    BrandApi.list(this.$axios, filterData)
      .then((response) => {
        commit('setBrandList', response.brands)
      })
      .catch((err) => {
        console.log(err)
      })
  },
  getAllBrands({ commit }) {
    BrandApi.getAll(this.$axios)
      .then((response) => {
        commit('setAllBrands', response.brands)
      })
      .catch((err) => {
        console.log(err)
      })
  },
  deleteBrand({ commit, state }, id) {
    commit('shared/resetStatusMessagesParameters', null, { root: true })
    commit(
      'shared/setStatusMessageParameter',
      { key: 'showLoading', val: true },
      { root: true }
    )

    BrandApi.delete(this.$axios, id)
      .then((response) => {
        commit(
          'shared/setStatusMessageParameter',
          { key: 'showLoading', val: false },
          { root: true }
        )
        if (response.success) {
          const brandList = { ...state.brandList }
          brandList.data = brandList.data.filter((item) => item.id !== id)

          commit('setBrandList', brandList)
          commit(
            'shared/setStatusMessageParameter',
            { key: 'success_message', val: response.message },
            { root: true }
          )
        }
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        setTimeout(() => {
          commit('shared/resetStatusMessagesParameters', null, { root: true })
        }, 3000)
      })
  },
  showBrand({ commit }, payload) {
    commit('shared/resetStatusMessagesParameters', null, { root: true })
    commit(
      'shared/setStatusMessageParameter',
      { key: 'showLoading', val: true },
      { root: true }
    )

    BrandApi.show(this.$axios, payload.id)
      .then((response) => {
        commit(
          'shared/setStatusMessageParameter',
          { key: 'showLoading', val: false },
          { root: true }
        )

        if (response.brand) {
          commit('setTitle', response.brand.title)
          commit('setId', response.brand.id)

          payload.onSuccess()
        }
      })
      .catch((err) => {
        console.log(err)
      })
  },
  updateBrand({ commit, dispatch, state }, options) {
    commit('shared/resetStatusMessagesParameters', null, { root: true })
    commit(
      'shared/setStatusMessageParameter',
      { key: 'showLoading', val: true },
      { root: true }
    )

    const payload = {
      title: state.brand.title,
    }

    BrandApi.update(this.$axios, payload, state.brand.id)
      .then((response) => {
        commit(
          'shared/setStatusMessageParameter',
          { key: 'showLoading', val: false },
          { root: true }
        )
        if (response.success) {
          commit(
            'shared/setStatusMessageParameter',
            { key: 'success_message', val: response.message },
            { root: true }
          )

          options.onSuccess()

          dispatch('listBrands')
        }
      })
      .catch((err) => {
        commit(
          'shared/setStatusMessageParameter',
          { key: 'showLoading', val: false },
          { root: true }
        )
        dispatch('handleError', err)
      })
      .finally(() => {
        setTimeout(() => {
          commit('shared/resetStatusMessagesParameters', null, { root: true })
          commit('resetBrand')
        }, 3000)
      })
  },
  handleError({ commit }, err) {
    if (err.response.data) {
      commit(
        'shared/setStatusMessageParameter',
        { key: 'error_message', val: err.response.data.message },
        { root: true }
      )
      if (err.response.data.errors) {
        const errors = []
        for (const key in err.response.data.errors) {
          errors.push(err.response.data.errors[key][0])
        }

        commit(
          'shared/setStatusMessageParameter',
          { key: 'validation_errors', val: errors },
          { root: true }
        )
      }
    }
  },
}
