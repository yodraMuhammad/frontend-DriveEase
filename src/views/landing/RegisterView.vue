<template>
  <div class="h-auto flex items-center justify-center bg-gray-50 my-20">
    <div class="bg-white p-8 shadow-md w-96 mt-10 rounded-xl">
      <h2 class="text-xl font-semibold text-gray-800 mb-6">Register</h2>
      <form @submit.prevent="register">
        <div class="mb-4">
          <label class="block text-gray-700 mb-2">Name</label>
          <input
            v-model="form.name"
            type="text"
            placeholder="Enter your name"
            class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 mb-2">Email</label>
          <input
            v-model="form.email"
            type="email"
            placeholder="Enter your email"
            class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 mb-2">Address</label>
          <input
            v-model="form.address"
            type="text"
            placeholder="Enter your address"
            class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 mb-2">Phone</label>
          <input
            v-model="form.phone"
            type="text"
            placeholder="Enter your phone number"
            class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 mb-2">License Number</label>
          <input
            v-model="form.license_number"
            type="text"
            placeholder="Enter your license number"
            class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 mb-2">Password</label>
          <input
            v-model="form.password"
            type="password"
            placeholder="Enter your password"
            class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 mb-2">Confirm Password</label>
          <input
            v-model="form.password_confirmation"
            type="password"
            placeholder="Confirm your password"
            class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          class="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          :disabled="loading"
        >
          <span v-if="loading">Loading...</span>
          <span v-else>Register</span>
        </button>
      </form>
      <p v-if="error" class="text-red-500 mt-4">{{ error }}</p>
      <p v-if="success" class="text-green-500 mt-4">{{ success }}</p>
      <p class="text-gray-600 mt-4 text-sm text-center">
        Already have an account?
        <a @click="redirectToLogin" class="text-blue-500 hover:underline cursor-pointer"
          >Login here</a
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
      form: {
        name: '',
        email: '',
        address: '',
        phone: '',
        license_number: '',
        password: '',
        password_confirmation: '',
      },
      error: null,
      success: null,
      loading: false,
    }
  },
  methods: {
    async register() {
      this.loading = true
      this.error = null
      this.success = null
      try {
        const response = await apiClient.post('/register', this.form)
        if (response) console.log(response)
        this.success = 'Registration successful!'
        this.error = null
        this.$router.push('/login')
      } catch (error) {
        this.error =
          error.response && error.response.data
            ? error.response.data.message
            : 'Registration failed. Please try again.'
        this.success = null
      } finally {
        this.loading = false
      }
    },
    redirectToLogin() {
      this.$router.push('/login')
    },
  },
}
</script>
