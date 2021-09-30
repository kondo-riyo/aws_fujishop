<template>
  <div class="">
    <div class="flex items-center container mx-6 sm:mt-0">
      <input
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
        placeholder="Search"
        v-model="keyWord"
      />
      <img
        src="../../assets/img/search.webp"
        class="block w-6 mr-auto mt-10"
        style=""
        @click="search"
      />
    </div>
    <div class="w-3/6 p-2 m-2 text-red-400 font-bold justify-center">
      <p v-show="resultNullFlg">※該当する商品がありません</p>
      <p v-show="keywordNullFlg" class="">※検索ワードを入力してください</p>
    </div>

    <div class="flex flex-wrap justify-center">
      <div v-for="item in searchedItems" :key="item.id">
        <router-link :to="{ name: 'ItemDetail-itemId', params: { itemId: item.id } }">
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
              <img class="rounded-xl" :src="item.img" alt="" />
            </div>
            <div class="">
              <div>
                <h1 class="mt-5 sm:text-lg font-semibold text-center">
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
        </router-link>
      </div>
    </div>

    <div
      class="flex flex-wrap justify-center"
      v-show="searchedItems.length === 0"
    >
      <div v-for="item in itemsFromStore" :key="item.id">
        <router-link
          :to="{ name: 'ItemDetail-itemId', params: { itemId: item.id } }"
        >
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
              <img class="rounded-xl" :src="item.img" />
            </div>
            <div class="">
              <div>
                <h1 class="mt-5 sm:text-lg font-semibold text-center">
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
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { itemType } from '../../types/itemType';
import { ItemsStore } from '../../store';

type DataType = {
  keyWord: string;
  searchedItems: itemType[];
  keywordNullFlg: boolean;
  resultNullFlg: boolean;
};

export default Vue.extend({
  data(): DataType {
    return {
      keyWord: '',
      searchedItems: [],
      keywordNullFlg: false, // 検索ワード未入力の場合
      resultNullFlg: false, // 該当結果無しの場合
    };
  },
  methods: {
    search(): void {
      this.searchedItems = [];
      // 検索ワードなし
      if (this.keyWord === '') {
        this.keywordNullFlg = true;
        this.resultNullFlg = false;
      } else {
        this.keywordNullFlg = false;
        this.resultNullFlg = false;
        this.itemsFromStore.forEach((item: itemType) => {
          if (item.name === undefined) return;

          // 該当結果あり
          if (item.name.indexOf(this.keyWord) >= 0) {
            this.searchedItems.push(item);
          }
        });
        // 該当結果なし
        if (this.searchedItems.length === 0) {
          this.resultNullFlg = true;
        }
      }
    },
  },
  computed: {
    itemsFromStore(): itemType[] {
      return ItemsStore.getItems;
    },
  },
});
</script>
