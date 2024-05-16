<template>
  <div class="">
    <div class="grid md:grid-cols-2 grid-cols-1 gap-5 x-5 border h-screen">
      <div
        class="md:block hidden bg-[url('@/assets/images/auth-3.jpg')] bg-contain bg-no-repeat bg-center"
      ></div>
      <div
        class="flex items-center justify-center animate__animated animate__slideInDown animate__fast md:bg-none bg-[url('@/assets/images/auth-3.jpg')] bg-contain bg-no-repeat bg-top"
      >
        <div class="w-80 md:mt-0 mt-52">
          <h1 class="text-7xl text-center mb-10 font-candy text-[#FF735C]">Register</h1>
          <form @submit.prevent="userRegister" class="space-y-2.5">
            <BaseInput
              :label="'Your full name'"
              v-model="full_name"
              :loading="registerLoading"
              :type="'text'"
            >
              <template #icon>
                <IconUser :fill="fill" />
              </template>
            </BaseInput>
            <BaseInput
              :label="'Your valid email'"
              v-model="email"
              :loading="registerLoading"
              :type="'Email'"
            >
              <template #icon>
                <IconEmail :fill="fill" />
              </template>
            </BaseInput>
            <BaseInput
              :label="'Create password'"
              v-model="password"
              :loading="registerLoading"
              :type="'Password'"
            >
              <template #icon>
                <IconPassword :fill="fill" />
              </template>
            </BaseInput>
            <BaseSubmitBtn :label="'Create account'" :loading="registerLoading" />
          </form>
          <AuthSocial />
          <AuthRouter :link="'/'" :label="`Already have an account? Login `" />
        </div>
      </div>
      <!-- <BaseSuccessPopup /> -->
    </div>
    <BaseAlert :messages="registerMessages" />
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRegisterStore } from '@/stores/register'
import BaseInput from '@/base/BaseInput.vue'
import BaseSubmitBtn from '@/base/BaseSubmitBtn.vue'
import AuthSocial from './AuthSocial.vue'
import AuthRouter from './AuthRouter.vue'
import IconEmail from '@/assets/icons/IconEmail.vue'
import IconPassword from '@/assets/icons/IconPassword.vue'
import IconUser from '@/assets/icons/IconUser.vue'
// import BaseSuccessPopup from '@/base/BaseSuccessPopup.vue'
import BaseAlert from './verification/BaseAlert.vue'

const registerStore = useRegisterStore()
const registerLoading = computed(() => registerStore.registerLoading)
const registerMessages = computed(() => registerStore.registerMessages)
const fill = ref('#1A2E35')
const full_name = ref('')
const email = ref('')
const password = ref('')
const avatar_url = ref('')

const userRegister = async () => {
  const options = {
    email: email.value,
    password: password.value,
    user_metadata: {
      name: full_name.value,
      full_name: full_name.value,
      avatar_url: avatar_url.value
    }
  }
  await registerStore.userRegister(options)
}
</script>
