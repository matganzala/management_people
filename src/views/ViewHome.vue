<template>
      <button @click="logout" v-if="isLoggedIn">SING OUT</button>
      <div class="flex flex-wrap space-x-5">

        <router-link to="/">HOME</router-link>
        <router-link to="/login">LOGIN</router-link>
        <router-link to="/register">Register</router-link>
        <!-- <router-view/> -->
      </div>
      
  </template>
<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { onAuthStateChanged, User, signOut, getAuth } from 'firebase/auth';
import router from '../router';

export default defineComponent({
  setup() {
    const isLoggedIn = ref(false);

    const auth = getAuth();
    onMounted(() => {
      onAuthStateChanged(auth, (user: User | null | string) => {
        isLoggedIn.value = !!user;
      });
    });

    const logout = async () => {
      try {
        await signOut(auth);
        router.push('/login');
      } catch (error) {
        console.error('Erro ao efetuar o logout:', error);
      }
    };

    return { isLoggedIn, logout };
  }
});


</script>

  