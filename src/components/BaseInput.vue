<template>
  <input
    :id="uniqueId"
    v-bind="$attrs"
    :value="modelValue"
    @input="handleInput"
  />
</template>

<script>
import shortId from 'shortid'

export default {
  inheritAttrs: false,
  props: {
    modelValue: {
      type: String
    },
    label: {
      type: String,
      default: ''
    }
  },
  setup (props, { emit }) {
    const uniqueId = shortId.generate()
    const handleInput = (event) => {
      emit('update:modelValue', event.target.value)
    }
    return { handleInput, uniqueId }
  }
}
</script>

<style lang="scss" scoped>
.login__input {
  font-size: 1.6rem;
  padding: 2rem 1.5rem;
  border-radius: $border-radius-sm;
  border: 1px solid $light-grey-1;
  width: 100%;
  &:nth-child(1) {
    margin-top: 1.5rem;
  }
}
</style>
