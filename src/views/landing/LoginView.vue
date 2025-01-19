<template>
  <div class="h-screen flex items-center justify-center bg-gray-50">
    <div class="bg-white p-8 rounded-xl shadow-md w-80">
      <h2 class="text-xl font-semibold text-gray-800 mb-6">Login</h2>
      <form @submit.prevent="login">
        <div class="mb-4">
          <label class="block text-gray-700 mb-2">Email</label>
          <input v-model="email" type="email" class="w-full px-4 py-2 border rounded" required />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 mb-2">Password</label>
          <input
            v-model="password"
            type="password"
            class="w-full px-4 py-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          class="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          :disabled="loading"
        >
          <span v-if="loading">Loading...</span>
          <span v-else>Login</span>
        </button>
      </form>
      <p v-if="error" class="text-red-500 mt-4">{{ error }}</p>
      <p class="text-gray-600 mt-4 text-sm text-center">
        Don't have an account?
        <a @click="redirectToRegister" class="text-blue-500 hover:underline cursor-pointer"
          >Register here</a
        >
      </p>
    </div>
  </div>
</template>

<script>
import apiClient from '../../plugins/axios'

export default {
  data() {
    return {
      email: '',
      password: '',
      error: null,
      loading: false,
    }
  },
  methods: {
    async login() {
      this.loading = true
      this.error = null
      try {
        const response = await apiClient.post('/login', {
          email: this.email,
          password: this.password,
        })

        if (response.data.token) {
          const token = response.data.token
          localStorage.setItem('token', token)

          this.$router.push('/dashboard')
        }
      } catch (error) {
        this.error = error.response
          ? error.response.data.message
          : 'Login failed. Please try again.'
      } finally {
        this.loading = false
      }
    },
    redirectToRegister() {
      this.$router.push('/register')
    },
  },
}
</script>
