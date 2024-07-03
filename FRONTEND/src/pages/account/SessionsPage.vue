<template>
  <q-page class="flex flex-center column">
    <q-card>
      <div class="q-pa-md" style="max-width: 90vw">
        <q-table
          title="Sessions"
          :rows="sessions"
          :columns="columns"
          row-key="name"
          hide-bottom
          :wrap-cells="true"
        >
          <template v-slot:body-cell-currentSession="props">
            <q-td key="currentSession" :props="props">
              <q-badge v-if="props.row.is_current" rounded>
                <q-icon name="fa-solid fa-location-dot" />
              </q-badge>
            </q-td>
          </template>
          <template v-slot:body-cell-logout="props">
            <q-td key="logout" :props="props">
              <q-btn color="primary" dense @click="deleteSession(props.row.id)">
                Logout
              </q-btn>
            </q-td>
          </template>
        </q-table>
      </div>
    </q-card>
  </q-page>
</template>

<script setup>
import { api } from 'src/boot/axios'
import { onMounted, ref } from 'vue'
import { getCsrfToken } from 'src/lib/auth'
import { useRouter } from 'vue-router'
const router = useRouter()

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
const checkSession = async token => {
  api
    .get('/_allauth/browser/v1/auth/sessions')
    .then(response => {
      console.log(response.data.data)

      sessions.value = response.data.data
    })
    .catch(error => console.log('error message: ', error.message))
}
onMounted(() => {
  checkSession()
})

function deleteSession (session) {
  api
    .delete('_allauth/browser/v1/auth/sessions', {
      headers: {
        'X-CSRFToken': getCsrfToken()
      },
      data: {
        sessions: [session]
      }
    })
    .then(() => checkSession())
    .catch(error => {
      console.log('error message: ', error.request.status)
      if (error.request.status === 401) {
        router.push({ name: 'index' })
      }
    })
}
</script>
