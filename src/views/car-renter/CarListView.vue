<template>
  <div class="min-h-screen bg-gray-100 p-6">
    <div class="flex w-full justify-center">
      <div
        class="space-y-6 mb-6 border justify-center py-6 px-8 bg-white shadow-lg w-full sm:w-[70%] md:w-[50%] lg:w-[35%] rounded-lg mx-auto"
      >
        <h1 class="text-xl font-semibold text-start mb-4">Find Your Vehicle</h1>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label for="start-date" class="block text-sm font-medium text-gray-700 mb-2"
              >Start Date</label
            >
            <input
              id="start-date"
              v-model="startDate"
              :min="today"
              type="date"
              @change="updateEndDate"
              class="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 w-full"
            />
          </div>
          <div>
            <label for="end-date" class="block text-sm font-medium text-gray-700 mb-2">
              End Date
            </label>
            <input
              id="end-date"
              v-model="endDate"
              :min="startDate"
              type="date"
              class="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 w-full"
            />
          </div>
          <div class="flex justify-center items-end"></div>

          <div class="flex justify-center items-end">
            <button
              @click="fetchCars"
              class="bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition duration-300 w-full"
            >
              Find a Car
            </button>
          </div>
        </div>
      </div>
    </div>

    <div v-if="cars.length">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold text-gray-800 hidden md:flex">Car Listings</h1>
        <input
          v-model="searchQuery"
          @input="fetchCars"
          type="text"
          placeholder="Search by brand or model..."
          class="w-full sm:w-64 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div v-if="loading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mt-10">
        <LoadingCardComponent v-for="index in 4" :key="index" />
      </div>
      <div v-else-if="error" class="text-center text-red-500">{{ error }}</div>
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <CarCardRent
          v-for="car in cars"
          :key="car.id"
          :car="car"
          :defaultImage="defaultImage"
          :openRentModal="openRentModal"
          :capitalizeWords="capitalizeWords"
        />
      </div>
    </div>

    <div
      v-if="showModal"
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
    >
      <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 class="text-xl font-semibold mb-4">Rent Car</h2>
        <form @submit.prevent="rentCar">
          <div class="mb-4">
            <label for="start-date" class="block text-sm font-medium text-gray-700"
              >Start Date</label
            >
            <input
              disabled
              id="start-date"
              v-model="rentForm.start_date"
              type="date"
              class="p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 w-full"
            />
          </div>
          <div class="mb-4">
            <label for="end-date" class="block text-sm font-medium text-gray-700">End Date</label>
            <input
              disabled
              id="end-date"
              v-model="rentForm.end_date"
              type="date"
              class="p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 w-full"
            />
          </div>
          <div class="mb-4">
            <label for="total-days" class="block text-sm font-medium text-gray-700"
              >Total Days</label
            >
            <input
              id="total-days"
              :value="calculateTotalDays(rentForm.start_date, rentForm.end_date)"
              type="number"
              class="p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 w-full"
              disabled
            />
          </div>
          <div class="flex justify-end space-x-4">
            <button
              type="button"
              @click="closeModal"
              class="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition duration-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Confirm
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import apiClient from '../../plugins/axios'
import CarCardRent from '@/components/CarCardRent.vue'
import LoadingCardComponent from '@/components/LoadingCardComponent.vue'

export default {
  components: {
    CarCardRent,
    LoadingCardComponent,
  },
  data() {
    return {
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date().toISOString().split('T')[0],
      today: new Date().toISOString().split('T')[0],
      cars: [],
      loading: true,
      error: null,
      searchQuery: '',
      showModal: false,
      selectedCar: null,
      rentForm: {
        car_id: null,
        start_date: '',
        end_date: '',
      },
      defaultImage:
        'https://astradigitaldigiroomuat.blob.core.windows.net/storage-uat-001/mobil-offroad.jpg',
    }
  },
  mounted() {
    // this.fetchCars()
  },
  methods: {
    updateEndDate() {
      this.endDate = this.startDate
    },
    calculateTotalDays(startDate, endDate) {
      if (!startDate || !endDate) return 0
      const start = new Date(startDate)
      const end = new Date(endDate)
      const diffTime = Math.abs(end - start)
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1
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
        const response = await apiClient.get('cars/availability', {
          params: {
            q: this.searchQuery,
            start_date: this.startDate,
            end_date: this.endDate,
          },
        })
        this.cars = response.data.data
        this.error = false
        this.loading = false
      } catch (err) {
        console.error(err.response.status)
        if (err.response.status === 404) {
          this.error = err.response.data.message
        } else {
          this.error = 'Failed to load cars. Please try again.'
        }
        this.loading = false
      }
    },
    openRentModal(car) {
      this.selectedCar = car
      this.rentForm.car_id = car.id
      this.rentForm.start_date = this.startDate
      this.rentForm.end_date = this.endDate
      this.showModal = true
    },
    closeModal() {
      this.showModal = false
    },
    async rentCar() {
      try {
        const response = await apiClient.post('/rentals', this.rentForm)
        if (response.data.status === 'success') {
          this.$router.push('/renter/transactions')
        }
        this.closeModal()
      } catch (err) {
        console.error(err)
      }
    },
  },
}
</script>
