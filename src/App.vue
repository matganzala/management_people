<template>
  <div class="h-[100vh] w-[100%] bg-bgblue">
    <div>
      <router-link to="/">Home</router-link>
      <router-link to="/login" />
      <router-link to="/register" /> 
    </div>
    <main>
      <router-view />
    </main>

  </div>
</template>
