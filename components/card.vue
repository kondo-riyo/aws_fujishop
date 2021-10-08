<template>
  <div
    class="
      flex flex-row
      sm:flex-col
      container
      p-2
      sm:p-10
      max-w-xs
      rounded-xl
      overflow-hidden
      shadow
      hover:shadow-xl
      transition
      duration-300
      m-1
      sm:m-3
      bg-white bg-opacity-50
    "
  >
    <div class="w-1/2 sm:w-full">
      <img class="rounded-xl sm:w-56 sm:h-56" :src="item.img" />
    </div>

    <div>
      <div class="">
        <div class="space-x-2 flex p-1 justify-center">
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
            @click="changeImg(item.imgRed)"
          >
            <span class="block h-3 w-3 bg-red-400 rounded-full"> </span>
          </div>
          <div
            class="
              p-1
              border-4
              rounded-full
              cursor-pointer
              hover:border-yellow-200 hover:scale-105
              transition
              transform
              duration-200
            "
            v-if="item.imgOrange"
            @click="changeImg(item.imgOrange)"
          >
            <span class="block h-3 w-3 bg-yellow-400 rounded-full"> </span>
          </div>
          <div
            class="
              p-1
              border-4
              rounded-full
              cursor-pointer
              hover:border-purple-200 hover:scale-105
              transition
              transform
              duration-200
            "
            v-if="item.imgPurple"
            @click="changeImg(item.imgPurple)"
          >
            <span class="block h-3 w-3 bg-purple-400 rounded-full"> </span>
          </div>
          <div
            class="
              p-1
              border-4
              rounded-full
              cursor-pointer
              hover:border-base_cream hover:scale-105
              transition
              transform
              duration-200
            "
            v-if="item.imgCream"
            @click="changeImg(item.imgCream)"
          >
            <span class="block h-3 w-3 bg-base_cream rounded-full"> </span>
          </div>
          <div
            class="
              p-1
              border-4
              rounded-full
              cursor-pointer
              hover:border-base_red hover:scale-105
              transition
              transform
              duration-200
            "
            v-if="item.imgBrown"
            @click="changeImg(item.imgBrown)"
          >
            <span class="block h-3 w-3 bg-base_red rounded-full"> </span>
          </div>
        </div>

        <h1 class="mt-5 sm:text-lg font-semibold text-center truncate">
          {{ item.name }}
        </h1>
      </div>
      <div class="text-center">
        <span class="mt-2 mx-2">{{ item.price }}円(税込)</span>
        <span>
          <button
            class="
              bg-base_red
              hover:bg-base_orange
              text-white
              font-bold
              py-2
              px-6
              mx-2
              mt-2
              rounded-full
            "
          >
            詳細
          </button>
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  props: ['item'],
  methods: {
    changeImg(img: string): void {
      this.item.img = img;
    },
  },
});
</script>
