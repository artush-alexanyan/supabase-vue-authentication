<template>
  <div class="bg-gray-50 h-screen">
    <div class="max-w-2xl mx-auto p-5">
      <div class="flex items-center justify-center">
        <div
          class="flex flex-col items-center w-80 rounded bg-white p-5 animate__animated animate__zoomIn animate__fast"
          v-if="user"
        >
          <h1 class="text-center text-7xl my-10 font-candy">User Profile</h1>
          <UserAvatar :user="user" />
          <p>{{ user.user_metadata.full_name }}</p>
          <p>{{ user.email }}</p>
          <button
            :disabled="loading"
            class="border border-gray-300 flex items-center justify-center space-x-1 bg-[#1A2E35] text-sm text-white px-5 py-2.5 mt-5"
            @click="userSignout"
          >
            <span>Log out</span>
            <IconLoader v-if="loading" :fill="'white'" />
            <IconSignout v-else :fill="'white'" />
          </button>
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

// const getProfile = async () => {
//   try {
//     if (user) {
//       loading.value = true

//       const { data, error, status } = await supabase
//         .from('profiles')
//         .select(`username, website, avatar_url`)
//         .eq('id', user.value.id)
//         .single()

//       if (error && status !== 406) throw error

//       if (data) {
//         console.log(data, 'data')
//       }
//     }
//   } catch (error) {
//     alert(error.message)
//   } finally {
//     loading.value = false
//   }
// }

onMounted(() => {
  supabase.auth.onAuthStateChange((_, _session) => {
    if (_session) {
      user.value = _session.user
      // getProfile()
    } else {
      console.log('No authenticated user found.')
    }
    console.log('User', user.value)
  })
})
</script>
