<template>
    
    <Form @submit="submitAccount">
        <div class="input">
            <label for="email">Email</label>
            <Field name="email" type="text" class="form-control" v-model="accountLocal.email" />
        </div>
        <div class="input">
            <label for="password">Password</label>
            <Field name="password" type="password" class="form-control" v-model="accountLocal.password" />
        </div>
        <button type="submit" id="register_button" class="mt-4 btn-pers">
            Go
        </button>
    </Form>
</template>

<script>
import * as yup from 'yup';
import { Form, Field, ErrorMessage } from 'vee-validate';

export default {

    components: {
        Form,
        Field,
        ErrorMessage,
    },

    emits: ['submit:account'],

    props: {
        account: { type: Object, required: true }
    },

    data() {
        // return {
        //     email: "",
        //     password: "",
        // };

        return {
            accountLocal: { ... this.account },
        };
    },

    methods: {
        // moveToLogin() {
        //     this.$router.push("/login");
        // },

        submitAccount() {
            this.$emit('submit:account', this.accountLocal);
        },
    },
};
</script>

<style scoped>
@import '@/assets/form.css';
</style>