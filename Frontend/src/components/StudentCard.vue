<script>
// import { objectToString } from '@vue/shared';

export default {
     props: {
        student : { type: Object, require: true},
     },
};

</script>

<template>
     <div>
          <div class="p-1">
               <strong>Name:</strong>
               {{ student.name }}
          </div>
          <div class="p-1">
               <strong>Id:</strong>
               {{ student.id }}
          </div>
          <div class="p-1">
               <strong>Email:</strong>
               {{ student.email }}
          </div>
          <div class="p-1">
               <strong>Date of birth:</strong>
               {{ student.DOB }}
          </div>
          <div class="p-1">
               <strong>Hometown:</strong>
               {{ student.hometown }}
          </div>
          <div class="p-1">
               <strong>Major:</strong>
               {{ student.major }}
          </div>
          <div class="p-1">
               <strong>Department:</strong>
               {{ student.department }}
          </div>
          <div class="p-1">
               <strong>Image:</strong>
               <img :src="student.image" style="width: 350px">
          </div>
     </div>
</template>