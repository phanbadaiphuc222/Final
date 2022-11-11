<template>
  <div 
    class="page"
    style="margin-top: 10%"
  >
    <h2 class="mb-3">Register</h2>
    <RegisterForm 
      :account="account" 
      @submit:account="onCreateAccount" 
    />
    <div class="alternative-option mt-4">
            Already have an account? 
            <button 
              @click="moveToLogin"
              class="login-button"
            >Login
            </button>
    </div>
        <p>{{ message }}</p>
  </div>
</template>
  
<script>
// import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { contactService } from '@/services/contact.service';
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
    moveToLogin() {
      this.$router.push("/login");
    },

    async onCreateAccount(account) {
      try {
        await accountService.create(account);
        this.message = 'Successfully registered';
        this.$router.push({ name: "departmentbook" });
      } catch (error) {
        console.log(error);
      }
    },
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