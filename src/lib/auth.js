import { api } from 'src/boot/axios'

async function checkAuth () {
  try {
    const response = await api.get('/_allauth/browser/v1/auth/session')
    return response.data.meta.is_authenticated
  } catch (err) {
    return false
  }
}

const getCsrfToken = () => {
  const cookies = document.cookie
  const cookieArray = cookies.split(';')
  const cookieObj = {}
  cookieArray.forEach(cookie => {
    const [key, value] = cookie.split('=')
    cookieObj[key.trim()] = value ? value.trim() : ''
  })
  const csrfToken = cookieObj.csrftoken
  return csrfToken
}

export { checkAuth, getCsrfToken }
