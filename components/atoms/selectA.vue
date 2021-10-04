<template>
  <fieldset>
    <select
     :name="name"
     @change="updateValue"
     class="
       appearance-none
       block
       w-full
       bg-base_gray bg-opacity-25
       text-gray-700
       border border-gray-200
       rounded
       py-3
       px-4
       leading-tight
       focus:outline-none focus:bg-white focus:border-gray-500
       "
    >
      <template v-for="(option, index) in options">
        <option :value="option.value" :key="index">
          {{ option.label }}
        </option>
      </template>
    </select>
  </fieldset>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    name: 'selectA',
    props: {
        value: {type: String, required: true},
        option: {type:Array, required: true},
        name: {type:String, required: true}
    },
    methods: {
        updateValue(e: any) {
        this.$emit("input", e.target.value);
        }
    },
    mounted() {
        // this.$emit("input", this.options[0].value);
    }
})
</script>