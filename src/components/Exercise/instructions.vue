<!-- 初始化 -->
<template>
  <div class="instructions">
    <div id="content">{{instructions}}</div>
    <div style="margin-top:1ex">
     <!-- <div>框图：</div> -->

      <img src="http://localhost:8999/api/img/img.png" alt="框图" /> 
    </div>

    <!-- <img :src="imgWave" alt="波形图" /> -->
    <!-- <span>{{instructions}}</span> -->
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    instructions: {
      type: String,
      default: "",
    },
    image: {
      type: Number,
      default: null,
    },
  },

  components: {},

  computed: {
    img() {
      return require("@/assets/mip_cpu_design/" + this.image + "/img.png");
    },
    imgTable() {
      return require("@/assets/mip_cpu_design/" + this.image + "/imgTable.png");
    },
    imgWave() {
      return require("@/assets/mip_cpu_design/" + this.image + "/imgWave.png");
    },
  },

  methods: {},
};
</script>
<style lang='scss' scoped>
.instructions {
  font-size: 11pt;
  font-family: Consolas, Menlo, Monaco, Lucida Console, Liberation Mono,
    DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace, serif;
  // width: 600px;
  background-color: #f4f8ff;
  padding: 1ex 1em;
  border: 1px #999 solid;
  margin: 10px 0px 10px 0px;
}
.content {
  padding: 1ex 1em;
}
</style>
