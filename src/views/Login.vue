<template>

  <div class="flex items-center justify-center">
    <v-sheet class="mx-auto" width="300">
      <v-form>
        <v-container>
          <v-text-field v-model="userData.email" label="Email"></v-text-field>
          <v-text-field v-model="userData.senha" label="Senha"></v-text-field>
          <v-btn class="mt-2" type="submit" @click="submit" block>Submit</v-btn>

        </v-container>
      </v-form>
      </v-sheet>
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