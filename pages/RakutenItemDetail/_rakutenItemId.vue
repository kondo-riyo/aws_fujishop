<template>
<div class="sm:pl-10 p-1 flex">
  <div>
    <div class="mb-5"><h1 class="block ml-2 text-4xl">商品詳細</h1></div>
    <Detail
      :itemDetail="itemDetail"
      :options="itemNum"
      v-model="selectedItemNum"
    />
  </div>
</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { ApiItemsStore } from '../../store';
import { itemType } from '../../types/itemType';

type DataType = {
  itemDetail: itemType | undefined;
  itemNum: number[];
  selectedItemNum: number;
};

export default Vue.extend({
  data(): DataType {
    return {
      itemDetail: {},
      itemNum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      selectedItemNum: 1,
    };
  },
  created(): void {
    const params: string = this.$route.params.rakutenItemId;
    const getItemDetail: itemType | undefined =
      ApiItemsStore.getItemDetail(params);
    this.itemDetail = getItemDetail;
  },
});
</script>
