<template>
  <div>
    <v-sheet v-if="isLoggedIn" class="mx-auto" width="300">
      <v-btn @click="signOut" block>Sign Out</v-btn>
    </v-sheet>
    <v-sheet v-else class="mx-auto" width="300">
      <v-form @submit.prevent="submit">
        <v-container>
          <v-text-field v-model="email" label="Email"></v-text-field>
          <v-text-field v-model="senha" label="Senha" type="password"></v-text-field>
          <v-btn class="mt-2" type="submit" block>Submit</v-btn>
          <p class="error-message">{{ errorMessage }}</p>
        </v-container>
      </v-form>
    </v-sheet>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "vue-router";

const email = ref('matganzala@gmail.com');
const senha = ref('123456');
const errorMessage = ref('');
const router = useRouter();
const auth = getAuth();

const isLoggedIn = ref(false);

const submit = async () => {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email.value, senha.value);
    console.log(user.uid);
    router.push('/');
  } catch (error: any) {
    errorMessage.value = error.code;
  }
}

onMounted(() => {
  onAuthStateChanged(auth, (user) => {
    isLoggedIn.value = !!user;
    if (isLoggedIn.value) {
      router.push('/');
    }
  });
});

</script>

<style scoped>
.error-message {
  color: red;
  margin-top: 10px;
}
</style>
