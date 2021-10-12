<template>
  <div>
    <search-group @searchItems="search" />

    <!-- 検索エラー表示 -->
    <div class="text-center block py-5">
      <p v-show="keywordNullFlg">検索ワードを入力して下さい</p>
      <p v-show="searchItemNullFlg">検索ワードにマッチする商品がありません</p>
    </div>

    <!-- 検索結果 -->
    <div v-show="!defaultItemsFlg" class="flex flex-wrap justify-center">
      <div v-for="item in searchApiItemsFromStore" :key="item.id">
        <Card :item="item" :routerName="routerName.rakuten" />
      </div>
    </div>

    <!-- top30 -->
    <div
      v-show="defaultItemsFlg || keywordNullFlg || searchItemNullFlg"
      class="flex flex-wrap justify-center"
    >
      <div v-for="item in apiItemsFromStore" :key="item.id">
        <Card :item="item" :routerName="routerName.rakuten" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { ApiItemsStore } from '../store';
import { itemType } from '../types/itemType';

type DataType = {
  keyWord: string;
  defaultItemsFlg: boolean;
  keywordNullFlg: boolean;
  searchItemNullFlg: boolean;
  routerName: Object;
};

export default Vue.extend({
  data(): DataType {
    return {
      keyWord: '',
      defaultItemsFlg: true,
      keywordNullFlg: false,
      searchItemNullFlg: false,
      routerName: {
        rakuten: 'RakutenItemDetail-itemId',
      },
    };
  },
  created() {
    // 遷移したらtop30が表示される
    this.defaultItemsFlg = true;
  },
  computed: {
    apiItemsFromStore(): itemType[] {
      return ApiItemsStore.getItemsFromApi;
    },
    searchApiItemsFromStore(): itemType[] {
      return ApiItemsStore.getSearchItemsFromApi;
    },
  },
  methods: {
    async search(word:any): Promise<void> {
      if (word !== '') {
        this.keywordNullFlg = false;
        await ApiItemsStore.searchApiItemsAct(word);
        if (this.searchApiItemsFromStore.length > 0) {
          this.searchItemNullFlg = false;
          this.defaultItemsFlg = false;
        } else {
          this.searchItemNullFlg = true;
          this.defaultItemsFlg = true;
        }
      } else {
        this.defaultItemsFlg = true;
        this.keywordNullFlg = true;
        this.searchItemNullFlg = false;
      }
    },
  },
});
</script>
