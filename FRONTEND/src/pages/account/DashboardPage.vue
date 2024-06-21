<template>
  <q-page class="flex column flex-center justify-around">
    <div class="q-pa-md row items-center justify-center q-gutter-md">
      <q-card id="index" class="my-card">
        <q-img src="radaLogo.png">
          <div class="absolute-bottom">
            <div class="text-h4">Welcome</div>
            <div class="text-overline">{{ username }}</div>
          </div>
        </q-img>

        <q-card-actions>
          <q-btn flat :to="{ name: 'providers' }">Providers</q-btn>
          <q-btn flat :to="{ name: 'sessions' }">Sessions</q-btn>
        </q-card-actions>
      </q-card>
    </div>
  </q-page>
</template>
<style lang="scss">
#index {
  width: 40vh;
}
</style>
<script setup>
import { api } from 'src/boot/axios'
import { ref } from 'vue'
const username = ref('')
const checkSession = token => {
  api
    .get('/_allauth/browser/v1/auth/session')
    .then(response => {
      console.log(response.data)
      username.value = response.data.data.user.username
    })
    .catch(error => console.log('error message: ', error.message))
}

checkSession()
</script>
