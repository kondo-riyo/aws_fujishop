<template>
  <div>
    <router-link
      to="searchRakutenItems"
      class="text-2xl ml-5 pl-5 font-bold text-gray-700"
      >楽天商品一覧</router-link
    >
    <div class="mb-10">
      <swiper :options="swiperOption">
        <swiper-slide v-for="item in RakutenItemsFromStore" :key="item.id">
          <router-link
            :to="{
              name: 'RakutenItemDetail-rakutenItemId',
              params: { rakutenItemId: item.id },
            }"
          >
            <swipe-card :swipeItem="item" />
          </router-link>
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
        <div class="swiper-button-prev" slot="button-prev"></div>
        <div class="swiper-button-next" slot="button-next"></div>
      </swiper>
    </div>

    <router-link
      to="searchFujiItems"
      class="text-2xl ml-5 pl-5 font-bold text-gray-700"
      >FujiCoffeeオリジナル商品</router-link
    >
    <div class="">
      <swiper :options="swiperOption">
        <swiper-slide v-for="item in FujiItemsFromStore" :key="item.id">
          <router-link
            :to="{ name: 'ItemDetail-itemId', params: { itemId: item.id } }"
          >
            <swipe-card :swipeItem="item" />
          </router-link>
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
        <div class="swiper-button-prev" slot="button-prev"></div>
        <div class="swiper-button-next" slot="button-next"></div>
      </swiper>
    </div>

    <!-- <div class="flex flex-wrap justify-center">
      <div v-for="item in RakutenItemsFromStore" :key="item.id">
        <swipe-card :swipeItem="item"></swipe-card>
      </div>
    </div> -->
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import swipeCard from '~/components/swipeCard.vue';
import { ApiItemsStore, ItemsStore } from '../store';
import { itemType } from '../types/itemType';

export default Vue.extend({
  components: { swipeCard },
  data() {
    return {
      swiperOption: {
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        slidesPerView: 4,
        centeredSlides: true,
        loop: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      },
    };
  },
  computed: {
    RakutenItemsFromStore(): itemType[] {
      return ApiItemsStore.getItemsFromApi;
    },
    FujiItemsFromStore(): itemType[] {
      return ItemsStore.getItems;
    },
  },
});
</script>
