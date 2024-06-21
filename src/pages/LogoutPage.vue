<template>
  <q-page class="flex flex-center">
    <div>
      <q-btn
        color="primary"
        icon="check"
        label="Logout"
        @click="logoutSession()"
      />
    </div>
  </q-page>
</template>

<script setup>
import { api } from 'src/boot/axios'
import { getCsrfToken } from 'src/lib/auth'

const logoutSession = () => {
  api
    .delete(
      '/_allauth/browser/v1/auth/session',

      {
        headers: {
          'X-CSRFToken': getCsrfToken()
        }
      }
    )
    .then(response => console.log(response))
    .catch(error => console.log('error message: ', error.message))
  document.location.reload()
}
</script>
