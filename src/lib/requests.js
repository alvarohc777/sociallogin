import { getCsrfToken } from './auth'
import { BASE_URL } from 'src/boot/axios'

const postForm = (action, data) => {
  const form = document.createElement('form')
  form.method = 'POST'
  form.action = action

  for (const key in data) {
    const input = document.createElement('input')
    input.type = 'hidden'
    input.name = key
    input.value = data[key]
    form.appendChild(input)
  }

  document.body.appendChild(form)
  console.log(BASE_URL)
  form.submit()
}

// Function to redirect to provider with necessary data
const redirectToProvider = (
  providerId,
  callbackURL = '/api/login/redirect/',
  // callbackURL = '/accounts/github/login/callback/',
  process = 'login'
  // process = 'connect'

) => {
  postForm('http://localhost:8000/_allauth/browser/v1/auth/provider/redirect', {
    provider: providerId,
    process,
    callback_url: callbackURL,
    csrfmiddlewaretoken: getCsrfToken()
  })
}

export { redirectToProvider }
