<script>
import { getTransitionRawChildren } from 'vue';

export default {
     props: {
          departments: { type: Array, default: () => []},
          activeIndex: { type: Number, default : -1 },
     },
     emits: ['update:activeIndex'],
     methods: {
          updateActiveIndex(index, x) {
               this.$emit('update:activeIndex', index);
               // console.log(x)
               this.$router.push({path: `/${x}`})
          },

          moveToLogin() {
               this.$router.push("/login");
          }

          // getDepartmentId() {
               
          // }
     },
};
</script>

<template>
     <ul class="list-group">
          <li 
               class="list-group-item d-flex justify-content-between align-items-center list "
               v-for="(department, index) in departments"
               :class="{ active: index === activeIndex }"
               style="cursor: pointer"
               @click="updateActiveIndex(index, department.id)"
          >
               {{ department.name }} 
               <span class="badge badge-primary badge-pill">{{ department.id }}</span>
          </li>
     </ul>
</template>

<style scoped>
     .list {
          width: 660px;
     }
</style>