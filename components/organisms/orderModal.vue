<template>
  <div>
    <div id="overlay" @click.self="$emit('close')">
      <div id="content" class="sm:w-1/2">
        <p
          class="
              bg-base_gray
              rounded-full
              text-center
              w-7
            "
          @click="$emit('close')"
          >
          ×
        </p>
        <!-- <p>
          注文者 <span class="font-bold"> {{ orderInfo.name }}さん</span>
        </p>
        <p>お届け先 <span class="font-bold">{{ orderInfo.address }}</span></p>
        <p>電話番号 <span class="font-bold">{{ orderInfo.tel }}</span></p>
        <p>メール <span class="font-bold">{{ orderInfo.email }}</span></p>
        <p>
          お届け日時 <span class="font-bold">{{ orderInfo.deliveryDate }} {{ orderInfo.deliveryTime }}時</span>
        </p>
        <p>支払状況 <span data-testid="paymentStatus" class="font-bold">{{ status | paymentStatus }}</span></p> -->
        <table class="sm:m-3">
          <tr class="text-left m-4">
            <th class="text-base_gray sm:px-10">注文者</th>
            <th>{{ orderInfo.name }} さん</th>
          </tr>
          <tr class="text-left m-4">
            <th class="text-base_gray sm:px-10">お届け先</th>
            <th>{{ orderInfo.address }}</th>
          </tr>
          <tr class="text-left m-4">
            <th class="text-base_gray sm:px-10">電話番号 </th>
            <th>{{ orderInfo.tel }}</th>
          </tr>
          <tr class="text-left m-4">
            <th class="text-base_gray sm:px-10">メール</th>
            <th>{{ orderInfo.email }}</th>
          </tr>
          <tr class="text-left m-4">
            <th class="text-base_gray sm:px-10">配達日時 </th>
            <th>{{ orderInfo.deliveryDate }} {{ orderInfo.deliveryTime }}時</th>
          </tr>
          <tr class="text-left m-4">
            <th class="text-base_gray sm:px-10">支払状況</th>
            <th>{{ status | paymentStatus }}</th>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';

export default Vue.extend({
  props: ['orderInfo', 'status'],
  data() {
    return {
      showContent: false,
    };
  },
  filters: {
    paymentStatus(status) {
      if (status === 1) {
        return '未入金';
      } else if (status === 2) {
        return '入金済';
      } else if (status === 3) {
        return '発送済';
      } else if (status === 4) {
        return '配達済';
      } else if (status === 9) {
        return 'キャンセル';
      }
    },
  },
});
</script>

<style scoped>
#overlay {
  /*要素を重ねた時の順番*/
  z-index: 1;

  /*画面全体を覆う設定*/
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.042);

  /*画面の中央に要素を表示させる設定*/
  display: flex;
  align-items: center;
  justify-content: center;
}

#content {
  z-index: 2;
  /* width: 50%; */
  padding: 1em;
  background: rgba(248, 248, 248, 0.2);
  border-radius: 30px;
  border-color: rgba(153, 134, 117, 0.26);
  border-width: 4px;
  box-shadow: 20px;
}

</style>
