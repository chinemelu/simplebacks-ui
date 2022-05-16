<template>
   <label :for="uuid" v-if="label">{{ label }}</label>
    <select :id="uuid" v-bind="{ ...$attrs, onChange: handleChange }" :value="modelValue">
      <option disabled value="">{{defaultSelectText}}</option>
      <option
        v-for="(option, index) in options"
        :value="option"
        :key="index"
        :selected="option === modelValue"
      >{{ option }}</option>
    </select>
</template>

<script>
export default {
  props: {
    defaultSelectText: {
      type: String,
      default: 'Select'
    },
    label: {
      type: String,
      default: ''
    },
    options: {
      type: [Object, Array],
      required: true
    },
    modelValue: {
      type: [String, Number],
      default: ''
    }
  },
  setup (props, { emit }) {
    const handleChange = (event) => {
      emit('update:modelValue', event.target.value)
    }

    return { handleChange }
  }
}
</script>

<style lang="scss" scoped>

</style>
