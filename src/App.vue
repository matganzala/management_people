<template>
  <div class="h-[100vh] w-[100%] bg-bgblue flex items-center justify-center">
      <router-link to="/" />
      <router-link to="/login" />
      <router-link to="/register" /> 
    <main>
      <router-view />
    </main>

  </div>
</template>
