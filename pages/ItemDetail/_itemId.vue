<template>
  <div class="sm:pl-10 p-1 flex">
    <!-- <rings :item="itemDetail"/> -->
    <div class="sm:w-3/4 my-0 mx-auto">
      <div class="mb-5"><h1 class="block ml-2 text-4xl">商品詳細</h1></div>

      <Detail :itemDetail="itemDetail" :options="itemNum" v-model="selectedItemNum"/>
      
      <div class="sm:mt-5 mt-2 bg-white p-3 rounded-xl"> 
        <p class="mb-3 pl-2 text-xl">
          トッピング<span class="font-bold"> 少:200円 多:300円</span>
        </p>
        <div class="flex flex-wrap">
          <div
            class="sm:w-1/5 w-1/2 p-2 text-center font-bold"
            v-for="(topping, index) in getToppings"
            :key="topping.id"
          >
            <div class="bg-base_cream bg-opacity-60 rounded p-1">
              <p>{{ topping.name }}</p>
              <input
                type="radio"
                :name="'radio' + index"
                class="
                  hover:bg-gray-400
                  text-gray-700
                  font-semibold
                  hover:text-white
                  text-sm
                  border border-gray-400
                  sm:w-4
                  w-3
                  hover:border-transparent
                  rounded
                  bg-white
                "
                @change="
                  selectToppingSize(
                    topping.name,
                    topping.id,
                    topping.priceM,
                    1,
                    topping.isActiveM
                  )
                "
              />
              <span class="font-normal text-sm">少</span>
              <input
                type="radio"
                :name="'radio' + index"
                class="
                  sm:ml-2
                  hover:bg-gray-400
                  text-gray-700
                  font-semibold
                  hover:text-white
                  text-sm
                  border border-gray-400
                  sm:w-4
                  w-3
                  hover:border-transparent
                  rounded
                  bg-white
                "
                @change="
                  selectToppingSize(
                    topping.name,
                    topping.id,
                    topping.priceL,
                    2,
                    topping.isActiveL
                  )
                "
              />
              <span class="font-normal text-sm">多</span>
              <input
                type="radio"
                :checked="true"
                :name="'radio' + index"
                class="
                  sm:ml-2
                  text-gray-700
                  font-semibold
                  hover:text-white
                  text-sm
                  border border-gray-400
                  sm:w-4
                  w-3
                  hover:border-transparent
                  rounded
                  checked:bg-red-600
                "
                @change="
                  selectToppingSize(topping.name, topping.id, 0, 0),
                    clearTopping(topping.id)
                "
              />
              <span class="font-normal text-sm">なし</span>
            </div>
          </div>
        </div>
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
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { ItemsStore, ToppingsStore, CartStore, UserStore } from '../../store';
import { itemType } from '../../types/itemType';
import { toppingType } from '../../types/toppingType';
import { cartItemType } from '../../types/cartItemType';

type DataType = {
  isSelectedM: null | number;
  isSelectedL: null | number;
  itemDetail: itemType | undefined;
  itemNum: number[];
  selectedItemNum: number;
  allToppingPrice: number;
  selectedTopping: toppingType[];
};

export default Vue.extend({
  head() {
    return {
      title: '商品詳細',
    };
  },
  data(): DataType {
    return {
      isSelectedM: null,
      isSelectedL: null,
      itemDetail: {},
      itemNum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      selectedItemNum: 1,
      allToppingPrice: 0,
      selectedTopping: [],
    };
  },
  created(): void {
    const params: number = Number(this.$route.params.itemId);
    const getItemDetail: itemType | undefined =
      ItemsStore.getItemDetail(params);
    this.itemDetail = getItemDetail;
  },
  methods: {
    // トッピング追加----------------------------------------------------
    selectToppingSize(
      selectedName: string,
      selecteId: number,
      toppingPrice: number,
      toppingSize: number
    ): void {
      // 同じトッピングを選択していないかチェック
      const duplicatedTopping = this.selectedTopping.findIndex(
        (topping) => topping.id === selecteId
      );
      // toppingの重複が無いとき
      if (duplicatedTopping < 0) {
        const pushTopping: toppingType = {
          name: selectedName,
          id: selecteId,
          price: toppingPrice,
          size: toppingSize,
        };
        this.selectedTopping.push(pushTopping);
      }
      // 同じtoppingを選んだとき
      else if (duplicatedTopping >= 0) {
        // サイズを変更したとき
        if (this.selectedTopping[duplicatedTopping].size !== toppingSize) {
          this.selectedTopping[duplicatedTopping].size = toppingSize;
          this.selectedTopping[duplicatedTopping].price = toppingPrice;
        } // 取り消したいとき(同じトッピング・サイズを選んだとき)
        else {
          this.selectedTopping[duplicatedTopping].size = 0;
          this.selectedTopping = this.selectedTopping.filter(
            (topping) => topping.size !== 0
          );
        }
      }
      // topping価格の更新
      this.allToppingPrice = this.selectedTopping.reduce(
        (sum: number, addTopping: any) => sum + addTopping.price,
        0
      );
    },

    //トッピングを未選択に戻す
    clearTopping(selecteId: number): void {
      const deleteToppigIndex = this.selectedTopping.findIndex(
        (topping) => topping.id === selecteId
      );
      this.selectedTopping.splice(deleteToppigIndex, 1);
    },

    // カートに追加-------------------------------------------------------------------
    async addCart(): Promise<void> {
      if (!UserStore.userInfo) {
        this.$router.push('/signin');
      } else {
        const addItemToCart: cartItemType = {
          itemId: this.itemDetail?.id,
          itemName: this.itemDetail?.name,
          itemPrice: this.itemDetail?.price,
          itemNum: this.selectedItemNum,
          itemImg: this.itemDetail?.img,
          toppings: this.selectedTopping,
          allToppingPrice: this.allToppingPrice,
          totalPrice: this.calcTotalPrice,
        };
        if (confirm('カートに商品を追加しますか？')) {
          CartStore.addItemToCartAct(addItemToCart);
          await this.$router.push('/Cart');
        }
      }
    },
  },
  computed: {
    getToppings(): toppingType[] {
      return ToppingsStore.getToppings;
    },
    calcTotalPrice(): number {
      if (
        this.itemDetail === undefined ||
        this.itemDetail.price === undefined
      ) {
        return 0;
      } // 0:false
      return (
        this.selectedItemNum * this.itemDetail.price + this.allToppingPrice
      );
    },
  },
});
</script>
