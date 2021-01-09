<!-- 代码编辑器 -->
<template>
  <div id="code">
    <h4>Write your code here</h4>
    <!-- <codemirror ref="mycode" :value="curCode" :options="cmOptions" class="code"></codemirror> -->
    <textarea ref="mycode" class="code" v-model="code"></textarea>
    <div class="footer">
      <el-button type="success" size="mini" @click="submit">Submit</el-button>
    </div>
    <br />
  </div>
</template>

<script>
import "codemirror/addon/hint/show-hint.css";
import "codemirror/addon/hint/show-hint.js";
import "codemirror/lib/codemirror.css";
require("codemirror/mode/verilog/verilog");
require("codemirror/addon/hint/show-hint");
let CodeMirror = require("codemirror/lib/codemirror");
export default {
  name: "codeMirror",
  data() {
    return {
      code: "//输入代码",
      textArea: "",
      state: "",
      result: false
    };
  },
  props: {
    codeClear: {
      type: Boolean,
      default: true
    },
    submitCode: {
      type: Function,
      default() {
        return () => {};
      }
    },
    codeModel: {
      type: String,
      default: ""
    }
  },

  computed: {},

  mounted() {
    // debugger;
    console.log("codeModel:", this.codeModel);
    let mime = "text/x-verilog";
    let editor = CodeMirror.fromTextArea(this.$refs.mycode, {
      mode: mime,
      indentWithTabs: true,
      smartIndent: true,
      lineNumbers: true,
      matchBrackets: true,
      theme: "neat",
      // autofocus: true,
      extraKeys: { Ctrl: "autocomplete" }, //自定义快捷键
      hintOptions: {
        //自定义提示选项
        tables: {
          users: ["name", "score", "birthDate"],
          countries: ["name", "population", "size"]
        }
      }
    });
    this.textArea = editor;
    editor.setValue(this.code);
    this.result = false;
    // console.log("mounted");
    //代码自动提示功能，记住使用cursorActivity事件不要使用change事件，这是一个坑，那样页面直接会卡死
    // editor.on("cursorActivity", function() {
    //   editor.showHint();
    // });
  },
  watch: {
    codeClear() {
      this.textArea.setValue(this.code);
      this.result = false;
    },
    codeModel() {
      console.log("watch codeModel改变");
      this.code = this.codeModel;
      this.textArea.setValue(this.code);
    }
  },

  methods: {
    submit() {
      const text = this.textArea.getValue();
      this.$emit("submitCode", {
        code: text
      });
    }
  }
};
</script>
<style lang='scss' scoped>
.code {
  font-size: 11pt;
  font-family: Consolas, Menlo, Monaco, Lucida Console, Liberation Mono,
    DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace, serif;
}
.footer {
  padding-top: 15px;
  padding-left: 30px;
}
</style>
