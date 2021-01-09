<template>
  <div id="wrapper" style="text-align: center">
    <el-row :gutter="10">
      <el-col :span="17">
        <div id="left">
          <div id="expractice">
            <el-row :gutter="20">
              <el-col :span="12">
                <div id="question">
                  <el-tag type="info">题目类型</el-tag>
                  <el-select
                    v-model="questionType"
                    placeholder="请选择"
                    size="mini"
                    style="width:100px"
                  >
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                      style="font-size:8px;"
                    ></el-option>
                  </el-select>
                  <span id="questionId">
                    <span id="labelId">id:</span>
                    <el-input-number
                      v-model="questionId"
                      controls-position="right"
                      @change="handleChange"
                      :min="0"
                      style="width:80px"
                      size="mini"
                    ></el-input-number>
                  </span>
                  <div class="content">
                    <!-- <tiny-mcy></tiny-mcy> -->
                    <el-input
                      type="textarea"
                      :rows="11"
                      placeholder="请输入内容"
                      v-model="textarea"
                    ></el-input>
                  </div>
                </div>
              </el-col>
              <el-col :span="12" style="padding-right:20px">
                <div id="result">
                  <el-tag type="info">结果</el-tag>
                  <div class="content">
                    <div v-if="!this.exerciseType">
                      {{
                        "Register：" +
                          this.resultModel.register.name +
                          " Value: " +
                          this.resultModel.register.value
                      }}
                    </div>
                    <div v-if="this.exerciseType">
                      Address：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Value:
                      <div
                        v-for="(item, key) in this.resultModel.memory"
                        :key="key"
                      >
                        {{
                          item.addressStart +
                            "-" +
                            item.addressEnd +
                            ":&nbsp;&nbsp;&nbsp;" +
                            item.value
                        }}
                      </div>
                    </div>
                    <!-- <el-input type="textarea" :rows="10" placeholder="请输入内容" v-model="textarea"></el-input> -->
                  </div>
                </div>
              </el-col>
            </el-row>
            <br class="clear" />
          </div>
          <el-button @click="init">初始化</el-button>
          <el-button @click="getResult">生成答案</el-button>
          <el-button @click="clear">重置</el-button>
          <!-- <el-button @click="getTableData">获取数据</el-button> -->
          <el-button @click="postQuestion">提交</el-button>
          <!-- <el-button @click="$refs.elxEditable.clear()">清空</el-button> -->
          <elx-editable
            ref="elxEditable"
            :data.sync="memeryData"
            border
            size="mini"
          >
            <elx-editable-column
              prop="address"
              label="Address"
              width="100"
            ></elx-editable-column>
            <elx-editable-column
              prop="value0"
              label="Value(+0)"
              width="100"
              :edit-render="{ name: 'ElInput' }"
            ></elx-editable-column>
            <elx-editable-column
              prop="value4"
              label="Value(+4)"
              width="100"
              :edit-render="{ name: 'ElInput' }"
            ></elx-editable-column>
            <elx-editable-column
              prop="value8"
              label="Value(+8)"
              width="100"
              :edit-render="{ name: 'ElInput' }"
            ></elx-editable-column>
            <elx-editable-column
              prop="valuec"
              label="Value(+c)"
              width="100"
              :edit-render="{ name: 'ElInput' }"
            ></elx-editable-column>
            <elx-editable-column
              prop="value10"
              label="Value(+10)"
              width="100"
              :edit-render="{ name: 'ElInput' }"
            ></elx-editable-column>
            <elx-editable-column
              prop="value14"
              label="Value(+14)"
              width="100"
              :edit-render="{ name: 'ElInput' }"
            ></elx-editable-column>
            <elx-editable-column
              prop="value18"
              label="Value(+18)"
              width="100"
              :edit-render="{ name: 'ElInput' }"
            ></elx-editable-column>
            <elx-editable-column
              prop="value1c"
              label="Value(+1c)"
              width="100"
              :edit-render="{ name: 'ElInput' }"
            ></elx-editable-column>
          </elx-editable>
        </div>
      </el-col>
      <el-col :span="7">
        <div id="right">
          <elx-editable
            ref="elxEditableRegister"
            :data.sync="registerData"
            border
            size="mini"
            height="520px"
          >
            <elx-editable-column
              prop="name"
              label="Name"
              width="100"
            ></elx-editable-column>
            <elx-editable-column
              prop="number"
              label="Number"
              width="100"
              :edit-render="{ name: 'ElInput' }"
            ></elx-editable-column>
            <elx-editable-column
              prop="value"
              label="Value"
              width="100"
              :edit-render="{ name: 'ElInput' }"
            ></elx-editable-column>
          </elx-editable>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {
  COMMON,
  DATATYPE,
  OPID,
  RESULT,
  EXERCISEMODEL,
  MEMOTYDATAINDEX,
  REGISTERINDEX,
  RESULTMODEL
} from "@/common/common.js";
import TinyMcy from "@/views/tinymce/Tinymce";

function getType() {
  var that = arguments[0];
  var reg = /,|" "|;/g;
  var text = that.textarea.toString();
  if (text === "") alert("题目不能为空！");
  var array = text.split(/，|。|\n/);
  var rep_register = /\$[a-z][0-9]/g;
  var rep_value = /(0x([0-9a-f]){4}\s([0-9a-f]{4}))|(0x[0-9a-f]{8})/g;
  var item = text;

  // 寄存器
  var register = item.match(rep_register);
  if (register != null) {
    register = register[0];
    var index = that.registerIndex[register];
    that.registerData[index].value = COMMON.DATA.WORD[0]; // 随机赋值
    that.expriseModel.register.name = register;
    that.expriseModel.register.value = that.registerData[index].value;
  } else {
    alert("题目格式有问题,检测不到寄存器");
  }

  // 内存
  var memoryAddress = item.match(rep_value);
  var address_16;
  if (memoryAddress != null) {
    var address = memoryAddress[0];
    address_16 = parseInt(address.replace(/\s+/g, ""), 16);
    that.expriseModel.memoryStart = address_16;
    that.expriseModel.memoryInitStart = [
      Math.floor(address_16 / 0x10) * 0x10,
      Math.floor(address_16 / 0x10) * 0x10 + 0x10,
      Math.floor(address_16 / 0x10) * 0x10 + 0x20
    ];
    var tempmemory = that.expriseModel.memoryInitStart[0];
    that.memeryData.forEach(index => {
      let value = tempmemory.toString(16);
      while (value.length < 8) {
        value = "0" + value;
      }
      value = "0x" + value;
      index.address = value;
      tempmemory = tempmemory + 0x10;
    });
    var memory_index = Math.floor(
      (address_16 - that.expriseModel.memoryInitStart[0]) / 4
    );
    var memory_key = that.memeryDataIndex[memory_index + 1]; // value0|value4|value8...
    that.memeryData[0][memory_key] = COMMON.DATA.WORD[1];
    if (memoryAddress.length > 1) {
      address = memoryAddress[1];
      address_16 = parseInt(address.replace(/\s+/g, ""), 16);
      that.expriseModel.memoryEnd = address_16;
      var memory_index = Math.floor(
        (address_16 - that.expriseModel.memoryInitStart[0]) / 4
      );
      var memory_key = that.memeryDataIndex[memory_index + 1]; // value0|value4|value8...
      that.memeryData[0][memory_key] = COMMON.DATA.WORD[0];
    }
  } else {
    alert("题目格式有问题，检测不到内存地址");
  }

  // 数据类型关键字
  DATATYPE.forEach(rep_datatype => {
    // var type = rep_datatype.rep.exec(item);
    var type = item.match(rep_datatype.rep);
    if (type !== null) {
      that.expriseModel.keyWord = rep_datatype.code;
    }
  }, that);
  OPID.forEach(rep_optype => {
    // var type = rep_optype.rep.exec(item);
    var type = item.match(rep_optype.rep);
    if (type !== null) {
      that.expriseModel.opId = rep_optype.code;
    }
  }, that);
  console.log(that.expriseModel);
}
var ExerciseState = function() {
  var _currentStates = {},
    states = {
      READ_WORD: function() {
        var that = arguments[0];
        that.exerciseType = false;
        // 将数据从内存写入寄存器
        var memoryStart = that.expriseModel.memoryStart;
        //一栏起始位置的地址
        var memoryInitStart = that.expriseModel.memoryInitStart;
        var register = that.expriseModel.register.name;
        var memeryDataIndex = that.memeryDataIndex;
        var memory_key1 =
          memeryDataIndex[
            Math.floor((memoryStart - memoryInitStart[0]) / 4) + 1
          ];
        var memory_key2 =
          memeryDataIndex[
            Math.floor((memoryStart - memoryInitStart[0]) / 4) + 2
          ];
        console.log("字数据");
        var num = memoryStart % 4; // 在字节中的位置
        if (num === 0) {
          var value = that.memeryData[0][memory_key1];
          that.resultModel.register.name = register;
          that.resultModel.register.value = value;
        } else if (num === 1) {
          var value1 = that.memeryData[0][memory_key1].substr(-6);
          var value2 = that.memeryData[0][memory_key2].substr(2, 2);
          that.resultModel.register.name = register;
          that.resultModel.register.value = value1 + value2;
        } else if (num === 2) {
          var value1 = that.memeryData[0][memory_key1].substr(-4);
          var value2 = that.memeryData[0][memory_key2].substr(2, 4);
          that.resultModel.register.name = register;
          that.resultModel.register.value = value1 + value2;
        } else {
          var value1 = that.memeryData[0][memory_key1].substr(-2);
          var value2 = that.memeryData[0][memory_key2].substr(2, 6);
          that.resultModel.register.name = register;
          that.resultModel.register.value = value1 + value2;
        }
        console.log(that.resultModel);
      },
      READ_HALFWORD: function() {
        var that = arguments[0];
        that.exerciseType = false;
        // 将数据从内存写入寄存器
        var memoryStart = that.expriseModel.memoryStart;
        //一栏起始位置的地址
        var memoryInitStart = that.expriseModel.memoryInitStart;
        //   var memoryEnd =
        //   this.expriseModel.memoryEnd !== "" ||
        //   this.expriseModel.memoryEnd !== undefined
        //     ? parseInt(this.expriseModel.memoryEnd.substr(2).replace(/\s+/g, ""))
        //     : "";
        var register = that.expriseModel.register.name;
        var memeryDataIndex = that.memeryDataIndex;
        var memory_key =
          memeryDataIndex[
            Math.floor((memoryStart - memoryInitStart[0]) / 4) + 1
          ];
        console.log("半字数据");
        var num = memoryStart % 2; // 在一个字节中的位置
        if (num === 0) {
          if ((memoryStart / 2) % 2 === 0) {
            var value = that.memeryData[0][memory_key].substr(2, 4);
            that.resultModel.register.name = register;
            that.resultModel.register.value = value;
          } else {
            var value = that.memeryData[0][memory_key].substr(-4);
            that.resultModel.register.name = register;
            that.resultModel.register.value = value;
          }
        } else if (num === 1) {
          if (((memoryStart - 1) / 2) % 2 === 0) {
            var value = that.memeryData[0][memory_key].substr(4, 4);
            that.resultModel.register.name = register;
            that.resultModel.register.value = value;
          } else {
            var value1 = that.memeryData[0][memory_key].substr(-2);
            var value2 = that.memeryData[0][memory_key + 1].substr(2, 2);
            that.resultModel.register.name = register;
            that.resultModel.register.value = value1 + value2;
          }
        }
      },
      READ_BYTEWORD: function() {
        var that = arguments[0];
        that.exerciseType = false;
        // 将数据从内存写入寄存器
        var memoryStart = that.expriseModel.memoryStart;
        //一栏起始位置的地址
        var memoryInitStart = that.expriseModel.memoryInitStart;
        var register = that.expriseModel.register.name;
        var memeryDataIndex = that.memeryDataIndex;
        var memory_key =
          memeryDataIndex[
            Math.floor((memoryStart - memoryInitStart[0]) / 4) + 1
          ];
        console.log("字节数据");
        var num = memoryStart % 4;
        var value = that.memeryData[0][memory_key].substr(2 + num * 2, 2);
        that.resultModel.register.name = register;
        that.resultModel.register.value = value;
      },
      READ_UFORMWORD: function() {
        var that = arguments[0];
        that.exerciseType = false;
        // 将数据从内存写入寄存器
        var memoryStart = that.expriseModel.memoryStart;
        var memoryEnd = that.expriseModel.memoryEnd;
        //一栏起始位置的地址
        var memoryInitStart = that.expriseModel.memoryInitStart;
        var register = that.expriseModel.register.name;
        var memeryDataIndex = that.memeryDataIndex;
        var memory_key1 =
          memeryDataIndex[
            Math.floor((memoryStart - memoryInitStart[0]) / 4) + 1
          ];
        var memory_key2 =
          memeryDataIndex[
            Math.floor((memoryStart - memoryInitStart[0]) / 4) + 2
          ];
        console.log("不规则数据");
        var num = memoryStart % 4; // 在字节中的位置
        if (num === 0) {
          var value = that.memeryData[0][memory_key];
          that.resultModel.register.name = register;
          that.resultModel.register.value = value;
        } else if (num === 1) {
          var value1 = that.memeryData[0][memory_key1].substr(-6);
          var value2 = that.memeryData[0][memory_key2].substr(2, 2);
          that.resultModel.register.name = register;
          that.resultModel.register.value = value1 + value2;
        } else if (num === 2) {
          var value1 = that.memeryData[0][memory_key1].substr(-4);
          var value2 = that.memeryData[0][memory_key2].substr(2, 4);
          that.resultModel.register.name = register;
          that.resultModel.register.value = value1 + value2;
        } else {
          var value1 = that.memeryData[0][memory_key1].substr(-2);
          var value2 = that.memeryData[0][memory_key2].substr(2, 6);
          that.resultModel.register.name = register;
          that.resultModel.register.value = value1 + value2;
        }
        console.log(that.resultModel);
      },
      READ_UFORMHALFWORD: function() {
        var that = arguments[0];
        that.exerciseType = false;
        // 将数据从内存写入寄存器
        var memoryStart = that.expriseModel.memoryStart;
        //一栏起始位置的地址
        var memoryInitStart = that.expriseModel.memoryInitStart;
        var memoryInitEnd = that.expriseModel.memoryInitEnd;
        var register = that.expriseModel.register.name;
        var memeryDataIndex = that.memeryDataIndex;
        var memory_key1 =
          memeryDataIndex[
            Math.floor((memoryStart - memoryInitStart[0]) / 4) + 1
          ];
        var memory_key2 =
          memeryDataIndex[
            Math.floor((memoryStart - memoryInitStart[0]) / 4) + 2
          ];
        console.log("半字数据");
        var num = memoryStart % 2; // 在一个字节中的位置
        if (num === 0) {
          if ((memoryStart / 2) % 2 === 0) {
            var value = that.memeryData[0][memory_key1].substr(2, 4);
            that.resultModel.register.name = register;
            that.resultModel.register.value = value;
          } else {
            var value = that.memeryData[0][memory_key1].substr(-4);
            that.resultModel.register.name = register;
            that.resultModel.register.value = value;
          }
        } else if (num === 1) {
          if (((memoryStart - 1) / 2) % 2 === 0) {
            var value = that.memeryData[0][memory_key1].substr(4, 4);
            that.resultModel.register.name = register;
            that.resultModel.register.value = value;
          } else {
            var value1 = that.memeryData[0][memory_key1].substr(-2);
            var value2 = that.memeryData[0][memory_key2].substr(2, 2);
            that.resultModel.register.name = register;
            that.resultModel.register.value = value1 + value2;
          }
        }
      },
      WRITE_WORD: function() {
        var that = arguments[0];
        that.exerciseType = true;
        // 将数据从寄存器写入内存
        var memoryStart = that.expriseModel.memoryStart;
        //一栏起始位置的地址
        var memoryInitStart = that.expriseModel.memoryInitStart;
        var register = that.expriseModel.register.name;
        var memeryDataIndex = that.memeryDataIndex;
        var memory_key1 =
          memeryDataIndex[
            Math.floor((memoryStart - memoryInitStart[0]) / 4) + 1
          ];
        var memory_key2 =
          memeryDataIndex[
            Math.floor((memoryStart - memoryInitStart[0]) / 4) + 2
          ];
        console.log("写入字数据");
        var num = memoryStart % 4; // 在字节中的位置
        var registerValue = that.registerData[that.registerIndex[register]];
        if (num === 0) {
          var addressStart1 = memoryStart.toString(16);
          while (addressStart1.length < 8) {
            addressStart1 = "0" + addressStart1;
          }
          addressStart1 = "0x" + addressStart1;

          var addressEnd1 = (memoryStart + 3).toString(16);
          while (addressEnd1.length < 8) {
            addressEnd1 = "0" + addressEnd1;
          }
          addressEnd1 = "0x" + addressEnd1;
          that.$set(that.resultModel.memory, 0, {
            addressStart: addressStart1,
            addressEnd: addressEnd1,
            value: registerValue.value
          });
        } else if (num === 1) {
          var memoryvalue1 = that.memeryData[0][memory_key1];
          var memoryvalue2 = that.memeryData[0][memory_key2];
          var value1 =
            "0x" + registerValue.value.substr(-6) + memoryvalue1.substr(-2);
          var value2 =
            "0x" + memoryvalue2.substr(2, 6) + registerValue.value.substr(2, 2);
          var addressStart1 = memoryStart;
          var addressEnd1 = memoryStart + 2;
          var addressStart2 = memoryStart + 3;
          var addressEnd2 = memoryStart + 7;
          var array = [
            addressStart1,
            addressEnd1,
            addressStart2,
            addressEnd2
          ].map(item => {
            item = item.toString(16);
            while (item.length < 8) {
              item = "0" + item;
            }
            item = "0x" + item;
            return item;
          });
          that.$set(that.resultModel.memory, 0, {
            addressStart: array[0],
            addressEnd: array[1],
            value: value1
          });
          that.$set(that.resultModel.memory, 1, {
            addressStart: array[2],
            addressEnd: array[3],
            value: value2
          });
        } else if (num === 2) {
          var memoryvalue1 = that.memeryData[0][memory_key1];
          var memoryvalue2 = that.memeryData[0][memory_key2];
          var value1 =
            "0x" + registerValue.value.substr(-4) + memoryvalue1.substr(-4);
          var value2 =
            "0x" + memoryvalue2.substr(2, 4) + registerValue.value.substr(2, 4);
          var addressStart1 = memoryStart - 2;
          var addressEnd1 = memoryStart + 1;
          var addressStart2 = memoryStart + 2;
          var addressEnd2 = memoryStart + 5;
          var array = [
            addressStart1,
            addressEnd1,
            addressStart2,
            addressEnd2
          ].map(item => {
            item = item.toString(16);
            while (item.length < 8) {
              item = "0" + item;
            }
            item = "0x" + item;
            return item;
          });
          that.$set(that.resultModel.memory, 0, {
            addressStart: array[0],
            addressEnd: array[1],
            value: value1
          });
          that.$set(that.resultModel.memory, 1, {
            addressStart: array[2],
            addressEnd: array[3],
            value: value2
          });
        } else {
          var memoryvalue1 = that.memeryData[0][memory_key1];
          var memoryvalue2 = that.memeryData[0][memory_key2];
          var value1 =
            "0x" + registerValue.value.substr(-2) + memoryvalue1.substr(-6);
          var value2 =
            "0x" + memoryvalue2.substr(2, 2) + registerValue.value.substr(2, 6);
          var addressStart1 = memoryStart - 3;
          var addressEnd1 = memoryStart;
          var addressStart2 = memoryStart + 1;
          var addressEnd2 = memoryStart + 4;
          var array = [
            addressStart1,
            addressEnd1,
            addressStart2,
            addressEnd2
          ].map(item => {
            item = item.toString(16);
            while (item.length < 8) {
              item = "0" + item;
            }
            item = "0x" + item;
            return item;
          });
          that.$set(that.resultModel.memory, 0, {
            addressStart: array[0],
            addressEnd: array[1],
            value: value1
          });
          that.$set(that.resultModel.memory, 1, {
            addressStart: array[2],
            addressEnd: array[3],
            value: value2
          });
        }
        console.log(that.exerciseType);
        console.log(that.resultModel);
      },
      WRITE_HALFWORDLOW: function() {
        var that = arguments[0];
        that.exerciseType = true;
        // 将数据从内存写入寄存器
        var memoryStart = that.expriseModel.memoryStart;
        //一栏起始位置的地址
        var memoryInitStart = that.expriseModel.memoryInitStart;
        var register = that.expriseModel.register.name;
        var memeryDataIndex = that.memeryDataIndex;
        var memory_key1 =
          memeryDataIndex[
            Math.floor((memoryStart - memoryInitStart[0]) / 4) + 1
          ];
        var memory_key2 =
          memeryDataIndex[
            Math.floor((memoryStart - memoryInitStart[0]) / 4) + 2
          ];
        console.log("半字数据");
        var registerValue = that.registerData[that.registerIndex[register]];
        var num = memoryStart % 2; // 在一个字节中的位置
        if (num === 0) {
          if ((memoryStart / 2) % 2 === 0) {
            var memoryValue = that.memeryData[0][memory_key1];
            var addressStart1 = memoryStart.toString(16);
            while (addressStart1.length < 8) {
              addressStart1 = "0" + addressStart1;
            }
            addressStart1 = "0x" + addressStart1;
            var addressEnd1 = (memoryStart + 3).toString(16);
            while (addressEnd1.length < 8) {
              addressEnd1 = "0" + addressEnd1;
            }
            addressEnd1 = "0x" + addressEnd1;
            var value =
              "0x" + memoryValue.substr(2, 4) + registerValue.value.substr(-4);
            that.$set(that.resultModel.memory, 0, {
              addressStart: addressStart1,
              addressEnd: addressEnd1,
              value: value
            });
          } else {
            var memoryValue = that.memeryData[0][memory_key1];
            var addressStart1 = (memoryStart - 2).toString(16);
            while (addressStart1.length < 8) {
              addressStart1 = "0" + addressStart1;
            }
            addressStart1 = "0x" + addressStart1;
            var addressEnd1 = (memoryStart + 1).toString(16);
            while (addressEnd1.length < 8) {
              addressEnd1 = "0" + addressEnd1;
            }
            addressEnd1 = "0x" + addressEnd1;
            var value =
              "0x" + registerValue.value.substr(-4) + memoryValue.substr(-4);
            that.$set(that.resultModel.memory, 0, {
              addressStart: addressStart1,
              addressEnd: addressEnd1,
              value: value
            });
          }
        } else if (num === 1) {
          if (((memoryStart - 1) / 2) % 2 === 0) {
            var memoryValue = that.memeryData[0][memory_key1];
            var addressStart1 = (memoryStart - 1).toString(16);
            while (addressStart1.length < 8) {
              addressStart1 = "0" + addressStart1;
            }
            addressStart1 = "0x" + addressStart1;
            var addressEnd1 = (memoryStart + 2).toString(16);
            while (addressEnd1.length < 8) {
              addressEnd1 = "0" + addressEnd1;
            }
            addressEnd1 = "0x" + addressEnd1;
            var value =
              "0x" +
              memoryValue.substr(2, 2) +
              registerValue.value.substr(-4) +
              memoryValue.substr(-2);
            that.$set(that.resultModel.memory, 0, {
              addressStart: addressStart1,
              addressEnd: addressEnd1,
              value: value
            });
          } else {
            var memoryValue1 = that.memeryData[0][memory_key1];
            var memoryValue2 = that.memeryData[0][memory_key2];
            var addressStart1 = memoryStart - 3;
            var addressEnd1 = memoryStart;
            var addressStart2 = memoryStart + 1;
            var addressEnd2 = memoryStart + 4;
            var array = [
              addressStart1,
              addressEnd1,
              addressStart2,
              addressEnd2
            ].map(item => {
              item = item.toString(16);
              while (item.length < 8) {
                item = "0" + item;
              }
              item = "0x" + item;
              return item;
            });
            var value1 =
              "0x" + registerValue.value.substr(-2) + memoryValue1.substr(-6);
            var value2 =
              "0x" +
              memoryValue2.substr(2, 6) +
              registerValue.value.substr(6, 2);

            that.$set(that.resultModel.memory, 0, {
              addressStart: array[0],
              addressEnd: array[1],
              value: value1
            });
            that.$set(that.resultModel.memory, 1, {
              addressStart: array[2],
              addressEnd: array[3],
              value: value2
            });
          }
        }
      },
      WRITE_HALFWORDHIGH: function() {
        var that = arguments[0];
        that.exerciseType = true;
        // 将数据从内存写入寄存器
        var memoryStart = that.expriseModel.memoryStart;
        //一栏起始位置的地址
        var memoryInitStart = that.expriseModel.memoryInitStart;
        var register = that.expriseModel.register.name;
        var memeryDataIndex = that.memeryDataIndex;
        var memory_key1 =
          memeryDataIndex[
            Math.floor((memoryStart - memoryInitStart[0]) / 4) + 1
          ];
        var memory_key2 =
          memeryDataIndex[
            Math.floor((memoryStart - memoryInitStart[0]) / 4) + 2
          ];
        console.log("半字数据");
        var registerValue = that.registerData[that.registerIndex[register]];
        var num = memoryStart % 2; // 在一个字节中的位置
        if (num === 0) {
          if ((memoryStart / 2) % 2 === 0) {
            var memoryValue = that.memeryData[0][memory_key1];
            var addressStart1 = memoryStart.toString(16);
            while (addressStart1.length < 8) {
              addressStart1 = "0" + addressStart1;
            }
            addressStart1 = "0x" + addressStart1;
            var addressEnd1 = (memoryStart + 3).toString(16);
            while (addressEnd1.length < 8) {
              addressEnd1 = "0" + addressEnd1;
            }
            addressEnd1 = "0x" + addressEnd1;
            var value =
              "0x" +
              memoryValue.substr(2, 4) +
              registerValue.value.substr(2, 4);
            that.$set(that.resultModel.memory, 0, {
              addressStart: addressStart1,
              addressEnd: addressEnd1,
              value: value
            });
          } else {
            var memoryValue = that.memeryData[0][memory_key1];
            var addressStart1 = (memoryStart - 2).toString(16);
            while (addressStart1.length < 8) {
              addressStart1 = "0" + addressStart1;
            }
            addressStart1 = "0x" + addressStart1;
            var addressEnd1 = (memoryStart + 1).toString(16);
            while (addressEnd1.length < 8) {
              addressEnd1 = "0" + addressEnd1;
            }
            addressEnd1 = "0x" + addressEnd1;
            var value =
              "0x" + registerValue.value.substr(2, 4) + memoryValue.substr(-4);
            that.$set(that.resultModel.memory, 0, {
              addressStart: addressStart1,
              addressEnd: addressEnd1,
              value: value
            });
          }
        } else if (num === 1) {
          if (((memoryStart - 1) / 2) % 2 === 0) {
            var memoryValue = that.memeryData[0][memory_key1];
            var addressStart1 = (memoryStart - 1).toString(16);
            while (addressStart1.length < 8) {
              addressStart1 = "0" + addressStart1;
            }
            addressStart1 = "0x" + addressStart1;
            var addressEnd1 = (memoryStart + 2).toString(16);
            while (addressEnd1.length < 8) {
              addressEnd1 = "0" + addressEnd1;
            }
            addressEnd1 = "0x" + addressEnd1;
            var value =
              "0x" +
              memoryValue.substr(2, 2) +
              registerValue.value.substr(2, 4) +
              memoryValue.substr(-2);
            that.$set(that.resultModel.memory, 0, {
              addressStart: addressStart1,
              addressEnd: addressEnd1,
              value: value
            });
          } else {
            var memoryValue1 = that.memeryData[0][memory_key1];
            var memoryValue2 = that.memeryData[0][memory_key2];
            var addressStart1 = memoryStart - 3;
            var addressEnd1 = memoryStart;
            var addressStart2 = memoryStart + 1;
            var addressEnd2 = memoryStart + 4;
            var array = [
              addressStart1,
              addressEnd1,
              addressStart2,
              addressEnd2
            ].map(item => {
              item = item.toString(16);
              while (item.length < 8) {
                item = "0" + item;
              }
              item = "0x" + item;
              return item;
            });
            var value1 =
              "0x" + registerValue.value.substr(4, 2) + memoryValue1.substr(-6);
            var value2 =
              "0x" +
              memoryValue2.substr(2, 6) +
              registerValue.value.substr(2, 2);

            that.$set(that.resultModel.memory, 0, {
              addressStart: array[0],
              addressEnd: array[1],
              value: value1
            });
            that.$set(that.resultModel.memory, 1, {
              addressStart: array[2],
              addressEnd: array[3],
              value: value2
            });
          }
        }
      },
      WRITE_BYTEWORD: function() {
        var that = arguments[0];
        that.exerciseType = true;
        // 将数据从内存写入寄存器
        var memoryStart = that.expriseModel.memoryStart;
        //一栏起始位置的地址
        var memoryInitStart = that.expriseModel.memoryInitStart;
        var register = that.expriseModel.register.name;
        var registerValue = that.registerData[that.registerIndex[register]];
        var memeryDataIndex = that.memeryDataIndex;
        var memory_key =
          memeryDataIndex[
            Math.floor((memoryStart - memoryInitStart[0]) / 4) + 1
          ];
        console.log("写字节数据");
        var num = memoryStart % 4;
        var memoryValue = that.memeryData[0][memory_key];
        var addressStart1 = (memoryStart - num).toString(16);
        while (addressStart1.length < 8) {
          addressStart1 = "0" + addressStart1;
        }
        addressStart1 = "0x" + addressStart1;
        var addressEnd1 = (memoryStart - num + 3).toString(16);
        while (addressEnd1.length < 8) {
          addressEnd1 = "0" + addressEnd1;
        }
        addressEnd1 = "0x" + addressEnd1;
        if (num === 0) {
          var value =
            "0x" + memoryValue.substr(2, 6) + registerValue.value.substr(-2);
        } else if (num === 1) {
          var value =
            "0x" +
            memoryValue.substr(2, 4) +
            registerValue.value.substr(-2) +
            memoryValue.substr(-2);
        } else if (num === 2) {
          var value =
            "0x" +
            memoryValue.substr(2, 2) +
            registerValue.value.substr(-2) +
            memoryValue.substr(-4);
        } else {
          var value =
            "0x" + registerValue.value.substr(-2) + memoryValue.substr(-6);
        }
        that.$set(that.resultModel.memory, 0, {
          addressStart: addressStart1,
          addressEnd: addressEnd1,
          value: value
        });
      },
      WRITE_UFORMWORD: function() {},
      WRITE_UFORMHALFWORD: function() {}
    },
    common = {
      _00: "READ_WORD",
      _01: "READ_HALFWORD",
      _02: "READ_BYTEWORD",
      _03: "READ_BYTEWORD",
      _04: "READ_UFORMWORD",
      _05: "READ_UFORMHALFWORD",

      _10: "WRITE_WORD",
      _11: "WRITE_HALFWORDLOW",
      _12: "WRITE_HALFWORDHIGH",
      _13: "WRITE_BYTEWORD",
      _14: "WRITE_WORD",
      _15: "WRITE_UFORMHALFWORD"
    };
  var Action = {
    changeState: function() {
      var arg = arguments;
      _currentStates = {};
      if (arg.length) {
        for (var i = 0, len = arg.length; i < len; i++) {
          _currentStates[common[arg[i]]] = true;
        }
      }
      return this;
    },
    goes: function() {
      var arg = arguments[0];
      console.log("执行动作");
      for (var i in _currentStates) {
        states[i] && states[i](arg);
      }
      return this;
    }
  };
  return {
    change: Action.changeState,
    goes: Action.goes
  };
};
export default {
  components: {
    TinyMcy
  },
  data() {
    return {
      exerciseType: false,
      resultModel: RESULTMODEL,
      expriseModel: EXERCISEMODEL,
      questionType: "",
      registerHint: [
        {
          name: "$zero",
          number: "0",
          value: "0"
        },
        {
          name: "$at",
          number: "1",
          value: "0"
        },
        {
          name: "$v0",
          number: "2",
          value: "0"
        },
        {
          name: "$v1",
          number: "3",
          value: "0"
        },
        {
          name: "$a0",
          number: "4",
          value: "0"
        },
        {
          name: "$a1",
          number: "5",
          value: "0"
        },
        {
          name: "$a2",
          number: "6",
          value: "0"
        },
        {
          name: "$a3",
          number: "7",
          value: "0"
        },
        {
          name: "$t0",
          number: "8",
          value: "0"
        },
        {
          name: "$t1",
          number: "9",
          value: "0"
        },
        {
          name: "$t2",
          number: "10",
          value: "0"
        },
        {
          name: "$t3",
          number: "11",
          value: "0"
        },
        {
          name: "$t4",
          number: "12",
          value: "0"
        },
        {
          name: "$t5",
          number: "13",
          value: "0"
        },
        {
          name: "$t6",
          number: "14",
          value: "0"
        },
        {
          name: "$t7",
          number: "15",
          value: "0"
        },
        {
          name: "$s0",
          number: "16",
          value: "0"
        },
        {
          name: "$s1",
          number: "17",
          value: "0"
        },
        {
          name: "$s2",
          number: "18",
          value: "0"
        },
        {
          name: "$s3",
          number: "19",
          value: "0"
        },
        {
          name: "$s4",
          number: "20",
          value: "0"
        },
        {
          name: "$s5",
          number: "21",
          value: "0"
        },
        {
          name: "$s6",
          number: "22",
          value: "0"
        },
        {
          name: "$s7",
          number: "23",
          value: "0"
        },
        {
          name: "$t8",
          number: "24",
          value: "0"
        },
        {
          name: "$t9",
          number: "25",
          value: "0"
        },
        {
          name: "$k0",
          number: "26",
          value: "0"
        },
        {
          name: "$k1",
          number: "27",
          value: "0"
        },
        {
          name: "$gp",
          number: "28",
          value: "0"
        },
        {
          name: "$sp",
          number: "29",
          value: "0"
        },
        {
          name: "$fp",
          number: "30",
          value: "0"
        },
        {
          name: "$ra",
          number: "31",
          value: "0"
        }
      ],
      options: [
        {
          value: "选项1",
          label: "数据装载"
        },
        {
          value: "选项2",
          label: "语言转换"
        },
        {
          value: "选项3",
          label: "待定"
        }
      ],
      questionId: "", // 题目id
      textarea: "",
      memeryData: [
        {
          address: "0x1001 0000",
          value0: "0x00000000",
          value4: "0x00000000",
          value8: "0x00000000",
          valuec: "0x00000000",
          value10: "0x00000000",
          value14: "0x00000000",
          value18: "0x00000000",
          value1c: "0x00000000"
        },
        {
          address: "0x1001 0020",
          value0: "0x00000000",
          value4: "0x00000000",
          value8: "0x00000000",
          valuec: "0x00000000",
          value10: "0x00000000",
          value14: "0x00000000",
          value18: "0x00000000",
          value1c: "0x00000000"
        },
        {
          address: "0x1001 0030",
          value0: "0x00000000",
          value4: "0x00000000",
          value8: "0x00000000",
          valuec: "0x00000000",
          value10: "0x00000000",
          value14: "0x00000000",
          value18: "0x00000000",
          value1c: "0x00000000"
        }
      ],
      memeryDataIndex: MEMOTYDATAINDEX,
      registerData: [
        {
          name: "$zero",
          number: "0",
          value: "0"
        },
        {
          name: "$at",
          number: "1",
          value: "0"
        },
        {
          name: "$v0",
          number: "2",
          value: "0"
        },
        {
          name: "$v1",
          number: "3",
          value: "0"
        },
        {
          name: "$a0",
          number: "4",
          value: "0"
        },
        {
          name: "$a1",
          number: "5",
          value: "0"
        },
        {
          name: "$a2",
          number: "6",
          value: "0"
        },
        {
          name: "$a3",
          number: "7",
          value: "0"
        },
        {
          name: "$t0",
          number: "8",
          value: "0"
        },
        {
          name: "$t1",
          number: "9",
          value: "0"
        },
        {
          name: "$t2",
          number: "10",
          value: "0"
        },
        {
          name: "$t3",
          number: "11",
          value: "0"
        },
        {
          name: "$t4",
          number: "12",
          value: "0"
        },
        {
          name: "$t5",
          number: "13",
          value: "0"
        },
        {
          name: "$t6",
          number: "14",
          value: "0"
        },
        {
          name: "$t7",
          number: "15",
          value: "0"
        },
        {
          name: "$s0",
          number: "16",
          value: "0"
        },
        {
          name: "$s1",
          number: "17",
          value: "0"
        },
        {
          name: "$s2",
          number: "18",
          value: "0"
        },
        {
          name: "$s3",
          number: "19",
          value: "0"
        },
        {
          name: "$s4",
          number: "20",
          value: "0"
        },
        {
          name: "$s5",
          number: "21",
          value: "0"
        },
        {
          name: "$s6",
          number: "22",
          value: "0"
        },
        {
          name: "$s7",
          number: "23",
          value: "0"
        },
        {
          name: "$t8",
          number: "24",
          value: "0"
        },
        {
          name: "$t9",
          number: "25",
          value: "0"
        },
        {
          name: "$k0",
          number: "26",
          value: "0"
        },
        {
          name: "$k1",
          number: "27",
          value: "0"
        },
        {
          name: "$gp",
          number: "28",
          value: "0"
        },
        {
          name: "$sp",
          number: "29",
          value: "0"
        },
        {
          name: "$fp",
          number: "30",
          value: "0"
        },
        {
          name: "$ra",
          number: "31",
          value: "0"
        }
      ],
      registerIndex: REGISTERINDEX
    };
  },
  methods: {
    querySearch(queryString, cb) {
      var registerHint = this.registerHint;
      var results = queryString
        ? registerHint.filter(this.createFilter(queryString))
        : registerHint;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return registerHint => {
        return (
          registerHint.name.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        );
      };
    },
    handleSelect(item) {
      console.log(item);
    },
    clickcell() {
      console.log("click");
    },
    getTableData() {
      var data = this.$refs.elxEditable.getRecords(1);
      console.dir(data);
    },
    init() {
      getType(this);
    },
    getResult() {
      // 将数据从内存写入寄存器
      console.log("生成答案");
      var exerciseState = new ExerciseState();
      var state = "_" + this.expriseModel.opId + this.expriseModel.keyWord;
      exerciseState.change(state);
      exerciseState.goes(this);
    },
    clear() {
      this.memeryData = [
        {
          address: "0x1001 0000",
          value0: "0x00000000",
          value4: "0x00000000",
          value8: "0x00000000",
          valuec: "0x00000000",
          value10: "0x00000000",
          value14: "0x00000000",
          value18: "0x00000000",
          value1c: "0x00000000"
        },
        {
          address: "0x1001 0020",
          value0: "0x00000000",
          value4: "0x00000000",
          value8: "0x00000000",
          valuec: "0x00000000",
          value10: "0x00000000",
          value14: "0x00000000",
          value18: "0x00000000",
          value1c: "0x00000000"
        },
        {
          address: "0x1001 0030",
          value0: "0x00000000",
          value4: "0x00000000",
          value8: "0x00000000",
          valuec: "0x00000000",
          value10: "0x00000000",
          value14: "0x00000000",
          value18: "0x00000000",
          value1c: "0x00000000"
        }
      ];
      this.registerData = [
        {
          name: "$zero",
          number: "0",
          value: "0"
        },
        {
          name: "$at",
          number: "1",
          value: "0"
        },
        {
          name: "$v0",
          number: "2",
          value: "0"
        },
        {
          name: "$v1",
          number: "3",
          value: "0"
        },
        {
          name: "$a0",
          number: "4",
          value: "0"
        },
        {
          name: "$a1",
          number: "5",
          value: "0"
        },
        {
          name: "$a2",
          number: "6",
          value: "0"
        },
        {
          name: "$a3",
          number: "7",
          value: "0"
        },
        {
          name: "$t0",
          number: "8",
          value: "0"
        },
        {
          name: "$t1",
          number: "9",
          value: "0"
        },
        {
          name: "$t2",
          number: "10",
          value: "0"
        },
        {
          name: "$t3",
          number: "11",
          value: "0"
        },
        {
          name: "$t4",
          number: "12",
          value: "0"
        },
        {
          name: "$t5",
          number: "13",
          value: "0"
        },
        {
          name: "$t6",
          number: "14",
          value: "0"
        },
        {
          name: "$t7",
          number: "15",
          value: "0"
        },
        {
          name: "$s0",
          number: "16",
          value: "0"
        },
        {
          name: "$s1",
          number: "17",
          value: "0"
        },
        {
          name: "$s2",
          number: "18",
          value: "0"
        },
        {
          name: "$s3",
          number: "19",
          value: "0"
        },
        {
          name: "$s4",
          number: "20",
          value: "0"
        },
        {
          name: "$s5",
          number: "21",
          value: "0"
        },
        {
          name: "$s6",
          number: "22",
          value: "0"
        },
        {
          name: "$s7",
          number: "23",
          value: "0"
        },
        {
          name: "$t8",
          number: "24",
          value: "0"
        },
        {
          name: "$t9",
          number: "25",
          value: "0"
        },
        {
          name: "$k0",
          number: "26",
          value: "0"
        },
        {
          name: "$k1",
          number: "27",
          value: "0"
        },
        {
          name: "$gp",
          number: "28",
          value: "0"
        },
        {
          name: "$sp",
          number: "29",
          value: "0"
        },
        {
          name: "$fp",
          number: "30",
          value: "0"
        },
        {
          name: "$ra",
          number: "31",
          value: "0"
        }
      ];
      this.expriseModel = {
        type: "",
        memoryStart: "", // 16进制内存地址（不带0x）
        memoryEnd: "", // 16进制内存地址（不带0x）
        keyWord: "", // 0:字数据 1：半字数据 2：无符号字节数据 3：字节数据 4: 不规则数据
        opId: "", // 0读 1写
        register: { name: "", value: "" },
        memoryInitStart: []
      };
      this.resultModel = {
        register: { name: "", value: "" },
        memory: []
      };
      this.textarea = "";
      this.exerciseType = false;
    },
    postQuestion() {},
    handleChange(value) {
      console.log("questionId changed!");
    }
  }
};
</script>
<style scoped>
#wrapper {
  position: relative;
}
#left {
  width: 100%;
  /* float: left; */
}
.content {
  width: 100%;
  height: 230px;
  border: 1px solid #f4f4f5;
  color: #909399;
  border-radius: 4px;
  background-color: white;
}
#expractice {
  width: 100%;
  /* background-color: aquamarine; */
  text-align: left;
}
#question {
  /* float: left; */
  width: 100%;
  padding: 10px;
}
#result {
  /* float: left; */
  width: 100%;
  padding: 10px;
}
.clear {
  clear: both;
}
</style>
