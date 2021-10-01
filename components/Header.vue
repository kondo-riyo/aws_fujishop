<template>
  <nav class="sm:space-x-10 sm:space-y-5 w-screen sm:w-10 mt-0 bg-white">
    <div class="flex flex-row sm:flex-col items-end">
      <div class="sm:block sm:mb-5 sm:pb-5 mr-0 w-4/12 sm:w-full">
        <router-link to="/">
          <img src="~/assets/img/mainLogo.webp" class="w-15 sm:w-full p-1 sm:mt-4 mb-0 mr-auto ml-auto " />
        </router-link>
      </div>
      <div
        v-if="userInfoFromStore"
        class="sm:block mb-3 sm:mb-13 sm:mt-10 w-5/12 text-center font-bold self-end sm:self-center text-base_red"
      >
        {{userInfoFromStore.name }}
      </div>
      <div v-if="userInfoFromStore" 
       class="
       block 
       w-1/12 sm:w-full 
       mx-2 mb-3 sm:mt-20 
       text-center 
       justify-self-end
       ">
        <span class="relative inline-block">
          <router-link to="/Cart">
            <img src="~/assets/img/cart_icon.webp" class="w-10 sm:w-1/3 inline-block" />
          </router-link>
        </span>
      </div>
      <div 
       v-if="userInfoFromStore"
       class="
        block 
        w-1/12 sm:w-full 
        mx-2 mb-3 sm:my-10 
        font-bold 
        inline-block 
        bottom-0 
        right-0 
        text-center
       ">
        <router-link to="/OrderLog">
         <img src="~/assets/img/rireki.webp" class="w-10 sm:w-1/3 inline-block" />
        </router-link>
      </div>
      <div v-if="!userInfoFromStore" 
       class="
        block 
        mx-2 ml-20 mb-3 sm:ml-0 sm:mt-20
        w-3/12 sm:w-full
        font-bold 
        text-center
        text-base_red
        ">
        <router-link to="/signup">会員登録</router-link>
      </div>
      <div title="ログイン" v-if="!userInfoFromStore"
       class="
        block 
        mx-2 mb-3 sm:my-10 sm:ml-0
        w-1/12 sm:w-full
        font-bold 
        text-center
        " >
        <router-link to="/signin">
         <img src="~/assets/img/login_icon.webp" class="w-10 sm:w-1/3 inline-block" />
        </router-link>
      </div>
      <div title="ログアウト" v-if="userInfoFromStore"
       class="
        block 
        w-1/12 sm:w-full
        mx-2 mr-5 mb-3 sm:my-10 sm:mr-0
        font-bold 
        inline-block 
        bottom-0 
        right-0 
        text-center
        ">
        <router-link to="/">
          <button class="font-bold" @click="logout">
            <img src="~/assets/img/logout_icon.webp" class="w-10 sm:w-1/3 inline-block" />
          </button>
        </router-link>
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
    logout():void {
      if (this.userInfoFromStore) {
        UserStore.logout();
      }
    },
  },
  computed: {
    userInfoFromStore():userInfoType|null{
      return UserStore.getUserInfo;
    },
  },
});
</script>
