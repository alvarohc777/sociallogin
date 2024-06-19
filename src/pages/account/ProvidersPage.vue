<template>
  <q-page class="flex flex-center">
    <div class="q-pa-md" style="max-width: 90vw">
      <q-table
        title="Providers"
        :rows="providers"
        :columns="columns"
        :key="providers"
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

const checkProviders = () => {
  api.get('/_allauth/browser/v1/account/providers').then(response => {
    providers.value = response.data.data
    console.log(response.data.data)
  })
}

checkProviders()
</script>
