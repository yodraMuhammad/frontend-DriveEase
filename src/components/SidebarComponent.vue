<template>
  <div>
    <!-- Sidebar for Desktop -->
    <div class="w-64 bg-slate-200 text-slate-600 flex-col h-screen hidden md:flex">
      <!-- Logo -->
      <div class="p-4 flex items-center space-x-2"></div>

      <!-- Menu -->
      <nav class="flex-1 p-4 overflow-y-auto">
        <ul>
          <li v-for="(menu, index) in menus" :key="index" class="mb-1">
            <span class="text-md font-bold flex items-center text-black justify-between w-full">
              {{ menu.header }}
            </span>

            <!-- Dropdown -->
            <ul v-if="menu.isOpen" class="mt-2 pl-4">
              <li v-for="(item, subIndex) in menu.items" :key="subIndex" class="mb-2">
                <router-link
                  :to="item.link"
                  class="flex items-center p-2 rounded hover:bg-blue-200"
                  :class="{ 'bg-blue-300 text-blue-700': isActive(item.link) }"
                >
                  <i :class="item.icon" class="mr-2"></i>
                  {{ item.name }}
                </router-link>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </div>

    <!-- Hamburger Menu for Mobile -->
    <div class="md:hidden">
      <transition name="slide-left">
        <div
          v-if="showMobileMenu"
          class="fixed top-0 left-0 w-64 bg-slate-200 h-screen shadow-lg z-50 p-4 pt-8"
        >
          <ul>
            <li v-for="(menu, index) in menus" :key="index" class="mb-1">
              <span class="text-md font-bold flex items-center justify-between w-full">
                {{ menu.header }}
              </span>

              <!-- Dropdown -->
              <ul v-if="menu.isOpen" class="mt-2 pl-4">
                <li v-for="(item, subIndex) in menu.items" :key="subIndex" class="mb-2">
                  <router-link
                    :to="item.link"
                    class="flex items-center p-2 rounded hover:bg-blue-200"
                    :class="{ 'bg-blue-300 text-black': isActive(item.link) }"
                  >
                    <i :class="item.icon" class="mr-2"></i>
                    {{ item.name }}
                  </router-link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menus: [
        {
          header: 'Dashboard',
          isOpen: true,
          items: [
            {
              name: 'Dashboard',
              link: '/dashboard',
              icon: 'fas fa-tachometer-alt',
            },
          ],
        },
        {
          header: 'Provider',
          isOpen: true,
          items: [
            {
              name: 'Car List',
              link: '/provider/car-list',
              icon: 'fas fa-car',
            },
            {
              name: 'Transaction History',
              link: '/provider/transactions',
              icon: 'fas fa-file-invoice-dollar',
            },
          ],
        },
        {
          header: 'Renter',
          isOpen: true,
          items: [
            {
              name: 'Available Cars',
              link: '/renter/available-cars',
              icon: 'fas fa-car-side',
            },
            {
              name: 'Transaction History',
              link: '/renter/transactions',
              icon: 'fas fa-receipt',
            },
          ],
        },
      ],
      showMobileMenu: true,
    }
  },
  methods: {
    toggleDropdown(index) {
      this.menus[index].isOpen = !this.menus[index].isOpen
    },
    isActive(link) {
      return this.$route.path === link
    },
    logout() {
      localStorage.removeItem('token')
      this.$router.push('/login')
    },
    toggleMobileMenu() {
      this.showMobileMenu = !this.showMobileMenu
    },
  },
}
</script>

<style scoped>
.slide-left-enter-active {
  transition: transform 0.3s ease-in-out;
}
.slide-left-leave-active {
  transition: transform 0.3s ease-in-out;
}
.slide-left-enter {
  transform: translateX(-100%);
}
.slide-left-leave-to {
  transform: translateX(-100%);
}
</style>
