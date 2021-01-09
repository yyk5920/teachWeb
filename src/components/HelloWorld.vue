<template>
  <div id="app">
    <el-container>
      <el-header style="background-color: rgb(238, 241, 246)" id="header;"
        >Mips课程网站</el-header
      >
      <el-container id="content">
        <el-aside
          width="200px"
          style="background-color: rgb(238, 241, 246); height=100%;padding-bottom: 9999px;margin-bottom: -9999px; "
          id="nav"
        >
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            style="background-color: rgb(238, 241, 246)"
            router
          >
            <el-submenu index="/addExercise">
              <template slot="title">
                <i class="el-icon-document"></i>
                <span>布置题目</span>
              </template>
              <el-menu-item-group style="background-color: rgb(238, 241, 246);">
                <template slot="title"></template>
                <el-menu-item
                  index="/addExercise/addMips"
                  style=" font-size: 12px"
                  >Mips汇编</el-menu-item
                >
                <el-menu-item index="1-2" style=" font-size: 12px" disabled
                  >待定</el-menu-item
                >
              </el-menu-item-group>
            </el-submenu>
            <el-menu-item index="2" disabled>
              <i class="el-icon-document"></i>
              <span slot="title">题库管理</span>
            </el-menu-item>
            <el-menu-item
              index="3"
              disabled
              style="background-color: rgb(238, 241, 246)"
            >
              <i class="el-icon-document"></i>
              <span slot="title">班级管理</span>
            </el-menu-item>
            <el-menu-item index="4" disabled>
              <i class="el-icon-setting"></i>
              <span slot="title">待定</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main
          id="main"
          style="height=100%;padding-bottom: 9999px;margin-bottom: -9999px; overflow:hidden; padding:10px"
        >
          <!-- <el-breadcrumb separator="/">
            <el-breadcrumb-item
              v-for="(item, index) in breadList"
              :key="index"
              :to="item.path"
              @click.native="breadcrumbClick(item)"
              style="cursor: pointer"
              >{{ item.name }}</el-breadcrumb-item
            >
          </el-breadcrumb> -->
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      breadList: []
    };
  },
  watch: {
    // 监听路由的变化
    $route() {
      this.getBreadcrumb();
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
      let newBread;
      if (key === "/addExercise") {
        newBread = { name: "布置题目", path: key };
      }
      var vuexBreadList = this.$store.state.breadListState;
      vuexBreadList.push(newBread);
      // that.$store.commit('breadListMutations', vuexBreadList);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    created: function() {
      // 在页面加载时读取sessionStorage里的状态信息
      sessionStorage.getItem("umeetCloudVuex") &&
        this.$store.replaceState(
          Object.assign(
            this.$store.state,
            JSON.parse(sessionStorage.getItem("umeetCloudVuex"))
          )
        );
      // 在页面刷新时将vuex里的信息保存到sessionStorage里
      window.addEventListener("beforeunload", () => {
        sessionStorage.setItem(
          "umeetCloudVuex",
          JSON.stringify(this.$store.state)
        );
      });
    },

    // 面包屑数据处理
    getBreadcrumb() {
      let that = this;

      // 由于本项目大部分属于‘一级’页面，所以在设置路由时候，一级页面不设置breadNumber = 1，‘二级’页面以上才设置breadNumber
      let breadNumber =
        typeof this.$route.meta.breadNumber !== "undefined"
          ? this.$route.meta.breadNumber
          : 1;
      // 获取当前页面的名字和路由，并组合成新的对象
      let newBread = { name: this.$route.name, path: this.$route.fullPath };
      console.log(newBread);
      let vuexBreadList = []; // 默认初始化面包屑数据
      // if (breadNumber !== 1) {
      // 当前面包屑breadNumber大于1时才会从vuex中获取值
      vuexBreadList = that.$store.state.breadListState; // 获取breadList数组
      console.log(vuexBreadList);
      // }
      if (breadNumber < vuexBreadList.length) {
        // "回退"面包屑----判断条件：当前路由breadNumber小于vuexBreadList的长度
        vuexBreadList.splice(
          breadNumber - vuexBreadList.length,
          vuexBreadList.length - breadNumber
        );
      }
      if (breadNumber > vuexBreadList.length) {
        // 添加面包屑----判断条件：当前路由breadNumber大于vuexBreadList的长度
        if (breadNumber - vuexBreadList.length === 2) {
        }
        vuexBreadList.push(newBread);
      }
      // 处理完数据后，将最终的数据更新到vuex（用于页面刷新）
      that.$store.commit("breadListMutations", vuexBreadList);
      // 处理完数据后，将最终的数据更新为新的面包屑数组
      that.breadList = vuexBreadList;
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-height: 400px;
}
</style>
