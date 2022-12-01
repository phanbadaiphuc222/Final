<template>
    <transition name="faded">
        <div class="vue-modal" v-show="open">
            <div class="drop-in">
                <div class="vue-modal-inner" v-show="open">
                    <div class="vue-modal-content">
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

                        <div class="form-group" style="margin-top: 20px">
                            <button class="btn btn-primary button" @click="close" >
                                <i class="fa-solid fa-floppy-disk"/> Save
                            </button>

                            <button
                                v-if="departmentLocal.id"
                                type="button"
                                class="ml-2 btn btn-danger button"
                                @click="deletedepartment"
                            >
                            <i class="fas fa-trash"/> Delete
                            </button>

                            <button
                                type="button"
                                class="ml-2 btn btn-secondary"
                                style="width: 50px; height: 30px"
                                @click="close"
                            >
                            <i class="fa-solid fa-arrow-left fa-xl"/>
                            </button>

                            <!-- <div class="arrow"><i class="fa-solid fa-arrow-left fa-2xl"></i></div> -->
                        </div>
                    </Form>
                    </div>
                </div>
            </div>
        </div>
    </transition>
    
</template>

<script>

import { onMounted, onUnmounted } from 'vue';
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
        department: { type: Object, required: true },
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
     background-color: rgba(0, 0, 0, 0.4);
     z-index: 1;
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
.faded-leave-active {
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

.button {
    width: 70px; height: 30px;
}
</style>