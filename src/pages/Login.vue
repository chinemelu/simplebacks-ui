<template>
  <div class="login">
    <form class="login__inner" @submit.prevent="handleLogin">
      <div>
        <BaseInput v-model="username" class="login__input" placeholder="Username" />
      </div>
      <div>
        <BaseInput v-model="password" class="login__input" placeholder="Password" type="password" />
      </div>
      <div>
        <BaseButton :disabled="buttonIsDisabled" type="submit" class="login__btn">Login</BaseButton>
      </div>
      <BaseLoader :showLoader="showLoader" />
    </form>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'

const username = ref('')
const password = ref('')
const showLoader = ref(false)
const router = useRouter()

const store = useStore()
const toast = useToast()

const handleLogin = async () => {
  const credentials = {
    username: username.value,
    password: password.value
  }
  try {
    showLoader.value = true
    const response = await store.dispatch('login', credentials)
    showLoader.value = false
    toast.success('You have successfully logged in')
    store.commit('SET_USER_DATA', response.data)
    router.push({ name: 'OrderList' })
  } catch (err) {
    showLoader.value = false
    console.log('error', err)
    toast.error(err.message)
  }
}

const buttonIsDisabled = computed(() => {
  return !username.value.length || !password.value.length
})
</script>

<style lang="scss" scoped>
.login {
  &__inner {
    max-width: 40%;
    margin: 0 auto;
    padding: 5% 0;
    text-align: center;
  }
}
</style>
