export default function ({ app, store, $axios }) {
  return {
    headers: {
      'content-type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Accept: 'application/json',
    },
  }
}
