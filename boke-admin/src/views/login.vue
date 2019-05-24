<template>
  <div class="login">
    <div class="box">
      <img src="../assets/logo.png" width="100" height="100">
      <el-form :model="user" ref="user" class="user-from">
        <el-form-item prop="username">
          <el-input v-model="user.username" size="mini" placeholder="请输入用户名" prefix-icon="ty-icon icon-user" class="inputBox">
            <i slot="prefix" class="fa fa-user-o" aria-hidden="true"></i>
          </el-input>
        </el-form-item>
        <el-form-item prop="password"
         :rules="[
                { required: true, message: '请输入密码', trigger: 'blur' },
                ]">
          <el-input @keyup.enter.native="login('user')" v-model="user.password" placeholder="请输入密码" type="password" prefix-icon="ty-icon icon-password" class="inputBox">
            <i slot="prefix" class="fa fa-unlock-alt" aria-hidden="true"></i>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"  @click="login('user')" class="btn">登陆</el-button>
        </el-form-item>
      </el-form>
      <p style="font-size:14px">没有账号？请先<a href="" class="register">注册</a></p>
    </div>
  </div>
</template>

<script>
import jwt_decode from 'jwt-decode'
export default {
  name: 'Login',
  data () {
    return {
      user:{
        username : '',
        password : ''
      }
    }
  },
  methods: {
    login(user){
        this.$refs[user].validate(valid => {
        if (valid) {
          this.$axios.post('/api/user/login',this.user).then(res => {
            // console.log(res)
            if(res.data.msg==''){
              this.$message('没有此用户！请注册。')
            }else{
              const {token} = res.data   //解构赋值
              localStorage.setItem('bokeToken',token)
              const decode = jwt_decode(token)
              this.$store.dispatch("setAuthenticated",this.isEmpty(decode))
              this.$store.dispatch('setUser',decode)
              this.$router.push({path:'/index'})
            }
          })
        }
      }) 
    },
    isEmpty(value){
      return (value === undefined || value === null 
      || (typeof(value)==="object" && Object.keys(value).length === 0)) 
      || (typeof(value)==="string"&& value.trim().length === 0)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  @import url('../style/login.css');
</style>
