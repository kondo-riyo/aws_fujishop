<template>
  <fieldset>
    <select 
    v-model="options.label"
     :name="name" 
     @change="updateValue"
     class="bg-base_red text-white text-center rounded"
    >
      <template 
       v-for="(option, index) in options"
      >
        <option 
         :value="option.value" 
         :key="index"
        >
          {{ option.label }}
        </option>
      </template>
    </select>
  </fieldset>
</template>

<script>
export default {
  name: "selectA",
  props: {
    value: { type: String, require: false },
    options: { type: Array, require: true },
    name: { type: String, require: true },
    selectedStatus: {type: String, require: false}

  },
  methods: {
    updateValue(e) {
      this.$emit("input", e.target.value);
      console.log('親に渡す　'+e.target.value)
    }
  },
  mounted() {
    // this.$emit("input", this.options[0].value);
    // console.log(selectedStatus)
    let select = document.getElementByName(this.props.name)
    select.options[this.props.value].selected = true
    // // this.$emit("input", this.options[0].value);
    // console.log('options '+select)
  }
};
</script>