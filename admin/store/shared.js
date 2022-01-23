export const state = () => ({
  status_messages: {
    showLoading: false,
    success_message: '',
    error_message: '',
    validation_errors: [],
  },
})

export const mutations = {
  setStatusMessageParameter(state, value) {
    state.status_messages[value.key] = value.val
  },
  resetStatusMessagesParameters(state) {
    state.status_messages = {
      showLoading: false,
      success_message: '',
      error_message: '',
      validation_errors: [],
    }
  },
}
