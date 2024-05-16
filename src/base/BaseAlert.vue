<template>
  <div>
    <Transition
      enter-active-class="animate__animated animate__bounceInRight"
      leave-active-class="animate__animated animate__bounceOutRight"
    >
      <div
        class="base-alert-component w-80 fixed top-2 right-2"
        v-if="messages && messages.length > 0"
      >
        <div
          class="border-l-2 py-4 px-2 text-xs relative my-1"
          :class="getAlertBackground(message.type)"
          v-for="message in messages"
          :key="message.type"
        >
          <div class="flex items-cener">
            <div class="flex items-center">
              <p :class="getTextClass(message.type)" class="font-semibold ml-2">
                {{ message.message }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
const props = defineProps({
  messages: Array
})

const getAlertBackground = (message) => {
  if (message === 'Error') {
    return 'bg-red-50 border-l-red-600'
  } else if (message === 'Success') {
    return 'bg-green-50 border-l-green-600'
  } else if (message === 'Warning') {
    return 'bg-[#FFF9EB] border-l-[#9E7124]'
  } else {
    return 'bg-[#F0FAFC] border-l-[#4AB1FE]'
  }
}
const getTextClass = (message) => {
  if (message === 'Error') {
    return 'text-red-600'
  } else if (message === 'Success') {
    return 'text-green-600'
  } else if (message === 'Warning') {
    return '#9E7124'
  } else {
    return '#4AB1FE'
  }
}
</script>

<style scoped></style>
