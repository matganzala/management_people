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
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const name = ref('');
const cpf = ref('');
const lastName = ref('');
const isEditor = ref(false)

const registerUser = async () => {
  try {
    const userCredential = await createUserWithEmailAndPassword(getAuth(), email.value, password.value);

    const uid = userCredential.user.uid;

    await setDoc(doc(getFirestore(), 'users', uid), {
      email: email.value,
      name: name.value,
      lastName: lastName.value,
      cpf: cpf.value,
      confirmPassword: confirmPassword.value,
      isEditor: isEditor.value,
      isAdmin: false

    });

    alert('Registro concluído com sucesso!');

  } catch (error) {
    console.error('Erro ao registrar');
  }
};

</script>
