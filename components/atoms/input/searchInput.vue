<template>
  <input
    :value="value"
    @input="onInput"
    class="
      w-1/2
      sm:w-1/3
      p-2
      py-2
      mr-2
      rounded-md
      shadow-md
      border border-gray-300
      focus:outline-none
      hover:bg-base_cream
      ring
      ring-base_red
      ring-offset-2
      focus:ring-8 focus:ring-opacity-20
      mt-10
      mb-0
      ml-auto
    "
    :type="type"
    :name="name"
    :placeholder="placeholder"
  />
</template>
<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  name: 'inputA',
  props: {
    value: { type: String, required: false },
    type: { type: String, required: true },
    name: { type: String, required: true },
    placeholder: { type: String, required: false },
  },
  methods: {
    onInput(e: Event): void {
      if (e.target instanceof HTMLInputElement) {
        this.$emit('input', e.target.value);
      }
    },
  },
});
</script>
