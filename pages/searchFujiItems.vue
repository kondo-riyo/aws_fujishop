<template>
  <div class="">
    <search-group data-testid="search" @searchItems="search" />
    <div class="my-5 text-base_red font-bold">
      <div v-show="resultNullFlg" class="text-center">
        ※該当する商品がありません
      </div>
      <div v-show="keywordNullFlg" class="text-center">
        ※検索ワードを入力してください
      </div>
    </div>

    <div class="flex flex-wrap justify-center">
      <div v-for="item in searchedItems" :key="item.id">
        <Card :item="item" :routerName="routerName.fujiShop" />
      </div>
    </div>

    <div
      class="flex flex-wrap justify-center"
      v-show="searchedItems.length === 0"
    >
      <div v-for="item in itemsFromStore" :key="item.id">
        <Card :item="item" :routerName="routerName.fujiShop" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { itemType } from '../types/itemType';
import { ItemsStore } from '../store';
import Card from '../components/organisms/card.vue';
import searchGroup from '../components/morecules/searchGroup.vue';
type DataType = {
  keyWord: string;
  searchedItems: itemType[];
  keywordNullFlg: boolean;
  resultNullFlg: boolean;
  routerName: Object;
};

export default Vue.extend({
  head() {
    return {
      title: 'FUJIオリジナル商品',
    };
  },
  components: { Card,searchGroup },
  data(): DataType {
    return {
      keyWord: '',
      searchedItems: [],
      keywordNullFlg: false, // 検索ワード未入力の場合
      resultNullFlg: false, // 該当結果無しの場合
      routerName: {
        fujiShop: 'ItemDetail-itemId',
      },
    };
  },
  methods: {
    search(word: any) {
      this.searchedItems = [];
      // 検索ワードなし
      if (word === '') {
        // this.keywordNullFlg = true;
        // this.resultNullFlg = false;
        return {
          keywordNullFlg: true,
          resultNullFlg: false
        }
      } else {
        this.keywordNullFlg = false;
        this.resultNullFlg = false;
        this.itemsFromStore.forEach((item: itemType) => {
          if (item.name === undefined) return;

          // 該当結果あり
          if (item.name.indexOf(word) >= 0) {
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
