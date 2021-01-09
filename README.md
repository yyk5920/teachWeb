# debugtest

> A Vue.js project

## Build Setup

```bash
# install dependencies
npm install

# serve with hot reload at localhost:80
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## 使用说明：
**预留账号：**M201813481  

**预留密码：**M201813481

**数据存储器填入代码：**  

input[n-1:0] Addr;
input[m-1:0] DataIn;
input MemWR;
output [m-1:0] DataOut;
reg [m-1:0] regs [0:2**n-1];
always @(posedge MemWR)
 begin
regs[Addr]<= DataIn;
end
 assign DataOut = regs[Addr];

### 说明
* 代码正确显示正确波形
* 代码后台仿真不通过显示错误原因
* 代码通过但结果不正确显示与正确波形的对比波形图及文字结果
