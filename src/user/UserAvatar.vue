<template>
  <div class="flex flex-col items-center p-2.5">
    <div class="relative">
      <img
        v-if="user.avatar_url"
        :src="user.avatar_url"
        alt="avatar"
        class="mx-auto h-28 w-28 object-cover rounded-full mb-5"
      />
      <div v-else>
        <img
          class="mx-auto h-28 w-28 flex items-center justify-center border border-gray-300 object-contain rounded-full mb-5"
          src="@/assets/images/auth-4.png"
        />
      </div>
      <input ref="inputFile" class="hidden" @input="emit('select-image', $event)" type="file" />
      <button
        @click="handleInputClick"
        class="absolute h-7 w-7 rounded-full flex items-center justify-center bg-white shadow-xl bottom-5 right-2"
      >
        <IconCamera :fill="'#1A2E35'" />
      </button>
    </div>

    <button
      class="px-3.5 py-1.5 rounded-full bg-green-600 text-white text-xs"
      v-if="imageFile"
      @click="saveAvatar"
    >
      Save
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import IconCamera from '@/assets/icons/IconCamera.vue'

const inputFile = ref(null)
const props = defineProps({
  user: Object,
  imageFile: Object
})

const emit = defineEmits(['select-image', 'save-avatar'])
const saveAvatar = () => {
  emit('save-avatar')
}
const handleInputClick = () => {
  inputFile.value.click()
}
</script>
