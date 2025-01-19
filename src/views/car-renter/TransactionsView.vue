<template>
  <div class="min-h-screen bg-gray-100 p-6 max-w-full">
    <div class="max-w-xs md:max-w-6xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h1 class="text-2xl font-semibold mb-6">Rental List</h1>
      <div v-if="loading" class="text-center text-gray-600">Loading rentals...</div>
      <div v-else-if="error" class="text-center text-red-500">{{ error }}</div>
      <div v-else>
        <div class="overflow-x-auto">
          <table class="w-full border-collapse border border-gray-300">
            <thead>
              <tr class="bg-gray-200">
                <th class="border border-gray-300 px-4 py-2">No.</th>
                <th class="border border-gray-300 px-4 py-2">Vehicle</th>
                <th class="border border-gray-300 px-4 py-2">License Plate No.</th>
                <th class="border border-gray-300 px-4 py-2">Rental Start Date</th>
                <th class="border border-gray-300 px-4 py-2">Rental End Date</th>
                <th class="border border-gray-300 px-4 py-2">Duration (Days)</th>
                <th class="border border-gray-300 px-4 py-2">Total Price</th>
                <th class="border border-gray-300 px-4 py-2">Vehicle Owner</th>
                <th class="border border-gray-300 px-4 py-2">Rental Status</th>
                <th class="border border-gray-300 px-4 py-2">Operations</th>
              </tr>
            </thead>
            <tbody v-if="rentals.length">
              <tr v-for="(rental, index) in rentals" :key="rental.id">
                <td class="border border-gray-300 px-4 py-2">{{ index + 1 }}</td>
                <td class="border border-gray-300 px-4 py-2">
                  {{ rental.car.brand }} {{ rental.car.model }}
                </td>
                <td class="border border-gray-300 px-4 py-2">{{ rental.car.license_plate }}</td>
                <td class="border border-gray-300 px-4 py-2">{{ rental.start_date }}</td>
                <td class="border border-gray-300 px-4 py-2">{{ rental.end_date }}</td>
                <td class="border border-gray-300 px-4 py-2">
                  {{ calculateTotalDays(rental.start_date, rental.end_date) }}
                </td>
                <td class="border border-gray-300 px-4 py-2">
                  IDR
                  {{ calculatePrice(rental.start_date, rental.end_date, rental.car.rental_rate) }}
                </td>
                <td class="border border-gray-300 px-4 py-2">{{ rental.car.owner.name }}</td>
                <td class="border border-gray-300 px-4 py-2 capitalize">
                  <div
                    class="px-1 py-1 rounded-md text-center"
                    :class="rental.status === 'ongoing' ? 'bg-yellow-300' : 'bg-green-300'"
                  >
                    {{ rental.status }}
                  </div>
                </td>
                <td class="border border-gray-300 px-4 py-2 text-center">
                  <button
                    :disabled="!isReturnable(rental.start_date) || rental.status !== 'ongoing'"
                    @click="confirmReturn(rental.id)"
                    :class="{
                      'bg-blue-500 text-white hover:bg-blue-600':
                        rental.status === 'ongoing' && isReturnable(rental.start_date),
                      'bg-gray-300 text-gray-700 cursor-not-allowed':
                        rental.status !== 'ongoing' || !isReturnable(rental.start_date),
                    }"
                    class="px-4 py-2 rounded-lg transition duration-300"
                  >
                    Return Vehicle
                  </button>
                </td>
              </tr>
            </tbody>
            <tbody v-else>
              <tr>
                <td colspan="10" class="text-center py-3">No Data Available</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Confirmation Modal -->
    <div
      v-if="showModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 class="text-xl font-semibold mb-4">Confirm Return</h2>
        <p>Are you sure you want to return this car today?</p>
        <div class="flex justify-end mt-6 space-x-4">
          <button
            @click="closeModal"
            class="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition duration-300"
          >
            Cancel
          </button>
          <button
            @click="processReturn"
            class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Yes, Return
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import apiClient from '../../plugins/axios'

export default {
  data() {
    return {
      rentals: [],
      loading: true,
      error: null,
      showModal: false,
      selectedRentalId: null,
    }
  },
  mounted() {
    this.fetchRentals()
  },
  methods: {
    isReturnable(startDate) {
      const today = new Date()
      const start = new Date(startDate)
      return today >= start
    },
    async fetchRentals() {
      this.loading = true
      try {
        const response = await apiClient.get('user/rentals')
        this.rentals = response.data.data
        this.error = null
      } catch (err) {
        console.error(err)
        this.error = 'Failed to fetch rentals. Please try again later.'
      } finally {
        this.loading = false
      }
    },
    calculateTotalDays(startDate, endDate) {
      if (!startDate || !endDate) return 0
      const start = new Date(startDate)
      const end = new Date(endDate)
      const diffTime = Math.abs(end - start)
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1
    },
    calculatePrice(startDate, endDate, rentalRate) {
      const totalDays = this.calculateTotalDays(startDate, endDate)
      return (totalDays * rentalRate).toLocaleString('id-ID')
    },
    confirmReturn(rentalId) {
      this.selectedRentalId = rentalId
      this.showModal = true
    },
    closeModal() {
      this.showModal = false
      this.selectedRentalId = null
    },
    async processReturn() {
      try {
        const today = new Date().toISOString().split('T')[0]
        await apiClient.post('/car-returns', {
          rental_id: this.selectedRentalId,
          return_date: today,
        })
        this.fetchRentals()
        this.closeModal()
      } catch (err) {
        console.error(err)
      }
    },
  },
}
</script>
