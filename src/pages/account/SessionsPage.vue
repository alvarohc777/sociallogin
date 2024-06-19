<template>
  <q-page class="flex flex-center">
    <div class="q-pa-md" style="max-width: 90vw">
      <q-table
        title="Sessions"
        :rows="sessions"
        :columns="columns"
        row-key="name"
        hide-bottom
        wrap-cells="true"
      >
        <template v-slot:body-cell-currentSession="props">
          <q-td key="currentSession" :props="props">
            <q-badge v-if="props.row.is_current" rounded>
              <q-icon name="fa-solid fa-location-dot" />
            </q-badge>
          </q-td>
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<script setup>
import { api } from 'src/boot/axios'
import { ref } from 'vue'
const sessions = ref([])
const columns = [
  { name: 'startedAt', label: 'Started At', field: row => row.created_at },
  { name: 'ip', label: 'IP Address', field: row => row.ip },
  { name: 'browser', label: 'Browser', field: row => row.user_agent },
  {
    name: 'currentSession',
    label: 'Current Session',
    // field: row => (row.is_current ? '⭐' : '')
    field: row => row.is_current
  },
  { name: 'logout', label: 'Logout', field: row => row.id }
]
const checkSession = token => {
  api
    .get('/_allauth/browser/v1/auth/sessions')
    .then(response => {
      console.log(response.data.data)

      sessions.value = response.data.data
    })
    .catch(error => console.log('error message: ', error.message))
}
checkSession()
</script>
