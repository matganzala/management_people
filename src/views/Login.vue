<template>
    <div class="flex flex-col space-y-2">
      <label>Email</label>
      <input required v-model="userData.email" type="text" />
      <label>Senha</label>
      <input required v-model="userData.senha" type="password" />
      <button @click="submit">Entrar</button>
      <span v-if="errorMessage" class="text-red-500">{{ errorMessage }}</span>
  
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from "vue";
  import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
  
  
  export default defineComponent({
  
    data() {
      return {
        userData: ref(
          {
            email: 'matganzala@gmail.com',
            senha: '123456'
          }
        ),
        errorMessage: "",
      };
    },
    methods: {
      async submit() {
        await signInWithEmailAndPassword(getAuth(), this.userData.email, this.userData.senha)
          .then((data) => {
            console.log(data.user.uid)
            this.$router.push('/');  
          })
          .catch(error => {
            console.log(error.code);
            this.errorMessage = error.code;
          });
      }
  
  
  
    }
  });
  </script>