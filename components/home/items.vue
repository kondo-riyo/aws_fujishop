<template>
  <!-- <div class="">
    <div class="flex items-center container mx-6 sm:mt-0">
      <searchInput
        placeholder="Search"
        name="keyword"
        type="text"
        v-model="keyWord"
        @input="inputKeyword"
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
        <router-link
          :to="{ name: 'ItemDetail-itemId', params: { itemId: item.id } }"
        >
          <Card :item="item" />
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
          <Card :item="item" />
        </router-link>
      </div>
    </div>
  </div> -->
  <router-link to="searchFujiItems" class="text-2xl ml-5 pl-5 font-bold text-gray-700">FujiCoffeeオリジナル商品</router-link>
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
    inputKeyword(keyword:string):void{
      this.keyWord = keyword
    }
  },
  computed: {
    itemsFromStore(): itemType[] {
      return ItemsStore.getItems;
    },
  },
});
</script>
