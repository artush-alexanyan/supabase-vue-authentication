<template>
  <div class="flex flex-col relative border border-gray-300 bg-white">
    <label class="text-[0.65rem] font-semibold rounded absolute left-2 -top-2 p-0 m-0 bg-white">
      {{ label }}
    </label>
    <div class="">
      <div class="icon absolute left-2 top-3.5">
        <IconPasswordUnlocked v-if="showPassword" :fill="'#1A2E35'" />
        <IconPassword v-else :fill="'#1A2E35'" />
      </div>
      <div class="icon absolute right-2 top-3.5">
        <button @click.prevent="togglePassword">
          <IconEye v-if="showPassword" :fill="'#1A2E35'" />
          <IconeEyeSlash v-else :fill="'#1A2E35'" />
        </button>
      </div>
      <input
        required
        :type="showPassword ? 'text' : 'password'"
        :placeholder="label"
        :disabled="loading"
        class="input-field placeholder:text-gray-300 text-sm placeholder:text-sm w-full outline-0 bg-white focus:bg-white focus:border-gray-300 pl-10 py-3"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import IconPassword from '@/assets/icons/IconPassword.vue'
import IconPasswordUnlocked from '@/assets/icons/IconPasswordUnlocked.vue'
import IconEye from '@/assets/icons/IconEye.vue'
import IconeEyeSlash from '@/assets/icons/IconeEyeSlash.vue'
const props = defineProps({
  label: String,
  loading: Boolean,
  modelValue: [String, Number]
})
const emit = defineEmits(['update:modelValue'])

const showPassword = ref(false)
const fill = ref('#1A2E35')

const togglePassword = () => {
  showPassword.value = !showPassword.value
}
</script>
