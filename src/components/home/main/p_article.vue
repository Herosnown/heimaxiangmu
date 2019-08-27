<template>
  <div v-loading="loading">
    <com-bread>
      <span id="article">{{bread}}</span>
    </com-bread>
    <div class="articalbox">
      <el-form
        :model="ruleForm"
        :rules="rule"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="标题" prop="title" class="title">
          <el-input v-model="ruleForm.title"></el-input>
        </el-form-item>
        <el-form-item label="活动形式" prop="content">
          <quill-editor class="textarea" v-model="ruleForm.content"></quill-editor>
        </el-form-item>
        <el-form-item>
          <el-radio-group v-model="ruleForm.cover.type" @change="changeValue">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <com-picture
            :parant="ruleForm.cover.images"
            :pvalue="ruleForm.cover.type"
            @getimgsrc="getimgs"
          ></com-picture>
        </el-form-item>
        <el-form-item label="活动区域" prop="channel_id">
          <el-select v-model="ruleForm.channel_id" placeholder="请选择">
            <el-option :label="itm.name" v-model="itm.id" v-for="(itm,inx) in channels " :key="inx"></el-option>
          </el-select>
        </el-form-item>
        <el-divider></el-divider>
        <el-form-item>
          <el-button type="primary" @click="publishArt(false)">{{bread1}}</el-button>
          <el-button @click="publishArt(true)">存入草稿</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loading: true,
      bread: '',
      bread1: '',
      rule: {
        title: [
          { required: true, message: '题目不能为空', trigger: 'blur' },
          { min: 1, max: 7, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '内容不能为空', trigger: 'blur' },
          {
            min: 5,
            max: 200,
            message: '内容最短位5个字符最长200个',
            trigger: 'blur'
          }
        ],
        channel_id: [
          { required: true, message: '请选择频道类型', trigger: 'change' }
        ]
      },
      ruleForm: {
        title: '',
        content: '',
        cover: {
          type: 1,
          images: ['']
        },

        channel_id: null
      },
      num: 1,

      dialogImageUrl: '',
      dialogVisible: false,
      channels: [],
      id: null
    }
  },
  methods: {
    getimgs (ele, index) {
      this.ruleForm.cover.images = this.ruleForm.cover.images.map((item, i) => {
        if (i === index) {
          return ele
        }
        return item
      })
      console.log(this.ruleForm.cover.images)
    },
    changeValue (val) {
      this.ruleForm.cover.images =
        val === 1 ? [''] : val === 3 ? ['', '', ''] : []
    },
    publishArt (draft) {
      console.log(this.ruleForm)
      console.log(typeof this.ruleForm.channel_id)
      this.$refs.ruleForm.validate(isok => {
        if (isok) {
          var url = this.id ? '/articles/' + this.id : '/articles'
          var method = this.id ? 'put' : 'post'
          this.$axios({
            method,
            url,
            params: {
              draft
            },
            data: this.ruleForm
          }).then(() => {
            this.$router.push('/home/content/list')
          })
        }
      })
    },
    getArticle () {
      this.$axios({
        url: 'articles/' + this.id
      }).then(res => {
        this.ruleForm = { ...res.data }
      })
    }
  },

  created () {
    this.id = this.$route.query.id
    this.bread = this.id ? '修改文章' : '发表文章'
    this.bread1 = this.id ? '保存修改' : '发表'
    document.title = this.id ? '修改文章' : '发表文章'
    this.id && this.getArticle()
    this.$axios({
      url: '/channels'
    }).then(res => {
      this.channels = res.data.channels
    })
  },
  mounted () {
    this.loading = false
  }
}
</script>

<style lang='less' scoped>
.articalbox {
  box-sizing: border-box;
  padding: 30px;
  height: 850px;
  width: 95%;
  margin: 30px auto 50px;
  border-radius: 10px;
  box-shadow: 1px 5px 5px 3px #ccc;
  .dialog {
    float: left;
    margin-right: 15px;
  }
  .title {
    width: 40%;
  }
  .textarea {
    height: 200px;
    margin-bottom: 100px;
  }
}
</style>
