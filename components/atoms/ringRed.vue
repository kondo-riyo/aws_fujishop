<template>
  <div
    class="
      p-1
      border-4
      rounded-full
      cursor-pointer
      hover:border-red-200 hover:scale-105
      transition
      transform
      duration-200
    "
    v-if="item.imgRed"
    @mouseover="changeImg(item.imgRed)"
  >
    <span class="block h-3 w-3 bg-red-400 rounded-full"> </span>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props:['item'],
  methods: {
    click() {
      this.$emit("click");
    }
  }
})
</script>

