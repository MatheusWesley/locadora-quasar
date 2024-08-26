<template>
  <q-btn
    :label="label"
    :color="color"
    :icon="icon"
    :flat="flat"
    :outlined="outlined"
    :rounded="rounded"
    :unelevated="unelevated"
    @click="handleClick"
  />
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: 'Click Me',
    },
    color: {
      type: String,
      default: 'primary',
    },
    icon: {
      type: String,
      default: '',
    },
    flat: {
      type: Boolean,
      default: false,
    },
    outlined: {
      type: Boolean,
      default: false,
    },
    rounded: {
      type: Boolean,
      default: false,
    },
    unelevated: {
      type: Boolean,
      default: false,
    }
  },
  methods: {
    handleClick() {
      this.$emit('click');
    }
  }
}
</script>

