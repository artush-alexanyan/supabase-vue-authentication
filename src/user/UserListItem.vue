<template>
  <div class="user-list-item">
    <div
      v-if="isEdit"
      class="flex items-center justify-between py-3.5 px-2.5 cursor-pointer border-b border-b-gray-100 animate__animated animate__faster animate__flipInX"
    >
      <input
        :disabled="editing"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        type="text"
        class="w-full rounded-md border border-gray-300 px-3 py-1"
      />
      <div class="action flex items-center ml-2.5">
        <button :disabled="editing" @click="cancelEdit">
          <IconCancel :fill="fill" />
        </button>
        <button :disabled="editing" @click="saveChanges">
          <IconLoader v-if="editing" :fill="fill" />
          <IconUserCheck v-else :heightClass="'h-6'" :fill="fill" />
        </button>
      </div>
    </div>
    <div
      v-else
      class="flex items-center justify-between py-3.5 px-2.5 cursor-pointer border-b border-b-gray-100"
    >
      <div class="flex items-center space-x-2">
        <slot name="listItems"></slot>
        <p>{{ cutFieldValue(fieldName) }}</p>
      </div>
      <div class="">
        <button @click="toggleField">
          <IconPen :fill="fill" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import IconLoader from '@/assets/icons/IconLoader.vue'
import IconUserCheck from '@/assets/icons/IconUserCheck.vue'
import IconCancel from '@/assets/icons/IconCancel.vue'
import IconPen from '@/assets/icons/IconPen.vue'

const emit = defineEmits(['update:modelValue', 'toggle-field', 'cancel-edit', 'save-changes'])
const props = defineProps({
  isEdit: Boolean,
  editing: Boolean,
  fill: String,
  fieldName: [String, Number],
  modelValue: [String, Number]
})

const cancelEdit = () => {
  emit('cancel-edit')
}
const saveChanges = () => {
  emit('save-changes')
}
const toggleField = () => {
  emit('toggle-field')
}
const cutFieldValue = (field) => {
  if (field) {
    return field.length > 23 ? `${field.substring(0, 23)}...` : field
  }
  return ''
}
</script>
