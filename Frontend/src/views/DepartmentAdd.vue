<template>
    <div v-if="department" class="page">
        <h4>Add new departments</h4>
        <DepartmentForm 
            :department="department" 
            @submit:department="onCreateDepartment" 
        />
        <p>{{ message }}</p>
    </div>
</template>

<script>
import DepartmentForm from '@/components/DepartmentForm.vue';
import { departmentService } from '@/services/department.service';

export default {
    components: {
        DepartmentForm,
    },
    props: {
        departmentId: { type: String, required: true },
    },
    data() {
        return {
            department: {
                name: '',
                id: '',
            },
            message: '',
        };
    },
    methods: {
        async getDepartment(id) {
            try {
                this.department = await departmentService.get(id);
            } catch (error) {
                console.log(error);
                this.$router.push({
                    name: 'notfound',
                    params: {
                        pathMatch: this.$router.path.split('/').slice(1)
                    },
                    query: this.$route.query,
                    hash: this.$route.hash,
                });
            }
        },

        async onCreateDepartment(department) {
            try {
                await departmentService.create(department);
                this.message = 'Department added successfully';
            } catch (error) {
                console.log(error);
            }
        },
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
@import '@/assets/form.css';
</style>