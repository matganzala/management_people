<template>
  <div class="flex flex-col w-full py-12 px-24">
    <div class="space-x-5">
      <button @click="logout" v-if="isLoggedIn"
        class="mb-4 px-4 py-2 bg-red-500 text-white rounded-md shadow-sm hover:bg-red-600">
        Sair
      </button>
      <router-link v-if="isAdmin" to="/register"
        class="mb-4 px-4 py-2 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600">Registrar
      </router-link>
    </div>
    <div class="bg-gray-100 border-2 rounded-md shadow-sm overflow-auto">
      <table class="w-full h-full">
        <thead>
          <tr class="bg-gray-200">
            <th class="px-4 py-2 border-b border-r border-gray-300">Nome</th>
            <th class="px-4 py-2 border-b border-r border-gray-300">Email</th>
            <th class="px-4 py-2 border-b border-r border-gray-300">Cargo</th>
            <th v-if="isAdmin || isEditor" class="px-4 py-2 border-b border-gray-300">Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user) in users" :key="user.userId" class="bg-white">
            <td class="px-4 py-2 border-b border-r border-gray-300">{{ user.name + ' ' +  user.lastName }}</td>
            <td class="px-4 py-2 border-b border-r border-gray-300">{{ user.email }}</td>
            <td class="px-4 py-2 border-b border-r border-gray-300">
              {{ user.isAdmin ? "Administrador" : user.isEditor ? "Editor" : "Visualizador" }}
            </td>

            <td v-if="isAdmin || isEditor" class="px-4 py-2 border-b border-gray-300 space-x-5 flex justify-center">
              <button v-if="isEditor || isAdmin" @click="editUser(user)"
                class="px-2 py-1 bg-green-500 text-white rounded-md shadow-sm hover:bg-green-600 flex items-center">
                <svg class="w-4 h-4 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd"
                    d="M13.293 2.293a1 1 0 0 1 1.414 1.414l-9 9a1 1 0 0 1-.39.242l-3 1a1 1 0 0 1-1.171-1.171l1-3a1 1 0 0 1 .242-.39l9-9z"
                    clip-rule="evenodd" />
                  <path fill-rule="evenodd" d="M15 6l-1 1-2-2 1-1a1 1 0 0 1 1.414 0l1.293 1.293a1 1 0 0 1 0 1.414z"
                    clip-rule="evenodd" />
                  <path fill-rule="evenodd" d="M16 12l-1 5-5-1 9-9 1 1-4 4z" clip-rule="evenodd" />
                </svg>
                Editar
              </button>
              <button v-if="isAdmin" @click="deleteUser(user)"
                class="px-2 py-1 bg-red-500 text-white rounded-md shadow-sm hover:bg-red-600 flex items-center">
                <svg class="w-4 h-4 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M5 4a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1V5h1a1 1 0 0 1 0 2H4a1 1 0 0 1-1-1V4z"
                    clip-rule="evenodd" />
                  <path fill-rule="evenodd"
                    d="M4 8a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8zm5 2a1 1 0 1 1 0-2h2a1 1 0 0 1 0 2H9z"
                    clip-rule="evenodd" />
                </svg>
                Excluir
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal de edição -->
    <div v-if="showEditModal" class="fixed inset-0 flex items-center justify-center bg-bgblue bg-opacity-50">
      <div class="bg-white rounded-lg p-6 w-1/3">
        <h2 class="text-xl font-semibold mb-4">Editar Usuário</h2>
        <form @submit.prevent="saveChanges">
          <div class="mb-4">
            <label for="editName" class="block text-gray-700">Nome:</label>
            <input v-model="editedUser.name" type="text" id="editName" class="w-full mt-1 p-2 border rounded-md">
          </div>
          <div class="mb-4">
            <label for="editLastName" class="block text-gray-700">Sobrenome:</label>
            <input v-model="editedUser.lastName" type="text" id="editLastName" class="w-full mt-1 p-2 border rounded-md">
          </div>
          <div class="mb-4">
            <label for="editBirthDate" class="block text-gray-700">Data de Nascimento:</label>
            <input v-model="editedUser.birthDate" type="text" id="editBirthDate" class="w-full mt-1 p-2 border rounded-md" placeholder="DD/MM/AAAA" @input="maskDate">
            <span v-if="!isValidDate" class="text-red-500">Data de nascimento inválida</span>
          </div>
          <div class="flex justify-end">
            <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600">Salvar</button>
            <button @click="cancelEdit" type="button" class="ml-2 px-4 py-2 bg-red-500 text-white rounded-md shadow-sm hover:bg-red-600">Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { onAuthStateChanged, User, signOut, getAuth } from "firebase/auth";
import { maskDate } from "../utils/utils"
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import router from "../router";
import { UserData } from "../models/userData";


const isLoggedIn = ref(false);
const auth = getAuth();
const users = ref();
const editedUser = ref();
const showEditModal = ref(false);
const isEditor = ref(false);
const isAdmin = ref(false);
const currentUserUid = ref(null);
const loading = ref(false);
const isValidDate = ref(true);

const fetchUsers = async () => {
  try {
    const db = getFirestore();
    const usersCollection = collection(db, "users");
    const snapshot = await getDocs(usersCollection);
    const fetchedUsers = snapshot.docs.map((doc) => ({
      userId: doc.id,
      ...doc.data(),
    }));
    users.value = fetchedUsers;
  } catch (error) {
    console.error("Erro ao buscar os dados dos usuários:", error);
  }
};

onMounted(async () => {
  await onAuthStateChanged(auth, async (user: User | null | any) => {
    isLoggedIn.value = !!user;
    if (!user) {
      router.push("/login");
      return;
    }

    currentUserUid.value = user.uid;

    await fetchUsers();

    const currentUser = users.value.find(
      (u: { userId: any }) => u.userId === user.uid
    );
    if (currentUser.isAdmin) {
      isAdmin.value = currentUser.isAdmin;
    }
    if (currentUser) {
      isEditor.value = currentUser.isEditor;
    }
  });
});

const logout = async () => {
  try {
    await signOut(auth);
    router.push("/login");
  } catch (error) {
    console.error("Erro ao efetuar o logout:", error);
  }
};

const editUser = async (user: UserData) => {
  try {
    if (user) {
      editedUser.value = { ...user };
      showEditModal.value = true;
    } else {
      console.error("Usuário não encontrado.");
    }
  } catch (error) {
    console.error("Erro ao editar o usuário:", error);
  }
};

const saveChanges = async () => {
  loading.value = true;
  try {
    if (!editedUser.value || !editedUser.value.userId) {
      console.error("Nenhum usuário selecionado para edição.");
      return;
    }

    const updatedUserData = {
      name: editedUser.value.name,
      lastName: editedUser.value.lastName,
      birthDate: editedUser.value.birthDate,
    };

    const db = getFirestore();
    const userDocRef = doc(db, "users", editedUser.value.userId);
    await updateDoc(userDocRef, updatedUserData);
    showEditModal.value = false;
    await fetchUsers();
    alert("Usuário editado com sucesso!");
  } catch (error) {
    console.error("Erro ao editar o usuário:", error);
    alert("Erro ao editar o usuário.");
  }
  loading.value = false;
};

const cancelEdit = () => {
  editedUser.value = {};
  showEditModal.value = false;
};

const deleteUser = async (user: any) => {
  try {
    const db = getFirestore();
    const userDocRef = doc(db, "users", user.userId);
    await deleteDoc(userDocRef);
    await fetchUsers();
    alert("Usuário excluído com sucesso!");
  } catch (error) {
    console.error("Erro ao excluir usuário:", error);
    alert("Erro ao excluir usuário.");
  }
};

</script>

