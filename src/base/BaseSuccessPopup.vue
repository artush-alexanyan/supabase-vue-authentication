<template>
  <div>
    <Transition
      enter-active-class="animate__animated  animate__fast animate__zoomIn"
      leave-active-class="animate__animated animate__fast animate__zoomOut"
    >
      <div
        v-if="showSuccessPopup"
        class="fixed top-0 left-0 w-full flex mt-20 justify-center h-screen"
      >
        <div class="inset-0 md:w-96 w-60 h-80 bg-white shadow-2xl flex flex-col items-center p-5">
          <div
            class="flex items-center justify-center rounded-full md:h-24 md:w-24 h-18 w-18 bg-green-500"
          >
            <IconUserCheck
              :heightClass="'md:h-20 h-16'"
              :fill="'white'"
              class="animate__animated animate__flipInX animate__delay-1s"
            />
          </div>
          <p class="text-center md:text-base text-sm my-10">{{ message }}</p>
          <button
            @click="redirectPage"
            class="w-3/4 bg-[#1A2E35] text-white px-5 py-2.5 text-sm flex items-center justify-center space-x-1.5"
          >
            {{ btnText }}
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import IconUserCheck from '@/assets/icons/IconUserCheck.vue'

const props = defineProps({
  showSuccessPopup: Boolean,
  message: String,
  btnText: String
})

const emit = defineEmits(['redirect-page'])

const redirectPage = () => {
  emit('redirect-page')
}
</script>
