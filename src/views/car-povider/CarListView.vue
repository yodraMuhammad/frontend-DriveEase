<template>
  <div class="min-h-screen bg-white-100 p-6">
    <div class="flex flex-col sm:flex-row justify-between items-center mb-6">
      <button
        @click="openAddModal"
        class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition font-semibold"
      >
        <i class="fas fa-add mr-2"></i> Add New Car
      </button>
      <input
        v-model="searchQuery"
        @input="fetchCars"
        type="text"
        placeholder="Search by brand or model..."
        class="w-full sm:w-64 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 mt-4 sm:mt-0"
      />
    </div>

    <div v-if="loading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mt-10">
      <LoadingCardComponent v-for="index in 8" :key="index" />
    </div>
    <div v-else-if="error" class="text-center text-red-500">{{ error }}</div>

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
      <CarCardProvider
        v-for="car in cars"
        :key="car.id"
        :car="car"
        :defaultImage="defaultImage"
        :openEditModal="openEditModal"
        :openDeleteModal="openDeleteModal"
        :capitalizeWords="capitalizeWords"
      />
    </div>

    <div
      v-if="showModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
    >
      <div class="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 class="text-xl font-bold mb-4">
          {{ isEditMode ? 'Edit Car' : 'Add New Car' }}
        </h2>
        <form @submit.prevent="isEditMode ? updateCar() : addCar()">
          <div class="mb-4">
            <label for="photo" class="block text-gray-700">Upload Photo</label>
            <input
              @change="handlePhotoUpload"
              type="file"
              id="photo"
              class="w-full border p-2 rounded-lg"
              accept="image/*"
            />
          </div>
          <div class="mb-4">
            <label for="brand" class="block text-gray-700">Brand</label>
            <input
              v-model="form.brand"
              type="text"
              id="brand"
              class="w-full border p-2 rounded-lg"
              required
            />
          </div>
          <div class="mb-4">
            <label for="model" class="block text-gray-700">Model</label>
            <input
              v-model="form.model"
              type="text"
              id="model"
              class="w-full border p-2 rounded-lg"
              required
            />
          </div>
          <div class="mb-4">
            <label for="license_plate" class="block text-gray-700">License Plate</label>
            <input
              v-model="form.license_plate"
              type="text"
              id="license_plate"
              class="w-full border p-2 rounded-lg"
              required
            />
          </div>
          <div class="mb-4">
            <label for="rental_rate" class="block text-gray-700">Rental Rate/day</label>
            <input
              v-model="form.rental_rate"
              type="number"
              id="rental_rate"
              class="w-full border p-2 rounded-lg"
              required
            />
          </div>
          <div class="flex justify-end">
            <button
              type="button"
              @click="showModal = false"
              class="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              {{ isEditMode ? 'Update' : 'Add' }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <div
      v-if="showDeleteModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
    >
      <div class="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 class="text-xl font-bold mb-4">Confirm Deletion</h2>
        <p>Are you sure you want to delete this car?</p>
        <div class="flex justify-end mt-4">
          <button
            @click="showDeleteModal = false"
            class="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg mr-2"
          >
            Cancel
          </button>
          <button
            @click="deleteCar"
            class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
          >
            Yes
          </button>
        </div>
      </div>
    </div>

    <div
      v-if="showSuccessPopup"
      class="fixed bottom-5 right-5 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg"
    >
      Car deleted successfully!
    </div>
  </div>
</template>

<script>
import apiClient from '../../plugins/axios'
import CarCardProvider from '@/components/CarCardProvider.vue'
import LoadingCardComponent from '@/components/LoadingCardComponent.vue'

export default {
  components: {
    CarCardProvider,
    LoadingCardComponent,
  },
  data() {
    return {
      cars: [],
      loading: true,
      error: null,
      searchQuery: '',
      showModal: false,
      showDeleteModal: false,
      showSuccessPopup: false,
      deleteCarId: null,
      isEditMode: false,
      form: {
        brand: '',
        model: '',
        license_plate: '',
        rental_rate: '',
        available: true,
        photo: null,
      },
      defaultImage:
        'https://astradigitaldigiroomuat.blob.core.windows.net/storage-uat-001/mobil-offroad.jpg',
    }
  },
  mounted() {
    this.fetchCars()
  },
  methods: {
    handlePhotoUpload(event) {
      const file = event.target.files[0]
      this.form.photo = file // Simpan file di form.photo
    },
    capitalizeWords(str) {
      return str
        .toLowerCase()
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
    },
    async fetchCars() {
      this.loading = true
      try {
        const response = await apiClient.get('cars', {
          params: { q: this.searchQuery },
        })
        this.cars = response.data.data
        this.error = false
        this.loading = false
      } catch (err) {
        console.error(err.response.status)
        this.error = 'Failed to load cars. Please try again.'
        this.loading = false
      }
    },
    openAddModal() {
      this.isEditMode = false
      this.resetForm()
      this.showModal = true
    },
    openEditModal(car) {
      this.isEditMode = true
      this.currentEditId = car.id
      this.form = { ...car }
      this.showModal = true
    },
    async addCar() {
      try {
        const formData = new FormData()
        console.log('typeof this.form.photo', typeof this.form.photo)
        formData.append('brand', this.form.brand)
        formData.append('model', this.form.model)
        formData.append('license_plate', this.form.license_plate)
        formData.append('rental_rate', this.form.rental_rate)
        formData.append('available', true)
        if (typeof this.form.photo !== 'string' && !!this.form.photo) {
          formData.append('photo', this.form.photo)
        }

        const response = await apiClient.post('cars', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
        this.cars.push(response.data)
        this.showModal = false
        this.resetForm()
      } catch (err) {
        console.error(err)
      } finally {
        this.fetchCars()
      }
    },
    async updateCar() {
      try {
        const formData = new FormData()

        formData.append('brand', this.form.brand)
        formData.append('model', this.form.model)
        formData.append('license_plate', this.form.license_plate)
        formData.append('rental_rate', this.form.rental_rate)
        // formData.append('available', true)
        if (typeof this.form.photo !== 'string' && !!this.form.photo) {
          formData.append('photo', this.form.photo)
        }

        const response = await apiClient.post(`cars/${this.currentEditId}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
        const index = this.cars.findIndex((car) => car.id === this.currentEditId)
        if (index !== -1) {
          this.cars.splice(index, 1, response.data.data)
        }
        this.showModal = false
        this.resetForm()
      } catch (err) {
        console.error(err)
      } finally {
        this.fetchCars()
      }
    },
    resetForm() {
      this.form = {
        brand: '',
        model: '',
        license_plate: '',
        rental_rate: '',
        available: true,
      }
    },
    openDeleteModal(carId) {
      this.deleteCarId = carId
      this.showDeleteModal = true
    },
    async deleteCar() {
      try {
        await apiClient.delete(`cars/${this.deleteCarId}`)
        this.cars = this.cars.filter((car) => car.id !== this.deleteCarId) // Hapus dari daftar
        this.showDeleteModal = false // Tutup modal
        this.showSuccessPopup = true // Tampilkan popup sukses
        setTimeout(() => (this.showSuccessPopup = false), 3000) // Sembunyikan popup setelah 3 detik
      } catch (err) {
        console.error(err)
      }
    },
  },
}
</script>
