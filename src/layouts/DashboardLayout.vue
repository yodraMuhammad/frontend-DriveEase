<template>
  <div class="flex h-screen bg-gray-100">
    <!-- Sidebar -->
    <div
      :class="{
        'fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-20 transform transition-transform duration-300': true,
        '-translate-x-full': !isSidebarVisible,
        'translate-x-0': isSidebarVisible,
      }"
    >
      <Sidebar />
    </div>

    <!-- Overlay for Sidebar on Mobile -->
    <div
      v-if="isSidebarVisible"
      @click="toggleSidebar"
      class="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
    ></div>

    <!-- Main Content -->
    <div class="flex-1 flex flex-col md:ml-64">
      <!-- Navbar -->
      <div
        class="fixed top-0 left-0 md:left-64 w-full md:w-[calc(100%-16rem)] bg-white shadow-lg z-10 flex items-center"
      >
        <button @click="toggleSidebar" class="p-4 text-2xl md:hidden">
          <i class="fas fa-bars"></i>
        </button>
        <Navbar />
      </div>

      <!-- Main Content Area -->
      <main class="mt-16 p-0 md:p-6 overflow-y-auto">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script>
import Sidebar from '../components/SidebarComponent.vue'
import Navbar from '../components/NavbarComponent.vue'

export default {
  components: { Sidebar, Navbar },
  data() {
    return {
      isSidebarVisible: false,
    }
  },
  methods: {
    toggleSidebar() {
      this.isSidebarVisible = !this.isSidebarVisible
    },
  },
}
</script>

<style scoped>
/***** Sidebar Transition Styles *****/
@media (min-width: 768px) {
  .transform {
    transform: none !important;
  }
}
</style>
