<template>
  <div>
    <div id="overlay">
      <div id="content">
        <p><button @click="$emit('close')">×</button></p>
        <p>
          注文者 <span class="font-bold"> {{ orderInfo.name }}さん</span>
        </p>
        <p>お届け先 <span class="font-bold">{{ orderInfo.address }}</span></p>
        <p>電話番号 <span class="font-bold">{{ orderInfo.tel }}</span></p>
        <p>メール <span class="font-bold">{{ orderInfo.email }}</span></p>
        <p>
          お届け日時 <span class="font-bold">{{ orderInfo.deliveryDate }} {{ orderInfo.deliveryTime }}時</span>
        </p>
        <p>支払状況 <span data-testid="paymentStatus" class="font-bold">{{ status | paymentStatus }}</span></p>
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
  background-color: rgba(139, 139, 139, 0.26);

  /*画面の中央に要素を表示させる設定*/
  display: flex;
  align-items: center;
  justify-content: center;
}

#content {
  z-index: 2;
  width: 50%;
  padding: 1em;
  background: #fff;
}
</style>
