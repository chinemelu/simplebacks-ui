<template>
  <div>
    <nav class="navbar">
      <img class="navbar__logo" alt="simple books logo"  src="/logos/simplebks-logo.png"/>
      <span v-if="isAuthenticated" class="navbar__logout-link" @click="handleLogout">logout</span>
    </nav>
    <router-view @changeShowLoaderStatus="changeShowLoaderStatus" />
    <BaseLoader :showLoader="showLoader" />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const showLoader = ref(false)
const changeShowLoaderStatus = (val) => {
  showLoader.value = val
}

const isAuthenticated = computed(() => store.state.isAuthenticated)
const handleLogout = () => {
  store.commit('CLEAR_USER_DATA')
}
</script>

<style lang="scss">
.navbar {
  background: $color-secondary;
  padding: 1.5rem 3rem;
  @include flex-justify-between-center;

  &__logo {
    width: 10%;
    height: auto;
  }
  &__logout-link {
    font-size: 1.6rem;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: $primary-white;
    cursor: pointer;
  }
}

</style>
