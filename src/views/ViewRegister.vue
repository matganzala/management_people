<template>
    <v-form>
      <v-container>
        <v-row>
          <v-col
            cols="12"
            md="4"
          >
            <v-text-field
              :counter="10"
              label="First name"
              hide-details
              required
            ></v-text-field>
          </v-col>
  
          <v-col
            cols="12"
            md="4"
          >
            <v-text-field
              :counter="10"
              label="Last name"
              hide-details
              required
            ></v-text-field>
          </v-col>
  
          <v-col
            cols="12"
            md="4"
          >
            <v-text-field
              v-model="userData.email"
              label="E-mail"
              hide-details
              required
            ></v-text-field>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
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