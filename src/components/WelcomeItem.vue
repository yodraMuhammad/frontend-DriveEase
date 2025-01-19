<template>
  <div class="flex items-start mt-8 lg:relative lg:pl-10">
    <div
      class="flex items-center justify-center w-12 h-12 text-white bg-blue-500 rounded-lg lg:absolute lg:left-0 lg:top-1/2 lg:transform lg:-translate-y-1/2 lg:w-16 lg:h-16"
    >
      <slot name="icon"></slot>
    </div>
    <div class="flex-1 ml-4">
      <h3 class="text-lg font-semibold text-gray-800">
        <slot name="heading"></slot>
      </h3>
      <p class="mt-2 text-gray-600">
        <slot></slot>
      </p>
    </div>
  </div>
</template>

<style scoped>
/* No additional styles needed, handled by Tailwind CSS */
</style>
