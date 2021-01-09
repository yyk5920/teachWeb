<!-- 作业 -->
<template>
  <div id="wrapper">
    <!-- <router-view></router-view> -->
    <!-- <router-view name="unfinished"></router-view>
    <router-view name="finished"></router-view>-->
    <div id="list">
      <homework-list></homework-list>
    </div>
  </div>
</template>

<script>
import HomeworkList from "./dnd-list";
export default {
  data() {
    return {
      show: false
    };
  },

  components: { HomeworkList },

  methods: {}
};
</script>
<style lang='scss' scoped>
</style>
