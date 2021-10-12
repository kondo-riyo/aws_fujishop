<template>
  <div class="flex items-center container mx-6 sm:mt-0">
    <input-search @input="inputKeyWord"/>
    <search-logo @search="search" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import inputSearch from "../atoms/input/inputSearch.vue"
import searchLogo from "../atoms/logo/searchLogo.vue"

export default Vue.extend({
  components:{
    inputSearch,
    searchLogo
  },
  data(){
    return{
      keyword:''
    }
  },
  methods: {
    search(): void {
      this.$emit('searchItems',this.keyword);
    },

    inputKeyWord(keyWord:any){
      this.keyword = keyWord;
    },
  },

});
</script>
