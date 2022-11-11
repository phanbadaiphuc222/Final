<template>
    <AppHeader/>
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
    <div class="page row" >
         <div class="col-md-10">
              <InputSearch v-model="searchText" />
         </div>
         <div class="mt-3 col-md-6">
              <h4>
                   Students
                   <i class="fas fa-address-book" />
              </h4>
              <StudentList 
                   v-if="filteredStudentsCount > 0"
                   :students="filteredStudents"
                   v-model:activeIndex="activeIndex"
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

                   <button
                        class="btn btn-sm btn-danger"
                        @click="onDeleteContacts"
                   >
                        <i class="fas fa-plus" /> Delete all
                   </button>
              </div>
         </div>
         <div class="mt-3 col-md-6">
              <div v-if="activeStudent">
                   <h4>
                        Detail information
                        <i class="fas fa-address-card" />
                   </h4>
                    <StudentCard :student="activeStudent" />
                    <router-link
                         :to="{
                             name: 'student.edit',
                             params: { id: activeStudent.id },
                         }"
                    >
                        <span class="mt-2 badge badge-warning">
                             <i class="fas fa-edit" /> Modify</span>
                   </router-link>
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

export default {
     components: {
         StudentCard,
         InputSearch,
         StudentList,
         AppHeader,
     },

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
                   const { name, id, email, DOB, hometown, major, department } = student;
                   return [ name, id, email, DOB, hometown, major, department ].join('');
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
     },
     mounted () {
         this.refreshList();
     },


};
</script>

<style scoped>
.page {
    text-align: left;
    max-width: 750px;
}

</style>