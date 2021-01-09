<template>
  <div >
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="输入查询的数据类型" style="margin:10px" v-model="queryInfo.query" clearable @clear="search">
            <el-button slot="append" icon="el-icon-search"   @click="search($index)"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
         <el-button type="primary" @click="add" style="margin:10px">添加</el-button>
        </el-col>
      </el-row>
    <div class="tableMain">
      <el-table :data="tableData" style="width: 100%" border>
        <el-table-column type="index" label="标号" width="100" align="center"></el-table-column> 
        <el-table-column prop="title" label="标题" align="center"></el-table-column> 
        <el-table-column prop="typer" label="类型" align="center"></el-table-column> 
        <el-table-column prop="num" label="使用量" align="center"></el-table-column> 
        <el-table-column prop="name" label="创建者" width="180" align="center"></el-table-column>
        <el-table-column prop="date" label="创建时间" width="180" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <!-- 点击编辑进入编辑页面进行编辑表格数据 
            scope.$index→拿到每一行的index
            scope.$row→拿到每一行的数据-->
            <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="page">
 <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.pagenum" :page-sizes="[1, 2, 5, 10]" :page-size="queryInfo.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    
    </div>
    <!-- 下面这个用来设置点击添加按钮的弹出框，里面可以进行嵌套表格来展示弹出的表格信息,使用下面的:visible.sync来控制显示与否 -->
    <!-- 里面绑定的是我们新设置的值，填写完成后，将我们这个新值塞到页面中所有的数据当中去 -->
    <el-dialog title="题目信息" :visible.sync="dialogFormVisible" style="width: 200" >
      <!-- 在el-dialog中进行嵌套el-form实现弹出表格的效果 -->
      <el-form :model="form"  ref="form">
        <el-form-item label="标题" :label-width="formLabelWidth">
          <el-input v-model="form.title" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="创建者" :label-width="formLabelWidth">
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="创建时间" :label-width="formLabelWidth">
          <el-date-picker
            v-model="form.date"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
          <el-form-item label="使用量" :label-width="formLabelWidth">
          <el-select v-model="form.num" placeholder="使用量">
            <el-option label="10" value="10"></el-option>
            <el-option label="100" value="100"></el-option>
            <el-option label="1000" value="1000"></el-option>
            <el-option label="2000" value="2000"></el-option>
            <el-option label="3000" value="3000"></el-option>
            <el-option label="10000" value="10000"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="类型" :label-width="formLabelWidth">
          <el-select v-model="form.typer" placeholder="类型">
            <el-option label="asd" value="asd"></el-option>
            <el-option label="qwe" value="qwe"></el-option>
            <el-option label="zxc" value="zxc"></el-option>
            <el-option label="dfg" value="dfg"></el-option>
            <el-option label="fgh" value="fgh"></el-option>
            <el-option label="hgj" value="hgj"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <!-- 设置触发更新的方法 -->
        <el-button type="primary" @click="update">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="题目信息" :visible.sync="dialogFormVisible2" style="width: 200" >
      <!-- 在el-dialog中进行嵌套el-form实现弹出表格的效果 -->
      <el-form :model="form"  ref="form">
        <el-form-item label="标题" :label-width="formLabelWidth">
          <el-input v-model="form.title" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="创建者" :label-width="formLabelWidth">
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="创建时间" :label-width="formLabelWidth">
          <el-date-picker
            v-model="form.date"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
          <el-form-item label="使用量" :label-width="formLabelWidth">
          <el-select v-model="form.num" placeholder="使用量">
            <el-option label="10" value="10"></el-option>
            <el-option label="100" value="100"></el-option>
            <el-option label="1000" value="1000"></el-option>
            <el-option label="2000" value="2000"></el-option>
            <el-option label="3000" value="3000"></el-option>
            <el-option label="10000" value="10000"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="类型" :label-width="formLabelWidth">
          <el-select v-model="form.typer" placeholder="类型">
            <el-option label="asd" value="asd"></el-option>
            <el-option label="qwe" value="qwe"></el-option>
            <el-option label="zxc" value="zxc"></el-option>
            <el-option label="dfg" value="dfg"></el-option>
            <el-option label="fgh" value="fgh"></el-option>
            <el-option label="hgj" value="hgj"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel2($index)">取 消</el-button>
        <!-- 设置触发更新的方法 -->
        <el-button type="primary" @click="update2($index)">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
export default {

  data() {
    return {
        queryInfo: {
        query: '',
        // 当前的页数
        pagenum: 1,
        // 当前每页显示多少条数据
        pagesize: 2
      },
      tableData: [
        {
          date: "2020-09-01",
          name: "sadsad",
          typer: "asd",
          num: "10",
          title: "asdsad",
        },
        {
          date: "2020-09-02",
          name: "sadsad",
          typer: "zxc",
          num: "10",
          title: "asdad",
        },
        {
          date: "2020-09-03",
          name: "asdsad",
          typer: "qwe",
          num: "10",
          title: "asdsad",
        },
        {
          date: "2020-09-04",
          name: "asd",
          typer: "asd",
          num: "10",
          title: "asdad",
        },
        {
          date: "2020-09-03",
          name: "asd",
          typer: "zxc",
          num: "10",
          title: "asdsadsa",
        },
        {
          date: "2020-09-25",
          name: "asasdsa",
          typer: "qwe",
          num: "10",
          title: "sadasd",
        },
        {
          date: "2020-09-23",
          name: "asdasd",
          typer: "qwe",
          num: "10",
          title: "asasdadd",
        }
      ],
      dialogFormVisible: false,
      dialogFormVisible2: false,
      formLabelWidth: "80px",
      // 设置form用于进行添加的时候绑定值
      form: {},
      value6: "",
      currentPage3: 1,
    };
  },

  methods: {
    // 增加数据的方式，单独的设置一些值，用于增加功能，这些值放在对象里面进行设置，然后将这个新增的对象塞到总数据里面
    add() {
      this.form = {
        num: "",
        date: "",
        name: "",
        typer: "",
        title: ""
      };
      
      //   设置点击按钮之后进行显示对话框
      this.dialogFormVisible = true;
    },
    update() {
      //   this.form.date = reformat(this.form.date);
      //    可以在html上面进行设置日期的格式化
      //   将我们添加的信息提交到总数据里面
      this.tableData.push(this.form);
      this.dialogFormVisible = false;
    },
    update2(index) {
      //   this.form.date = reformat(this.form.date);
      //    可以在html上面进行设置日期的格式化
      //   将我们添加的信息提交到总数据里面
          this.tableData.splice(index,1)
         console.log( this.userlist)
      
      this.dialogFormVisible2 = false;
    },
    handleEdit(index) {
      // 将数据的index传递过来用于实现数据的回显
         this.form = this.tableData[index];
      // // 设置对话框的可见 
      
         this.userlist= {}
         this.userlist ={ 
        title: this.form.title,
        typer: this.form.typer,
        num: this.form.num,
        name: this.form.name,
        date: this.form.date,
         }
         this.tableData.unshift(this.userlist);
      //   //  this.tableData.splice(index,1)
      //    console.log( this.userlist)
       
      //  this.tableData.shift(this.userlist)
      //  this.form = this.tableData[index];
      // this.currentIndex = index;
            this.dialogFormVisible2 = true;
    },
    handleDelete(index,) {
      // 设置类似于console类型的功能
      this.$confirm("永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => { // 为 Promise 实例添加状态改变时的回调函数
          // 移除对应索引位置的数据，可以对row进行设置向后台请求删除数据
          this.tableData.splice(index, 1);// 删除index位置当前行数据
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => { //用于指定发生错误时的回调函数
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    cancel() {
      // 取消的时候直接设置对话框不可见即可
      this.dialogFormVisible = false;
    },
    cancel2(index) {
       this.tableData.splice(index,1)
      // 取消的时候直接设置对话框不可见即可
      this.dialogFormVisible2 = false;
    },
    handleSizeChange(newSize) {
      // console.log(newSize)
      this.queryInfo.pagesize = newSize
    },
    // 监听 页码值 改变的事件
    handleCurrentChange(newPage) {
      console.log(newPage)
      this.queryInfo.pagenum = newPage
    },
     search(index) {
        this.list=[]
         for(let i = 0; i<7 ;i++) //let 可以循环0-6，var直接显示6
         {
          this.$axios.post("/user/verilog/lists", this.tableData[i]).then((res) => {
            // this.table[i]=res.data.data
            console.log(res.data)
            console.log(this.tableData[i])
           switch(res.data.code)
           {
             case 1:
               this.tableData.splice(index,1)
              
               this.tableData[i].push(res.data.data)
               break;
             case 2:
               this.tableData.splice(index,1)
               this.tableData[i].push(res.data.data)
               break;
               case 3:
               this.tableData.splice(index,1)
               this.tableData[i].push(res.data.data)
               break;
               case 4:
               this.tableData.splice(index,1)
               this.tableData[i].push(res.data.data)
               break;
               case 5:
               this.tableData.splice(index,1)
               this.tableData[i].push(res.data.data)
               break;
              default:
               this.tableData.splice(index,1)
           
           
           
           }
           
      //          if(this.queryInfo.query === "asd" && res.data.code === 1 )
      //      {
      //       //  let number=0
      //   this.tableData.splice(index,1)
      //    this.list =[{ 
      //   title: res.data.data.title,
      //   typer: res.data.data.typer,
      //   num: res.data.data.num,
      //   name: res.data.data.name,
      //   date: res.data.data.date,
      //    }]

      //    console.log( this.list[0])
       
      //  this.tableData.push(this.list[0])
      //      }  
      //     else if(this.queryInfo.query === "qwe" && res.data.code === 2 )
      //      {
      //       //  let number=0
      //     this.tableData.splice(index,1)
      //      this.list =[{ 
      //   title: res.data.data.title,
      //   typer: res.data.data.typer,
      //   num: res.data.data.num,
      //   name: res.data.data.name,
      //   date: res.data.data.date,
      //    }]

      //    console.log( this.list[0])
     
      //  this.tableData.push(this.list[0])
      //      }  
      //       else if(this.queryInfo.query === "zxc" && res.data.code === 3 )
      //      {
      //       //  let number=0
      //       this.tableData.splice(index,1)
      //    this.list =[{ 
      //   title: res.data.data.title,
      //   typer: res.data.data.typer,
      //   num: res.data.data.num,
      //   name: res.data.data.name,
      //   date: res.data.data.date,
      //    }]

      //    console.log( this.list[0])
       
      //  this.tableData.push(this.list[0])
      //      }  
      //       else if(this.queryInfo.query === "dfg" && res.data.code === 4 )
      //      {
      //       //  let number=0
      //       this.tableData.splice(index,1)
      //    this.list =[{ 
      //   title: res.data.data.title,
      //   typer: res.data.data.typer,
      //   num: res.data.data.num,
      //   name: res.data.data.name,
      //   date: res.data.data.date,
      //    }]

      //    console.log( this.list[0])
       
      //  this.tableData.push(this.list[0])
      //      }  
      //       else if(this.queryInfo.query === "fgh" && res.data.code === 5 )
      //      {
      //       //  let number=0 
      //       this.tableData.splice(index,1)
      //    this.list =[{ 
      //   title: res.data.data.title,
      //   typer: res.data.data.typer,
      //   num: res.data.data.num,
      //   name: res.data.data.name,
      //   date: res.data.data.date,
      //    }]

      //    console.log( this.list[0])
      
      //  this.tableData.push(this.list[0])
      //      }  
      //       else if(this.queryInfo.query === "hgj" && res.data.code === 6 )
      //      {
      //       //  let number=0
      //       this.tableData.splice(index,1)
      //    this.list =[{ 
      //   title: res.data.data.title,
      //   typer: res.data.data.typer,
      //   num: res.data.data.num,
      //   name: res.data.data.name,
      //   date: res.data.data.date,
      //    }]

      //    console.log( this.list[0])
       
      //  this.tableData.push(this.list[0])
      //      }  
               
      //          else{
      //             this.tableData.splice(index,1)
      //          }
            })}}}}
          // this.tableData.unshift(),
          
  
        //  }
         

        //  console.log(this.userlist)
        //   this.tableData.unshift(this.userlist)
          //    else{
          //      this.$message({
          //   type: "info",
          //   message: "未查询到"
          // });
          //    }
          // getu(name,title,num,date,typer).then(response=>{
          //   if(response.meta.status === 201)
          //  {
          //  console.log(response.date)
          //    }
          //  }
          // );

  // }
  // }
</script>
<style scoped>
.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;
}
</style>