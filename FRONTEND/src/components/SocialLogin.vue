<template>
  <div
    v-if="providers.length > 0"
    style="
      font-size: 25px;
      font-weight: bold;
      align-items: center;
      justify-content: center;

      display: flex;
      width: 100%;
    "
    class="flex column q-mb-lg q-mt-sm"
  >
    <div class="text-caption">{{ caption }}</div>
    <q-btn
      class="q-ma-sm button"
      v-for="provider in providers"
      :key="provider"
      dense
      @click="redirectToProvider(provider.id, callbackURL, process)"
    >
      {{ provider.name }}
    </q-btn>
  </div>
</template>
<script setup>
import { redirectToProvider } from 'src/lib/requests'
import { toRefs } from 'vue'

// const props = defineProps(['providers', 'process', 'caption'])
const props = defineProps({
  providers: Array,
  process: String,
  caption: String,
  callbackURL: {
    type: String,
    default: '/api/login/redirect/'
  }
})
const { providers, process, caption, callbackURL } = toRefs(props)
console.log(callbackURL.value)
</script>
