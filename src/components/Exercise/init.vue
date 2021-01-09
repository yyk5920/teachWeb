<!-- 初始化 -->
<template>
  <div class="init">
    <span>初始化数据：</span>
    <span v-if="init">{{init}}</span>
    <span v-else>无</span>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    init: {
      type: String,
      default: ""
    }
  },

  components: {},

  methods: {}
};
</script>
<style lang='scss' scoped>
.init {
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
