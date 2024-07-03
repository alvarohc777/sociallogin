<template>
  <q-page class="flex flex-center column">
    <q-card>
      <div class="q-pa-md" style="max-width: 90vw">
        <q-table
          title="Providers"
          :rows="providers"
          :columns="columns"
          :key="providers"
          row-key="name"
          hide-bottom
          :wrap-cells="true"
        >
          <template v-slot:body-cell-disconnect="props">
            <q-td key="currentSession" :props="props">
              <q-btn
                color="primary"
                dense
                @click="disconnectSession(props.row.provider.id, props.row.uid)"
              >
                Disconnect
              </q-btn>
            </q-td>
          </template>
        </q-table>
      </div>

      <div class="q-pa-md" style="max-width: 90vw">
        <social-login
          :providers="filteredAvailableProviders"
          process="connect"
          caption="Connect additional providers"
          callbackURL="/api/login/connect-provider/"
        />
      </div>
    </q-card>
  </q-page>
</template>

<script setup>
import { api } from 'src/boot/axios'
import { ref, computed } from 'vue'
import SocialLogin from 'src/components/SocialLogin.vue'
import { getCsrfToken } from 'src/lib/auth'

const availableProviders = ref([])
const providers = ref([])
const columns = [
  { name: 'username', label: 'Username', field: row => row.display },
  { name: 'UID', label: 'UID', field: row => row.uid },
  { name: 'provider', label: 'Provider', field: row => row.provider.name },
  { name: 'disconnect', label: 'Disconnect', field: row => row.provider.name }
]

const checkProviders = () => {
  api.get('/_allauth/browser/v1/account/providers').then(response => {
    providers.value = response.data.data
    console.log('providers', response.data.data)
  })
}

api
  .get('/_allauth/browser/v1/config', {
    headers: { accept: 'application/json' }
  })
  .then(response => {
    // Access headers from the response
    availableProviders.value = response.data.data.socialaccount.providers
    console.log('info: ', response.data)
  })
  .catch(error => console.log(error))
checkProviders()

function disconnectSession (provider, account) {
  api
    .delete('_allauth/browser/v1/account/providers', {
      headers: {
        'X-CSRFToken': getCsrfToken()
      },
      data: {
        provider,
        account
      }
    })
    .then(() => {
      checkProviders()
    })
    .catch(error => {
      console.log('error message: ', error.request.status)
    })
}
const filteredAvailableProviders = computed(() => {
  const providerNames = providers.value.map(provider => provider.provider.name)
  return availableProviders.value.filter(
    availableProvider => !providerNames.includes(availableProvider.name)
  )
})
</script>
