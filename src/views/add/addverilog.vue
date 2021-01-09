<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="题目发布类型:">
            <el-button type="text" @click="yemian1()"
              >由题目描述和激励文件补充源文件</el-button
            >
            <div>
              <el-button type="text" @click="yemian2()">
                由题目描述和源文件补充激励文件</el-button
              >
            </div>
          </el-form-item>
          <el-button
            type="primary"
            round
            style="float: right; margin-right: 200px"
            @click="sub()"
            >发布</el-button
          >
          <el-button
            type="primary"
            round
            style="float: right; margin-right: 100px"
            @click="tiqian()"
            >预览</el-button
          >
        </el-form>
      </div>
      <div>
        <el-form :inline="true" :model="formInline" rules="rules" class="demo-form-inline">
         
          <el-form-item label="标题:" prop="title">
            <el-input
              v-model="formInline.title"
              placeholder=""
              style="width: 300px"
            ></el-input>
          </el-form-item>
          <el-form-item label="info:" prop="info">
            <el-input
              v-model="formInline.info"
              placeholder=""
              style="width: 300px"
            ></el-input>
          </el-form-item>
          <el-form-item label="模块名:" prop="module">
            <el-input
              v-model="formInline.module"
              placeholder=""
              style="width: 300px"
            ></el-input>
          </el-form-item>
          <el-form-item label="input描述:" prop="input">
            <el-input
             type="textarea"
              v-model="formInline.input"
              placeholder=""
              style="width: 500px"
            ></el-input>
          </el-form-item>
          <el-form-item label="output描述:" prop="output">
            <el-input
             type="textarea"
              v-model="formInline.output"
              placeholder=""
              style="width: 500px"
            ></el-input>
          </el-form-item>
          <el-form-item label="预置 代码:" prop="yuzhi">
            <el-input
            type="textarea"
              v-model="formInline.yuzhi"
              placeholder=""
              style="width: 500px"
            ></el-input>
          </el-form-item>
        </el-form>
        <el-form :inline="true" >
          <el-form-item
            label="激励文件:"
            style="margin-left: 50px"
            v-show="isShow1"
          >
            <el-button size="small" type="primary" @click="onSubmit"
              >选择文件</el-button
            >
            <el-button size="small" type="primary" @click="onSubmit"
              >输入代码</el-button
            >
          </el-form-item>
           <el-form-item label="源文件:" style="margin-left: 50px" v-show="isShow2">
            <el-button size="small" type="primary" @click="onSubmit"
              >选择文件</el-button
            >
            <el-button size="small" type="primary" @click="onSubmit"
              >输入代码</el-button
            >
          </el-form-item>
            <el-form-item
              label="存储初始化文件:"
              style="float:right"
            >
              <el-button size="small" type="primary" @click="onSubmit"
                >选择文件</el-button
              >
              <el-button size="small" type="primary" @click="onSubmit"
                >输入代码</el-button
              >
            </el-form-item></el-form
          >
           <el-dialog title="预览" :visible.sync="dialogFormVisible" style="width: 200" >
      <!-- 在el-dialog中进行嵌套el-form实现弹出表格的效果 -->
      <el-form :model="form"  ref="form">
        <el-form-item
           label="标号:">
          <p style="color:red"> {{index}}</p>
          </el-form-item>
          <el-form-item label="标题:">
            <p style="color:red"> {{form.title}}</p>
          </el-form-item>
          <el-form-item label="info:">
            <p style="color:red">  {{form.info}}</p>
          </el-form-item>
          <el-form-item label="模块名:">
            <p style="color:red">  {{form.module}}</p>
          </el-form-item>
          <el-form-item label="input描述:">
            <p style="color:red">  {{form.input}}</p>
          </el-form-item>
          <el-form-item label="output描述:">
           <p style="color:red">  {{form.output}}</p>
          </el-form-item>
          <el-form-item label="预置 代码:">
           <p style="color:red">  {{form.yuzhi}}</p>
          </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="cancel">确 定</el-button>
      </div>
    </el-dialog>
      </div>
    </el-card>

    <!-- <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="输入查询的数据类型" style="margin:10px" v-model="queryInfo.query" clearable @clear="search">
            <el-button slot="append" icon="el-icon-search"   @click="search($index)"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
         <el-button type="primary" @click="add" style="margin:10px">添加</el-button>
        </el-col>
      </el-row> -->
  </div>
</template>

<script >
export default {
  data() {
     var checkTitle = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('标题不能为空'));
        }};
         var checkType = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('类型不能为空'));
        }};
         var checkInfo = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('info不能为空'));
        }};
         var checkModule = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('模块名不能为空'));
        }};
        var checkInput = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('input描述不能为空'));
        }};
        var checkOutput = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('output描述不能为空'));
        }};
        var checkYuzhi = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('预置代码不能为空'));
        }};
    return {
      isShow1:false,
      isShow2:false,
      radio: "1",
      formInline: {
        title: "",
        type:"",
        info: "",
        module: "",
        input: "",
        output: "",
        yuzhi: "",
      },
      rules: {
          title: [
            { validator: checkTitle, trigger: 'blur' }
          ],
          info: [
            { validator: checkInfo, trigger: 'blur' }
          ],
          module: [
            { validator: checkModule, trigger: 'blur' }
          ],
          input: [
            { validator: checkInput, trigger: 'blur' }
          ],
          output: [
            { validator: checkOutput, trigger: 'blur' }
          ],
          type: [
            { validator: checkType, trigger: 'blur' }
          ],
          yuzhi: [
            { validator: checkYuzhi, trigger: 'blur' }
          ]
        },
       dialogFormVisible: false,
       form: {
         num: "",
        title: "",
        info: "",
        module: "",
        input: "",
        output: "",
        yuzhi: "",
       },
       form2:{
         daima:""
       }
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
       cancel() {
      // 取消的时候直接设置对话框不可见即可
      this.dialogFormVisible = false;
    },
    sub() {
      this.$axios
        .post("/api/users/verilogsingle", this.formInline)
        .then((res) => {
          // console.log( this.formInline)
          console.log(res)
          if (res.data.code === 1) {
            this.$message.success("已发布至后台数据");
          }
        });
    },
    tiqian() {
      this.form=this.formInline
       this.dialogFormVisible = true;
    },
    yemian1() {
    this.isShow1= true,
    this.isShow2=false
    },
    yemian2() {
       this.isShow1= false,
       this.isShow2=true
    },
  },
};
</script>
<style scoped>
.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;
}
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  position: absolute;
  right: 0;
  left: 0;
  width: 99%;
  margin: auto;
}
</style>