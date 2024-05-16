<template>
  <div>
    <div class="social grid md:grid-cols-2 grid-cols-1 gap-2 my-6">
      <button
        @click.prevent="signupWithGoogle"
        class="border border-gray-300 bg-[#E1E1E1] text-sm outline-0 p-2.5 w-full flex items-center justify-center"
      >
        <img src="@/assets/images/google.png" class="h-6" alt="google" />
        <span>Google</span>
      </button>
      <button
        @click.prevent="signupWithFacebook"
        class="border border-gray-300 bg-[#E1E1E1] text-sm outline-0 p-2.5 w-full flex items-center justify-center"
      >
        <img src="@/assets/images/facebook.png" class="h-4" alt="google" />
        <span>Facebook</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '@/supabase/supabase'

const router = useRouter()
const user = ref(null)

const signupWithGoogle = async () => {
  try {
    const { error, session } = await supabase.auth.signInWithOAuth({
      provider: 'google'
    })

    if (error) {
      console.error('Error signing in with Google:', error.message)
      return // Exit early if there's an error
    }

    // Fetch user data using the session object
    const { user, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('id', session?.user?.id)
      .single()

    if (userError) {
      console.error('Error fetching user data:', userError.message)
      return // Exit early if there's an error fetching user data
    }

    // Save user data to your database (replace this with your logic)
    // await saveUserDataToDatabase(user);

    // Redirect to the user profile page
    router.push({ path: '/user' })
  } catch (error) {
    console.error('Error:', error.message)
  }
}

const signupWithFacebook = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'facebook'
  })

  if (error) {
    console.error('error', error)
  }
  console.log('data', data)
}

onMounted(() => {
  supabase.auth.onAuthStateChange((_, _session) => {
    if (_session) {
      user.value = _session.user
    } else {
      console.log('No authenticated user found.')
    }
    console.log('User', user.value)
  })
})
</script>
