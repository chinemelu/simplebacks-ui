<template>
  <div>
    <nav class="navbar">
      <img class="navbar__logo" alt="simple books logo"  src="/logos/simplebks-logo.png"/>
    </nav>
    <router-view />
    <notifications />
  </div>
</template>

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
    width:  13%;
    height: auto;
  }
}

</style>
