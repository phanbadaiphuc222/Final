<script>
export default {
     props: {
          students: { type: Array, default: () => []},
          activeIndex: { type: Number, default : -1 },
     },
     emits: ['update:activeIndex'],
     methods: {
          updateActiveIndex(index) {
               this.$emit('update:activeIndex', index);
          },
     },
};
</script>

<template>
     <ul class="list-group">
          <li 
               class="list-group-item d-flex justify-content-between align-items-center"
               v-for="(student, index) in students"
               style="width: 660px"
               :class="{ active: index === activeIndex }"
               @click="updateActiveIndex(index)"
          >
               {{ student.name }} 
               <!-- <span>
                    <span style="margin-left: 5px"><button class="btn btn-sm btn-warning">Edit</button></span>
                    <span style="margin-: 5px"><button class="btn btn-sm btn-danger"> Delete</button></span> 
               </span>   -->
          </li>
     </ul>
</template>

<style scoped>
li {
     cursor: pointer;
}
</style>

<!-- :key="account.id" -->