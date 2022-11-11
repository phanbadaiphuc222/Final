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
               class="list-group-item"
               v-for="(department, index) in departments"
               :class="{ active: index === activeIndex }"
               @click="updateActiveIndex(index, department.id)"
          >
               {{ department.name }} 
          </li>
     </ul>
</template>