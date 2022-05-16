<template>
  <div>
    <nav class="navbar">
      <img class="navbar__logo" alt="simple books logo"  src="/logos/simplebks-logo.png"/>
    </nav>
    <router-view @changeShowLoaderStatus="changeShowLoaderStatus" />
    <BaseLoader :showLoader="showLoader" />
    <notifications />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const showLoader = ref(false)
const changeShowLoaderStatus = (val) => {
  showLoader.value = val
}
</script>

<style lang="scss">
*,
*::after,
*::before {
  margin: 0;
  padding: 0;
  box-sizing: inherit;
}

html {
  font-size: 62.5%;
}

body {
  box-sizing: border-box;
}

.navbar {
  background: $color-secondary;
  padding: 1.5rem 2rem;
  &__logo {
    width:  10%;
    height: auto;
  }
}

</style>
