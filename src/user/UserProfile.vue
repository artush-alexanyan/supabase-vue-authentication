<template>
  <div class="grid md:grid-cols-2 grid-cols-1 gap-5 x-5 h-screen">
    <div
      class="md:block hidden bg-[url('@/assets/images/auth-7.jpg')] bg-contain bg-no-repeat bg-center"
    ></div>
    <div class="">
      <div v-if="loading" class="flex items-center justify-center h-screen">
        <IconLoader :fill="'#1A2E35'" />
      </div>
      <div v-else class="flex items-center justify-center">
        <div
          class="flex flex-col items-center w-80 rounded bg-white p-5 animate__animated animate__zoomIn animate__fast"
          v-if="user"
        >
          <h1 class="text-center text-7xl my-10 font-candy">My Profile</h1>
          <UserAvatar :user="user" />
          <p class="text-3xl font-semibold">{{ user.full_name }}</p>
          <ul class="w-full my-10">
            <li
              class="flex items-center justify-between py-3.5 px-2.5 cursor-pointer border-b border-b-gray-100 hover:shadow"
            >
              <div class="flex items-center space-x-2">
                <IconUser :fill="'#1A2E35'" />
                <p>{{ user.full_name }}</p>
              </div>
              <div class="">
                <button>Edit</button>
              </div>
            </li>
            <li
              class="flex items-center justify-between py-3.5 px-2.5 cursor-pointer border-b border-b-gray-100 hover:shadow"
            >
              <div class="flex items-center space-x-2">
                <IconEmail :fill="'#1A2E35'" />
                <p>{{ user.email }}</p>
              </div>
              <div class="">
                <button>Edit</button>
              </div>
            </li>
            <li
              class="flex items-center justify-between py-3.5 px-2.5 cursor-pointer border-b border-b-gray-100 hover:shadow"
            >
              <div class="flex items-center space-x-2">
                <IconPassword :fill="'#1A2E35'" />
                <p>********</p>
              </div>
              <div class="">
                <button>Edit</button>
              </div>
            </li>
          </ul>
          <button
            :disabled="loading"
            class="border border-gray-300 flex items-center justify-center space-x-1 bg-[#1A2E35] text-sm text-white px-5 py-2.5"
            @click="userSignout"
          >
            <span>Log out</span>
            <IconLoader v-if="loading" :fill="'white'" />
            <IconSignout v-else :fill="'white'" />
          </button>
        </div>
        <div v-else class="no-user mt-10 flex flex-col space-y-2.5">
          <p class="text-center text-lg py-10">User not authenticated.</p>
          <RouterLink to="/" class="text-blue-500 text-center underline">Go login</RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '@/supabase/supabase'
import IconSignout from '@/assets/icons/IconSignout.vue'
import IconLoader from '@/assets/icons/IconLoader.vue'
import UserAvatar from './UserAvatar.vue'
import IconEmail from '@/assets/icons/IconEmail.vue'
import IconPassword from '@/assets/icons/IconPassword.vue'
import IconUser from '@/assets/icons/IconUser.vue'

const router = useRouter()
const loading = ref(false)
const user = ref(null)
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

const getProfile = async () => {
  loading.value = true
  const { data, error } = await supabase.auth.getUser()
  if (error) {
    loading.value = false
    alert(error.message)
  }
  if (data) {
    const userId = data.user.id
    try {
      const { data, error, status } = await supabase
        .from('users')
        .select(`full_name, email, avatar_url`)
        .eq('id', userId)
        .single()
      if (error && status !== 406) throw error

      if (data) {
        console.log(data, 'data')
        user.value = data
      }
    } catch (error) {
      loading.value = false
      alert(error.message)
    } finally {
      loading.value = false
    }
  } else {
    console.log('No authenticated user found.')
  }
  console.log('User', user.value)
}

onMounted(async () => {
  await getProfile()
})
</script>
