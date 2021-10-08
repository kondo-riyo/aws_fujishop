<template>
  <div class="sm:pl-10 p-1 flex">
    <div v-if="!itemDetail">リロードして再度ご確認ください</div>
    <div class="sm:w-3/4 my-0 mx-auto" v-if="itemDetail">
     <!-- 戻るボタン追加 -->
        <div 
        @click="back_onStep"
        class="
        flex
        group
        m-2
        ">
          <div class="
          group-hover:bg-base_red group-hover:bg-opacity-30
          p-4
          rounded-full
          ">
            <img src="~assets/img/yajirusi_icon.webp" class="transform rotate-90 w-5">
          </div>
          <div class="text-base_red font-bold m-3 mx-1">
            一覧に戻る
          </div>
        </div>
      <!-- <div class="mb-5"><h1 class="block ml-2 text-4xl">商品詳細</h1></div> -->
      <Detail
        :itemDetail="itemDetail"
        :options="itemNum"
        v-model="selectedItemNum"
      />

      <div class="sm:mt-5 mt-2 bg-white p-3 rounded-xl">
        <span class="font-bold"> {{itemDetail.shopName}}</span>
        <p class="mb-3 pl-2 text-xl">
          {{itemDetail.moreDescription}}
        </p>
        <!-- <div class="flex flex-wrap"></div> -->
      </div>
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
          <squareBottun
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
          </squareBottun>
        </div>
      </div>
     <!-- 戻るボタン追加 -->
        <div 
        @click="back_onStep"
        class="
        flex
        group
        m-2
        ">
          <div class="
          group-hover:bg-base_red group-hover:bg-opacity-30
          p-4
          rounded-full
          ">
            <img src="~assets/img/yajirusi_icon.webp" class="transform rotate-90 w-5">
          </div>
          <div class="text-base_red font-bold m-3 mx-1">
            一覧に戻る
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
  // async asyncData({params}) {
  //   console.log(params.rakutenItemId)
  //   const paramsId: string = params.rakutenItemId;
  //   const getItemDetail: (itemType | undefined)[] = await Promise.all ([ApiItemsStore.getItemDetail(paramsId)]);
  //   console.log(getItemDetail)
  //   return {itemDetail:getItemDetail[0]}
  // },
  computed: {
    calcTotalPrice(): number {
      if (
        this.itemDetail === undefined ||
        this.itemDetail.price === undefined
      ) {
        return 0;
      }
      return this.selectedItemNum * this.itemDetail.price;
    },
  },
  methods: {
    async addCart(): Promise<void> {
      console.log('add');
      if (!UserStore.userInfo) {
        this.$router.push('/signin');
      } else {
        const addItemToCart: cartItemType = {
          itemId: this.itemDetail?.id,
          itemName: this.itemDetail?.name,
          itemPrice: this.itemDetail?.price,
          itemNum: this.selectedItemNum,
          itemImg: this.itemDetail?.img,
          toppings: [],
          allToppingPrice: 0,
          totalPrice: this.calcTotalPrice,
        };
        if (confirm('カートに商品を追加しますか？')) {
          CartStore.addItemToCartAct(addItemToCart);
          await this.$router.push('/Cart');
        }
      }
    },
    back_onStep():void {
      this.$router.push('/searchRakutenItems')
    }
  },
});
</script>
