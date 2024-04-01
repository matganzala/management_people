<template>
    <div>
      <button @click="signOut" v-if="isLoggedIn">SING OUT</button>
      hello
    </div>
  </template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import { onAuthStateChanged, User, signOut, getAuth } from 'firebase/auth';

export default defineComponent({
  data() {
    return {
      isLoggedIn: ref(false),
    };
  },
  mounted() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user: User | null | string) => {
      this.isLoggedIn = !!user;
        this.$router.push('/');  
      
      
    });
  },
  methods: {
    async signOut() {
      try {
        const auth = getAuth();
        await signOut(auth);
      } catch (error) {
        console.error('Erro ao efetuar o Sign Out:', error);
      }
    }
  }
});
</script>

  