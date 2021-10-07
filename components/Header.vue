<template>
  <nav class="sm:w-screen sm:flex items-center bg-base_cream py-6 px-2">
    <!-- mainLogoとuserName -->
    <div class="sm:w-2/5 flex items-center text-gray-700 mr-6">
      <div class="flex items-center">
        <router-link to="/">
          <img class="h-12 w-12 mr-2" src="~/assets/img/6.png"
        /></router-link>
        <span class="font-semibold text-xl">Fuji Shop</span>
      </div>
      <div
        v-if="userInfoFromStore"
        class="inline-block text-lg pl-6 py-2 font-bold"
      >
      {{ userInfoFromStore.name }}さん
      </div>
    </div>

    <!-- menu -->
    <div class="sm:w-3/5 sm:mt-0 mt-3 flex items-center justify-end">
      <div class="sm:w-8 w-5 mr-5" v-if="!userInfoFromStore">
        <router-link class="block" to="/signup">
          <img src="~/assets/img/user.png"
        /></router-link>
      </div>
      <div class="sm:w-8 w-5 mr-5" v-if="!userInfoFromStore">
        <router-link class="block" to="/signin">
          <img src="~/assets/img/login_icon.webp"
        /></router-link>
      </div>
      <div class="sm:w-8 w-5 mr-5" v-if="userInfoFromStore">
        <router-link class="block" to="/cart">
          <img src="~/assets/img/cart_icon.webp"
        /></router-link>
      </div>
      <div class="sm:w-8 w-5 mr-5">
        <router-link to="/orderLog" v-if="userInfoFromStore">
          <img src="~/assets/img/rireki.webp"
        /></router-link>
      </div>
      <div class="sm:w-8 w-5 mr-5" v-if="userInfoFromStore" @click="logout">
        <img src="~/assets/img/logout_icon.webp" />
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { UserStore } from '../store';
import Vue from 'vue';
import { userInfoType } from '../types/userInfoType';

export default Vue.extend({
  methods: {
    logout(): void {
      if (this.userInfoFromStore) {
        UserStore.logout();
      }
    },
  },
  computed: {
    userInfoFromStore(): userInfoType | null {
      return UserStore.getUserInfo;
    },
  },
});
</script>
