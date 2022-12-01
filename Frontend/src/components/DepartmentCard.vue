<script>
// import { objectToString } from '@vue/shared';

export default {
     props: {
        department : { type: Object, require: true},
        open: {
          type: Boolean,
          required: true
        }
     },

     setup(_, { emit }) {
          const close = () => {
               emit("close");
          };

          const handleKeyup = (event) => {
               if (event.keyCode === 27 ) {
                    close()
               }
          }

          onMounted (() => document.addEventListener("keyup", handleKeyup));
          onUnmounted(() => document.removeEventListener("keyup", handleKeyup));

          return { close };
     },
};
</script>

<template>
     <transition name="faded">
          <div class="vue-modal" v-show="open">
               <div name="drop-in">
                    <div class="vue-modal-inner" v-show="open">
                         <div class="vue-modal-content">
                              <div class="p-1">
                                   <strong>Name:</strong>
                                   {{ department.name }}
                              </div>
                              <div class="p-1">
                                   <strong>Id:</strong>
                                   {{ department.id }}
                              </div>
                         </div>
                    </div>
               </div>
          </div>
     </transition>
</template>

<style scoped>
*,
::before,
::after {
     margin: 0;
     padding: 0;
     box-sizing: border-box;
}

.vue-modal {
     position: fixed;
     top: 0;
     left: 0;
     width: 100%;
     height: 100%;
     overflow-x: hidden;
     overflow-y: auto;
     background-color: rgba(0,0,0,0.4);
}

.vue-modal-inner {
     max-width: 500px;
     margin: 2rem auto;
}

.vue-modal-content {
     position: relative;
     background-color: #fff;
     border: 1px solid rgba (0, 0, 0, 0.3);
     background-clip: padding-box;
     border-radius: 0.3rem;
     padding: 1rem;
}

.faded-enter-active,
.faded-leave-action {
     transition: opacity 0.5s;
}

.faded-enter-from,
.faded-leave-to {
     opacity: 0;
}

.drop-in-enter-active,
.drop-in-leave-actvive {
     transition: all 0.3s ease-out;
}

.drop-in-enter-from,
.drop-in-leave-to {
     opacity: 0;
     transform: translateY(-50px);
}
</style>