<template>
  <div class="app-container" id="wrapper">
    <el-input v-model="filterText" placeholder="Filter keyword" style="margin-bottom:30px;" />

    <div id="tree">
      <el-tree
        ref="tree2"
        :data="data2"
        :props="defaultProps"
        :filter-node-method="filterNode"
        @node-click="handleNodeClick"
        class="filter-tree"
        default-expand-all
        style="float: left"
      />
    </div>
    <div class="showExercise" v-if="mainpage">
      <h2>digital logic with verilog example</h2>Write a function named func that does nothing and simply returns. The
      problems in this collection require you to write functions, rather than a
      program that simply ends with an infinite loop, unlike some other assembly
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      filterText: "",
      mainpage: true,
      data2: [
        {
          id: 1,
          label: "内存操作",
          children: [
            {
              id: 1 - 1,
              label: "从内存读",
              children: [
                {
                  id: 1 - 1 - 1,
                  label: "Question 1",
                  exerciseId: 1
                },
                {
                  id: 1 - 1 - 2,
                  label: "Question 2",
                  exerciseId: 2
                },
                {
                  id: 1 - 1 - 3,
                  label: "Question 3",
                  exerciseId: 1
                },
                {
                  id: 1 - 1 - 4,
                  label: "Question 4",
                  exerciseId: 2
                }
              ]
            },
            {
              id: 1 - 2,
              label: "向内存写",
              children: [
                {
                  id: 1 - 2 - 1,
                  label: "Question 1"
                },
                {
                  id: 1 - 2 - 2,
                  label: "Question 2"
                },
                {
                  id: 1 - 2 - 3,
                  label: "Question 3"
                },
                {
                  id: 1 - 2 - 4,
                  label: "Question 4"
                }
              ]
            }
          ]
        },
        {
          id: 2,
          label: "运算",
          children: [
            {
              id: 2 - 1,
              label: "算术运算"
            },
            {
              id: 2 - 2,
              label: "逻辑运算"
            },
            {
              id: 2 - 3,
              label: "移位运算"
            }
          ]
        },
        {
          id: 3,
          label: "语言转换",
          children: [
            {
              id: 3 - 1,
              label: "分支if"
            },
            {
              id: 3 - 2,
              label: "分支switch"
            },
            {
              id: 3 - 3,
              label: "循环for"
            },
            {
              id: 3 - 4,
              label: "循环while"
            }
          ]
        },
        {
          id: 4,
          label: "程序调用",
          children: [
            {
              id: 4 - 1,
              label: "参数传递和返回"
            },
            {
              id: 4 - 2,
              label: "子程序嵌套"
            },
            {
              id: 4 - 3,
              label: "子程序调用和返回"
            },
            {
              id: 4 - 4,
              label: "完整汇编语言程序"
            }
          ]
        }
      ],
      defaultProps: {
        children: "children",
        label: "label"
      },
      exerciseData: [
        {
          exerciseId: "1",
          instructions: "将地址为0x0000 2040的字数据读入寄存器$t0",
          input: "",
          output: "",
          init: "Memory [0x0000 2040] initialized to 123. No input to function."
        },
        {
          exerciseId: "2",
          instructions: "将地址为0x0000 2041的无符号字节数据读入寄存器$t0",
          input: "",
          output: "",
          init: "Memory [0x0000 2040] initialized to 123. No input to function."
        },
        {
          exerciseId: "3",
          instructions: "将地址为0x0000 2042的符号字节数据读入寄存器$t0",
          input: "",
          output: "",
          init: "Memory [0x0000 2040] initialized to 123. No input to function."
        },
        {
          exerciseId: "4",
          instructions: "将0x0000 2043~0x0000 2046非规则字数据读入寄存器$t0",
          input: "",
          output: "",
          init: "Memory [0x0000 2040] initialized to 123. No input to function."
        },
        {
          exerciseId: "5",
          instructions: "将$t1完整存入地址为0x0000 2048的字存储空间",
          input: "",
          output: "",
          init: "Memory [0x0000 2040] initialized to 123. No input to function."
        },
        {
          exerciseId: "6",
          instructions: "将$t1低半字存入地址为0x0000 204c的半字存储空间",
          input: "",
          output: "",
          init: "Memory [0x0000 2040] initialized to 123. No input to function."
        },
        {
          exerciseId: "7",
          instructions: "将$t1低字节存入地址为0x0000 204c的字节存储空间",
          input: "",
          output: "",
          init: "Memory [0x0000 2040] initialized to 123. No input to function."
        },
        {
          exerciseId: "8",
          instructions: "将$t1完整存入地址为0x0000 204b的非规则字存储空间",
          input: "",
          output: "",
          init: "Memory [0x0000 2040] initialized to 123. No input to function."
        }
      ],
      title: "",
      instructions: "",
      init: "",
      io: "",
      result: ""
    };
  },
  watch: {
    filterText(val) {
      this.$refs.tree2.filter(val);
    }
  },

  methods: {
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    handleNodeClick(data) {
      console.log("wwwwwwwwwww", data);
      if (!("children" in data)) {
        this.mainpage = false;

        const label = data.label;
        const exerciseId = data.exerciseId;
        this.title = label;
        var exercise = this.exerciseData[exerciseId];
        this.instructions = exercise.instructions;
        this.init = exercise.init;
        this.io = exercise.io;
        this.result = exercise.result;
      }
    }
  }
};
</script>
<style scoped>
#wrapper {
  position: relative;
}
.showExercise {
  margin-left: 300px;
  /* border: solid 1px red; */
  font-family: "Roboto", "Trebuchet MS", sans-serif;
  font-weight: normal;
  font-size: 1em;
  line-height: 1.6;
  margin-bottom: 1.25em;
  text-rendering: optimizeLegibility;
  text-align: left;
}
</style>
