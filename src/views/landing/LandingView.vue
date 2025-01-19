<template>
  <div class="h-screen flex items-center justify-center bg-gray-50 px-4">
    <div
      class="flex flex-col md:flex-row items-center max-w-6xl w-full rounded-lg overflow-hidden gap-10"
    >
      <div class="md:w-1/2">
        <img
          src="https://cdn3d.iconscout.com/3d/premium/thumb/car-3d-illustration-download-in-png-blend-fbx-gltf-file-formats--vehicle-transport-automobile-transportation-travel-city-pack-miscellaneous-illustrations-3945475.png?f=webp"
          alt="Car rental banner"
          class="w-full h-64 object-cover md:h-full"
        />
      </div>
      <div class="md:w-1/2 p-6 text-center md:text-left">
        <h1 class="text-4xl font-bold text-gray-800 mb-4">Find Your Perfect Ride</h1>
        <p class="text-gray-600 mb-6">
          Explore our wide selection of rental cars and start your journey with ease and
          convenience.
        </p>
        <div>
          <router-link
            to="/login"
            class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Login
          </router-link>
          <router-link
            to="/register"
            class="ml-4 bg-gray-100 text-gray-800 px-4 py-2 rounded hover:bg-gray-200"
          >
            Register
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/***** Responsive Adjustments *****/
@media (max-width: 768px) {
  .h-screen {
    height: auto;
    padding-top: 2rem;
    padding-bottom: 2rem;
  }
}
</style>
