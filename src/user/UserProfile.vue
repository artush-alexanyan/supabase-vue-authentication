<template>
  <div class="grid md:grid-cols-2 grid-cols-1 gap-5 x-5 h-screen">
    <div
      class="md:block hidden bg-[url('@/assets/images/auth-7.jpg')] bg-contain bg-no-repeat bg-center"
    ></div>
    <div class="">
      <div v-if="loading" class="flex items-center justify-center h-screen">
        <IconLoader :fill="fill" />
      </div>
      <div v-else class="flex items-center justify-center">
        <div
          class="flex flex-col items-center w-80 rounded bg-white p-5 animate__animated animate__zoomIn animate__fast"
          v-if="user"
        >
          <h1 class="text-center text-7xl my-10 font-candy">My Profile</h1>
          <UserAvatar
            :user="user"
            :imageFile="imageFile"
            @select-image="selectImage"
            @save-avatar="saveAvatar"
          />
          <p class="text-3xl font-semibold">{{ user.full_name }}</p>
          <div class="w-full my-10">
            <UserListItem
              v-model="editedName"
              :isEdit="isNameEdit"
              :fieldName="user.full_name"
              :editing="nameEditing"
              :fill="fill"
              @toggle-field="toggleName"
              @save-changes="editName"
              @cancel-edit="cancelNameEdit"
            >
              <template #listItems>
                <IconUser :fill="fill" />
              </template>
            </UserListItem>
            <UserListItem
              v-model="editedEmail"
              :isEdit="isEmailEdit"
              :fieldName="user.email"
              :editing="emailEditing"
              :fill="fill"
              @toggle-field="toggeEmail"
              @save-changes="editEmail"
              @cancel-edit="cancelEmileEdit"
            >
              <template #listItems>
                <IconEmail :fill="fill" />
              </template>
            </UserListItem>
          </div>
          <UserSignout />
        </div>
        <div v-else class="no-user mt-10 flex flex-col space-y-2.5">
          <p class="text-center text-lg py-10">User not authenticated.</p>
          <RouterLink to="/" class="text-blue-500 text-center underline">Go login</RouterLink>
        </div>
      </div>
    </div>
    <div>
      <UploadProgress :savingProgress="savingProgress" :uploading="uploading" :saving="saving" />
      <BaseSuccessPopup
        :message="message"
        :btnText="btnText"
        :showSuccessPopup="showSuccessPopup"
        @redirect-page="redirectPage"
      />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { supabase } from '@/supabase/supabase'
import IconLoader from '@/assets/icons/IconLoader.vue'
import UserAvatar from './UserAvatar.vue'
import IconUser from '@/assets/icons/IconUser.vue'
import IconEmail from '@/assets/icons/IconEmail.vue'
import UserListItem from './UserListItem.vue'
import BaseSuccessPopup from '@/base/BaseSuccessPopup.vue'
import UploadProgress from './UploadProgress.vue'
import UserSignout from './UserSignout.vue'

const loading = ref(false)
const user = ref(null)
const fill = '#1A2E35'
const imageFile = ref(null)
const saving = ref(false)
const uploading = ref(false)
const savingProgress = ref(false)
const isNameEdit = ref(false)
const isEmailEdit = ref(false)
const isPasswordEdit = ref(false)
const nameEditing = ref(false)
const emailEditing = ref(false)
const editedName = ref('')
const editedEmail = ref('')
const message = ref('')
const showSuccessPopup = ref(false)
const btnText = ref('Close')

const redirectPage = () => {
  showSuccessPopup.value = false
  message.value = ''
}
const toggleName = () => {
  editedName.value = user.value.full_name
  isNameEdit.value = true
}

const togglePassword = () => {
  isPasswordEdit.value = !isPasswordEdit.value
}
const toggeEmail = () => {
  editedEmail.value = user.value.email
  isEmailEdit.value = true
}
const cancelNameEdit = () => {
  isNameEdit.value = false
}
const cancelEmileEdit = () => {
  isEmailEdit.value = false
}
const editName = async () => {
  nameEditing.value = true
  const userId = user.value.id

  try {
    const { error } = await supabase
      .from('users') // Ensure the table name is correct
      .update({ full_name: editedName.value })
      .eq('id', userId)

    if (error) {
      console.error('Supabase error:', error.message)
      nameEditing.value = false
      return
    }
    user.value.full_name = editedName.value
    nameEditing.value = false
    isNameEdit.value = false
  } catch (error) {
    console.error('Unexpected error:', error.message)
    nameEditing.value = false
  }
}

const editEmail = async () => {
  emailEditing.value = true
  const userId = user.value.id

  try {
    // Ensure the user is authenticated
    const currentUser = supabase.auth.getUser()
    if (!currentUser) {
      alert('Your sesion has expired. Please login again!')
    }

    // Step 1: Update email in the authentication system
    const { data: authData, error: authError } = await supabase.auth.updateUser({
      email: editedEmail.value
    })

    if (authError) {
      alert(authError.message)
      emailEditing.value = false
      return
    }
    if (authData) {
      message.value =
        'A confirmation email has been sent to your new email address. Please confirm the change.'
      showSuccessPopup.value = true
    }

    // Step 2: Update email in the users table
    const { error: dbError } = await supabase
      .from('users')
      .update({ email: editedEmail.value })
      .eq('id', userId)

    if (dbError) {
      console.error('Supabase DB error:', dbError.message)
      emailEditing.value = false
      return
    }

    // Update local user state
    user.value.email = editedEmail.value
    emailEditing.value = false
    isEmailEdit.value = false
  } catch (error) {
    console.error('Unexpected error:', error.message)
    emailEditing.value = false
  }
}

const selectImage = (event) => {
  imageFile.value = event.target.files[0]
}

const saveAvatar = async () => {
  const file = imageFile.value
  const fileExt = file.name.split('.').pop()
  const filePath = `${Math.random()}.${fileExt}`
  savingProgress.value = true
  uploading.value = true
  const { data, error: uploadError } = await supabase.storage
    .from('user-avatars')
    .upload(filePath, file)

  if (uploadError) {
    uploading.value = false
    savingProgress.value = false
    console.error(uploadError.message)
    alert(uploadError)
    return
  }
  uploading.value = false
  const baseUrl = import.meta.env.VITE_SUPABASE_URL + '/storage/v1/object/public/'
  const imageUrl = baseUrl + data.fullPath

  updateUserAvatar(imageUrl)
}

const updateUserAvatar = async (avatarUrl) => {
  saving.value = true
  const userId = user.value.id

  const { error } = await supabase
    .from('users')
    .update({ avatar_url: avatarUrl, full_name: `${user.value.full_name}` })
    .eq('id', userId)

  if (error) {
    saving.value = false
    savingProgress.value = false
    console.error('Error updating user avatar:', error.message)
    alert('Error updating user avatar. Please try again.')
    return
  }

  user.value.avatar_url = avatarUrl
  saving.value = false
  setTimeout(() => {
    savingProgress.value = false
    imageFile.value = null
  }, 3000)
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
        .select(`id, full_name, email, avatar_url`)
        .eq('id', userId)
        .single()
      if (error && status !== 406) throw error

      if (data) {
        user.value = data
      }
    } catch (error) {
      loading.value = false
      alert(error.message)
    } finally {
      loading.value = false
    }
  }
}

onMounted(async () => {
  await getProfile()
})
</script>
