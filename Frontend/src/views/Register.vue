<template>
  <div 
    class="page"
    style="margin-top: 10%"
  >
    <h2 class="mb-3">Register</h2>
    <!-- <RegisterForm 
      :account="account" 
      @submit:account="onCreateAccount" 
    /> -->

    <form @submit.prevent="register">
      <div class="input" style="margin-bottom: 15px">
        <input class="form-control" type="text" placeholder="Email" v-model="email" />
      </div>
      <div class="input">
        <input class="form-control" type="password" placeholder="Password" v-model="password"/>
      </div>
      <input type="submit" value="Register" class="mt-4 btn-pers">
    </form>
    <div v-if="error">{{ error }}</div>
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
import RegisterForm from '@/components/RegisterForm.vue';
import { accountService } from '@/services/account.service';

import { ref } from 'vue';
import firebase from 'firebase';
import { useStore } from 'vuex'; 
import { useRouter } from 'vue-router'


export default {

  setup () {
        const email = ref("");
        const password = ref("");

        const store = useStore()
        const router = useRouter()
        const error = ref(null)

        const register = async () => {
            firebase
                .auth()
                .createUserWithEmailAndPassword(email.value, password.value)
                .then(data => console.log(data))
                .catch(err => alert(err.message));



            // try {
            //   await store.dispatch('register', {
            //     email: email.value, 
            //     password: password.value 
            //   }) 
            //   router.push('/departmentbook')
            // } catch (err) {
            //   error.value = err.message
            // }
        }

        // return { register, email, password, error }

        return {
            register, 
            email,
            password,
        }
    },

  components: {
    RegisterForm,
  },

  // data() {
  //   return {
  //     account: {
  //       email: '',
  //       password: '',
  //     },
  //     message: '',
  //   };
  // },

  methods: {
    moveToLogin() {
      this.$router.push("/login");
    },

    // async onCreateAccount(account) {
    //   try {
    //     await accountService.create(account);
    //     this.message = 'Successfully registered';
    //     this.$router.push({ name: "departmentbook" });
    //   } catch (error) {
    //     console.log(error);
    //   }
    // },
  },

  // created() {
  //   this.account = {
  //     email : '',
  //     password : '',
  //   };
  //   this.message = '';
  // },
};
</script>

<style scoped>
@import '@/assets/form.css';
</style>