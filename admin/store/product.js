/* eslint-disable array-callback-return */
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
  setProduct(state, payload) {
    if (payload.key === 'price') {
      payload.value = parseFloat(payload.value)
    } else if (payload.key === 'amount' || payload.key === 'discount') {
      payload.value = parseInt(payload.value)

      if (
        payload.key === 'discount' &&
        (payload.value > 100 || payload.value < 0)
      ) {
        payload.value = 0
      }
    }

    state.product[payload.key] = payload.value
  },
  setFiles(state, files) {
    const filesArray = []

    for (let i = 0; i < files.length; i++) {
      filesArray.push(files[i])
    }
    state.files = filesArray
  },
  appendFilesPreview(state, base64) {
    state.files_preview.push(base64)
  },
  clearFilesPreview(state) {
    state.files_preview = []
  },
  appendToFeatures(state, data) {
    state.features.push(data)
  },
  resetFeatures(state) {
    state.features = []
  },
  updateFeatureValue(state, data) {
    state.features.map((feature) => {
      if (feature.field_id === data.id) {
        feature.field_value = data.value
      }
    })
  },
  resetProduct(state) {
    for (const key in state.product) {
      state.product[key] = ''
    }

    state.files = []
    state.files_preview = []
    state.features = []
    state.gallery = []
  },
  setProductList(state, products) {
    state.product_list = products
  },
  setPage(state, page) {
    state.page = page
  },
  setFilterData(state, value) {
    state.filterData[value.key] = value.val
  },
  setGallery(state, data) {
    state.gallery = data
  },
}

export const actions = {
  create({ commit, state, dispatch }, payload) {
    commit('shared/resetStatusMessagesParameters', null, { root: true })
    commit(
      'shared/setStatusMessageParameter',
      { key: 'showLoading', val: true },
      { root: true }
    )

    const dataToSend = {}
    dataToSend.product = state.product
    dataToSend.features = state.features
    dataToSend.files = state.files

    ProductApi.create(this.$axios, dataToSend)
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
        }

        setTimeout(() => {
          commit('resetProduct')
          payload.router.push('/product')
        }, 2000)
      })
      .catch((err) => {
        dispatch('showValidationErrors', err)
      })
      .finally(() => {
        setTimeout(() => {
          commit('shared/resetStatusMessagesParameters', null, { root: true })
          // commit('resetProduct');
        }, 10000)
      })
  },
  listProducts({ commit }, payload = null) {
    ProductApi.list(this.$axios, payload).then((response) => {
      commit('setProductList', response.products)
    })
  },
  delete({ commit, state }, id) {
    commit('shared/resetStatusMessagesParameters', null, { root: true })
    commit(
      'shared/setStatusMessageParameter',
      { key: 'showLoading', val: true },
      { root: true }
    )

    ProductApi.delete(this.$axios, id)
      .then((response) => {
        commit(
          'shared/setStatusMessageParameter',
          { key: 'showLoading', val: false },
          { root: true }
        )
        if (response.success) {
          const productList = { ...state.product_list }
          productList.data = productList.data.filter((item) => item.id !== id)

          commit('setProductList', productList)
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
        }, 5000)
      })
  },
  show({ commit, state, dispatch, rootState }, id) {
    commit('shared/resetStatusMessagesParameters', null, { root: true })
    commit(
      'shared/setStatusMessageParameter',
      { key: 'showLoading', val: true },
      { root: true }
    )
    commit('resetProduct')

    ProductApi.show(this.$axios, id)
      .then((response) => {
        commit(
          'shared/setStatusMessageParameter',
          { key: 'showLoading', val: false },
          { root: true }
        )

        if (response.product) {
          // set product details
          for (const key in state.product) {
            if (key === 'discount' && response.product[key] == null) {
              response.product[key] = 0
            }

            if (
              key === 'discount_start_date' &&
              response.product[key] == null
            ) {
              response.product[key] = ''
            }

            if (key === 'discount_end_date' && response.product[key] == null) {
              response.product[key] = ''
            }

            if (key === 'brand_id' && response.product[key] == null) {
              response.product[key] = ''
            }

            commit('setProduct', { key, value: response.product[key] })
          }

          // load category to retrieve features
          dispatch('category/showCategory', state.product.category_id, {
            root: true,
          })

          commit('resetFeatures')

          setTimeout(() => {
            if (rootState.category.features.length > 0) {
              const features = [...rootState.category.features]

              features.map((feature) => {
                let productFeatureValue = ''
                if (
                  response.product.features &&
                  response.product.features.find(
                    (f) => f.field_id === feature.id
                  ) !== undefined
                ) {
                  productFeatureValue = response.product.features.find(
                    (f) => f.field_id === feature.id
                  ).field_value
                } else {
                  productFeatureValue = ''
                }
                commit('appendToFeatures', {
                  field_id: feature.id,
                  field_title: feature.field_title,
                  field_type: feature.field_type,
                  field_value: productFeatureValue,
                })
              })
            }
          }, 200)

          // load gallery
          if (response.product.gallery) {
            commit('setGallery', response.product.gallery)
          }
        }
      })
      .catch((err) => {
        console.log(err)
      })
  },
  update({ commit, dispatch, state }, payload) {
    commit('shared/resetStatusMessagesParameters', null, { root: true })
    commit(
      'shared/setStatusMessageParameter',
      { key: 'showLoading', val: true },
      { root: true }
    )

    const dataToSend = {}
    dataToSend.product = state.product
    dataToSend.features = state.features
    dataToSend.files = state.files

    ProductApi.update(this.$axios, dataToSend, payload.id)
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
        }

        setTimeout(() => {
          commit('resetProduct')
          payload.router.push('/product')
        }, 2000)
      })
      .catch((err) => {
        dispatch('showValidationErrors', err)
      })
      .finally(() => {
        setTimeout(() => {
          commit('shared/resetStatusMessagesParameters', null, { root: true })
        }, 10000)
      })
  },
  showValidationErrors({ commit }, err) {
    commit(
      'shared/setStatusMessageParameter',
      { key: 'showLoading', val: false },
      { root: true }
    )
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
  removeImage({ commit, state }, id) {
    commit('shared/resetStatusMessagesParameters', null, { root: true })
    commit(
      'shared/setStatusMessageParameter',
      { key: 'showLoading', val: true },
      { root: true }
    )

    ProductApi.deleteImage(this.$axios, id)
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

          const gallery = [...state.gallery]

          commit(
            'setGallery',
            gallery.filter((gal) => gal.id !== id)
          )
        }
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        setTimeout(() => {
          commit('shared/resetStatusMessagesParameters', null, { root: true })
        }, 10000)
      })
  },
}
