<template>
  <div>
    <div class="grid md:grid-cols-2 grid-cols-1 gap-5 x-5 border h-screen">
      <div
        class="md:block hidden bg-[url('@/assets/images/auth-6.jpg')] bg-contain bg-no-repeat bg-center"
      ></div>
      <div
        class="flex items-center justify-center animate__animated animate__fadeInDown animate__fast md:bg-none bg-[url('@/assets/images/auth-5.jpg')] bg-contain bg-no-repeat bg-top"
      >
        <div class="w-80 md:mt-0 mt-52">
          <h1 class="text-7xl text-center mb-10 font-candy text-[#FF735C]">Send reset email</h1>
          <form @submit.prevent="sendPasswordReset" class="space-y-2.5">
            <BaseInput
              :label="'Enter your account email'"
              v-model="email"
              :loading="loading"
              :type="'Email'"
            >
              <template #icon>
                <IconEmailSend :fill="'#1A2E35'" />
              </template>
            </BaseInput>
            <BaseSubmitBtn :label="'Send reset email'" :loading="loading" />
            <RouterLink class="mt-1.5 text-xs text-blue-600" to="/">Back to login</RouterLink>
          </form>
        </div>
      </div>
    </div>
    <BaseSuccessPopup
      :message="message"
      :btnText="btnText"
      :showSuccessPopup="showSuccessPopup"
      @redirect-page="redirectPage"
    />
    <BaseAlert :messages="messages" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '@/supabase/supabase'
import BaseInput from '@/base/BaseInput.vue'
import BaseSubmitBtn from '@/base/BaseSubmitBtn.vue'
import IconEmailSend from '@/assets/icons/IconEmailSend.vue'
import BaseSuccessPopup from '@/base/BaseSuccessPopup.vue'
import BaseAlert from '@/base//BaseAlert.vue'

const loading = ref(false)
const email = ref('')
const showSuccessPopup = ref(false)
const message = ref('')
const btnText = ref('Close')
const messages = ref([])

const resetMessages = () => {
  setTimeout(() => {
    messages.value = []
  }, 3000)
}

const sendPasswordReset = async () => {
  try {
    loading.value = true

    const { error } = await supabase.auth.resetPasswordForEmail(email.value, {
      redirectTo: 'http://localhost:5173/reset-password'
    })
    if (error) {
      messages.value.push({
        type: 'Error',
        message: error.message
      })
      resetMessages()
      return
    }
    message.value = 'Password reset sent. Check your mail.'
    showSuccessPopup.value = true
  } catch (error) {
    if (error) {
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
const redirectPage = () => {
  ;(showSuccessPopup.value = false), (message.value = '')
}
</script>
