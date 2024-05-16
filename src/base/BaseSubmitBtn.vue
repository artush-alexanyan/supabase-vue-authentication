<template>
  <div>
    <button
      class="border border-gray-300 flex items-center justify-center space-x-1 bg-[#1A2E35] text-sm text-white px-5 py-2.5 mt-5 w-full"
      type="submit"
      :disabled="loading"
    >
      <span> {{ label }} </span>
      <IconLoader v-if="loading" :fill="'white'" />
      <IconSignin v-else :fill="'white'" />
    </button>
  </div>
</template>

<script setup>
import IconSignin from '@/assets/icons/IconSignin.vue'
import IconLoader from '@/assets/icons/IconLoader.vue'
const props = defineProps({
  label: String,
  loading: Boolean
})
</script>
