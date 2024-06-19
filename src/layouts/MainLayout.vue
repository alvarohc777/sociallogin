<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> Quasar App </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> Essential Links </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
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

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
})
</script>
