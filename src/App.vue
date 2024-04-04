<template>
<div class="flex flex-row bg-bgrandom">
  <!-- <aside class="hidden md:flex w-64 bg-[#FFF] h-[100vh] text-black border-r-2 border-[#E6E6E6] flex flex-col justify-between">
    <div class="p-4 flex items-center">
      <img alt="Avatar" class="w-10 h-10 rounded-full mr-2">
      <div>
        <div class="font-semibold">Nome do Usuário</div>
        <div class="text-sm">Cargo</div>
      </div>
    </div>

    <nav class="hidden md:flex flex-col space-y-2">
      <svg class="h-6 w-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
      </svg>
      <router-link to="/">Home</router-link>
      
      <svg class="h-6 w-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M19 14v5a2 2 0 01-2 2H7a2 2 0 01-2-2v-5m14-11l-7 7m0 0l-7-7m7 7V3"></path>
      </svg>
      <router-link to="/register">Register</router-link>
      
      <button class="px-4 py-2 flex items-center hover:bg-gray-700">
        <svg class="h-6 w-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M15 19a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h8a2 2 0 012 2v14zm0 0V5M10 12H3"></path>
        </svg>
        Logout
      </button>
    </nav>
  </aside> -->
  <router-view />

</div>




</template>
