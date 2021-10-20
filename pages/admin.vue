<template>
<div class="bg-base_gray bg-opacity-50 sm:bg-starbucks bg-center bg-cover bg-no-repeat">
    <!-- 管理者画面ログイン password=123456-->
    <div 
     v-show="userFromStore.uid!='NAkxF849wXcbaIf9gdvBIINweOi1' && !adminPassword"
     class="flex justify-center"
    >
    <div class="bg-base_of bg-opacity-70 rounded-lg sm:w-1/3 text-center mt-20 p-3">
        <div class="text-md font-bold text-base_gray">管理者パスワード</div>
        <div class="
        flex justify-center
        text-center
        ">
            <input-a
            name="パスワード"
            type="password"
            placeholder=""
            v-model="adminPassword_num"
            class="w-full sm:w-3/4 rounded-full text-center"
            />
            <button @click="adminPassword_push">
            <img 
            src="~/assets/img/yajirusi_icon.webp" 
            class="transform rotate-270 w-5 sm:w-8 m-1"
            >
            </button>
        </div>
    </div>
    </div>
    <!-- 通常画面 -->
    <div 
     v-show="userFromStore.uid==='NAkxF849wXcbaIf9gdvBIINweOi1' || adminPassword"
     class=""
     id="admin_show"
    >
        <div class="
        bg-base_of bg-opacity-50
        py-4
        ">
        <div class="
        text-center 
        text-base_gray sm:text-black font-bold text-2xl font-mono
        ">
            ようこそ！ {{userFromStore.name}} さん
        </div>
        <div class="
        text-center 
        text-base_gray sm:text-black text-xl
        ">
            ここでは各ユーザーの注文履歴の確認、配達状況の変更ができます
        </div>
        </div>
        <div class="
        text-center 
        mt-5 sm:mt-10 mb-2
        text-base_gray sm:text-base_of font-bold text-3xl font-mono
        ">
            ユーザー情報
        </div>
        <div class="flex justify-center content-start flex-wrap">
        <div class="
        flex-grow
        overflow-auto 
        w-full 
        justify-center
        flex
        items-center
        rounded
        ">
        <table class="
        relative
        w-full
        sm:w-3/4 sm:max-h-52
        m-1 sm:m-0
        ">
            <thead>
            <tr class="bg-base_gray text-white">
                <th class="sticky top-0 sm:px-6 sm:py-3">No.</th>
                <th class="sticky top-0 sm:px-6 sm:py-3">名前</th>
                <th class="sticky top-0 sm:px-6 sm:py-3 hidden sm:inline-block">ID</th>
                <th class="sticky top-0 sm:px-6 sm:py-3"></th>
            </tr>
            </thead>
            <tbody class="divide-y bg-white bg-opacity-70">
            <tr 
            v-for="(user, index) in adminFromStore" :key="user.orderId"
            class="
                border-t-4 border-base_gray
                hover:bg-base_of
            "
            @click="userLog(user.uid)"
            >
                    <td class="sm:px-6 py-2 sm:py-4 text-center">{{index+1}}</td>
                    <td class="sm:px-6 py-2 sm:py-4 text-center">{{user.name}}</td>
                    <td class="sm:px-6 py-2 sm:py-4 text-center hidden sm:inline-block">{{user.uid}}</td>
                    <td class="sm:px-6 py-2 sm:py-4 text-center">
                        <img src="~/assets/img/pencil_icon.webp" class="w-8">
                    </td>
            </tr>
            </tbody>
        </table>
        </div>
    </div>
    </div>
</div>
</template>
<script lang="ts">
import Vue from 'vue'
import { UserStore, AdminStore } from '../store'
// import { db } from '../plugins/firebase'
import inputA from '../components/atoms/input/inputA.vue';
import RoundBottun from '../components/atoms/button/roundBottun.vue';

type DataType = {
    adminPassword: boolean,
    adminPassword_num: string
};


export default Vue.extend({
  components: { inputA, RoundBottun },
    head() {
        return {
        title: '注文管理(管理者)',
        };
    },
    data():DataType {
        return{
            adminPassword: false,
            adminPassword_num: ''
        }
    },
    async fetch(): Promise<void> {
        // if (!UserStore.userInfo) {
        // console.log('ログインしていません');
        // } else {
        // if (!UserStore.userInfo.uid) return;
        // await db
        //     .collection(`users`)
        //     .get()
        //     .then((users) => {
        //     users.forEach((user) => {
        //         //@ts-ignore
        //         this.usersList.push(user.data());
        //     });
        //     });
        // }
        await AdminStore.fetchUsersAct();
    },
    computed:{
        userFromStore(){
            return UserStore.getUserInfo
        },
        adminFromStore() {
            return AdminStore.getUsersList
        }
    },
    methods:{
        userLog(uid: string):void {
            this.$router.push({name: 'adminDetail-adminId', params: { adminId: uid } })
        },
        adminPassword_push():void {
            if(this.adminPassword_num === '123456') {
                this.adminPassword = true
            } else {
                this.adminPassword = false
            }
        },
    }
})
</script>