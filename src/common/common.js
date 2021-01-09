var COMMON =  {
  "READIN": "读入",
  "READFROM": "读取",
  "DATA":{
    WORD: ["0x09080706","0x04030201","0x64636261","0x69686766"],
    HALFWORD: ["0x0807", "0x0403","0x6261","0x6463"],
    BYTE: ["0x08","0x07","0x61","0x62"]
  }
}
var EXERCISEMODEL = {
  type: 1,
  memoryStart: "",// 16进制内存地址（不带0x）
  memoryEnd: "",// 16进制内存地址（不带0x）
  keyWord: "", // 0:字数据 1：半字数据 2：无符号字节数据 3：字节数据 4: 不规则数据
  opId: "", // 0读 1写
  register: { name: "", value: "" },
  memoryInitStart: [],
  low_high:0//0低位，1高位
}
var RESULTMODEL = {
  register: { name: "", value: "" },
  memory: []
}
const MEMOTYDATAINDEX =  {
  0: "address",
  1: "value0",
  2: "value4",
  3: "value8",
  4: "valuec",
  5: "value10",
  6: "value14",
  7: "value18",
  8: "value1c"
}
const REGISTERINDEX = {
  $zero: 0,
  $at: 1,
  $v0: 2,
  $v1: 3,
  $a0: 4,
  $a1: 5,
  $a2: 6,
  $a3: 7,
  $t0: 8,
  $t1: 9,
  $t2: 10,
  $t3: 11,
  $t4: 12,
  $t5: 13,
  $t6: 14,
  $t7: 15,
  $s0: 16,
  $s1: 17,
  $s2: 18,
  $s3: 19,
  $s4: 20,
  $s5: 21,
  $s6: 22,
  $s7: 23,
  $t8: 24,
  $t9: 25,
  $k0: 26,
  $k1: 27,
  $gp: 28,
  $sp: 29,
  $fp: 30,
  $ra: 31
}

var ExerciseState = function(){
  let expriseModel = arguments[0];
  var _currentStates = {},
  states = {
    READ_WORD: function(){
           // 将数据从内存写入寄存器
           var memoryStart = expriseModel.memoryStart;
           //一栏起始位置的地址
           var memoryInitStart = parseInt(expriseModel.memoryInitStart.replace(/\s+/g, ""),16);
           //   var memoryEnd =
           //   this.expriseModel.memoryEnd !== "" ||
           //   this.expriseModel.memoryEnd !== undefined
           //     ? parseInt(this.expriseModel.memoryEnd.substr(2).replace(/\s+/g, ""))
           //     : "";
          //  var keyWord = expriseModel.keyWord;
          //  var opId = expriseModel.opId;
           var register = expriseModel.register.name;
           var memory_key = memeryDataIndex[
             Math.floor((memoryStart - memoryInitStart) / 4) + 1
           ];
           console.log("字数据");
                 var num = memoryStart % 4;
                 if (num === 0) {
                   var value = this.memeryData[0][memory_key];
                   this.resultModel.register.name = register;
                   this.resultModel.register.value = value;
                 } else if (num === 1) {
                   var value1 = this.memeryData[0][memory_key].substr(-6);
                   var value2 = this.memeryData[0][memory_key + 1].substr(2, 2);
                   this.resultModel.register.name = register;
                   this.resultModel.register.value = value1 + value2;
                 } else if (num === 2) {
                   var value1 = this.memeryData[0][memory_key].substr(-4);
                   var value2 = this.memeryData[0][memory_key + 1].substr(2, 4);
                   this.resultModel.register.name = register;
                   this.resultModel.register.value = value1 + value2;
                 } else {
                   var value1 = this.memeryData[0][memory_key].substr(-2);
                   var value2 = this.memeryData[0][memory_key + 1].substr(2, 6);
                   this.resultModel.register.name = register;
                   this.resultModel.register.value = value1 + value2;
                 }
                 console.log(this.resultModel);


          //  console.log(this.expriseModel);
           if (opId === 0) {
             //read
             switch (keyWord) {
               case 0: //字数据
                 console.log("字数据");
                 var num = memoryStart % 4;
                 if (num === 0) {
                   var value = this.memeryData[0][memory_key];
                   this.resultModel.register.name = register;
                   this.resultModel.register.value = value;
                 } else if (num === 1) {
                   var value1 = this.memeryData[0][memory_key].substr(-6);
                   var value2 = this.memeryData[0][memory_key + 1].substr(2, 2);
                   this.resultModel.register.name = register;
                   this.resultModel.register.value = value1 + value2;
                 } else if (num === 2) {
                   var value1 = this.memeryData[0][memory_key].substr(-4);
                   var value2 = this.memeryData[0][memory_key + 1].substr(2, 4);
                   this.resultModel.register.name = register;
                   this.resultModel.register.value = value1 + value2;
                 } else {
                   var value1 = this.memeryData[0][memory_key].substr(-2);
                   var value2 = this.memeryData[0][memory_key + 1].substr(2, 6);
                   this.resultModel.register.name = register;
                   this.resultModel.register.value = value1 + value2;
                 }
                 console.log(this.resultModel);
                 break;
               case 1: //半字数据
                 var num = memoryStart % 2;
                 if (num === 0) {
                   if ((memoryStart / 2) % 2 === 0) {
                     var value = this.memeryData[0][memory_key].substr(2, 4);
                     this.resultModel.register.name = register;
                     this.resultModel.register.value = value;
                   } else {
                     var value = this.memeryData[0][memory_key].substr(-4);
                     this.resultModel.register.name = register;
                     this.resultModel.register.value = value;
                   }
                 } else if (num === 1) {
                   if (((memoryStart - 1) / 2) % 2 === 0) {
                     var value = this.memeryData[0][memory_key].substr(4, 4);
                     this.resultModel.register.name = register;
                     this.resultModel.register.value = value;
                   } else {
                     var value1 = this.memeryData[0][memory_key].substr(-2);
                     var value2 = this.memeryData[0][memory_key + 1].substr(2, 2);
                     this.resultModel.register.name = register;
                     this.resultModel.register.value = value1 + value2;
                   }
                 }
                 break;
               case 2: //无符号字节数据
                 var num = memoryStart % 4;
                 var value = this.memeryData[0][memory_key].substr(2 + num * 2, 2);
                 this.resultModel.register.name = register;
                 this.resultModel.register.value = value;
                 break;
               case 3: //有符号字节数据
                 var num = memoryStart % 4;
                 var value = this.memeryData[0][memory_key].substr(2 + num * 2, 2);
                 this.resultModel.register.name = register;
                 this.resultModel.register.value = value;
                 break;
               case 4: //不规则数据
                 break;
               default:
             }
           } else {
             //write
             switch (keyWord) {
               case "0": //字数据
                 break;
               case "1": //半字数据
                 break;
               case "2": //无符号字节数据
                 break;
               case "3": //有符号字节数据
                 break;
               case "4": //不规则数据
                 break;
               default:
             }
           }


    },
    READ_HALFWORD: function(){

    },
    READ_BYTE: function(){

    },
    READ_UFORMWORD: function(){

    },
    READ_UFORMHALFWORD: function(){

    },
    WRITE_WORD: function(){

    },
    WRITE_HALFWORD: function(){

    },
    WRITE_BYTE: function(){

    },
    READ_WORD: function(){

    }

  };

}



var rep_readword = /(?<!半|非规则)字数据/g;
var rep_readhalfword = /(?<!非规则)半字数据/g;
var rep_readubyte = /无符号字节数据/g;
var rep_readbyte = /(?<!无)符号字节数据/g;
var unform_readword = /非规则字数据/g;
var unform_readhalfword = /非规则半字数据/g;

var rep_writeword = /完整/g;
var rep_writehalfwordlow = /低半字/g;
var rep_writehalfwordhigh = /高半字/g;
var rep_writebytelow = /低字节/g;
// var rep_writebyte = /(?<!无)符号字节数据/g;
var unform_writeword = /非规则字数据/g;
var unform_writehalfword = /非规则半字数据/g;

var DATATYPE = [{rep:rep_readword, code:0},{rep:rep_readhalfword, code:1},{rep:rep_readubyte, code:2},
  {rep:rep_readbyte, code:3},{rep:unform_readword, code:4},{rep:unform_readhalfword, code:5},
  {rep:rep_writeword, code:0},{rep:rep_writehalfwordlow, code:1},{rep:rep_writehalfwordhigh, code:2},
  {rep:rep_writebytelow, code:3},{rep:unform_writeword, code:4},{rep:unform_writehalfword, code:5}]

  // 从内存读取
var read = /读入/g
 //向内存写数据
var write = /存入/g
var OPID = [{rep:read, code:0},{rep:write, code:1}]
var RESULT = {
  register:[],
  memory:[]
}
export {
  COMMON,
  DATATYPE,
  OPID,
  RESULT,
  EXERCISEMODEL,
  MEMOTYDATAINDEX,
  REGISTERINDEX,
  RESULTMODEL

}
