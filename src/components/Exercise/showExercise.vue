<!-- 题目展示及提交答案 -->
<template>
  <div class="showExercise" v-if="mainpage">
    <h2>digital logic with verilog exampleWrite a function named func that does nothing and simply returns. The
    problems in this collection require you to write functions, rather than a
    program that simply ends with an infinite loop, unlike some other assembly</h2>
  </div>
  <div class="showExercise" v-else>
    <div id="title">
      <h2>{{ title }}</h2>
    </div>
    <div id="instructions">
      <h4>题目描述：</h4>
      <p>{{ instructions }}</p>
    </div>
    <div id="init">
      <h4>初始化：</h4>
      <p>{{ init }}</p>
    </div>
    <div id="io">
      <h4>输入/输出：</h4>
      <p>{{ io }}</p>
    </div>
    <div id="result">
      <h4>结果：</h4>
      <p>{{ result }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      filterText: "",
      mainpage: true
    };
  },
  components: {},

  computed: {},

  mounted: {},

  methods: {}
};
</script>
<style lang='scss' scoped>
</style>
