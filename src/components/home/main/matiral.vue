<template>
  <div class="clearfix">
    <com-bread>素材列表</com-bread>
    <div class="clearfix">
      <el-radio-group
        v-model="tabPosition"
        style="margin: 30px 10px;"
        @change="getstatus"
        class="all"
      >
        <el-radio-button label="all">全部</el-radio-button>
        <el-radio-button label="sec">收藏</el-radio-button>
      </el-radio-group>
      <el-upload action class="upload-demo" :http-request="uploadItm">
        <el-button type="primary">点击上传</el-button>
        <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
      </el-upload>
    </div>
    <div class="clearfix">
      <div class="container" v-for="item in respondata" :key="item.id">
        <el-card :body-style="{ padding: '0px', width:'100%',height:'100%'}">
          <div class="imgbox">
            <img :src="item.url" class="image" height="160" width="200" />
          </div>
          <div style="padding: 14px;">
            <div class="bottom clearfix">
              <i
                class="el-icon-star-on"
                :style="{'color':item.is_collected?'red':'black'}"
                @click="collectitem(item.id,item.is_collected)"
              ></i>
              <i class="el-icon-delete" @click="delitem(item.id)"></i>
            </div>
          </div>
        </el-card>
      </div>
    </div>
    <div class="botpage">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="totalcont"
        @current-change="changePage"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      fileList: [],
      tabPosition: 'all',
      userimg: {
        page: 1,
        per_page: 15,
        collect: false
      },
      respondata: [],
      totalcont: 1
    }
  },
  methods: {
    uploadItm (val) {
      console.log(val)
      let formdata = new FormData()
      formdata.append('image', val.file)
      this.$axios({ method: 'post', url: '/user/images', data: formdata }).then(
        () => {
          this.userimg.page = 1
          this.getMetiral(this.userimg)
        }
      )
    },
    collectitem (id, collected) {
      var str = collected ? '取消收藏' : '收藏'
      this.$confirm(`确定${str}该素材吗`).then(() => {
        this.$axios({
          method: 'put',
          url: 'user/images/' + id,
          data: {
            collect: !collected
          }
        }).then(res => {
          this.getMetiral(this.userimg)
        })
      })
    },
    delitem (id) {
      this.$confirm('确定删除该素材吗').then(() => {
        this.$axios({
          method: 'delete',
          url: '/user/images/' + id
        }).then(res => {
          this.$message('删除成功')
          this.getMetiral(this.userimg)
        })
      })
    },
    changePage (newpage) {
      this.userimg.page = newpage
      this.getMetiral(this.userimg)
    },
    getMetiral (params) {
      this.$axios({
        url: '/user/images',
        params
      }).then(res => {
        this.respondata = res.data.results
        this.totalcont = res.data.total_count
      })
    },
    getstatus (val) {
      this.userimg.collect = val === 'sec'
      this.getMetiral(this.userimg)
    }
  },
  created () {
    this.getMetiral(this.userimg)
  }
}
</script>
<style scoped>
.container {
  width: 200px;
  height: 200px;
  float: left;
  margin: 20px;
}
.all {
  float: left;
}
.upload-demo {
  float: right;
  margin: 35px 80px 0;
}
.imgbox {
  width: 200px;
  height: 160px;
}
.bottom {
  margin-top: 20px;
  line-height: 12px;
  display: flex;
  justify-content: space-between;
}

.image {
  width: 100%;
  height: 100%;
  display: block;
}
.botpage {
  margin-top: 30px;
  display: flex;
  justify-content: center;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: '';
}

.clearfix:after {
  clear: both;
}
</style>
