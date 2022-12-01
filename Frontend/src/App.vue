<script>
import AppHeader from '@/components/AppHeader.vue';
import { onBeforeMount } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import firebase from 'firebase';
import { routerKey } from 'vue-router';

export default {
  components : {
    AppHeader,
  },

  setup () {
    const router = useRouter();
    const route= useRoute();

    onBeforeMount (() => {
      firebase.auth().onAuthStateChanged((user) => {
        if (!user) {
          router.replace('/login');
        } else if (route.path == "/login" || route.path == "/") {
          router.replace('/departmentbook');
        }
      })
    })
  }
};
</script>

<template>
  
  <!-- <div class="container mt-3">
    <router-view/>
  </div> -->
  <router-view/>
</template>

<style>
  .page {
  max-width: 400px;
  margin: auto;
}
</style>