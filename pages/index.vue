<template>
  <div class="sm:mt-10 mt-10">
    <div class="sm:mb-20">
      <swiper :options="swiperOption">
        <swiper-slide>
          <img src="~/assets/img/limit.jpg" />
        </swiper-slide>
        <swiper-slide>
          <img src="~/assets/img/sale.png" />
        </swiper-slide>
        <swiper-slide>
          <img src="~/assets/img/giftLogo.jpg" />
        </swiper-slide>
      </swiper>
    </div>

    <router-link
      to="searchRakutenItems"
      class="
        block
        border-t-2
        p-5
        text-center text-2xl
        font-bold
        text-gray-700
      "
      >楽天商品</router-link
    >
    <div class="mb-10">
      <swiper :options="swiperOption">
        <swiper-slide v-for="item in RakutenItemsFromStore" :key="item.id">
            <swipe-card :swipeItem="item" :routerName="routerName.rakuten"/>
        </swiper-slide>
        <div class="swiper-button-prev" slot="button-prev"></div>
        <div class="swiper-button-next" slot="button-next"></div>
      </swiper>
    </div>

    <router-link
      to="searchFujiItems"
      class="
        block
        border-t-2
        p-5
        text-center text-2xl
        font-bold
        text-gray-700
      "
      >FujiCoffeeオリジナル商品</router-link
    >
    <div class="mb-10">
      <swiper :options="swiperOption">
        <swiper-slide v-for="item in FujiItemsFromStore" :key="item.id">
            <swipe-card :swipeItem="item" :routerName="routerName.fujiShop"/>
        </swiper-slide>
        <div class="swiper-button-prev" slot="button-prev"></div>
        <div class="swiper-button-next" slot="button-next"></div>
      </swiper>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import SubSwipeCard from '~/components/subSwipeCard.vue';
import swipeCard from '~/components/swipeCard.vue';
import { ApiItemsStore, ItemsStore } from '../store';
import { itemType } from '../types/itemType';

export default Vue.extend({
  components: { swipeCard, SubSwipeCard },
  data() {
    return {
      swiperOption: {
        autoplay: {
          delay: 4000,
          disableOnInteraction: false,
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        slidesPerView: 3,
        centeredSlides: true,
        loop: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        breakpoints: {
          1500: {
            slidesPerView: 6,
          },
          1200: {
            slidesPerView: 4,
          },
          1000: {
            slidesPerView: 4,
          },
          800: {
            slidesPerView: 3,
          },
          600: {
            slidesPerView: 2,
          },
          300: {
            slidesPerView: 1,
            spaceBetween: 0,
          },
        },
      },
      routerName:{
        rakuten:'RakutenItemDetail-itemId',
        fujiShop:'ItemDetail-itemId'
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
