<template>
  <div class="max-w-md mx-auto mt-10">
    <h1 class="text-2xl font-bold mb-4">Tambah Mobil</h1>
    <form @submit.prevent="addCar">
      <div class="mb-4">
        <label class="block text-sm font-medium">Merek</label>
        <input v-model="car.brand" type="text" class="border rounded w-full p-2" required />
      </div>
      <div class="mb-4">
        <label class="block text-sm font-medium">Model</label>
        <input v-model="car.model" type="text" class="border rounded w-full p-2" required />
      </div>
      <div class="mb-4">
        <label class="block text-sm font-medium">Nomor Plat</label>
        <input v-model="car.license_plate" type="text" class="border rounded w-full p-2" required />
      </div>
      <div class="mb-4">
        <label class="block text-sm font-medium">Tarif Per Hari</label>
        <input v-model="car.daily_rate" type="number" class="border rounded w-full p-2" required />
      </div>
      <button type="submit" class="bg-green-500 text-white px-4 py-2 rounded">Tambah Mobil</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      car: {
        brand: '',
        model: '',
        license_plate: '',
        daily_rate: '',
      },
    }
  },
  methods: {
    addCar() {
      // Kirim data mobil melalui API
      console.log('Car added:', this.car)
    },
  },
}
</script>
