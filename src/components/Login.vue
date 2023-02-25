<template>
  <div>
    <div class="login_box">
      
      <!-- 登录区域 -->
      <el-form
        :model="loginForm"
        label-width="0px"
        class="login_form"
        :rules="loginFormRules"
        ref="loginFormRef"
      >
    <div class="card_header">
    <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 0h24v24H0z" fill="none"></path>
      <path d="M4 15h2v5h12V4H6v5H4V3a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-6zm6-4V8l5 4-5 4v-3H2v-2h8z" fill="currentColor"></path>
    </svg>
    <h1 class="form_heading">Sign in</h1>
  </div>
      <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input prefix-icon="el-icon-user-solid" v-model="loginForm.username"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input prefix-icon="iconfont icon-3702mima" v-model="loginForm.password" type="password"></el-input>
        </el-form-item>
        <!-- 按钮 -->
        <el-form-item class="btns">
            <el-button type="primary" @click="login">登录</el-button>
            <el-button type="info" @click="resetLoginFormRef">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
    data(){
        return{
            // 登录表单的绑定对象
            loginForm:{
                username:'',
                password:''
            },
            // 表单的验证
            loginFormRules:{
                // 验证用户名是否合法
                username:[
                { required: true, message: '请输入用户名', trigger: 'blur' },
                { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
                ],
                // 验证密码是否合法
                password:[
                { required: true, message: '请输入密码', trigger: 'blur' },
                { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
                ]
            }
        }
    },
    methods:{
        resetLoginFormRef(){
            this.$refs.loginFormRef.resetFields()
        },
        login(){
            this.$refs.loginFormRef.validate(async valid=>{
               if(!valid) return;
               const {data:res} =await this.$http.post('login',this.loginForm)
               if(res.meta.status !==200) return this.$message.error('登陆失败');
            
                this.$message.success('登录成功')
            // 登录成功之后的token，保存到客户端的sessionstorang中
            // 项目中除了登录之外的接口，登录之后才能访问
            // token只应在网站打开期间生效，所以token保存在sessionstorang中
                console.log(res)
                window.localStorage.setItem('token',res.data.token)



            // 通过编程式导航跳转到后台主页
              this.$router.push('/home')
            })
        }
    }
};
</script>

<style lang="less" scoped>
.login_box {
  width: 450px;
  height: 300px;
  background-color: aliceblue;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);


  .btns{
    display: flex;
    justify-content: center;
  }
}
svg {
  color: #7878bd;
  margin-bottom: 20px;
  margin-right: 5px;
}
.login_form{
   width: 350px;
  height: 254px;
  background: #F4F6FB;
  border: 1px solid white;
  box-shadow: 10px 10px 64px 0px rgba(180, 180, 207, 0.75);
  -webkit-box-shadow: 10px 10px 64px 0px rgba(186, 186, 202, 0.75);
  -moz-box-shadow: 10px 10px 64px 0px rgba(208, 208, 231, 0.75);
  margin-left: 40%;
  margin-top:10% ;
}

button {
  background-color: #7878bd;
  margin-top: 10px;
  font-size: 14px;
  padding: 7px 12px;
  height: auto;
  font-weight: 500;
  color: white;
}
button:hover {
  background-color: #5f5f9c;

}
.form_heading {
  padding-bottom: 20px;
  font-size: 21px;
  color: #7878bd;
}
</style>