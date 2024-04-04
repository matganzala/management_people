<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-card>
          <v-card-title class="text-center">Registro</v-card-title>
          <v-card-text>
            <v-form ref="form" @submit.prevent="registerUser">
              <v-text-field v-model="email" label="Email" type="email"></v-text-field>
              <v-text-field v-model="name" label="Nome" type="text"></v-text-field>
              <v-text-field v-model="lastName" label="Sobrenome" type="text"></v-text-field>
              <v-text-field v-model="password" label="Senha" type="password"></v-text-field>
              <v-text-field v-model="confirmPassword" label="Confirmar Senha" type="password"></v-text-field>

              <v-btn type="submit" color="primary" block>Registrar</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const name = ref('');
const cpf = ref('');
const lastName = ref('');
const isEditor = ref(false);
const router = useRouter();

const registerUser = async () => {
  try {
    const auth = getAuth(); 
    const firestore = getFirestore();

    const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value);
    const uid = userCredential.user.uid;

    await setDoc(doc(firestore, 'users', uid), {
      email: email.value,
      name: name.value,
      lastName: lastName.value,
      cpf: cpf.value,
      confirmPassword: confirmPassword.value,
      isEditor: isEditor.value,
      isAdmin: false
    });

    const sessionDocRef = doc(firestore, 'sessions', 'currentSession');
    const sessionDocSnapshot = await getDoc(sessionDocRef);
    const sessionData = sessionDocSnapshot.data();

    if (sessionData && sessionData.email && sessionData.password) {
      await signInWithEmailAndPassword(auth, sessionData.email, sessionData.password);
    }
    router.push('/');

    alert('Registro concluído com sucesso!');

  } catch (error) {
    console.error('Erro ao registrar:', error);
  }
};
</script>

