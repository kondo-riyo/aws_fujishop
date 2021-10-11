<template>
  <div
    class="
      flex
      sm:flex-col
      container
      sm:p-10
      max-w-xs
      overflow-hidden
      hover:shadow-xl
      transition
      duration-300
      max-w-xs
    "
  >
    <div
      class="
        max-w-sm
        bg-white
        px-6text-2xl
        ml-5
        pr-5
        pl-5
        font-bold
        text-gray-700
        pt-6
        pb-2
        rounded-sm
        shadow-lg
        transform
        hover:scale-105
        transition
        duration-500
        flex
        sm:flex-col
        
      "
    >
      <div class="relative w-1/2 my-0 mx-auto sm:w-full sm:mr-0 mr-2">
        <router-link
          :to="{
            name: `${routerName}`,
            params: { itemId: swipeItem.id },
          }"
        >
          <img
            class="sm:w-48 sm:h-48 rounded-sm"
            :src="swipeItem.img"
            alt="Colors"
          />
        </router-link>
        <p
          v-if="swipeItem.rank"
          class="
            absolute
            top-0
            bg-yellow-200
            text-gray-800
            font-semibold
            py-1
            px-3
          "
        >
          {{ swipeItem.rank }}位
        </p>
      </div>
      <div class="w-1/2 sm:w-full">
        <h1 class="mt-4 text-gray-800 sm:font-bold cursor-pointer truncate">
          {{ swipeItem.name }}
        </h1>
        <div class="space-x-2 inline flex p-1 justify-center">
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
            v-if="swipeItem.imgRed"
            @click="changeImg(swipeItem.imgRed)"
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
            v-if="swipeItem.imgOrange"
            @click="changeImg(swipeItem.imgOrange)"
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
            v-if="swipeItem.imgPurple"
            @click="changeImg(swipeItem.imgPurple)"
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
            v-if="swipeItem.imgCream"
            @click="changeImg(swipeItem.imgCream)"
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
            v-if="swipeItem.imgBrown"
            @click="changeImg(swipeItem.imgBrown)"
          >
            <span class="block h-3 w-3 bg-base_red rounded-full"> </span>
          </div>
        </div>

        <div class="my-4">
          <div class="flex space-x-1 items-center">
            <span>
              <img class="text-indigo-600" src="~/assets/img/yenIcon.webp" />
            </span>
            <p>{{ swipeItem.price }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  props: ['swipeItem', 'routerName'],
  methods: {
    changeImg(img: string): void {
      this.swipeItem.img = img;
    },
  },
});
</script>
