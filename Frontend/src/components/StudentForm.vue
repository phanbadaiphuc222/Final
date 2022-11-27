<template>

    <form
        @submit.prevent="submitStudent"
        enctype="multipart/form-data"
    >
        <div class="form-group">
            <label for="name">Name</label>
            <input
                name="name"
                type="text"
                class="form-control"
                v-model="studentLocal.name"
                required
            />
        </div>
        <div class="form-group">
            <label for="id">Id</label>
            <input
                name="id"
                type="text"
                class="form-control"
                v-model="studentLocal.id"
                required
            />
        </div>

        <div class="form-group">
            <label for="email">Email</label>
            <input
                name="email"
                type="text"
                class="form-control"
                v-model="studentLocal.email"
                required
            />

        </div>

        <div class="form-group">
            <label for="DOB">Date of birth</label>
            <input
                name="DOB"
                type="text"
                class="form-control"
                v-model="studentLocal.DOB"
                required
            />
        </div>

        <div class="form-group">
            <label for="address">Hometown</label>
            <input 
                name="hometown"
                type="text"
                class="form-control"
                v-model="studentLocal.hometown"
                required
            />

        </div>

        <div class="form-group">
            <label for="major">Major</label>
            <input
                name="major"
                type="text"
                class="form-control"
                v-model="studentLocal.major"
                required
            />
        </div>

        <div class="form-group">
            <label for="department">Department</label>
            <input
                name="department"
                type="text"
                class="form-control"
                v-model="studentLocal.department"
                required
            />

        </div>

        <div class="form-group">
            <label for="department">Image</label>
            <input lang="en" type="file" ref="file1" @change="onchanged1" />
        </div>

        <div class="form-group">
            <button class="btn btn-primary" type="submit">
                <i class="fa-solid fa-floppy-disk" id="file-path" /> Save
            </button>
            <button
                v-if="studentLocal.id"
                type="button"
                class="ml-2 btn btn-danger"
                @click="deleteStudent"
            >
            <i class="fas fa-trash"/> Delete
            </button>

            <button
                type="button"
                class="ml-2 btn btn-secondary"
                @click="moveToHome"
            >
            <i class="fa-solid fa-arrow-left fa-xl"/>
            </button>

        </div>
    </form>
</template>

<script>
import { studentService } from '@/services/student.service';
export default {
    props: {
        student: { type: Object, required: true }
    },

    data() {
        return {
            image: '',
            studentLocal: { ...this.student },
            // studentFormSchema,
        };
    },

    methods: {
        onchanged1() {
            this.image = this.$refs.file1.files[0];
        },
        
        moveToHome() {
            this.$router.go(-1);
        },

        async submitStudent() {
            // this.$emit('submit:student', this.studentLocal);
            // console.log(this.studentLocal);
            // var dataURL = studentLocal.image.toDataURL("C:\Users\DELL\Desktop\ProjectWeb\BackEnd\avatar");
            const formdata = new FormData();

            formdata.append('name', this.studentLocal.name);
            formdata.append('id', this.studentLocal.id);
            formdata.append('email', this.studentLocal.email);
            formdata.append('DOB', this.studentLocal.DOB);
            formdata.append('hometown', this.studentLocal.hometown);
            formdata.append('major', this.studentLocal.major);
            formdata.append('department', this.studentLocal.department);
            formdata.append('image',  this.image);

            alert('Successfully added student!');

            const data =  await studentService.create(formdata);
        },

        deleteStudent() {
            this.$emit('delete:student', this.studentLocal.id);
        },

    },
};
</script>

<style scoped>
@import '@/assets/form.css';
</style>