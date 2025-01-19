<template>
  <div
    class="bg-white rounded-lg shadow-lg p-4 flex flex-col items-center border hover:border-slate-100 hover:shadow-2xl transition duration-300"
    :class="{ 'bg-blue-500 text-white': car.highlight }"
  >
    <div class="w-full h-52 overflow-hidden rounded">
      <img
        :src="car.photo || defaultImage"
        alt="Car Image"
        class="w-full h-full object-cover transition duration-300 group-hover:scale-110"
      />
    </div>

    <h2
      class="text-2xl font-semibold mt-4"
      :class="{ 'text-white': car.highlight, 'text-gray-800': !car.highlight }"
    >
      {{ capitalizeWords(`${car.brand} ${car.model}`) }}
    </h2>
    <p
      class="text-sm mb-5"
      :class="{ 'text-white': car.highlight, 'text-gray-500': !car.highlight }"
    >
      ( {{ car?.license_plate }} )
    </p>

    <div class="flex justify-between w-full items-center py-3">
      <div>
        <p
          class="text-sm mt-2"
          :class="{ 'text-white': car.highlight, 'text-gray-500': !car.highlight }"
        >
          Starting at
        </p>
        <p
          class="text-xl font-bold mt-1"
          :class="{ 'text-white': car.highlight, 'text-gray-800': !car.highlight }"
        >
          IDR {{ new Intl.NumberFormat('id-ID').format(car.rental_rate) }}/day
        </p>
      </div>
      <div
        class="mt-4 py-2 px-6 rounded-xl font-semibold transition duration-300"
        :class="{
          'bg-gray-400 text-white': car.rented,
          'bg-green-200 text-green-600': car.available && !car.rented,
          'bg-gray-300 text-gray-700': !car.available,
        }"
      >
        {{ car.available ? 'Available' : 'Rented' }}
      </div>
    </div>
    <div class="flex justify-center gap-3 w-full items-center py-3">
      <button
        class="mt-4 py-2 px-6 rounded-full font-semibold transition duration-300"
        :class="{
          'bg-gray-400 text-white': car.rented,
          'bg-yellow-500 text-white hover:bg-yellow-600': car.available && !car.rented,
          'bg-gray-300 text-gray-700 cursor-not-allowed': !car.available,
        }"
        :disabled="!car.available || car.rented"
        :title="!car.available ? 'Car not available' : car.rented ? 'Currently rented' : ''"
        @click="openEditModal(car)"
      >
        <i class="fas fa-edit mr-2"></i> Edit
      </button>
      <button
        class="mt-4 py-2 px-6 rounded-full font-semibold transition duration-300"
        :class="{
          'bg-gray-400 text-white': car.rented,
          'bg-red-500 text-white hover:bg-red-600': car.available && !car.rented,
          'bg-gray-300 text-gray-700 cursor-not-allowed': !car.available,
        }"
        :disabled="!car.available || car.rented"
        :title="!car.available ? 'Car not available' : car.rented ? 'Currently rented' : ''"
        @click="openDeleteModal(car.id)"
      >
        <i class="fas fa-trash-alt mr-2"></i> Delete
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    car: Object,
    defaultImage: String,
    openEditModal: Function,
    openDeleteModal: Function,
    capitalizeWords: Function,
  },
}
</script>
