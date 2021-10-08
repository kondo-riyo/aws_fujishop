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
      "
    >
      <div class="relative">
        <img class="sm:w-48 sm:h-48 rounded-sm" :src="swipeItem.img" alt="Colors" />
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
      <h1 class="mt-4 text-gray-800 font-bold cursor-pointer truncate">
        {{ swipeItem.name }}
      </h1>
      <div
        class="space-x-2 inline flex p-1 justify-center"
      >
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
          @mouseover="changeImg(swipeItem.imgRed)"
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
          @mouseover="changeImg(swipeItem.imgOrange)"
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
          @mouseover="changeImg(swipeItem.imgPurple)"
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
            @mouseover="changeImg(swipeItem.imgCream)"
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
            @mouseover="changeImg(swipeItem.imgBrown)"
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
  <!-- <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 mt-12 mb-12">
        <article>
            <section class="mt-6 grid md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-8">
                <article class="bg-white group relative rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transform duration-200">
                    <div class="relative w-full h-80 md:h-64 lg:h-44">
                        <img src="https://cdn.pixabay.com/photo/2021/07/24/01/42/zebra-dove-6488440_960_720.jpg"
                            alt="Desk with leather desk pad, walnut desk organizer, wireless keyboard and mouse, and porcelain mug."
                            class="w-full h-full object-center object-cover">
                    </div>
                    <div class="px-3 py-4">
                        <h3 class="text-sm text-gray-500 pb-2">
                            <a class="bg-indigo-600 py-1 px-2 text-white rounded-lg" href="#">
                                <span class="absolute inset-0"></span>
                                Basic Level
                            </a>
                        </h3>
                        <p
                            class="text-base font-semibold text-gray-900 group-hover:text-indigo-600">
                        </p>
                    </div>
                </article>
            </section>
        </article>
    </section> -->
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  props: ['swipeItem'],
  methods: {
    changeImg(img: string): void {
      this.swipeItem.img = img;
    },
  },
});
</script>
