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
      <q-form autofocus>
        <div class="flex flex-center justify-center">
          <div class="input">
            <q-input
              borderless
              :dense="isDense"
              v-model="username"
              :label="'Username'"
              type="text"
              :color="inputColor"
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
              :color="inputColor"
              lazy-rules
            >
            </q-input>
          </div>
        </div>
        <div class="flex flex-between justify-center q-pt-md">
          <q-btn
            label="Submit"
            type="submit"
            color="primary"
            size="md"
            class="button"
            dense
          />
        </div>
      </q-form>
      <div
        v-if="providers.length > 0"
        style="
          font-size: 25px;
          font-weight: bold;
          align-items: center;
          justify-content: center;
          margin-top: 30px;
          display: flex;
          width: 100%;
        "
        class="flex column q-mb-lg"
      >
        <div class="text-caption">access with</div>
        <q-btn
          class="q-ma-sm button"
          v-for="provider in providers"
          :key="provider"
          dense
          @click="redirectToProvider(provider.id)"
        >
          {{ provider.name }}
        </q-btn>
      </div>
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
import SocialLogin from 'src/components/SocialLogin.vue'
const providers = ref([])
const username = ref('')
const password = ref('')
const isDense = false

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
