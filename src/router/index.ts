import { createRouter, createWebHistory } from "vue-router";
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyD56RpNHRI8Hv8JFC2CdYLsEC2--zwxa_U",
    authDomain: "desafio-pruvo-front.firebaseapp.com",
    projectId: "desafio-pruvo-front",
    storageBucket: "desafio-pruvo-front.appspot.com",
    messagingSenderId: "960538914255",
    appId: "1:960538914255:web:78409bf9bcb9739e97b6ba",
    measurementId: "G-G0K6SXKHP1"
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: "/", component: () => import("../views/Home.vue"), meta: { requiresAuth: true }},
        { path: "/login", component: () => import("../views/Login.vue")},
        { path: "/register", component: () => import("../views/Registro.vue"), meta: { requiresAuth: true }},
    ]
});

router.beforeEach(async (to, from, next) => {
    try {
        const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
        const user = auth.currentUser;

        if (requiresAuth && !user) {
            next('/login');
            return;
        }

        next();
    } catch (error) {
        console.error('Erro de autenticação:', error.message);
        next('/login'); 
    }
});

export default router;
