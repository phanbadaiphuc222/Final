<template>
    <AppHeader/>
    <div style="background-color: #f0f2f6; padding: 25px 0px 25px 0px">
     <div>
     <button
          type="button"
          class="ml-2 btn"
          style="display: inline"
          @click="$router.go(-1)"
     >
          <i class="fa-solid fa-arrow-left fa-xl"/>
     </button>
    </div>
     <div class="box" style="background-color: white">
     <div class="page row" >
         <div class="col-md-10">
              <InputSearch v-model="searchText" />
         </div>
         <div class="mt-3 col-md-6" id="students">
              <h4>
                   Students
                   <!-- <i class="fas fa-address-book" /> -->
              </h4>
              <StudentList 
                   v-if="filteredStudentsCount > 0"
                   :students="filteredStudents"
                   v-model:activeIndex="activeIndex"
                   @click="isOpen = true"
              />
              <p v-else>
                   No students exist.
              </p>

              <div class="mt-3 row justify-content-around align-items-center">
                   <button
                        class="btn btn-sm btn-primary"
                        @click="refreshList()"
                   >    
                        <i class="fas fa-redo" /> Refresh
                   </button>

                   <button
                        class="btn btn-sm btn-success"
                        @click="goToAddStudent"
                   >
                        <i class="fas fa-plus" /> Add new
                   </button>
<!-- 
                   <button
                        class="btn btn-sm btn-danger"
                        @click="onDeleteContacts"
                   >
                        <i class="fas fa-plus" /> Delete all
                   </button> -->
              </div>
         </div>
         <div v-if="activeStudent" class="mt-6 col-md-4" id="detailInfor">
               <div class="mt-4">
                    <StudentCard 
                         :student="activeStudent"
                         :open="isOpen"
                         @close="isOpen = !isOpen"
                         class="studentCard"
                    />
                    <router-link
                         :to="{
                             name: 'student.edit',
                             params: { id: activeStudent.id },
                         }"
                    >
                        <span class="mt-2 badge badge-warning">
                             <i class="fas fa-edit" />Modify
                         </span>
                   </router-link>
              </div>
         </div>
         
    </div>
</div>
</div>
    
    
</template>

<script>
import StudentCard from '@/components/StudentCard.vue';
import InputSearch from '@/components/InputSearch.vue';
import StudentList from '@/components/StudentList.vue';
import { studentService } from '@/services/student.service';
import AppHeader from '@/components/AppHeader.vue';
import { ref } from 'vue';

export default {
     components: {
         StudentCard,
         InputSearch,
         StudentList,
         AppHeader,
     },

     setup() {
          const isOpen = ref(false);
          return { isOpen }
     },

     emits: ['update:activeIndex'],

     props: {
        departmentId: { type: Object, required: true },
     },

    data() {
         return {
              students: [],
              activeIndex: -1,
              searchText : '',
         };
    },

    watch: {
         searchText() {
              this.activeIndex = -1;
         },
    },

    computed : {
          studentAsString() {
              return this.students.map((student) => {
                   const { name, id, email, DOB, hometown, major, department, image } = student;
                   return [ name, id, email, DOB, hometown, major, department, image ].join('');
              });
          },

          filteredStudents() {
              if (!this.searchText) return this.students;
              return this.students.filter((student, index) => 
                   this.studentAsString[index].includes(this.searchText)
              );
          },

          activeStudent() {
              if (this.activeIndex < 0) return null;
              return this.filteredStudents[this.activeIndex];
          },

          filteredStudentsCount() {
              return this.filteredStudents.length;
          },
    },

    methods: {
          async retrieveAccounts() {
              try {
                   const studentList = await studentService.getStudentByDepartment(this.departmentId);
                   this.students = studentList.sort((current, next) =>
                        current.name.localeCompare(next.name)
                   );
              } catch (error) {
                   console.log(error);
              }
          },

         refreshList() {
              this.retrieveAccounts();
              this.activeIndex = -1;
         },

         async onDeleteContacts() {
              if (confirm('Bạn muốn xóa tất cả Liên hệ')) {
                   try {
                        await studentService.deleteMany();
                        this.refreshList();
                   } catch (error) {
                        console.log(error);
                   }
              }
         },

          goToAddStudent() {
               this.$router.push({ name:'student.add' });
          },

          onFileSelected(event) {
               this.selectedFile = event.target.files[0];
          },

          updateActiveIndex(index) {
               this.$emit('update:activeIndex', index);
          },
     },
     mounted () {
         this.refreshList();
     },


};
</script>

<style scoped>
.page {
    /* text-align: left; */
    max-width: 1000px;
}

.box {
     box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
     margin: 0px 100px 150px 100px;
     padding: 25px 0px 25px 0px
}

.studentCard {
     z-index: 100;
}

/* #detailInfor{
    margin-left: 100px;
} */

</style>