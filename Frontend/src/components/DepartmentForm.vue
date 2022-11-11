<template>
    <Form
        @submit="submitDepartment"
        :validation-schema="departmentFormSchema"
    >
        <div class="form-group">
            <label for="name">Name</label>
            <Field
                name="name"
                type="text"
                class="form-control"
                v-model="departmentLocal.name"
            />
            <ErrorMessage name="name" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="id">Id</label>
            <Field
                name="id"
                type="text"
                class="form-control"
                v-model="departmentLocal.id"
            />
            <ErrorMessage name="id" class="error-feedback" />
        </div>

        <div class="form-group">
            <button class="btn btn-primary">
                <i class="fa-solid fa-floppy-disk"/> Save
            </button>

            <button
                v-if="departmentLocal.id"
                type="button"
                class="ml-2 btn btn-danger"
                @click="deletedepartment"
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

    emits: ['submit:department', 'delete:department'],
    props: {
        department: { type: Object, required: true }
    },

    data() {
        const departmentFormSchema = yup.object().shape( {
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
            
        });
        return {
            departmentLocal: { ...this.department },
            departmentFormSchema,
        };
    },

    methods: {

        moveToHome() {
            this.$router.push({path:`/departmentbook`});
        },

        submitDepartment() {
            this.$emit('submit:department', this.departmentLocal);
        },

        deletedepartment() {
            this.$emit('delete:department', this.departmentLocal.id);
        },
    },
};
</script>

<style scoped>
@import '@/assets/form.css';
</style>