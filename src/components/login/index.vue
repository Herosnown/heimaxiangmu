<template>
  <div class="bgi">
    <el-card class="box-card">
      <div class="header"></div>
      <div class="text item">
        <el-form class="formlist" :model="ruleForm" :rules="rules" ref="formdata">
          <el-form-item prop="mobile">
            <el-input placeholder="请输入手机号" v-model="ruleForm.mobile"></el-input>
          </el-form-item>
          <el-form-item prop="code">
            <el-input placeholder="验证码" class="seinput" v-model="ruleForm.code"></el-input>
            <el-button class="sendbtn">发送验证码</el-button>
          </el-form-item>
          <el-form-item prop="type">
            <el-checkbox-group v-model="ruleForm.type">
              <el-checkbox name="type" class="checkbox"></el-checkbox>
              <span class="fcb">
                &nbsp;&nbsp;我已阅读并同
                <span class="fc">意用户协议</span>和
                <span class="fc">隐私条款</span>
              </span>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item class="loginbuttn">
            <el-button type="primary" class="lbutton" @click="submit">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  data () {
    return {
      ruleForm: {
        mobile: '',
        code: '',
        type: []
      },

      rules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          {
            pattern: /^1[34578]\d{9}$/,
            message: '请输入正确格式的手机号',
            trigger: 'blur'
          }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { pattern: /^\d{6}$/, message: '请输入六位数字', trigger: 'blur' }
        ],
        type: [
          {
            type: 'array',
            required: true,
            message: '您必须同意协议',
            trigger: 'change'
          }
        ]
      }
    }
  },
  methods: {
    submit () {
      this.$refs.formdata.validate(valid => {
        if (valid) {
          let { mobile, code } = this.ruleForm
          this.$axios.post('/authorizations', { mobile, code }).then(res => {
            var data = res.data
            localStorage.setItem('content', JSON.stringify(data))
            this.$router.push('/home')
          })
        } else {
          console.log('error submit!!')
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.bgi {
  margin: 0;
  width: 100%;
  height: 100vh;
  background: url('../../assets/chun.jpg') no-repeat;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: middle;
}

.box-card {
  width: 400px;
  height: 350px;
  margin: auto;
  .header {
    height: 50px;
    background: url('../../assets/logo.jpg') no-repeat center center;
    background-size: contain;
  }
  .formlist {
    margin-top: 15px;
    padding: 0 20px;
    .seinput {
      width: 60%;
    }
  }
  .sendbtn {
    width: 35%;
    float: right;
  }
  .fcb {
    font-size: 12px;
    color: #909399;
    .fc {
      color: #409eff;
    }
  }
  .loginbuttn {
    margin-top: 20px;
    .lbutton {
      width: 100%;
    }
  }
}
</style>
