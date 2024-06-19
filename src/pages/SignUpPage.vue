<template>
  <q-page class="flex flex-center">
    <q-card class="my-card" style="width: 70vw; margin: auto; max-width: 400px">
      <div
        style="
          font-size: 25px;
          font-weight: bold;
          align-items: center;
          justify-content: center;
          margin-top: 10px;
          display: flex;
          width: 100%;
        "
      >
        <div class="text-h5 text-weight-bold q-my-md">Sign Up</div>
      </div>
      <q-form autofocus @submit="submit($event)">
        <div class="flex flex-center justify-center">
          <div class="input">
            <q-input
              borderless
              :dense="isDense"
              v-model="email"
              :label="'Email'"
              type="email"
              :rules="[requiredField, containsWhiteSpace]"
              hide-bottom-space
              lazy-rules
            >
            </q-input>
          </div>
          <div class="input">
            <q-input
              borderless
              :dense="isDense"
              v-model="username"
              :label="'Username'"
              type="text"
              :rules="[requiredField, containsWhiteSpace]"
              hide-bottom-space
              lazy-rules
            >
            </q-input>
          </div>
          <div class="input">
            <q-input
              borderless
              :dense="isDense"
              v-model="password"
              :label="'Password'"
              type="password"
              lazy-rules
            >
            </q-input>
          </div>
          <div class="input" v-if="password">
            <q-input
              borderless
              :dense="isDense"
              v-model="password2"
              :label="'Confirm Password'"
              type="password"
              lazy-rules
            >
            </q-input>
          </div>
        </div>
        <div class="flex flex-between justify-center q-py-md">
          <q-btn
            label="Submit"
            type="submit"
            color="primary"
            size="md"
            class="button"
            :loading="loading"
            dense
          />
        </div>
      </q-form>
      <social-login :providers="providers" process="connect" />
    </q-card>
  </q-page>
</template>

<style lang="scss">
.input {
  width: 90%;
}
.button {
  min-width: 100px;
}
</style>

<script setup>
import { api } from 'src/boot/axios'
import { ref } from 'vue'
// import { redirectToProvider } from 'src/lib/requests'
import SocialLogin from 'components/SocialLogin.vue'
import { getCsrfToken } from 'src/lib/auth'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'

const $q = useQuasar()
const router = useRouter()

const providers = ref([])
const email = ref('alvarohc777@gmail.com')
const username = ref('andy777')
const password = ref('qwas12@:')
const password2 = ref('qwas12@:')
const loading = ref(false)
const isDense = false

const submit = async event => {
  if (event) {
    event.preventDefault()
  }
  if (password.value !== password2.value) {
    $q.notify({
      color: 'red-5',
      textColor: 'white',
      icon: 'warning',
      message: 'Passwords do not match'
    })
    return
  }
  loading.value = true
  // const data = ref('')
  api
    .post(
      '/_allauth/browser/v1/auth/signup',
      {
        email: email.value,
        username: username.value,
        password: password.value
      },
      { headers: { 'X-CSRFToken': getCsrfToken() } }
    )
    .then(response => {
      // data.value = response
      console.log('response: ', response.data)
      $q.notify({
        color: 'green-4',
        textColor: 'white',
        icon: 'cloud_done',
        message: 'Signed Up'
      })
      router.push({ name: 'logout' })
      api.delete('/_allauth/browser/v1/auth/session', {
        headers: {
          'X-CSRFToken': getCsrfToken()
        }
      })
    })
    .catch(error => {
      console.log('error: ', error)
      $q.notify({
        color: 'negative',
        textColor: 'white',
        icon: 'error_outline',
        message: `${error.response.data.errors[0].message}`
      })
    })
    .finally(() => {
      loading.value = false
    })
}

// api
//   .post(
//     '_allauth/browser/v1/auth/provider/redirect',
//     {
//       provider: 'google',
//       process: 'login',
//       callback_url: '/account/provider/callback',
//       csrfmiddlewaretoken: parseCookies(document.cookie).csrftoken
//     },
//     {
//       headers: {
//         Cookie: `csrftoken=${parseCookies(document.cookie)}`,
//         'Content-Type': 'application/x-www-form-urlencoded'
//         // 'Access-Control-Allow-Origin': '*'
//       }
//       // Referer: 'http://localhost:9000/'
//     }
//   )
//   .then(response => {
//     console.log('response ', response)
//   })

api.get('/_allauth/browser/v1/config')
api
  .get(
    '/_allauth/browser/v1/config',

    { headers: { accept: 'application/json' } }
  )
  .then(response => {
    // Access headers from the response
    providers.value = response.data.data.socialaccount.providers
  })
  .catch(error => console.log(error))

const requiredField = val => !!val || 'Field is required'
const containsWhiteSpace = val =>
  val.indexOf(' ') === -1 || 'No white spaces allowed'
</script>
