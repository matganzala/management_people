import { createRouter, createWebHistory } from "vue-router";
import { User, getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyD56RpNHRI8Hv8JFC2CdYLsEC2--zwxa_U",
  authDomain: "desafio-pruvo-front.firebaseapp.com",
  projectId: "desafio-pruvo-front",
  storageBucket: "desafio-pruvo-front.appspot.com",
  messagingSenderId: "960538914255",
  appId: "1:960538914255:web:78409bf9bcb9739e97b6ba",
  measurementId: "G-G0K6SXKHP1",
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: () => import("../views/ViewHome.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/login",
      component: () => import("../views/ViewLogin.vue"),
      meta: { requiresAuth: false },
    },
    {
      path: "/register",
      component: () => import("../views/ViewRegister.vue"),
      meta: { requiresAuth: false },
    },
  ],
});

router.beforeEach(async (to) => {
  let user: User;

  try {
    user = await new Promise((resolve, reject) => {
      auth.onAuthStateChanged(async (user) => {
        if (user) {
          console.log(user)
          resolve(user);
        } else {
          reject(false);
        }
      });
    });

    

    if (to.path === "/login") {
      return {
        path: "/",
      };
    }
  } catch (e) {
    console.log(e);
    if (to.meta.requiresAuth) {
      // console.log(to.meta.requiresAuth)
      return {
        path: "/login",
      };
    }
  }

  if (!to.matched.length) {
    return {
      path: "/",
    };
  }

  const isAdmin =
    user &&
    user.email === "matheusadmin@gmail.com" 
    

  if (to.path === "/register" && !isAdmin) {
    return {
      path: "/",
    };
  }

  



  
});

export default router;
