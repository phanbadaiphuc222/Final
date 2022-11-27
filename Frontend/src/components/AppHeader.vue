<template>
     <nav class="navbar navbar-expand navbar-dark">
          <a
               class="navbar-brand"
          >Web application for managing students</a>
          <div class="mr-auto nabar-bar">
               <li class="nav-item">
                    <router-link 
                         :to="{ name : 'studentbook' }"
                         class="nav-link"
                    >
                         Students
                         <i class="fas fa-address-book" />
                    </router-link>
               </li>
          </div>
          <div class="signOutIcon">
               <i 
                    class="fa fa-sign-out fa-2xl" 
                    style="color: grey"
                    @click="moveToLogin()"
               >
               </i>
          </div>
          
     </nav>
</template>

<script>
export default {
     methods: {
          moveToLogin() {
               this.$router.push("/login");
          },
     }
}
</script>

<style>
.signOutIcon {
     margin-right: 50px;
}

.accountIcon {
     margin-right: 100px;
}
</style>