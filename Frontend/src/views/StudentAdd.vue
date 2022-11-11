<template>
    <div v-if="student" class="page">
        <h4>Add new students</h4>
        <StudentForm 
            :student="student" 
            @submit:student="onCreateStudent" 
        />
        <p>{{ message }}</p>
    </div>
</template>

<script>
import StudentForm from '@/components/StudentForm.vue';
import { studentService } from '@/services/student.service';

export default {
    components: {
        StudentForm,
    },
    props: {
        studentId: { type: Number, required: true },
    },
    data() {
        return {
            student: {
                name: '',
                id: '',
                email: '',
                DOB: '',
                hometown: '',
                major: '',
                department: ''
            },
            message: '',
        };
    },
    methods: {
        async getStudent(id) {
            try {
                this.student = await studentService.get(id);
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

        async onCreateStudent(student) {
            try {
                console.log(1)
                await studentService.create(student);
                this.message = 'Student added successfully';
            } catch (error) {
                console.log(error);
            }
        },
    },

    created() {
        this.student = {
            name: '',
            id: '',
            email: '',
            DOB: '',
            hometown: '',
            major: '',
            department: ''
        };
        this.message = '';
    },
};
</script>

<style scoped>
@import '@/assets/form.css';
</style>