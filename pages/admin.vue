<template>
 <div class="text-center">
    <div>管理者画面</div>
    <!-- <div @click="add">えび</div> -->
    <div 
     v-for="user in usersList" :key="user.orderId"
     class="
       bg-base_gray bg-opacity-20
       my-2
       "
     >
        <div>{{user.name}}</div>
        <div>uid: {{user.uid}}</div>
        <div>
            <router-link :to="{ name: 'adminDetail-adminId', params: { adminId: user.uid } }">
                詳細
            </router-link>
        </div>
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
      let uid: string | undefined | null;
        // uid = AdminStore.users.uid
      await db
        .collection(`users`)
        .get()
        .then((users) => {
          users.forEach((user) => {
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