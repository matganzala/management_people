<template>
    <v-app-bar app color="primary">
      <v-toolbar-title>Minha Aplicação</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-menu offset-y>
        <template>
          <v-avatar>
            <v-img alt="User Avatar"></v-img>
          </v-avatar>
        </template>
        <v-list>
          <v-list-item>
            <v-list-item-title>name</v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>email</v-list-item-title>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-btn>Login</v-btn>
    </v-app-bar>
  </template>
  