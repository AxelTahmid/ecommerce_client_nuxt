const PaymentMethodsApi = {
  setAuthToken: (axios) => {
    axios.setHeader(
      'Authorization',
      'Bearer ' + localStorage.getItem('auth_token')
    )
  },
  list: (axios) => {
    PaymentMethodsApi.setAuthToken(axios)
    return axios.$get('/api/paymentMethods')
  },
}

export { PaymentMethodsApi }
