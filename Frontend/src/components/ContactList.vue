<script>
export default {
     props: {
          accounts: { type: Array, default: () => []},
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
               class="list-group-item"
               v-for="(account, index) in accounts"
               
               :class="{ active: index === activeIndex }"
               @click="updateActiveIndex(index)"
          >
               {{ account.name }}     
          </li>
     </ul>
</template>

<!-- :key="account.id" -->