<template>
    <AppHeader/>
    <div class="page row test">
         <div class="col-md-10">
              <InputSearch v-model="searchText" />
         </div>
         <div class="mt-3 col-md-6">
              <h4>
                   Departments
                   <i class="fas fa-address-book" />
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

                   <button
                        class="btn btn-sm btn-success"
                        @click="goToAddDepartment"
                   >
                        <i class="fas fa-plus" /> Add new
                   </button>

                   <button
                        class="btn btn-sm btn-danger"
                        @click="onDeleteDepartments"
                   >
                        <i class="fas fa-plus" /> Delete all
                   </button>
              </div>
         </div>
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
</template>

<script>
import DepartmentCard from '@/components/DepartmentCard.vue';
import InputSearch from '@/components/InputSearch.vue';
import DepartmentList from '@/components/DepartmentList.vue';
import { departmentService } from '@/services/department.service';
import AppHeader from '@/components/AppHeader.vue';

export default {
     components: {
         DepartmentCard,
         InputSearch,
         DepartmentList,
         AppHeader,
     },

    data() {
         return {
              departments: [],
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

</style>