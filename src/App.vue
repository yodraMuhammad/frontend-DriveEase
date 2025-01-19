<template>
  <div id="app" class="min-h-screen flex flex-col bg-gray-100">
    <!-- Navbar -->
    <header>
      <nav class="bg-blue-600 text-white py-4 px-6" v-if="false">
        <div class="max-w-7xl mx-auto flex justify-between items-center">
          <!-- Judul Dinamis -->
          <router-link to="/" class="text-lg font-bold">
            <i class="fas fa-car mr-2"></i> Rental App
          </router-link>

          <!-- Navigasi -->
          <div class="flex items-center">
            <!-- Tampilkan Nama Pengguna -->
            <span v-if="isAuthenticated" class="mr-4 text-sm"> Welcome, {{ userName }} </span>

            <!-- Tombol Login/Register -->
            <router-link
              v-if="!isAuthenticated"
              to="/login"
              class="px-4 py-2 bg-white text-blue-600 rounded hover:bg-gray-100 flex items-center"
            >
              <i class="fas fa-sign-in-alt mr-2"></i> Login
            </router-link>
            <router-link
              v-if="!isAuthenticated"
              to="/register"
              class="ml-4 px-4 py-2 bg-white text-blue-600 rounded hover:bg-gray-100 flex items-center"
            >
              <i class="fas fa-user-plus mr-2"></i> Register
            </router-link>

            <!-- Tombol Logout -->
            <button
              v-if="isAuthenticated"
              @click="logout"
              class="px-4 py-2 bg-white text-blue-600 rounded hover:bg-gray-100 flex items-center"
            >
              <i class="fas fa-sign-out-alt mr-2"></i> Logout
            </button>
          </div>
        </div>
      </nav>
    </header>

    <!-- Main Content -->
    <main class="flex-1">
      <router-view />
    </main>

    <!-- Footer -->
    <!-- <footer class="bg-gray-800 text-white py-4 text-center">
      <p>© 2025 Rental App. All rights reserved.</p>
    </footer> -->
  </div>
</template>

<script>
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'

export default {
  data() {
    return {
      userName: '', // Nama pengguna yang login
    }
  },
  computed: {
    isAuthenticated() {
      return !!localStorage.getItem('token') // Periksa apakah token ada di localStorage
    },
  },
  methods: {
    logout() {
      localStorage.removeItem('token') // Hapus token
      this.$router.push('/login') // Arahkan ke halaman login
    },
    fetchUserName() {
      // Dapatkan nama pengguna dari backend atau localStorage
      const user = JSON.parse(localStorage.getItem('user'))
      this.userName = user ? user.name : ''
    },
  },
  mounted() {
    if (this.isAuthenticated) {
      this.fetchUserName() // Ambil nama pengguna saat terautentikasi
    }
  },
}
</script>

<style>
/* Gaya tambahan global jika diperlukan */
</style>
