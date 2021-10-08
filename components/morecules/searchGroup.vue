<template>
    <div class="flex items-center container mx-6 sm:mt-0">
      <searchInput
        placeholder="Search"
        name="keyword"
        type="text"
        v-model="keyWord"
        @input="inputKeyword"
      />
      <search-logo
        @click="search"
      />
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

type DataType = {
  selectedItemNum: number;
};
export default Vue.extend({
  props: ['itemDetail', 'options'],
  methods: {
    updateValue(e: any) {
      this.$emit('input', e.target.value);
    },
  },

});
</script>