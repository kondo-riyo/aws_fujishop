<template>
  <input
    :value="value"
    @input="onInput"
    class="
      appearance-none
      block
      w-full
      bg-gray-200
      text-gray-700
      border border-gray-200
      rounded
      py-3
      px-4
      leading-tight
      focus:outline-none focus:bg-white focus:border-gray-500
      "
      :type="type"
      :name="name"
      :placeholder="placeholder"
 />
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'inputA',
  props: {
    value: { type: String, required: false },
    type: { type: String, required: true },
    name: { type: String, required: true },
    placeholder: { type: String, required: false }
  },
  methods: {
    onInput(e: Event):void{
      if (e.target instanceof HTMLInputElement){
        this.$emit("input",e.target.value)
      }
    }
  }
})
</script>