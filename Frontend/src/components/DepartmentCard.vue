<script>
// import { objectToString } from '@vue/shared';

export default {
     props: {
        department : { type: Object, require: true},
     },
};
</script>

<template>
     <div>
          <div class="p-1">
               <strong>Name:</strong>
               {{ department.name }}
          </div>
          <div class="p-1">
               <strong>Id:</strong>
               {{ department.id }}
          </div>
          <!-- <div class="p-1">
               <strong>Hometown:</strong>
               {{ student.hometown }}
          </div>
          <div class="p-1">
               <strong>Grade:</strong>
               {{ student.grade }}
          </div>
          <div class="p-1">
               <strong>Class Id:</strong>
               {{ student.class_id }}
          </div>
          <div class="p-1">
               <strong>Class Name:</strong>
               {{ student.className }}
          </div> -->
     </div>
</template>