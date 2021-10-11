<template>
  <div class="flex items-center container mx-6 sm:mt-0">
    <input-a @input="inputKeyWord" />
    <search-logo @click="searchItems" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

type DataType = {
  keyWord:string
};
export default Vue.extend({
  data():DataType {
    return {
      keyWord: '',
    };
  },
  props: ['itemDetail', 'options'],
  computed:{
    moniterKeyWords():string{
      return this.keyWord
    }
  },
  methods: {
    search(): void {
      this.$emit('searchItems', this.moniterKeyWords);
    },
    inputKeyWord(keyWord:any){
      this.keyWord = keyWord
      this.keyWordToParents()
    },
    keyWordToParents(){
      this.$emit('searchKeyWord',this.moniterKeyWords)
    }
  },

});
</script>
