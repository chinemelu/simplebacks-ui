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
        <BaseButton type="submit" class="login__btn">Login</BaseButton>
      </div>
      <BaseLoader :showLoader="showLoader" />
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const username = ref('')
const password = ref('')
const showLoader = ref(false)
const router = useRouter()

const store = useStore()

const handleLogin = async () => {
  const credentials = {
    username: username.value,
    password: password.value
  }
  try {
    showLoader.value = true
    await store.dispatch('login', credentials)
    showLoader.value = false
    router.push({ name: 'OrderList' })
  } catch (err) {
    showLoader.value = false
  }
}
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
