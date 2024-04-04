<template>
  
  <div class="flex flex-col w-full py-24 px-64">
    <router-link to="/"
        class="mb-4 px-4 py-2 flex justify-center w-[10%] bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600">Home
      </router-link>
    <div class="bg-[#FFFFFF] p-12 border-2 rounded-lg">
      <v-form ref="form" @submit.prevent="registerUser">
        <div class="flex flex-row justify-between">
          <div class="w-1/2 pr-4">
            <v-text-field
              v-model="name"
              :rules="[rules.required, rules.minName]"
              name="name"
              label="Nome"
              type="text"
              :error="nameError"
            ></v-text-field>
          </div>
          <div class="w-1/2 pl-4">
            <v-text-field
              v-model="lastName"
              :rules="[rules.required, rules.minName]"
              name="lastName"
              label="Sobrenome"
              type="text"
              :error="lastNameError"
            ></v-text-field>
          </div>
        </div>
        <div class="flex flex-row justify-between">
          <div class="w-4/5 pr-4">
            <v-text-field
              v-model="email"
              :rules="[rules.required, rules.email]"
              name="email"
              label="Email"
              type="email"
              :error="emailError"
            ></v-text-field>
          </div>
          <div class="w-1/5 pl-4">
            <v-select
              v-model="isEditor"
              :items="userTypes"
              :rules="[rules.required]"
              name="isEditor"
              label="Cargo"
              :error="isEditorError"
            ></v-select>
          </div>
        </div>
        <v-text-field
          v-model="cpf"
          :rules="[rules.required, rules.cpf]"
          name="cpf"
          label="CPF"
          type="text"
          :error="cpfError"
          @input="maskCPF"
        ></v-text-field>
        <v-text-field
          v-model="birthDate"
          :rules="[rules.required, rules.date]"
          name="birthDate"
          label="Data de Nascimento"
          type="text"
          :error="birthDateError"
          @input="maskDate"
        ></v-text-field>
        <div class="flex flex-row justify-between">
          <div class="w-1/2 pr-4">
            <v-text-field
              v-model="password"
              :rules="[rules.required, rules.minPassword]"
              name="password"
              label="Senha"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showPassword ? 'text' : 'password'"
              @click:append="showPassword = !showPassword"
              :error="passwordError"
            ></v-text-field>
          </div>
          <div class="w-1/2 pl-4">
            <v-text-field
    v-model="confirmPassword"
    :rules="[rules.required]"
    name="confirmPassword"
    label="Confirmar Senha"
    :append-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
    :type="showConfirmPassword ? 'text' : 'password'"
    @click:append="showConfirmPassword = !showConfirmPassword"
    :error="confirmPasswordError"
></v-text-field>
          </div>
        </div>
        <div class="text-red-500 mt-2">{{ errorMessage }}</div>
        <v-btn type="submit" color="primary" block :loading="loading">Registrar</v-btn>
      </v-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import { useRouter } from "vue-router";
import { maskCPF, maskDate, validationRules } from "../utils/utils";

const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const name = ref("");
const cpf = ref("");
const lastName = ref("");
const birthDate = ref("");
const isEditor = ref();
const router = useRouter();
const showPassword = ref(false);
const showConfirmPassword = ref(false);
const loading = ref(false);
const errorMessage = ref("");
const rules = validationRules;

const userTypes = ["Editor", "Visualizador"];

const registerUser = async () => {
  loading.value = true;
  try {
    const auth = getAuth();
    const firestore = getFirestore();

    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email.value,
      password.value
    );
    const uid = userCredential.user.uid;

    await setDoc(doc(firestore, "users", uid), {
      email: email.value,
      name: name.value,
      lastName: lastName.value,
      cpf: cpf.value,
      birthDate: birthDate.value,
      confirmPassword: confirmPassword.value,
      isEditor: isEditor.value,
      isAdmin: false,
    });

    const sessionDocRef = doc(firestore, "sessions", "currentSession");
    const sessionDocSnapshot = await getDoc(sessionDocRef);
    const sessionData = sessionDocSnapshot.data();

    if (sessionData && sessionData.email && sessionData.password) {
      await signInWithEmailAndPassword(
        auth,
        sessionData.email,
        sessionData.password
      );
    }
    router.push("/");

    alert("Registro concluído com sucesso!");
  } catch (error: any) {
    console.error("Erro ao registrar:", error);
    errorMessage.value = error.message;
  }
  loading.value = false;
};

const nameError = ref(false);
const lastNameError = ref(false);
const emailError = ref(false);
const cpfError = ref(false);
const birthDateError = ref(false);
const passwordError = ref(false);
const confirmPasswordError = ref(false);
const isEditorError = ref(false);
</script>
