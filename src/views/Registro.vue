<template>
    <div class="flex flex-col space-y-2">
        <label>Email</label>
        <input v-model="userData.email" type="text" />
        <label>Senha</label>
        <input v-model="userData.senha" type="password" />
        <button type="submit" @click="register">Cadastrar</button>
        <span v-if="errorMessage" class="text-red-500">{{ errorMessage }}</span>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export default defineComponent({
    data() {
        return {
            userData: ref({
                email: "",
                senha: ""
            }),
            errorMessage: "",
        };
    },
    methods: {
        register() {
            console.log("Dados de registro:", this.userData);

            createUserWithEmailAndPassword(getAuth(), this.userData.email, this.userData.senha)
                .then((_data) => {
                    console.log("Registrado com sucesso");
                    this.$router.push('/login');
                })
                .catch(error => {
                    console.log(error.code);
                    this.errorMessage = error.code;
                });
        }
    }
});
</script>