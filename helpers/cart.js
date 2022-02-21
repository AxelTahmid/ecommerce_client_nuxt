export const addToCart = (productId, amount = 1, store, router) => {
  if (
    !store.state.general.auth.is_logged ||
    !store.state.general.auth.auth_token
  ) {
    router.push('/login')
    return
  }

  store.dispatch('cart/store', { product_id: productId, amount })

  setTimeout(() => {
    if (store.state.cart.error_message === '') {
      router.push('/cart')
    }
  }, 2000)
}

export const updateCartItemAmount = (productId, amount, store, router) => {
  if (
    !store.state.general.auth.is_logged ||
    !store.state.general.auth.auth_token
  ) {
    router.push('/login')
    return
  }

  store.dispatch('cart/update', { product_id: productId, amount })
}

export const removeFromCartByProductId = (productId, store, router) => {
  if (confirm('Are you sure?')) {
    if (
      !store.state.general.auth.is_logged ||
      !store.state.general.auth.auth_token
    ) {
      router.push('/login')
      return
    }

    const cartItem = store.state.cart.cart.find(
      (item) => item.product_id === productId
    )

    store.dispatch('cart/removeCartItem', cartItem.id)
  }
}

export const removeFromCartByItemId = (id, store, router) => {
  if (confirm('Are you sure?')) {
    if (
      !store.state.general.auth.is_logged ||
      !store.state.general.auth.auth_token
    ) {
      router.push('/login')
      return
    }

    store.dispatch('cart/removeCartItem', id)
  }
}

export const isProductInCart = (productId, store) => {
  return (
    store.state.cart.cart.find((item) => item.product_id === productId) !==
    undefined
  )
}

export const clearCart = (store, router) => {
  if (confirm('Are you sure?')) {
    if (
      !store.state.general.auth.is_logged ||
      !store.state.general.auth.auth_token
    ) {
      router.push('/login')
      return
    }

    store.dispatch('cart/clearCart')
  }
}
