import { UserApi } from '../api/user'

export const state = () => ({
  user: {
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    is_super_admin: 0,
  },
  filterData: {
    id: '',
    name: '',
    email: '',
  },
  page: 1,
  userList: {},
  allUsers: [],
})

export const mutations = {
  setUser(state, payload) {
    state.user[payload.key] = payload.value
  },
  resetUser(state) {
    state.user = {
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
      is_super_admin: 0,
    }
  },
  setFilterData(state, payload) {
    state.filterData[payload.key] = payload.val
  },
  setPage(state, page) {
    state.page = page
  },
  setUserList(state, userList) {
    state.userList = userList
  },
  setAllUsers(state, value) {
    state.allUsers = value
  },
}

export const actions = {
  create({ commit, dispatch, state }, payload) {
    commit('shared/resetStatusMessagesParameters', null, { root: true })
    commit(
      'shared/setStatusMessageParameter',
      { key: 'showLoading', val: true },
      { root: true }
    )

    const dataToSend = { ...state.user }

    UserApi.create(this.$axios, dataToSend)
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
          payload.router.push('/user')
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
  list({ commit }, payload = null) {
    UserApi.list(this.$axios, payload).then((response) => {
      commit('setUserList', response.users)
    })
  },
  getAllUsers({ commit }) {
    UserApi.getAll(this.$axios)
      .then((response) => {
        commit('setAllUsers', response.users)
      })
      .catch((err) => {
        console.log(err)
      })
  },
  show({ commit }, id) {
    commit('shared/resetStatusMessagesParameters', null, { root: true })
    commit(
      'shared/setStatusMessageParameter',
      { key: 'showLoading', val: true },
      { root: true }
    )
    commit('resetUser')

    UserApi.show(this.$axios, id)
      .then((response) => {
        commit(
          'shared/setStatusMessageParameter',
          { key: 'showLoading', val: false },
          { root: true }
        )

        if (response.user) {
          commit('setUser', { key: 'name', value: response.user.name })
          commit('setUser', { key: 'email', value: response.user.email })
          commit('setUser', {
            key: 'is_super_admin',
            value: response.user.is_super_admin,
          })
        }
      })
      .catch((err) => {
        console.log(err)
      })
  },
  update({ commit, state, dispatch }, payload) {
    commit('shared/resetStatusMessagesParameters', null, { root: true })
    commit(
      'shared/setStatusMessageParameter',
      { key: 'showLoading', val: true },
      { root: true }
    )

    const dataToSend = { ...state.user }

    UserApi.update(this.$axios, dataToSend, payload.id)
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
          payload.router.push('/user')
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
  delete({ commit, state, dispatch }, id) {
    commit('shared/resetStatusMessagesParameters', null, { root: true })
    commit(
      'shared/setStatusMessageParameter',
      { key: 'showLoading', val: true },
      { root: true }
    )

    UserApi.delete(this.$axios, id)
      .then((response) => {
        commit(
          'shared/setStatusMessageParameter',
          { key: 'showLoading', val: false },
          { root: true }
        )
        if (response.success) {
          const userList = { ...state.userList }
          userList.data = userList.data.filter((item) => item.id !== id)

          commit('setUserList', userList)
          commit(
            'shared/setStatusMessageParameter',
            { key: 'success_message', val: response.message },
            { root: true }
          )
        }
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
}
