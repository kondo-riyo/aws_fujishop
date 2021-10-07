<template>
 <!-- <div class="text-center">
    <div></div>
    <div class="
    flex flex-col h-screen
    ">
    <div class="
       w-3/4
       flex flex-row
       bg-base_gray bg-opacity-20
       hover:transform hover:scale-125
       my-2
       stickly
    ">
        <div class="m-3">No.</div>
        <div class="m-3">顧客名</div>
        <div class="m-3">Id</div>
    </div>
    <div 
     v-for="(user, index) in usersList" :key="user.orderId"
     class="
       w-3/4
       flex flex-row
       bg-base_gray bg-opacity-20
       hover:transform hover:scale-125
       my-2
       "
     >
        <div
         class="
         m-3
         "
        >
            {{index+1}}
        </div>
        <div
         class="
         m-3
         "
        >
            {{user.name}}
        </div>
        <div
         class="
         m-3
         "
        >
            uid: {{user.uid}}
        </div>
        <div
         class="
         m-3
         "
        >
            <router-link :to="{ name: 'adminDetail-adminId', params: { adminId: user.uid } }">
                詳細
            </router-link>
        </div>
    </div>
    </div>
 </div> -->
<div class="flex flex-col sm:bg-starbucks">
    <div class="flex-grow overflow-auto w-full justify-center">
      <table class="relative w-full border sm:w-3/4 ">
        <thead>
          <tr class="bg-base_gray text-white">
            <th class="sticky top-0 px-6 py-3">No.</th>
            <th class="sticky top-0 px-6 py-3">顧客名</th>
            <th class="sticky top-0 px-6 py-3">ID</th>
          </tr>
        </thead>
        <tbody class="divide-y bg-white bg-opacity-70">
          <tr 
           v-for="(user, index) in usersList" :key="user.orderId"
           class="

           "
          >
            <td class="px-6 py-4 text-center">{{index+1}}</td>
            <td class="px-6 py-4 text-center">{{user.name}}</td>
            <td class="px-6 py-4 text-center">{{user.uid}}</td>
          </tr>
        </tbody>
      </table>
    </div>
</div>
</template>
<script lang="ts">
import Vue from 'vue'
import { UserStore, AdminStore } from '../store'
import { db } from '../plugins/firebase'

export default Vue.extend({
    head() {
        return {
        title: '注文管理(管理者)',
        };
    },
    data() {
        return{
            usersList: []
        }
    },
  async fetch(): Promise<void> {
    if (!UserStore.userInfo) {
      console.log('ログインしていません');
    } else {
      if (!UserStore.userInfo.uid) return;
    //   let uid: string | undefined | null;
        // uid = AdminStore.users.uid
      await db
        .collection(`users`)
        .get()
        .then((users) => {
          users.forEach((user) => {
              //@ts-ignore
              this.usersList.push(user.data());
          });
        });
    }
  },
  computed:{
      adminFromStore(){
          return AdminStore.getUsers
      }
  }
})
</script>