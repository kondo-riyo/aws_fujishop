<template>
  <div class="flex justify-center">
    <div class="sm:bg-starbucks bg-center bg-no-repeat w-full flex items-center">
      <div
        type="text"
        class="
          sm:h-5/7
          bg-white bg-opacity-70
          container
          mx-auto
          p-10
          m-10
          max-w-xs
          rounded-lg
          overflow-hidden
          shadow
          flex flex-col
        "
      >
        <div>
          <h1 class="font-bold text-xl text-base_gray text-center">ログイン</h1>
        </div>
        <ValidationObserver v-slot="{ invalid }">
          <div>
            <label 
             class="
               block
               uppercase
               tracking-wide
               text-base_green text-xs
               font-bold
               my-2
               ml-4
             ">
             メール
            </label>
            <validation-provider
              v-slot="{ errors }"
              name="メールアドレス"
              rules="required|email"
            >
              <inputA
                 v-model="userInfo.email"
                 name="メールアドレス"
                 type="text"
                 placeholder=""
                 @input="inputMail"
                 class="rounded-full"/>
              <span class="text-xs text-red-700">
                {{ errors[0] }}
              </span>
            </validation-provider>
          </div>
          <div>
            <label 
             class="
               block
               uppercase
               tracking-wide
               text-base_green text-xs
               font-bold
               my-2
               ml-4
             ">
              パスワード
            </label>
            <validation-provider
              v-slot="{ errors }"
              name="パスワード"
              rules="required"
            >
              <inputA
                 v-model="userInfo.password"
                 name="パスワード"
                 type="password"
                 placeholder="*******"
                 @input="inputPassword"
                 class="rounded-full"/>
              <span class="text-xs text-red-700">
                {{ errors[0] }}
              </span>
            </validation-provider>
          </div>
          <div class="block ml-16 m-4 self-center">
            <round-bottun
            @click="login"
            :disabled="invalid">
              ログイン
            </round-bottun>
          </div>
        </ValidationObserver>
        <div class="self-center">
          <nuxt-link to="/signup" class="text-blue-700">
            新規会員登録はこちら
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { ValidationProvider, ValidationObserver } from 'vee-validate';
import { userLoginType } from '../types/userInfoType';
import { UserStore } from '../store';
import { auth } from '../plugins/firebase';

type DataType = {
  userInfo: userLoginType;
};

export default Vue.extend({
  middleware: 'authenticated',
  data(): DataType {
    return {
      userInfo: {
        email: '',
        password: '',
      },
    };
  },
  components: {
    ValidationProvider,
    ValidationObserver
  },
  methods: {
    login(): void {
      if (typeof this.userInfo !== undefined) {
        auth
          .signInWithEmailAndPassword(
            this.userInfo.email,
            this.userInfo.password
          )
          .then((authUser):void => {
            if (
              authUser.user === null ||
              authUser.user.email === null ||
              authUser.user.uid === null
            )
              return;
            UserStore.loginAct(authUser.user.email, authUser.user.uid).then(
              () => this.$router.push('/')
            );
          });
      } 
    },
    inputMail(newvalue:string): void {
      this.userInfo.email=newvalue
    },
    inputPassword(value:string): void {
      this.userInfo.password=value
    },
  }
});
</script>
