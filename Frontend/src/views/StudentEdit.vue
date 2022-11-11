<template>
    <div
        v-if="student"
        class="page"
    >
        <h4>Modify the information</h4>
        <StudentForm
            :student="student"
            @submit:student="onUpdateStudent"
            @delete:student="onDeleteStudent"
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
        studentId: { type: Object, required: true },
        departmentId: { type: Object, required: true },
    },
    data() {
        return {
            student: null,
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

        async onUpdateStudent(student) {
            try {
                await studentService.update(student.id, student);
                // this.message = 'Infomation updated successfully';
                alert('Infomation updated successfully');
            } catch(error) {
                console.log(error);
            }
        },

        async onDeleteStudent(id) {
            if (confirm('Do you really want to delete this stduent?')) {
                try { 
                    await studentService.deleteStudent(id);
                    this.$router.push({path:`/department` });
                } catch(error) {
                    console.log(error);
                }
            }
        },
    },

    created() {
        this.getStudent(this.studentId);
        this.message = '';
    },
};
</script>