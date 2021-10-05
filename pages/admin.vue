<template>
  <div class="p-1">
    <div  v-if="logItems.length === 0" class="grid p-20">
      <div
        class="mr-auto ml-auto font-bold sm:text-2xl text-lg"
      >
        ※注文履歴はありません
      </div>
      <button
        class="
          bg-base_red
          sm:w-1/3
          hover:bg-base_orange
          text-white
          font-bold
          py-2
          px-4
          rounded-full
          m-10
          mr-auto
          ml-auto
        "
      >
        <router-link to="/">商品を選ぶ</router-link>
      </button>
    </div>
    <div
      class="grid sm:m-5 m-1 justify-items-center"
      v-if="logItems.length > 0"
    >
      <div class="bg-white bg-opacity-60 rounded-xl">
        <div
          class="
            bg-base_red
            text-base_cream
            font-bold
            text-xl
            rounded
            border-solid border-2
            border-base_red
            flex
            text-center
          "
        >
          <div class="p-1 sm:w-3/5 sm:text-center text-2xl">商品情報</div>
          <div class="p-1 sm:w-1/5 text-2xl hidden sm:inline-block">
            配達情報
          </div>
          <div class="p-1 sm:w-1/5 text-2xl hidden sm:inline-block">
            切り替え
          </div>
        </div>
        <div
          v-for="logItem in logItems"
          :key="logItem.orderId"
          class="
            sm:flex
            border-solid
            rounded
            border-b-2 border-r-2 border-l-2
            border-base_red
          "
        >
          <div class="p-2 sm:w-3/5">
            <div
              v-for="item in logItem.itemInfo"
              :key="item.specialId"
              class="m-1 p-1"
            >
              <!-- アイテム情報 -->
              <div class="flex items-center justify-center">
                <div class="sm:w-1/4 w-2/5">
                  <img class="rounded shadow-xl" :src="item.itemImg" />
                </div>
                <div class="flex flex-col ml-2 w-96 w-2/4">
                  <div class="p-1 flex">
                    <div class="w-3/4">
                      <span class="font-bold sm:text-xl">{{
                        item.itemName
                      }}</span
                      >×{{ item.itemNum }}
                    </div>
                    <div class="w-1/4 sm:text-base text-xs">
                      {{ item.itemPrice * item.itemNum }}円
                    </div>
                  </div>
                  <div
                    class="p-1 sm:text-base text-xs flex"
                    v-for="(topping, index) in item.toppings"
                    :key="index"
                  >
                    <div class="w-3/4">+{{ topping.name }}</div>
                    <div class="w-1/4 sm:text-base text-xs">
                      {{ topping.price }}円
                    </div>
                  </div>
                  <div class="p-1 pt-5 flex">
                    <div class="w-3/4 sm:text-base text-xs">合計</div>
                    <div class="w-1/4 sm:text-base text-xs">
                      {{
                        item.itemPrice * item.itemNum + item.allToppingPrice
                      }}円
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="
                flex
                items-center
                border-solid border-t-2
                border-base_gray
                border-opacity-20
                mt-3
                pt-3
                pb-3
              "
            >
              <div class="w-16"></div>
              <div class="sm:text-2xl text-xl sm:pr-0 pr-2 sm:w-2/6">
                合計金額
              </div>
              <div class="sm:text-3xl text-xl font-bold w-1/4">
                {{ logItem.orderInfo.allPrice }}円
              </div>
            </div>
          </div>
          <!-- お客様情報 -->
          <div
            class="
              w-80
              bg-base_gray
              bg-opacity-20
              text-lg
              flex flex-col
              justify-center
              items-center
              pl-2
              pb-3
              sm:w-1/5
              w-full
            "
          >
            <div>
              <div
                class="
                  sm:hidden
                  text-xl
                  border-solid
                  border-base_red
                  border-b-2 border-opacity-20
                  pt-2
                  pb-1
                  mb-2
                "
              >
                配達情報
              </div>
              <div>注文者 : {{ logItem.orderInfo.name }}</div>
              <div>配送先 : {{ logItem.orderInfo.address }}</div>
              <div>
                配送日時 : {{ logItem.orderInfo.deliveryDate }}
                {{ logItem.orderInfo.deliveryTime }}時
              </div>
            </div>
          </div>
          <!-- 配達状況切り替え -->
          <div
            class="
              w-80
              bg-base_gray bg-opacity-20 sm:bg-transparent
              border-base_red border-opacity-20 border-dashed border-t-2 sm:border-0
              text-lg
              flex flex-col
              justify-center
              items-center
              pl-2
              py-3
              sm:w-1/5
              w-full
            "
          >
            <div>
              <select
               v-model="logItem.status"
               @change="statusChange(logItem.orderId, logItem.status)"
               name="配達status"
               class="
                bg-base_red
                text-white text-center
                rounded
                "
              >
               <option value="1">未入金(代引き)</option>
               <option value="2">入金済(クレジット)</option>
               <option value="3">発送済</option>
               <option value="4">配達済</option>
               <option value="9">キャンセル</option>               
              </select>  
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import { UserStore } from '../store';
import { AdminStore } from '../store';
import { db } from '../plugins/firebase';
import { orderedItemType } from '../types/cartItemType';

type DataType = {
  logItems: orderedItemType[];
};
export default Vue.extend({
  head() {
    return {
      title: '注文履歴',
    };
  },
  data(): DataType {
    return {
      logItems: [],
    };
  },
  computed: {
    totalItemPrice():number {
      let totalPrice: number = 0;
      this.logItems.forEach((item) => {
        item.itemInfo!.forEach((price) => {
          totalPrice = totalPrice + price.totalPrice!;
        });
      });
      return totalPrice;
    },
  },
  async fetch(): Promise<void> {
    if (!UserStore.userInfo) {
      console.log('ログインしていません');
    } else {
      if (!UserStore.userInfo.uid) return;
      let uid: string | undefined | null;
      uid = UserStore.userInfo.uid;
      await db
        .collection(`users/${uid}/order`)
        .get()
        .then((orders) => {
          orders.forEach((order) => {
            // if (order.data().status === 1 || order.data().status === 2) {
              this.logItems.push(order.data());
            // }
          });
        });
    }
  },
  methods:{
      statusChange(id:string, status:number):void{
          let idStatus= {id:id, status:status}
          AdminStore.updateStatusAct(idStatus)
      }
  }
});
</script>
