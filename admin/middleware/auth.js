export default function ({ redirect }) {
  if (
    localStorage.getItem('is_authenticated') === null ||
    localStorage.getItem('auth_token') === null ||
    localStorage.getItem('user_data') === null
  ) {
    redirect('/login')
  } else {
    let user = localStorage.getItem('user_data')
    user = JSON.parse(user)
    if (user.is_super_admin !== 1) {
      localStorage.removeItem('auth_token')
      localStorage.removeItem('is_authenticated')
      localStorage.removeItem('user_data')

      redirect('/login')
    }
  }
}
