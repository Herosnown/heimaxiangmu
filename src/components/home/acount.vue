<template>
  <div>
    <com-bread>
      <span>账户信息</span>
    </com-bread>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>个人信息</span>
      </div>
      <div>
        <div class="clearfix bigbox">
          <div class="photo">
            <img :src="formdata.photo" />
          </div>

          <div class="namebox">
            <div v-if="bool" class="uersintro">
              <div>个人名称：&nbsp;{{formdata.name}}</div>
              <div>个人简介：&nbsp;{{formdata.intro}}</div>
            </div>
            <el-form
              :model="modifydata"
              :rules="ruless"
              label-width="100px"
              v-else
              :hide-required-asterisk="true"
            >
              <el-form-item label="个人名称" prop="name">
                <el-input v-model="modifydata.name"></el-input>
              </el-form-item>
              <el-form-item label="个人简介" prop="intro">
                <el-input v-model="modifydata.intro"></el-input>
              </el-form-item>
              <el-form-item size="large">
                <el-button type="primary" @click="onSubmit">保存修改</el-button>
                <el-button @click="bool=true">取消</el-button>
              </el-form-item>
            </el-form>
          </div>
          <div class="modifybut">
            <el-button type="text" v-if="bool" @click="modifyinfo">修改</el-button>
          </div>
        </div>
        <div class="modifypic">
          <el-button type="text" @click="dialogVisible = true">修改图像</el-button>
        </div>
        <el-dialog title="上传图像" :visible.sync="dialogVisible" width="30%">
          <div>
            <el-upload
              class="avatar-uploader"
              action
              :http-request="uploaduers"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="submituers">确 定</el-button>
          </span>
        </el-dialog>
        <div class="personinfo">
          <div class="bigbox clearfix">
            <div class="littlebox">账号信息</div>
            <div class="rightbox">
              <div class="first">头条号类型&nbsp;&nbsp;&nbsp;&nbsp;个人</div>
              <div>头条号ID&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{formdata.id}}</div>
            </div>
          </div>
          <div class="loginbox">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;登录方式
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;绑定手机号&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{formdata.mobile}}
          </div>
          <div>
            <div class="emailbox1">
              <div class="emailbox">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;邮箱</div>
              <div
                class="emailbox"
                v-if="boo"
              >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{formdata.email}}</div>
              <div v-else>
                <el-form :model="modifydata" label-width="100px" class="form">
                  <el-form-item
                    prop="email"
                    label="邮箱"
                    :rules="[
      { required: true, message: '请输入邮箱地址', trigger: 'blur' },
      { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
    ]"
                  >
                    <el-input v-model="modifydata.email"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="onEmail">保存修改</el-button>
                    <el-button>取消</el-button>
                  </el-form-item>
                </el-form>
              </div>

              <div v-if="boo" class="modifyemail">
                <el-button type="text" @click="modifyemail">修改邮箱</el-button>
              </div>
            </div>
            <div></div>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import eventBus from '../../eventBus'
export default {
  data () {
    return {
      imageUrl: '',
      imgafile: null,
      formdata: {},
      modifydata: {},
      boo: true,
      dialogVisible: false,
      bool: true,
      ruless: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' },
          { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    modifyemail () {
      this.boo = false
      this.modifydata = { ...this.formdata }
    },
    onEmail () {
      this.formdata = { ...this.modifydata }
      this.modifyinfouer(this.formdata)
    },
    submituers () {
      let data = new FormData()
      data.append('photo', this.imgafile)
      this.$axios({
        method: 'patch',
        url: '/user/photo',
        data
      }).then(res => {
        console.log(res)
        this.formdata.photo = res.data.photo
        this.dialogVisible = false
        eventBus.$emit('changeuerinfo', res.data)
      })
    },
    uploaduers (val) {
      this.imgafile = val.file
      this.imageUrl = URL.createObjectURL(val.file)
      console.log(this.imageUrl)
    },
    handleAvatarSuccess (res, file) {},
    modifyinfo () {
      this.bool = false
      this.modifydata = { ...this.formdata }
    },
    onSubmit () {
      this.formdata = { ...this.modifydata }
      this.bool = true
      this.modifyinfouer(this.formdata)
    },
    modifyinfouer (data) {
      let { name, intro, email } = data
      this.$axios({
        url: '/user/profile',
        body: {
          name,
          intro,
          email
        },
        method: 'patch'
      }).then(res => {
        console.log(res)
        eventBus.$emit('changeuerinfo', res.data)
      })
    },
    getuers () {
      this.$axios({
        url: 'user/profile'
      }).then(res => {
        this.formdata = { ...res.data }
        console.log(res)
      })
    }
  },
  created () {
    this.getuers()
  }
}
</script>

<style lang='less' scoped>
div {
  box-sizing: border-box;
}
.bigbox {
  width: 100%;
  .modifybut {
    float: right;
    margin: 10px;
  }
}
.photo {
  width: 120px;
  height: 120px;
  overflow: hidden;
  border-radius: 50%;
  float: left;
  margin-right: 30px;
  img {
    width: 100%;
    height: 100%;
  }
}
.modifypic {
  width: 120px;
  display: flex;
  justify-content: center;
}
.namebox {
  float: left;
  width: 500px;
  height: 120px;

  .uersintro {
    height: 120px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.personinfo {
  height: 360px;
  width: 100%;
  line-height: 80px;
  border-top: 1px solid #ccc;
  .loginbox {
    height: 80px;
    border-bottom: 1px #ccc solid;
  }
  .bigbox {
    height: 160px;
    border-bottom: 1px solid #ccc;
  }
  .rightbox {
    float: right;
    width: 92%;
    div {
      height: 80px;
    }
    .first {
      border-bottom: 1px #ccc solid;
    }
  }
  .littlebox {
    width: 7%;
    height: 80px;
    text-align: center;
    float: left;
  }
}

.emailbox1 {
  div {
    float: left;
  }
  .modifyemail {
    float: right;
    margin-right: 30px;
  }
}

.form {
  width: 500px;
}
</style>
