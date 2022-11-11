import { createWebHistory, createRouter } from 'vue-router';
// import ContactBook from '@/views/ContactBook.vue';
import Register from '@/views/Register.vue';
import Login from '@/views/Login.vue';
import StudentBook from '@/views/StudentBook.vue';
import DepartmentBook from '@/views/DepartmentBook.vue';

const routes = [
     {
          path : '/studentbook',
          name : 'studentbook',
          component: StudentBook,
     },

     {
          path : '/departmentbook',
          name : 'departmentbook',
          component: DepartmentBook,
     },

     {
          path : '/',
          name : 'register',
          component: Register,
     },

     {
          path: '/login',
          name: 'login',
          component: Login,
     },

     // {
     //      path: '/:pathMatch(.*)*',
     //      name: 'notfound',
     //      component: () => import('@/views/NotFound.vue'),
     // },

     {
          path: '/student/:id',
          name: 'student.edit',
          component: () => import('@/views/StudentEdit.vue'),
          props: (route) => ({ studentId: route.params.id })
     },

     {
          path: '/:id',
          // name: 'studentbook',
          component: () => import('@/views/StudentBook.vue'),
          props: (route) => ({ departmentId: route.params.id })
     },

     {
          path: '/students/add',
          name: 'student.add',
          component: () => import('@/views/StudentAdd.vue'),
     },

     {
          path: '/department/add',
          name: 'department.add',
          component: () => import('@/views/DepartmentAdd.vue'),
     },

     {
          path: '/students/add/:id',
          name: 'delete:student',
          component: () => import('@/views/ContactLogin.vue'),
     },
];

const router = createRouter({
     history : createWebHistory(import.meta.env.BASE_URL),
     routes,
});

export default router;