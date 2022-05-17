<template>
  <button class="base-button" v-bind="$attrs">
    <slot></slot>
  </button>
</template>

<script>
export default {
  inheritAttrs: false,
  setup () {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.base-button {
  border: none;
  transition: 250ms opacity ease-in;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
  &:disabled {
    cursor: not-allowed;
    background-color: $light-grey-1;
    color: $primary-white;
  }
}

.login__btn {
  width: 100%;
  padding: 1.5rem 1.5rem;
  background: $color-primary;
  color: $primary-white;
  font-size: 1.6rem;
  border-radius: 8px;
  margin-top: 3rem;
}

.single-page__delete-btn {
  padding: 1.5rem 1.5rem;
  font-size: 1.6rem;
  border-radius: 8px;
  background-color: red;
  color: $primary-white;
}

.single-page__edit-btn {
  padding: 1.5rem 1.5rem;
  font-size: 1.6rem;
  border-radius: 8px;
  background-color: $color-primary;
  color: $primary-white;
}

.edit-resource__btn {
  width: 50%;
  padding: 1.5rem;
  background-color: $color-primary;
  color: $primary-white;
  border-radius: 8px;
  margin-left: auto;
  margin-right: auto;
  display: block;
}
</style>
