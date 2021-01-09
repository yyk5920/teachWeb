<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="题目标号">
        <el-input-number
          v-model="form.exerciseId"
          controls-position="right"
          :min="0"
          style="width:80px"
          size="mini"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="题目分数">
        <el-input-number
          v-model="form.score"
          controls-position="right"
          :step="10"
          :min="0"
          style="width:80px"
          size="mini"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="提交上限">
        <el-input-number
          v-model="form.count"
          controls-position="right"
          :step="5"
          :min="0"
          style="width:80px"
          size="mini"
        ></el-input-number>
      </el-form-item>

      <el-form-item label="截止日期">
        <el-col :span="11">
          <el-date-picker
            v-model="form.date1"
            type="date"
            placeholder="Pick a date"
            size="mini"
            style="width: 100%;"
          />
        </el-col>
        <el-col :span="2" class="line">-</el-col>
        <el-col :span="11">
          <el-time-picker
            v-model="form.date2"
            type="fixed-time"
            placeholder="Pick a time"
            size="mini"
            style="width: 100%;"
          />
        </el-col>
      </el-form-item>
      <el-form-item label="取历次最高成绩">
        <el-switch v-model="form.max" active-text="是" inactive-text="否" />
      </el-form-item>

      <!-- <el-form-item label="Activity type">
        <el-checkbox-group v-model="form.type">
          <el-checkbox label="Online activities" name="type" />
          <el-checkbox label="Promotion activities" name="type" />
          <el-checkbox label="Offline activities" name="type" />
          <el-checkbox label="Simple brand exposure" name="type" />
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="Resources">
        <el-radio-group v-model="form.resource">
          <el-radio label="Sponsor" />
          <el-radio label="Venue" />
        </el-radio-group>
      </el-form-item>
      <el-form-item label="Activity form">
        <el-input v-model="form.desc" type="textarea" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Create</el-button>
        <el-button @click="onCancel">Cancel</el-button>
      </el-form-item> -->
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        exerciseId: "",
        score: "",
        count: "",
        date1: "",
        date2: "",
        max: true,
        type: [],
        resource: "",
        desc: ""
      }
    };
  },
  methods: {
    onSubmit() {
      this.$message("submit!");
    },
    onCancel() {
      this.$message({
        message: "cancel!",
        type: "warning"
      });
    }
  }
};
</script>

<style scoped>
.line {
  text-align: center;
}
</style>
