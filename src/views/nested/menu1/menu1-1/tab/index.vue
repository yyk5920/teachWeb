<template>
  <div
    class="tab-container"
    style="margin:0px; padding:10px 0 0 10px; text-align:left"
  >
    <el-tag>题目类型 ：{{ exerciseType }}</el-tag>
    <!-- <el-alert
      :closable="false"
      style="width:200px;display:inline-block;vertical-align: middle;margin-left:30px;"
      title="Tab with keep-alive"
      type="success"
    /> -->
    <el-tabs v-model="activeName" style="margin-top:15px;" type="border-card">
      <el-tab-pane :label="tabMapOptions[0].label" :name="tabMapOptions[0].key">
        <keep-alive>
          <add-mips
            v-if="activeName == tabMapOptions[0].key"
            :type="tabMapOptions[0].key"
            @create="showCreatedTimes"
          >
          </add-mips>
        </keep-alive>
      </el-tab-pane>
      <el-tab-pane :label="tabMapOptions[1].label" :name="tabMapOptions[1].key">
        <keep-alive>
          <assign-hw
            v-if="activeName == tabMapOptions[1].key"
            :type="tabMapOptions[1].key"
            @create="showCreatedTimes"
          >
          </assign-hw>
        </keep-alive>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import AddMips from "../AddMips";
import AssignHw from "../AssignHomework";

export default {
  name: "Tab",
  components: { AddMips, AssignHw },
  data() {
    return {
      tabMapOptions: [
        { label: "添加题目", key: "add" },
        { label: "题目设置", key: "homework" }
      ],
      activeName: "add",
      exerciseType: ""
    };
  },
  watch: {
    activeName(val) {
      this.$router.push(`${this.$route.path}?tab=${val}`);
    },
    $route: {
      handler: function(route) {
        console.log("获取进入添加题目router tab");
        this.exerciseType = route.meta.title;
      },
      immediate: true
    }
  },
  created() {
    // init the default selected tab
    const tab = this.$route.query.tab;
    if (tab) {
      this.activeName = tab;
    }
  },
  methods: {
    showCreatedTimes() {
      this.createdTimes = this.createdTimes + 1;
    }
  }
};
</script>

<style scoped>
.tab-container {
  margin: 30px;
}
</style>
