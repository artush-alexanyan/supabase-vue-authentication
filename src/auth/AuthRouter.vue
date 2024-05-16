<template>
  <div>
    <p class="text-sm text-center">
      {{ label }}
      <RouterLink class="text-blue-600 underline" :to="link"> {{ linkText }} </RouterLink>
    </p>
  </div>
</template>

<script setup>
const props = defineProps({
  label: String,
  link: String,
  linkText: {
    type: String,
    default: 'here'
  }
})
</script>
