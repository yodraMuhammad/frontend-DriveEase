<template>
  <header>
    <nav class="fixed w-full bg-white text-black py-4 px-6" v-if="true">
      <div class="max-w-7xl mx-auto flex justify-between items-center">
        <!-- Judul Dinamis -->
        <router-link to="/" class="text-lg font-bold">
          <div class="flex">
            <div class="font-bold text-2xl">DriveEase<span class="text-blue-600">.com</span></div>
          </div>
        </router-link>

        <!-- Navigasi -->
        <div class="flex items-center">
          <router-link
            to="/login"
            class="px-4 py-2 bg-white text-blue-600 rounded hover:bg-gray-100 items-center hidden md:flex"
          >
            <i class="fas fa-sign-in-alt mr-2"></i> Login
          </router-link>
          <router-link
            to="/register"
            class="ml-4 px-4 py-2 bg-white text-blue-600 rounded hover:bg-gray-100 items-center hidden md:flex"
          >
            <i class="fas fa-user-plus mr-2"></i> Register
          </router-link>
        </div>
      </div>
    </nav>
  </header>
  <div>
    <router-view />
  </div>
  <!-- Footer -->
  <footer class="fixed w-full bottom-0 bg-gray-800 text-white py-4 text-center">
    <p>© 2025 Rental App. All rights reserved.</p>
  </footer>
</template>
