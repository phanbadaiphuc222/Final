<script>
import AppHeader from '@/components/AppHeader.vue';

export default {
  components : {
    AppHeader,
  },
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