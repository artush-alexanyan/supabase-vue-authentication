<template>
  <div>
    <div class="grid md:grid-cols-2 grid-cols-1 gap-5 x-5 border h-screen">
      <div
        class="md:block hidden bg-[url('@/assets/images/auth-5.jpg')] bg-contain bg-no-repeat bg-center"
      ></div>
      <div
        class="flex items-center justify-center animate__animated animate__fadeInDown animate__fast md:bg-none bg-[url('@/assets/images/auth-5.jpg')] bg-contain bg-no-repeat bg-top"
      >
        <div class="w-80 md:mt-0 mt-52">
          <h1 class="text-7xl text-center mb-10 font-candy text-[#FF735C]">Reset password</h1>
          <form @submit.prevent="resetPassword" class="space-y-2.5">
            <BaseInput
              :label="'Enter new password'"
              v-model="password"
              :loading="loading"
              :type="'password'"
            >
              <template #icon>
                <IconPasswordNew :fill="'#1A2E35'" />
              </template>
            </BaseInput>
            <BaseInput
              :label="'Confirm new password'"
              v-model="new_password"
              :loading="loading"
              :type="'password'"
            >
              <template #icon>
                <IconPasswordConfirm :fill="'#1A2E35'" />
              </template>
            </BaseInput>
            <BaseSubmitBtn :label="'Save password'" :loading="loading" />
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
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { supabase } from '@/supabase/supabase'
import BaseInput from '@/base/BaseInput.vue'
import BaseSubmitBtn from '@/base/BaseSubmitBtn.vue'
import IconPasswordNew from '@/assets/icons/IconPasswordNew.vue'
import IconPasswordConfirm from '@/assets/icons/IconPasswordConfirm.vue'
import BaseSuccessPopup from '@/base/BaseSuccessPopup.vue'
import router from '@/router'

const loading = ref(false)
const password = ref('')
const new_password = ref('')
const showSuccessPopup = ref(false)
const message = ref('')
const btnText = ref('Go to login')

const resetPassword = async () => {
  if (password.value !== new_password.value) {
    alert('Passwords dont match!')
    return
  }
  try {
    loading.value = true
    const { data, error } = await supabase.auth.updateUser({
      password: new_password.value
    })
    if (error) throw error
    console.log('data', data)
    message.value = 'Password updated successfully!'
    showSuccessPopup.value = true
  } catch (error) {
    if (error) {
      alert(error.message)
    }
  } finally {
    loading.value = false
  }
}
const redirectPage = () => {
  router.push({ path: '/' })
}
</script>
