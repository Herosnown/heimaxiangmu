<template>
  <div>
    <div class="clearfix">
      <div class="picstyle" v-for="(item,index) in parant" :key="index" @click="alertPage(index)">
        <img :src="item||url" :ref="index" />
      </div>
    </div>
    <el-dialog :visible="dialogVisible" width="60%" :before-close="handleClose">
      <el-tabs v-model="activeName" slot="title">
        <el-tab-pane label="全部" name="all">
          <div class="dialog">
            <com-dialog @getsrc="getimgSrc"></com-dialog>
          </div>
        </el-tab-pane>
        <el-tab-pane label="收藏" name="sec"></el-tab-pane>

        <el-tab-pane label="上传图片" name="upload">
          <el-upload class="avatar-uploader" action="#" :http-request="uploadimg">
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="suresub">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      bool: false,
      imageUrl: '',
      url: '',
      dialogVisible: false,
      activeName: 'all',
      index: '',
      val: '',
      fileList: []
    }
  },
  props: ['parant', 'pvalue'],
  methods: {
    uploadimg (val) {
      let data = new FormData()
      data.append('image', val.file)
      this.$axios({
        method: 'post',
        data,
        url: '/user/images'
      }).then(res => {
        console.log(res)
        this.imageUrl = res.data.url
      })
    },
    alertPage (index) {
      this.dialogVisible = true
      this.index = index
    },
    handleClose () {
      this.dialogVisible = false
    },
    suresub () {
      this.$refs[this.index][0].src = this.val

      this.$emit('getimgsrc', this.imageUrl || this.val, this.index)

      this.dialogVisible = false
    },
    getimgSrc (val) {
      this.val = val
    }
  },
  created () {
    var url = require('../../../assets/img/1.png')
    this.url = url
  }
}
</script>

<style lang='less' scoped>
.picstyle {
  width: 200px;
  height: 200px;
  box-shadow: 1px 2px 10px 1px #ccc;
  border-radius: 5px;
  float: left;
  margin-right: 15px;
  img {
    width: 100%;
    height: 100%;
  }
}
.dialog {
  height: 300px;
  overflow: auto;
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
.el-upload {
  border: 1px solid red !important;
}
</style>
