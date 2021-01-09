<!-- 代码编译结果 -->
<template>
  <div id="result">
    <div v-if="result==='成功啦！'">
      <h5 style="color: black">{{result}}</h5>
    </div>
    <div v-else>
      <h5 style="color: red">{{result}}</h5>
    </div>
 <div class="info">
   <ul>
     <li v-for="(item,index) in compile_info" :key="index">{{item}}</li>
   </ul>
 </div>
 
 
  </div>

</template>

<script>
export default {
  data() {
    return {
      compileSuccess:"",
      compare_info:[],

    };
  },
  props: {
    result: {
      type: String,
      default: ""
    },
    compile_info: {
      type: Array,
      default() {
        return [];
      }
    },
    compare_error: {
      type: Array,
      default() {
        return [];
      }
    },
  },
  watch: {
    compare_error() {
      const arr = [...this.compare_error];
      const newArr = arr.map(item => {
        return item.split(",");
      });
      this.compare_info = newArr;
    }
  },

  methods: {}
};
</script>
<style lang='scss' scoped>
ul {
  // list-style-type: none;
  font-size: 10px;
  li {
    margin: 5px 0;
  }
}
#result {
  font-size: 11pt;
  font-family: Consolas, Menlo, Monaco, Lucida Console, Liberation Mono,
    DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace, serif;
  // width: 600px;
  background-color: #f4f8ff;
  padding: 1ex 1em;
  border: 1px #999 solid;
  margin: 10px 0px 10px 0px;
}
</style>
