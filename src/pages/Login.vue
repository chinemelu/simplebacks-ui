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
    </form>
  </div>
</template>

<script setup>
import { ref, computed, defineEmits } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'

const username = ref('')
const password = ref('')
const router = useRouter()

const store = useStore()
const toast = useToast()

const emit = defineEmits(['changeShowLoaderStatus'])

const handleLogin = async () => {
  const credentials = {
    username: username.value,
    password: password.value
  }
  try {
    emit('changeShowLoaderStatus', true)
    const response = await store.dispatch('login', credentials)
    emit('changeShowLoaderStatus', false)
    toast.success('You have successfully logged in')
    store.commit('SET_USER_DATA', response.data)
    router.push({ name: 'OrderList' })
  } catch (err) {
    emit('changeShowLoaderStatus', false)
    toast.error(err)
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
