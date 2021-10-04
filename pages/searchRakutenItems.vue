<template>
  <div class="flex flex-wrap justify-center">
    <div v-for="item in apiItemsFromStore" :key="item.id">
        <router-link
          :to="{ name: 'RakutenItemDetail-rakutenItemId', params: { rakutenItemId: item.id } }"
        >
          <Card :item="item" />
        </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { ApiItemsStore } from '../store';


export default Vue.extend({
  data() {
    return {
    };
  },
  computed:{
      apiItemsFromStore(){
          return ApiItemsStore.getItemsFromApi;
      }
  }
});
</script>