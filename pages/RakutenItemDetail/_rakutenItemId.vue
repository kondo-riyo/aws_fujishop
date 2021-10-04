<template>
<div class="sm:pl-10 p-1 flex">
  <div  class="sm:w-3/4 my-0 mx-auto">
    <div class="mb-5"><h1 class="block ml-2 text-4xl">商品詳細</h1></div>
    <Detail
      :itemDetail="itemDetail"
      :options="itemNum"
      v-model="selectedItemNum"
    />


          <div class="flex justify-end mt-5">
        <div class="px-4 sm:py-3 py-1 sm:px-4">
          <p class="text-gray-700 sm:text-4xl text-xl">
            合計
            <span class="font-bold sm:text-4xl text-2xl"
              >￥{{ calcTotalPrice }}</span
            >
          </p>
        </div>
        <div class="py-1 px-6 sm:py-2 sm:px-8">
          <button
            class="
              text-white
              font-semibold
              bg-base_red
              sm:py-3 sm:px-4
              py-1
              px-4
              rounded
              transition
              duration-200
              transform-gpu
              hover:scale-105
              text-xm
            "
            @click="addCart"
          >
            追加
          </button>
        </div>
      </div>
  </div>
</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { ApiItemsStore, UserStore, CartStore } from '../../store';
import { itemType } from '../../types/itemType';
import { cartItemType } from '../../types/cartItemType';

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
  computed:{
    calcTotalPrice():number{
            if (
        this.itemDetail === undefined ||
        this.itemDetail.price === undefined
      ) {
        return 0;
      }
      return this.selectedItemNum*this.itemDetail.price
    }
  },
  methods:{
   async addCart():Promise<void>{
      console.log("add")
       if (!UserStore.userInfo) {
        this.$router.push('/signin');
      } else {
         const addItemToCart: cartItemType = {
          itemId: this.itemDetail?.id,
          itemName: this.itemDetail?.name,
          itemPrice: this.itemDetail?.price,
          itemNum: this.selectedItemNum,
          itemImg: this.itemDetail?.img,
          toppings:[],
          allToppingPrice: 0,
          totalPrice: this.calcTotalPrice,
        };
        if (confirm('カートに商品を追加しますか？')) {
          CartStore.addItemToCartAct(addItemToCart);
          await this.$router.push('/Cart');
        }
      }
    }
  }
});
</script>
