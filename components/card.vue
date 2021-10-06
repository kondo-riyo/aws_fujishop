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
              <img class="rounded-xl sm:w-56 sm:h-56 " :src= item.img />
            </div>
            <div class="">
              <div>
                <h1 class="mt-5 sm:text-lg font-semibold text-center truncate">
                  {{item.name}}
                </h1>
              </div>
              <div class="text-center">
                <span class="mt-2 mx-2">{{item.price}}円(税込)</span>
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
})
</script>
