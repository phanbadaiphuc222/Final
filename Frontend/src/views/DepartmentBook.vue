<template>
     <!-- cursor: pointer; -->
    <!-- <AppHeader/> -->
    <nav class="navbar navbar-expand navbar-dark" style="height: 70px">
          <div class="mr-auto nabar-bar" >
          </div>
          <div class="signOutIcon">
               <i 
                    class="fa fa-sign-out fa-2xl" 
                    style="color: grey; cursor: pointer"
                    @click="Logout"
               >
               </i>
          </div> 
     </nav>
    <div style="background-color: #f0f2f6; padding: 25px 0px 25px 0px">
     <div class="box" style="background-color: white">
     <div class="page row test">
          <!-- <button @click="Logout">Logout</button> -->
         <div class="col-md-10">
              <InputSearch v-model="searchText" />
         </div>
         <div class="mt-3 col-md-6">
              <h4>
                   Departments
                   <!-- <i class="fas fa-address-book" /> -->
              </h4>
              <DepartmentList 
                   v-if="filteredDepartmentsCount > 0"
                   :departments="filteredDepartments"
                   v-model:activeIndex="activeIndex"
              />
              <p v-else>
                   No department exist.
              </p>

              <div class="mt-3 row justify-content-around align-items-center">
                   <button
                        class="btn btn-sm btn-primary"
                        @click="refreshList()"
                   >    
                        <i class="fas fa-redo" /> Refresh
                   </button>

                   <!-- @click="goToAddDepartment" -->
                   <button
                        class="btn btn-sm btn-success"
                        @click="isOpen = true"
                   >
                        <i class="fas fa-plus" /> Add new
                   </button>

                   <!-- <button
                        class="btn btn-sm btn-danger"
                        @click="onDeleteDepartments"
                   >
                        <i class="fas fa-plus" /> Delete all
                   </button> -->
              </div>
         </div>

         <DepartmentForm 
               :department="department" 
               @submit:department="onCreateDepartment" 
               :open="isOpen"
               @close="isOpen = !isOpen" 
               style="z-index: 100">
          </DepartmentForm>
         <div class="mt-3 col-md-6">
               <div v-if="activeDepartment">
                   <h4>
                        Detail information
                        <i class="fas fa-address-card" />
                   </h4>
                    <DepartmentCard :department="activeDepartment" />
                    <!-- <router-link
                         :to="{
                             name: 'department.edit',
                             params: { id: activeDepartment.id },
                         }"
                    > -->
                         <span class="mt-2 badge badge-warning">
                             <i class="fas fa-edit" /> Modify
                         </span>
                   <!-- </router-link> -->
              </div>
         </div>
    </div>
    </div>
    </div>
</template>

<script>
import DepartmentCard from '@/components/DepartmentCard.vue';
import InputSearch from '@/components/InputSearch.vue';
import DepartmentList from '@/components/DepartmentList.vue';
import AppHeader from '@/components/AppHeader.vue';
import DepartmentForm from '@/components/DepartmentForm.vue';
import { departmentService } from '@/services/department.service';

import firebase from 'firebase';
import { ref, onBeforeMount } from 'vue';

export default {
     components: {
         DepartmentCard,
         InputSearch,
         DepartmentList,
         AppHeader,
         DepartmentForm,
     },

     props: {
          departmentId: { type: String, required: true },
     },

     setup () {

          const Logout = () => {
               firebase
                    .auth()
                    .signOut()
                    .then(() => console.log("Signed out"))
                    .catch(err => alert(err.message));
          }

          const isOpen = ref(false);

          return {
               Logout,
               isOpen
          }

     },

    data() {
         return {
              departments: [],
              activeIndex: -1,
              searchText : '',
              department: {
                name: '',
                id: '',
               },
               message: '',
         };
    },

    watch: {
         searchText() {
              this.activeIndex = -1;
         },
    },

     computed : {
          departmentAsString() {
               return this.departments.map((department) => {
                    const { name, id } = department;
                    return [ name, id ].join('');
               });
          },

          filteredDepartments() {
               if (!this.searchText) return this.departments;
               return this.departments.filter((department, index) => 
                    this.departmentAsString[index].includes(this.searchText)
               );
          },

          activeDepartment() {
               if (this.activeIndex < 0) return null;
               return this.filteredDepartments[this.activeIndex];
          },

          filteredDepartmentsCount() {
               return this.filteredDepartments.length;
          },
    },

    methods: {

         async retrieveDepartments() {
               try {
                    const departmentList = await departmentService.getMany();
                    this.departments = departmentList.sort((current, next) =>
                         current.name.localeCompare(next.name)
                    );
               } catch (error) {
                   console.log(error);
               }
         },

         refreshList() {
              this.retrieveDepartments();
              this.activeIndex = -1;
         },

         async onCreateDepartment(department) {
            try {
                await departmentService.create(department);
                this.message = 'Department added successfully';
            } catch (error) {
                console.log(error);
            }
        },

         async onDeleteDepartments() {
               if (confirm('Do you want to delete this department?')) {
                   try {
                        await departmentService.deleteMany();
                        this.refreshList();
                   } catch (error) {
                        console.log(error);
                   }
              }
         },

          goToAddDepartment() {
               this.$router.push({ name:'department.add' });
          },
     },
     mounted () {
         this.refreshList();
     },


     created() {
        this.department = {
            name: '',
            id: ''
        };
        this.message = '';
    },
};
</script>

<style scoped>
.page {
    text-align: left;
    max-width: 750px;
}

.test {
     margin-top: 38px;
}

.box {
     box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
     margin: 0px 100px 100px 100px;
     padding: 25px 0px 25px 0px
}

.signOutIcon {
     margin-right: 50px;
}

.accountIcon {
     margin-right: 100px;
}

</style>