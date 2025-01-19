<template>
  <div class="border bg bg-white shadow-lg rounded-md p-4 max-w-sm w-full mx-auto">
    <div class="animate-pulse space-x-4">
      <div class="flex-1 space-y-6 py-1">
        <div class="h-40 bg-slate-200 rounded"></div>
        <div class="space-y-3">
          <div class="h-10 bg-slate-200 rounded col-span-1"></div>
          <div class="h-10 bg-slate-200 rounded"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoadingComponent',
}
</script>
