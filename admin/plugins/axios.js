export default function ({ app, store, $axios }) {
  return {
    headers: {
      'content-type': 'application/json',
      Accept: 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  }
}
