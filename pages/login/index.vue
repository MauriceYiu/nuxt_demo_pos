<template>
  <div class="login">
    <div class="login-wrap" v-if="showLoginWrap">
      <div class="login-tit">请登录</div>
      <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
        <el-form-item label="用户名">
          <el-input v-model="formLabelAlign.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" v-model="formLabelAlign.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login">登录</el-button>
          <el-button @click="register">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="store-list" v-if="showStoreList">
      <div class="list-wrap">
        <ul>
          <li class="item" v-for="item in storeList" :key="item.id" @click.stop="toIndex(item)">
            {{item.storeName}}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { login as loginApi } from "@/api/index";
export default {
  data() {
    return {
      showLoginWrap: true,
      showStoreList: false,
      labelPosition: "left",
      formLabelAlign: {
        username: "",
        password: "",
      },
      storeList: [], //店铺列表
    };
  },
  methods: {
    login() {
      let data = {
        username: this.formLabelAlign.username,
        password: this.formLabelAlign.password,
      };
      let b = new Base64();
      let authStr = "Basic " + b.encode(data.username + ":" + data.password);
      console.log(authStr);
      loginApi(this.$axios, authStr).then((res) => {
        this.storeList = res.data;
        if(res.data.length>0){
          this.showLoginWrap = false;
          this.showStoreList = true;
        }
      });
    },
    toIndex(item){
      sessionStorage.setItem("storeInfo",item);
      this.$router.push('/storeSale');
    },
    register() {
      
    },
  },
};
</script>

<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100%;
  position: relative;
  background: #333;
  .login-wrap {
    width: 400px;
    border-radius: 5px;
    padding: 20px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #fff;
    .login-tit {
      width: 100%;
      text-align: center;
      padding: 10px 0;
    }
  }
  .store-list {
    width: 300px;
    background: #fff;
    border-radius: 5px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    overflow: hidden;
    overflow-y: auto;
    .list-wrap {
      min-height: 200px;
      max-height: 400px;
      overflow: hidden;
      overflow-y: auto;
      margin-right: -18px;
      .item {
        width: 100%;
        height: 40px;
        line-height: 40px;
        text-align: center;
        border-bottom: 1px solid #ddd;
        cursor: pointer;
      }
    }
  }
}
</style>
