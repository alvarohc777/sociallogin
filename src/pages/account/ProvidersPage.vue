<template>
  <q-page class="flex flex-center">
    <div class="q-pa-md" style="max-width: 90vw">
      <q-table
        title="Providers"
        :rows="providers"
        :columns="columns"
        row-key="name"
        hide-bottom
        wrap-cells="true"
      />
    </div>
  </q-page>
</template>

<script setup>
import { api } from 'src/boot/axios'
import { ref } from 'vue'
const providers = ref([])
const columns = [
  { name: 'username', label: 'Username', field: row => row.display },
  { name: 'UID', label: 'UID', field: row => row.uid },
  { provider: 'provider', label: 'Provider', field: row => row.provider.name }
]
const checkSession = token => {
  api
    .get('/_allauth/browser/v1/auth/session')
    .then(response => {
      console.log(response.data)
      console.log(response.data.data.methods)
    })
    .catch(error => console.log('error message: ', error.message))
}
const checkProviders = () => {
  api.get('/_allauth/browser/v1/account/providers').then(response => {
    providers.value = response.data.data
    console.log(response.data.data)
  })
}
checkSession()
checkProviders()
</script>
