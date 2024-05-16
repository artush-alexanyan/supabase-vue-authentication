<template>
  <div class="">
    <div class="grid md:grid-cols-2 grid-cols-1 gap-5 x-5 border h-screen">
      <div
        class="md:block hidden bg-[url('@/assets/images/auth-3.jpg')] bg-contain bg-no-repeat bg-center"
      ></div>
      <div
        class="flex items-center justify-center animate__animated animate__fadeInDown animate__fast md:bg-none bg-[url('@/assets/images/auth-3.jpg')] bg-contain bg-no-repeat bg-top"
      >
        <div class="w-80 md:mt-0 mt-52">
          <h1 class="text-7xl text-center mb-10 font-candy text-[#FF735C]">Login</h1>
          <form @submit.prevent="userLogin" class="space-y-2.5">
            <BaseInput :label="'Email'" v-model="email" :loading="loading" :type="'Email'">
              <template #icon>
                <IconEmail :fill="'#1A2E35'" />
              </template>
            </BaseInput>
            <BasePasswordInput :label="'Password'" v-model="password" :loading="loading">
            </BasePasswordInput>
            <RouterLink class="mt-1.5 text-xs text-blue-600" to="/forgot-password"
              >Forgot password?</RouterLink
            >
            <BaseSubmitBtn :label="'Login'" :loading="loading" />
          </form>
          <AuthSocial />
          <AuthRouter :link="'/register'" :label="`Don't have an account? Register `" />
        </div>
      </div>
    </div>
    <BaseAlert :messages="messages" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '@/supabase/supabase'
import BaseInput from '@/base/BaseInput.vue'
import BasePasswordInput from '@/base/BasePasswordInput.vue'
import BaseSubmitBtn from '@/base/BaseSubmitBtn.vue'
import AuthSocial from './AuthSocial.vue'
import AuthRouter from './AuthRouter.vue'
import IconEmail from '@/assets/icons/IconEmail.vue'
import BaseAlert from '@/base/BaseAlert.vue'

const router = useRouter()
const loading = ref(false)
const email = ref('')
const password = ref('')
const messages = ref([])

const resetMessages = () => {
  setTimeout(() => {
    messages.value = []
  }, 3000)
}
const userLogin = async () => {
  try {
    loading.value = true
    const { error } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value
    })
    if (error) {
      loading.value = false
      messages.value.push({
        type: 'Error',
        message: error.message
      })
      resetMessages()
      return
    }
    loading.value = false
    router.push({ path: '/user' })
  } catch (error) {
    if (error) {
      loading.value = false
      messages.value.push({
        type: 'Error',
        message: error.message
      })
      resetMessages()
      return
    }
  } finally {
    loading.value = false
  }
}
</script>
