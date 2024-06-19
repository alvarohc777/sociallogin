<template>
  <q-layout view="hHh LpR lFr">
    <q-header elevated reveal>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title
          ><router-link
            :to="{ name: 'index' }"
            style="text-decoration: none; color: inherit"
          >
            Social Login Example
          </router-link>
        </q-toolbar-title>
        <div class="flex flex-center gt-xs">
          <q-btn color="white" label="Login" :to="{ name: 'login' }" flat />
          <q-btn color="white" label="Signup" :to="{ name: 'signup' }" flat />
        </div>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          class="lt-sm"
          @click="toggleRightDrawer"
        />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" bordered overlay>
      <q-list>
        <q-item-label header> Essential Links </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>
    <q-drawer
      side="right"
      bordered
      v-model="rightDrawerOpen"
      overlay
      content-class="bg-grey-3"
      width="120"
    >
      <q-list bordered>
        <q-item>
          <q-btn color="primary" label="Login" :to="{ name: 'login' }" flat />
        </q-item>
        <q-item>
          <q-btn
            color="secondary"
            label="Signup"
            :to="{ name: 'signup' }"
            flat
          />
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'

const linksList = [
  {
    title: 'Github',
    caption: 'https://github.com/alvarohc777',
    icon: 'fa-brands fa-github',
    link: 'https://github.com/alvarohc777'
  },
  {
    title: 'LinkedIn',
    caption: 'Alvaro Herrada Coronell',
    icon: 'fa-brands fa-linkedin',
    link: 'https://www.linkedin.com/in/%C3%A1lvaro-andr%C3%A9s-herrada-coronell-4a6372230/'
  },
  {
    title: 'Frontend Repository',
    caption: 'alvarohc777/sociallogin.frontend',
    icon: 'fa-solid fa-code',
    link: 'https://github.com/alvarohc777/sociallogin.frontend'
  },
  {
    title: 'Backend Repository',
    caption: 'alvarohc777/sociallogin.backend',
    icon: 'fa-solid fa-server',
    link: 'https://github.com/alvarohc777/sociallogin.backend'
  },
  {
    title: 'django-allauth docs',
    caption: 'docs.allauth.org',
    icon: 'fa-solid fa-book',
    link: 'https://docs.allauth.org/en/latest/'
  }
]

const leftDrawerOpen = ref(false)
const rightDrawerOpen = ref(false)

const essentialLinks = linksList

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
const toggleRightDrawer = () => {
  rightDrawerOpen.value = !rightDrawerOpen.value
}
</script>
