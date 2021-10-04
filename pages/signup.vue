<template>
  <div class="flex justify-center">
    <div class="sm:bg-starbucks bg-center bg-no-repeat sm:w-full flex items-center">
      <div
        type="text"
        class="
          bg-white
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
          <h1 class="font-bold text-xl text-gray-700 text-center">会員登録</h1>
        </div>
        <ValidationObserver v-slot="{ invalid }">
          <div>
            <label for="name" class="text-base_green font-bold">名前</label>
            <validation-provider
              v-slot="{ errors }"
              name="名前"
              rules="required|max:10"
            >
              <inputA
                 v-model="userInfo.name"
                 name="名前"
                 type="text"
                 placeholder="例)田中 太朗"
                 @input="inputName"/>
              <span class="text-xs text-red-700">
                {{ errors[0] }}
              </span>
            </validation-provider>
          </div>
          <div>
            <label for="email">メール</label>
            <validation-provider
              v-slot="{ errors }"
              name="メールアドレス"
              rules="required|email"
            >
              <inputA
                 v-model="userInfo.email"
                 name="メールアドレス"
                 type="text"
                placeholder="例)sample@gmail.com"
                 @input="inputMail"/>
              <span class="text-xs text-red-700">
                {{ errors[0] }}
              </span>
            </validation-provider>
          </div>
          <div>
            <label for="tel">電話番号</label>
            <validation-provider
              v-slot="{ errors }"
              name="電話番号"
              rules="required|min:10|max:11"
            >
              <inputA
                 v-model="userInfo.tel"
                 name="電話番号"
                 type="text"
                 placeholder="例)090XXXXXXXX"
                 @input="inputTel"/>
              <span class="text-xs text-red-700">
                {{ errors[0] }}
              </span>
            </validation-provider>
          </div>
          <div>
            <label for="postalcode">郵便番号</label>
            <validation-provider
              v-slot="{ errors }"
              name="郵便番号"
              rules="required|yubin"
            >
              <inputA
                 v-model="userInfo.postalcode"
                 name="郵便番号"
                 type="number"
                 placeholder=""
                 @input="inputPostalcode"/>
              <span class="text-xs text-red-700">
                {{ errors[0] }}
              </span>
            </validation-provider>
          </div>
          <div class="my-2">
            <square-bottun
             　@click="yubinbango()">
              検索
            </square-bottun>
          </div>
          <div>
            <label for="address">住所</label>
            <validation-provider
              v-slot="{ errors }"
              name="住所"
              rules="required"
            >
              <inputA
                 v-model="userInfo.address"
                 name="住所"
                 type="text"
                 placeholder="東京都新宿区"
                 @input="inputAddress"/>
              <span class="text-xs text-red-700">
                {{ errors[0] }}
              </span>
            </validation-provider>
          </div>
          <div>
            <label for="password">パスワード(登録)</label>
            <validation-provider
              v-slot="{ errors }"
              name="パスワード"
              rules="required"
            >
              <inputA
                 v-model="userInfo.password"
                 name="パスワード"
                 type="password"
                 placeholder="例)*******"
                 @input="inputPassword"/>
              <span class="text-xs text-red-700">
                {{ errors[0] }}
              </span>
            </validation-provider>
          </div>
          <div class="my-4 ml-16 self-center">
            <round-bottun
              @click="signup"
              :disabled="invalid">
              登録
            </round-bottun>
          </div>
        </ValidationObserver>
        <div class="self-center">
          <nuxt-link to="/signin" class="text-blue-700">
            会員登録済みの方はこちら
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import { ValidationProvider, ValidationObserver } from 'vee-validate';
import firebase, { auth, db } from '../plugins/firebase';
import { userInfoType } from '../types/userInfoType';
import { Core as YubinBangoCore } from 'yubinbango-core'

type DataType = {
  userInfo: userInfoType;
};
export default Vue.extend({
  data(): DataType {
    return {
      userInfo: {
        name: '',
        email: '',
        password: '',
        tel: '',
        postalcode: '',
        address: '',
        uid: '',
      },
    };
  },
  components: {
    ValidationProvider,
    ValidationObserver
  },
  methods: {
    async signup(): Promise<void> {
      try {
        if (
          this.userInfo.email === undefined ||
          this.userInfo.password === undefined
        )
          return;
        const authUser: firebase.auth.UserCredential =
          await auth.createUserWithEmailAndPassword(
            this.userInfo.email,
            this.userInfo.password
          );
        if (authUser.user === null) return;
        await this.addAuthUserToDb(authUser.user.uid);
        this.$router.push('/signin');
      } catch (error) {
        console.log(error.message);
      }
    },
    addAuthUserToDb(uid: string): Promise<firebase.firestore.DocumentReference<firebase.firestore.DocumentData>> {
      return db.collection(`users/${uid}/userInfo`).add({
        email: this.userInfo.email,
        name: this.userInfo.name,
        tel: this.userInfo.tel,
        postalcode: this.userInfo.postalcode,
        address: this.userInfo.address,
        uid: uid,
      });
    },
    inputName(value:string): void {
      this.userInfo.name=value
    },
    inputMail(value:string): void {
      this.userInfo.email=value
    },
    inputPassword(value:string): void {
      this.userInfo.password=value
    },
    inputTel(value:string): void {
      this.userInfo.tel=value
    },
    inputPostalcode(value:string): void {
      this.userInfo.postalcode =value
    },
    inputAddress(value:string): void {
      this.userInfo.address=value
    },
    yubinbango(){
      console.log(this.userInfo.postalcode)
      let newAddress = ''
      new YubinBangoCore(this.userInfo.postalcode, (addr :any)=> {
        newAddress = addr.region + addr.locality + addr.street
        this.userInfo.address = newAddress
        // this.userInfo.address = addr.region // 都道府県
        // this.userInfo.address += addr.locality // 市区町村
        // this.userInfo.address += addr.street // 町域
      })
    }
  },
});
</script>
