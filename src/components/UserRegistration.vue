<template>
  <div class="max-w-md mx-auto mt-10">
    <h1 class="text-2xl font-bold mb-4">Registrasi Pengguna</h1>
    <form @submit.prevent="registerUser">
      <div class="mb-4">
        <label class="block text-sm font-medium">Nama</label>
        <input v-model="user.name" type="text" class="border rounded w-full p-2" required />
      </div>
      <div class="mb-4">
        <label class="block text-sm font-medium">Alamat</label>
        <input v-model="user.address" type="text" class="border rounded w-full p-2" required />
      </div>
      <div class="mb-4">
        <label class="block text-sm font-medium">Nomor Telepon</label>
        <input v-model="user.phone" type="text" class="border rounded w-full p-2" required />
      </div>
      <div class="mb-4">
        <label class="block text-sm font-medium">Nomor SIM</label>
        <input v-model="user.license" type="text" class="border rounded w-full p-2" required />
      </div>
      <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">Daftar</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        name: '',
        address: '',
        phone: '',
        license: '',
      },
    }
  },
  methods: {
    registerUser() {
      // Simpan data pengguna melalui API
      console.log('User registered:', this.user)
    },
  },
}
</script>
