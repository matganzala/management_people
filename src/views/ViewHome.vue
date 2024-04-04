<template>
  <v-container class="h-[100vh]">
    <button @click="logout" v-if="isLoggedIn">SING OUT</button>
    <router-link to="/register">Register</router-link>
    <v-card class="full-height">
      <v-card-title>Lista de Pessoas</v-card-title>
      <v-card-text>
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">Nome</th>
                <th class="text-left">Email</th>
                <th class="text-left">Idade</th>
                <th class="text-left">Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in users" :key="user.userId">
                <td>{{ user.name }}</td>
                <td>{{ user.email }}</td>
                <td>{{ user.userId }}</td>
                <td>
                  <v-btn v-if="isEditor" color="primary" @click="editUser(user)">Editar</v-btn>
                  <v-btn color="error" @click="deleteUser(user)">Excluir</v-btn>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-card-text>
    </v-card>

    <!-- Modal de edição -->
    <v-dialog v-model="showEditModal" max-width="600">
      <v-card>
        <v-card-title>Editar Usuário</v-card-title>
        <v-card-text>
          <v-form @submit.prevent="saveChanges">
            <v-text-field v-model="editedUser.name" label="Nome" required></v-text-field>
            <v-text-field v-model="editedUser.email" label="Email" type="email" required></v-text-field>
            <v-text-field v-model="editedUser.cpf" label="Idade"></v-text-field>
            <v-btn type="submit" color="primary">Salvar</v-btn>
            <v-btn color="error" @click="cancelEdit">Cancelar</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { onAuthStateChanged, User, signOut, getAuth, deleteUser } from 'firebase/auth';
import { getFirestore, collection, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import router from '../router';
import { UserData } from '../models/userData';

const isLoggedIn = ref(false);
const auth = getAuth();
const users = ref();
const editedUser = ref();
const showEditModal = ref(false);
const isEditor = ref(false)

const fetchUsers = async () => {
  try {
    const db = getFirestore();
    const usersCollection = collection(db, 'users');
    const snapshot = await getDocs(usersCollection);
    const fetchedUsers = snapshot.docs.map(doc => ({ userId: doc.id, ...doc.data() }));
    users.value = fetchedUsers; // Atribui os usuários à variável users.value após a obtenção dos dados
  } catch (error) {
    console.error('Erro ao buscar os dados dos usuários:', error);
  }
};

onMounted(async () => {
  await onAuthStateChanged(auth, async (user: User | null) => {
    isLoggedIn.value = !!user;
    await fetchUsers(); 

    const currentUser = users.value.find(u => u.userId === user.uid); 
    if (currentUser) {
      console.log('Usuário autenticado:', currentUser);
      isEditor.value = currentUser.isEditor;
    } else {
      console.log('Usuário autenticado não encontrado na lista de usuários.');
    }
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

const editUser = async (user: UserData) => {
  try {
    if (user) {
      editedUser.value = { ...user };
      showEditModal.value = true;
    } else {
      console.error('Usuário não encontrado.');
    }
  } catch (error) {
    console.error('Erro ao editar o usuário:', error);
  }
};

const saveChanges = async () => {
  try {
    if (!editedUser.value || !editedUser.value.userId) {
      console.error('Nenhum usuário selecionado para edição.');
      return;
    }

    const updatedUserData = { ...editedUser.value };

    const db = getFirestore();
    const userDocRef = doc(db, 'users', editedUser.value.userId);
    await updateDoc(userDocRef, updatedUserData);
    showEditModal.value = false;
    await fetchUsers();
    console.log('Usuário editado com sucesso:', editedUser.value);
  } catch (error) {
    console.error('Erro ao editar o usuário:', error);
  }
};

const cancelEdit = () => {
  editedUser.value = {};
  showEditModal.value = false;
};


const deleteUser = async (user: any) => {
  try {
    const db = getFirestore();
    const userDocRef = doc(db, 'users', user.userId);
    await deleteDoc(userDocRef);

    console.log('Usuário excluído com sucesso:', user.userId);

    await fetchUsers();
  } catch (error) {
    console.error('Erro ao excluir usuário:', error);
  }
};



</script>
