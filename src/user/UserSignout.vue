<template>
  <div class="signout">
    <button
      :disabled="loading"
      class="border border-gray-300 rounded-md flex items-center justify-center space-x-1 bg-[#1A2E35] text-sm text-white px-5 py-2.5"
      @click="userSignout"
    >
      <span>Log out</span>
      <IconLoader v-if="loading" :fill="'white'" />
      <IconSignout v-else :fill="'white'" />
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '@/supabase/supabase'
import IconSignout from '@/assets/icons/IconSignout.vue'
import IconLoader from '@/assets/icons/IconLoader.vue'

const router = useRouter()
const loading = ref(false)

const userSignout = async () => {
  try {
    loading.value = true

    const { error } = await supabase.auth.signOut()
    if (error) throw error
    router.push({ path: '/' })
  } catch (error) {
    if (error instanceof Error) {
      alert(error.message)
    }
  } finally {
    loading.value = false
  }
}
</script>
