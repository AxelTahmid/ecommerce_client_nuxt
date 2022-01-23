import { CategoryApi } from '../api/category'

export const state = () => ({
  category: {
    title: '',
    parent_id: '',
    description: '',
    featured: 0,
  },
  categoryHtmlTree: '',
  features: [],
})

export const mutations = {
  setTitle(state, title) {
    state.category.title = title
  },
  // changed parent_id
  setParentId(state, parentID) {
    state.category.parent_id = parentID
  },
  setDescription(state, description) {
    state.category.description = description
  },
  setFeatured(state, featured) {
    state.category.featured = featured
  },
  setCategoryHtmlTree(state, tree) {
    state.categoryHtmlTree = tree
  },
  resetCategory(state) {
    state.category = {
      title: '',
      parent_id: '',
      description: '',
      featured: 0,
    }
    state.features = []
  },
  setFeatures(state, value) {
    state.features = value
  },
  addToFeatures(state, row) {
    state.features.push(row)
  },
  removeFromFeature(state, id) {
    state.features = [...state.features.filter((item) => item.id !== id)]
  },
  updateFeatureTitle(state, payload) {
    const features = [...state.features]
    features.map((feature) => {
      if (feature.id === payload.id) {
        feature.field_title = payload.value
      }
    })

    state.features = features
  },
  updateFeatureType(state, payload) {
    const features = [...state.features]
    features.map((feature) => {
      if (feature.id === payload.id) {
        feature.field_type = payload.value
      }
    })

    state.features = features
  },
}

export const actions = {
  getCategoryHtmlTree({ commit }, exceptId = null) {
    CategoryApi.getCategoriesHtmlTree(this.$axios, exceptId).then(
      (response) => {
        let html = '<option value="">none</option>'
        html += response
        commit('setCategoryHtmlTree', html)
      }
    )
  },
  create({ commit }, payload) {
    commit('shared/resetStatusMessagesParameters', null, { root: true })
    commit(
      'shared/setStatusMessageParameter',
      { key: 'showLoading', val: true },
      { root: true }
    )

    const dataToSend = payload.data
    dataToSend.features = payload.features

    CategoryApi.create(this.$axios, dataToSend)
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
          payload.router.push('/category')
        }, 2000)
      })
      .catch((err) => {
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
      })
      .finally(() => {
        setTimeout(() => {
          commit('shared/resetStatusMessagesParameters', null, { root: true })
          commit('resetCategory')
        }, 3000)
      })
  },
}
