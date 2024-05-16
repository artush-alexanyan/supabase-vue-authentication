<template>
  <div class="flex flex-col relative border border-gray-300 bg-white">
    <label class="text-[0.65rem] font-semibold rounded absolute left-2 -top-2 p-0 m-0 bg-white">
      {{ label }}
    </label>
    <div class="">
      <div class="icon absolute left-2 top-3.5">
        <slot name="icon"> </slot>
      </div>
      <input
        required
        :type="type"
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
const props = defineProps({
  label: String,
  type: String,
  loading: Boolean,
  modelValue: [String, Number]
})
const emit = defineEmits(['update:modelValue'])
</script>

<style>
.input-field:valid {
  background-color: transparent;
}
</style>
