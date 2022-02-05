export const updateRouteQueryString = (key, value, $route, $router) => {
  const query = { ...$route.query }

  query[key] = value

  $router.push({ path: $route.path, query })
}

export const paginate = ({ $store, $route, $router }, pageNumber) => {
  $store.commit('general/setPage', pageNumber)

  updateRouteQueryString('page', pageNumber, $route, $router)

  $store.dispatch('general/fetchShopProducts')
}
