<template>
  <v-container class="h-[100vh] flex">
    <v-row justify="center" align="center">
      <v-col cols="12">
        <v-sheet v-if="isLoggedIn" class="mx-auto" width="300">
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
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { useRouter } from "vue-router";

const email = ref('matheus411@gmail.com');
const senha = ref('horario');
const errorMessage = ref('');

const router = useRouter();
const auth = getAuth();
const db = getFirestore();


const isLoggedIn = ref(false);
const submit = async () => {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email.value, senha.value);
    const userDocRef = doc(db, 'users', user.uid);
    const userDocSnapshot = await getDoc(userDocRef);

    if (userDocSnapshot.exists()) {
      router.push('/');
    } else {
      await signOut(auth)
      errorMessage.value = "Usuário não encontrado. Entre em contato com o suporte.";
    }
  } catch (error) {
    errorMessage.value = error.code;
  }
}
onMounted(() => {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const userDocRef = doc(db, 'users', user.uid);
      const userDocSnapshot = await getDoc(userDocRef);
      if (userDocSnapshot.exists()) {
        console.log('Usuário autenticado e documento encontrado no Firestore.');
      } else {
        console.log('Usuário autenticado, mas documento não encontrado no Firestore.');
      }
    } else {
      console.log('Usuário não autenticado.');
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
