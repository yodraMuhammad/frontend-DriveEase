<template>
  <div class="bg-white shadow px-4 py-4 flex justify-between items-center w-full">
    <div class="font-bold text-2xl">DriveEase<span class="text-blue-600">.com</span></div>
    <div>
      <button
        @click="logout"
        class="text-blue-500 hover:text-blue-700 transition flex items-center md:mr-5"
      >
        <i class="fas fa-sign-out-alt mr-2"></i>
        <span class="hidden md:flex">Logout</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      localStorage.removeItem('token') // Hapus token
      this.$router.push('/login') // Redirect ke halaman login
    },
  },
}
</script>
