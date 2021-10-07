<template>
  <div class="sm:flex my-0 mx-auto">
    <div class="flex flex-col">
      <div class="sm:mr-5">
        <img :src="itemDetail.img" class="rounded-xl" />
      </div>

      <div class="mt-3 space-x-4 flex p-1">
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
          v-show="itemDetail.imgRed"
          @click="changeImg(itemDetail.imgRed)"
        >
          <span class="block h-6 w-6 bg-red-400 rounded-full"> </span>
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
          v-show="itemDetail.imgOrange"
          @click="changeImg(itemDetail.imgOrange)"
        >
          <span class="block h-6 w-6 bg-yellow-400 rounded-full"> </span>
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
          v-show="itemDetail.imgPurple"
          @click="changeImg(itemDetail.imgPurple)"
        >
          <span class="block h-6 w-6 bg-purple-400 rounded-full"> </span>
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
            v-if="itemDetail.imgCream"
            @mouseover="changeImg(itemDetail.imgCream)"
          >
            <span class="block h-6 w-6 bg-base_cream rounded-full"> </span>
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
            v-if="itemDetail.imgBrown"
            @mouseover="changeImg(itemDetail.imgBrown)"
          >
            <span class="block h-6 w-6 bg-base_red rounded-full"> </span>
          </div>
      </div>
    </div>
    <div
      class="
        flex flex-col
        justify-center
        bg-white
        p-3
        sm:p-5
        rounded-xl
        sm:w-3/4
      "
    >
      <div>
        <p class="text-gray-700 text-2xl sm:text-3xl font-bold truncate">
          {{ itemDetail.name }}
        </p>
      </div>
      <div class="mt-5">
        <p>
          <span class="text-xl sm:text-3xl">￥{{ itemDetail.price }}</span>
          税込
        </p>
      </div>
      <div>
        <p class="block my-2 sm:my-4 sm:text-xl">
          {{ itemDetail.description }}
        </p>
      </div>

      <div class="flex">
        <div class="flex items-center">
          <span class="mr-3">
            <font style="vertical-align: inherit">
              <font style="vertical-align: inherit">個数</font>
            </font>
          </span>
          <div class="relative">
            <select
              class="
                rounded
                border
                appearance-none
                border-gray-300
                py-2
                focus:outline-none
                focus:ring-2
                focus:ring-base_orange
                focus:border-base_orange
                text-base
                pl-3
                pr-10
              "
              @change="updateValue"
            >
              <option v-for="(num, index) in options" :key="index" :value="num">
                {{ num }}
              </option>
            </select>
            <span
              class="
                absolute
                right-0
                top-0
                h-full
                text-center text-gray-600
                pointer-events-none
                flex
                w-4
                items-center
                justify-center
              "
            >
              <svg
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                class="w-4 h-4"
                viewBox="0 0 24 24"
              >
                <path d="M6 9l6 6 6-6"></path>
              </svg>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

type DataType = {
  selectedItemNum: number;
};
export default Vue.extend({
  data(): DataType {
    return {
      selectedItemNum: 1,
    };
  },
  props: ['itemDetail', 'options'],
  methods: {
    updateValue(e: any): void {
      this.$emit('input', e.target.value);
    },
    changeImg(img: string): void {
      console.log(img);
      this.itemDetail.img = img;
    },
  },
  created() {
    this.$emit('input', 1);
  },
});
</script>
