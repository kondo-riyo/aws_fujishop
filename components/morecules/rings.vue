<template>
<div class="mt-3 space-x-4 flex p-1">
    <ring-red :item="item"/>
</div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    props:['item']
})
</script>