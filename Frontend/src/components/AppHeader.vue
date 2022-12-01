<template>
     <nav class="navbar navbar-expand navbar-dark" style="height: 70px">
          <div class="mr-auto nabar-bar" >
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