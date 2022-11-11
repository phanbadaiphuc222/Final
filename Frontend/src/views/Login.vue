<template>
    <div 
        class="page"
        style="margin-top: 10%"
    >   
        <h2 class="mb-3">Login</h2>
        <RegisterForm 
            :account="account" 
            @submit:account="onLoginAccount" 
        />
        <div class="alternative-option mt-4">
            Already have an account? 
            <button 
              @click="moveToRegister"
              class="login-button"
            >Register
            </button>
    </div>
    <p>{{ message }}</p>
    </div>
</template>
  
<script>

import RegisterForm from '@/components/RegisterForm.vue';
import { accountService } from '@/services/account.service';


export default {

    components: {
        RegisterForm,
    },

    data() {
        return {
            account: {
                email: '',
                password: '',
            },
            message: '',
        };
    },

    methods: {
        moveToRegister() {
            this.$router.push("/");
        },

        async onLoginAccount(account) {
            try {
                
                const Allaccount = await accountService.getMany();

                for (let i = 0; i< Allaccount.length; i++) {
                    if (Allaccount[i].email == account.email && Allaccount[i].password == account.password) {
                        this.$router.push({ name: "departmentbook" });
                    }
                }
                this.message = 'Login failed';
                // this.message = 'Successfully registered';
                // this.$router.push("/contactbook");
            } catch (error) {
                console.log(error);
            }
        }
    },

    created() {
        this.account = {
            email : '',
            password : '',
        };
            this.message = '';
        },
};
</script>

<style scoped>
@import '@/assets/form.css';
</style>