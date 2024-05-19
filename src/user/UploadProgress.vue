<template>
  <div class="avatar-upload-progress">
    <Transition
      enter-active-class="animate__animated  animate__fast animate__zoomIn"
      leave-active-class="animate__animated animate__fast animate__zoomOut"
    >
      <div
        v-if="savingProgress"
        class="fixed top-0 left-0 w-full flex mt-20 justify-center h-screen"
      >
        <div
          class="bg-[#1A2E35] text-white rounded-md h-20 flex items-center justify-center shadow-xl p-5"
        >
          <div class="flex items-center justify-between space-x-1.5">
            <p>{{ uploading ? 'Uploading image...' : saving ? 'Saving image...' : 'Saved!' }}</p>
            <IconUpload class="animate-bounce" v-if="uploading" :fill="'white'" />
            <IconLoader v-else-if="saving" :fill="'white'" />
            <IconUserCheck
              v-else
              :heightClass="'h-7'"
              class="animate__animated animate__flipInX animate__delay-1s"
              :fill="'green'"
            />
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import IconLoader from '@/assets/icons/IconLoader.vue'
import IconUserCheck from '@/assets/icons/IconUserCheck.vue'
import IconUpload from '@/assets/icons/IconUpload.vue'

const props = defineProps({
  uploading: Boolean,
  saving: Boolean,
  savingProgress: Boolean
})
</script>
