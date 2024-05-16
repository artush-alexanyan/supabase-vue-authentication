import { defineStore } from 'pinia'
import { supabase } from '@/supabase/supabase'
import router from '@/router/index'

export const useRegisterStore = defineStore('RegisterStore', {
  state: () => ({
    registerMessages: [],
    registerLoading: false
  }),
  actions: {
    async saveUserDataToDatabase(user) {
      try {
        // Save user data to your database
        const { error } = await supabase.from('users').insert([user])

        if (error) {
          this.registerMessages.push({
            message: error.message,
            type: 'Error'
          })
          this.resetMessage()
        }
      } catch (error) {
        this.registerMessages.push({
          message: error.message,
          type: 'Error'
        })
        this.resetMessage()
      }
    },
    resetMessage() {
      setTimeout(() => {
        this.registerMessages = []
      }, 3000)
    },
    async userRegister(options) {
      try {
        this.registerLoading = true
        const { data, error } = await supabase.auth.signUp(options)

        if (error) {
          this.registerMessages.push({
            message: error.message,
            type: 'Error'
          })
          this.resetMessage()
          return
        }
        const userData = data.user
        const profileData = {
          created_at: userData.created_at,
          email: userData.email,
          id: userData.id,
          email_verified: userData.user_metadata.email_verified,
          full_name: options.user_metadata.full_name,
          avatar_url: options.user_metadata.avatar_url
        }
        // Save user data to your database
        await this.saveUserDataToDatabase(profileData)
        this.registerMessages.push({
          message: 'Registration successful!',
          type: 'Success'
        })
        this.resetMessage()
        this.registerLoading = false
        // Redirect to the user profile page
        router.push({ path: '/user' })
      } catch (error) {
        if (error) {
          this.registerMessages.push({
            message: error.message,
            type: 'Error'
          })
          this.registerLoading = false
          this.resetMessage()
        }
      } finally {
        this.registerLoading = false
      }
    }
  }
})
