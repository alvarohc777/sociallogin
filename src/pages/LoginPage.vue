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
        <div class="text-h5 text-weight-bold q-my-md">Login</div>
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
        </div>
        <div class="flex justify-center q-py-md q-gutter-md">
          <q-btn
            label="Submit"
            type="submit"
            color="primary"
            size="md"
            class="button"
            dense
          />
          <q-btn
            label="Sign Up"
            type="submit"
            color="secondary"
            size="md"
            class="button"
            dense
            outline
            :to="{ name: 'signup' }"
          />
        </div>
      </q-form>
      <social-login :providers="providers" process="login"></social-login>
    </q-card>
  </q-page>
</template>

<style lang="scss">
.input {
  width: 80%;
}
.button {
  min-width: 100px;
}
</style>

<script setup>
import { api } from 'src/boot/axios'
import { ref } from 'vue'
import SocialLogin from 'src/components/SocialLogin.vue'
import { getCsrfToken } from 'src/lib/auth'
import { useRouter } from 'vue-router'

const router = useRouter()

const providers = ref([])
const email = ref('')
const password = ref('')
const loading = ref(false)
const isDense = false

const submit = async event => {
  if (event) {
    event.preventDefault()
  }
  loading.value = true
  // const data = ref('')
  api
    .post(
      '/_allauth/browser/v1/auth/login',
      {
        email: email.value,
        password: password.value
      },
      { headers: { 'X-CSRFToken': getCsrfToken() } }
    )
    .then(response => {
      // data.value = response
      console.log('response: ', response.data)
      router.push({ name: 'logout' })
    })
    .catch(error => console.log('error: ', error))
    .finally(() => {
      loading.value = false
    })
}

api.get('/_allauth/browser/v1/config')
api
  .get(
    '/_allauth/browser/v1/config',

    { headers: { accept: 'application/json' } }
  )
  .then(response => {
    // Access headers from the response
    providers.value = response.data.data.socialaccount.providers
    console.log('headers: ', providers.value)
  })
  .catch(error => console.log(error))
</script>
