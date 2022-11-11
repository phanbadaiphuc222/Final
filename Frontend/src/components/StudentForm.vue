<template>
    <Form
        @submit="submitStudent"
        :validation-schema="studentFormSchema"
    >
        <div class="form-group">
            <label for="name">Name</label>
            <Field
                name="name"
                type="text"
                class="form-control"
                v-model="studentLocal.name"
            />
            <ErrorMessage name="name" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="id">Id</label>
            <Field
                name="id"
                type="text"
                class="form-control"
                v-model="studentLocal.id"
            />
            <ErrorMessage name="id" class="error-feedback" />
        </div>

        <div class="form-group">
            <label for="email">Email</label>
            <Field
                name="email"
                type="text"
                class="form-control"
                v-model="studentLocal.email"
            />
            <ErrorMessage name="class_id" class="error-feedback"/>
        </div>

        <div class="form-group">
            <label for="DOB">Date of birth</label>
            <Field
                name="DOB"
                type="text"
                class="form-control"
                v-model="studentLocal.DOB"
            />
            <ErrorMessage name="class_id" class="error-feedback"/>
        </div>

        <div class="form-group">
            <label for="address">Hometown</label>
            <Field 
                name="hometown"
                type="text"
                class="form-control"
                v-model="studentLocal.hometown"
            />
            <ErrorMessage name="hometown" class="error-feedback"/>
        </div>

        <div class="form-group">
            <label for="major">Major</label>
            <Field
                name="major"
                type="text"
                class="form-control"
                v-model="studentLocal.major"
            />
            <ErrorMessage name="className" class="error-feedback"/>
        </div>

        <div class="form-group">
            <label for="department">Department</label>
            <Field
                name="department"
                type="text"
                class="form-control"
                v-model="studentLocal.department"
            />
            <ErrorMessage name="className" class="error-feedback"/>
        </div>

        <div class="form-group">
            <button class="btn btn-primary">
                <i class="fa-solid fa-floppy-disk"/> Save
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

            <!-- <div class="arrow"><i class="fa-solid fa-arrow-left fa-2xl"></i></div> -->
        </div>
    </Form>
</template>

<script>
import * as yup from 'yup';
import { Form, Field, ErrorMessage} from 'vee-validate';

export default {
    components: {
        Form,
        Field,
        ErrorMessage,
    },

    emits: ['submit:student', 'delete:student'],
    props: {
        student: { type: Object, required: true }
    },

    data() {
        const studentFormSchema = yup.object().shape( {
            name: yup
                .string()
                .required('Name must have values.')
                .min(2, 'Name must have at least 2 characters.')
                .max(50, 'Nam cannot be more than 50 characters.'),

            // id: yup
            //     .string()
            //     .required('Id must have values.')
            //     .matches(/^[B].*/, 'ID must have the B character first')
            //     .max(8, 'Must have exact 8 characters.')
            //     .min(8, 'Must have exact 8 characters.'),

            hometown: yup
                .string()
                .max(100, 'Address must have maximum 100 characters.')
                .min(5, 'Address must have at least 5 characters'),
            
            // grade: yup
            //     .string()
            //     .required('Hometown must have values.')
            //     .matches(/([0-9])$/,'Must between 0 and 10'),
        });
        return {
            studentLocal: { ...this.student },
            studentFormSchema,
        };
    },

    methods: {

        moveToHome() {
            this.$router.go(-1);
        },

        submitStudent() {
            this.$emit('submit:student', this.studentLocal);
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