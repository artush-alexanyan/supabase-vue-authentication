<template>
  <div>
    <img
      v-if="user.avatar_url"
      :src="user.avatar_url"
      alt="avatar"
      class="mx-auto h-28 object-contain rounded-full mb-5"
    />
    <div v-else>
      <img class="mx-auto h-28 object-contain rounded-full mb-5" src="@/assets/images/auth-4.png" />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  user: Object
})
</script>
