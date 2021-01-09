<template>
  <div class="navbar">
    <hamburger
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />

    <breadcrumb class="breadcrumb-container" />

    <div class="right-menu">
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <img :src="avatar + '?imageView2/1/w/80/h/80'" class="user-avatar" />
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <el-dropdown-item divided @click.native="reset">
            <span style="display: block">修改密码</span>
          </el-dropdown-item>
          <el-dropdown-item divided @click.native="logout">
            <span style="display: block">Log Out</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <el-dialog
      title="修改密码"
      :visible.sync="dialogFormVisible"
      style="width: 200"
    >
      <el-form ref="form" :model="form" :rules="rules" label-width="100px">
        <el-form-item label="原密码" prop="pass">
          <el-input
            type="password"
            placeholder="请输入原密码"
            v-model="form.pass"
          ></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPass">
          <el-input
            type="password"
            placeholder="请设置新密码"
            v-model="form.newPass"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="newPass2">
          <el-input
            type="password"
            placeholder="请确认新密码"
            v-model="form.newPass2"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit('form')">保存</el-button>
          <el-button @click="$refs['form'].resetFields()">重置</el-button>
        </el-form-item>
      </el-form>
     
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Breadcrumb from "@/components/Breadcrumb";
import Hamburger from "@/components/Hamburger";
import { mapState } from "vuex";

export default {
  data() {
    let validateNewPass = (rule, value, callback) => {
      if (value === this.form.pass) {
        callback(new Error("新密码不能与原密码相同!"));
      } else {
        callback();
      }
    };
    let validateNewPass2 = (rule, value, callback) => {
      if (value !== this.form.newPass) {
        callback(new Error("与新密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      form: {
        pass: "",
        newPass: "",
        newPass2: "",
      },
      rules: {
        pass: [{ required: true, message: "请输入原密码", trigger: "blur" }],
        newPass: [
          { required: true, message: "请设置新密码", trigger: "blur" },
          { validator: validateNewPass, trigger: "blur" },
        ],
        newPass2: [
          { required: true, message: "请确认新密码", trigger: "blur" },
          { validator: validateNewPass2, trigger: "blur" },
        ],
      },
      dialogFormVisible: false,
    };
  },
  components: {
    Breadcrumb,
    Hamburger,
  },
  computed: {
    ...mapGetters(["sidebar", "avatar"]),
    ...mapState("user", ["id"]),
  },
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.form);
          this.$axios.post("/api/users/pwd", this.form).then((response) => {
            if (this.form.pass == response.data.password) {
              this.$message.success("密码已修改为" + this.form.newPass);
              this.$router.push("home");
            } else {
              this.$message.error("原密码错误,请重新输入");
              return false;
            }
          });
        }
      });
    },
    toggleSideBar() {
      this.$store.dispatch("app/toggleSideBar");
    },
    reset() {
      this.dialogFormVisible = true;
    },
    async logout() {
      await this.$store.dispatch("user/logout", {
        username: this.id,
      });
      this.$router.push(`/login?redirect=${this.$route.fullPath}`);
    },
  },
};
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
