<template>
  <q-page class="flex column flex-center justify-around">
    <div class="q-pa-md row items-center justify-center q-gutter-md">
      <q-card id="index" class="my-card">
        <q-img src="radaLogo.png">
          <div class="absolute-bottom">
            <div class="text-h4">Welcome</div>
            <div class="text-overline">
              django-allauth social login example in VUE
            </div>
          </div>
        </q-img>

        <q-card-actions>
          <q-btn flat :to="{ name: 'login' }">Login</q-btn>
          <q-btn flat :to="{ name: 'logout' }">Sign Up</q-btn>
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
<script setup></script>
