<template>
  <div
    class="
      flex flex-row
      sm:flex-col
      container
      sm:p-10
      max-w-xs
      overflow-hidden
      hover:shadow-xl
      transition
      duration-300
      sm:m-3
      bg-white bg-opacity-30
    "
  >
    <div
      class="
        max-w-sm
        bg-white
        pb-2
        rounded-sm
        shadow-lg
        transform
        hover:scale-105
        transition
        duration-500
      "
    >
      <div class="relative w-full h-80 md:h-64 lg:h-44">
        <img class="w-full h-full object-center object-cover" />
      </div>
      {{ props.name }}
      <div class="px-3 py-4">
        <h3 class="text-sm text-gray-500 pb-2">
          <a class="bg-base_cream py-1 px-2 text-base_red rounded-lg" href="#">
            <span class="absolute inset-0"></span>
            Basic Level
          </a>
        </h3>
        <p
          class="
            text-base
            font-semibold
            text-gray-900
            group-hover:text-indigo-600
          "
        ></p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  props: ['props'],
});
</script>
