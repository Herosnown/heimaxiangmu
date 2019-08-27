<template>
  <div>
    <com-bread>图文数据</com-bread>
    <el-card class="box-card">
      <p class="header">全部图文</p>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="文章状态:">
          <el-radio-group v-model="form.status" style="margin-bottom: 30px;" @change="getMsg">
            <el-radio-button label="5">全部</el-radio-button>
            <el-radio-button label="0">草稿</el-radio-button>
            <el-radio-button label="1">待审核</el-radio-button>
            <el-radio-button label="2">审核通过</el-radio-button>
            <el-radio-button label="3">审核失败</el-radio-button>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="频道列表">
          <el-select v-model="form.channel_id" placeholder="请选择" @change="getMsg">
            <el-option v-for="itm in channel" :label="itm.name" :value="itm.id" :key="itm.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="活动时间">
          <el-date-picker
            v-model="form.date"
            type="daterange"
            value-format="yyyy-MM-dd"
            @change="getdate1"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
      </el-form>
    </el-card>
    <div class="text">共找到{{count}}条符合条件的内容</div>
    <ul>
      <li class="listli" v-for="item in pictext" :key="item.id.toString()">
        <img :src="item.cover.images[0]" class="pic" width="200" height="200" />
        <div class="listbox">
          <div>{{item.title}}</div>
          <div>
            <el-button :type="item.status | changecolor" plain>{{item.status |becomestatus}}</el-button>
          </div>
          <div>{{item.pubdate}}</div>
        </div>
        <div class="right">
          <span @click="modifypic(item.id.toString())" style="cursor:pointer">
            <i class="el-icon-edit"></i>修改
          </span>
          &nbsp;&nbsp;
          <span @click="delmet(item.id.toString())" style="cursor:pointer">
            <i class="el-icon-delete"></i>删除
          </span>
        </div>
      </li>
    </ul>
    <div class="page">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="count"
        :current-page="form.page"
        @current-change="changepage"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      form: {
        status: '5',
        channel_id: null,
        begin_pubdate: '',
        end_pubdate: '',
        page: 1
      },
      pictext: [],
      count: 1,
      channel: []
    }
  },
  methods: {
    modifypic (id) {
      this.$router.push('2-1?id=' + id)
    },
    delmet (id) {
      this.$confirm('确定要删除吗', '提示').then(() => {
        this.$axios({
          method: 'delete',
          url: '/articles/' + id
        }).then(res => {
          this.getcontent(this.form.page)
        })
      })
    },
    changepage (nowpage) {
      this.getcontent(nowpage)
    },
    getdate1 (val) {
      if (val !== null) {
        this.form.begin_pubdate = val[0]
        this.form.end_pubdate = val[1]
      } else {
        this.form.begin_pubdate = ''
        this.form.end_pubdate = ''
      }

      this.getcontent(1)
    },
    getMsg () {
      this.getcontent(1)
    },
    getcontent (page) {
      this.form.page = page
      var params = { ...this.form }
      params.status = this.form.status === '5' ? null : this.form.status
      this.$axios({
        url: '/articles',
        params,
        response_type: 'statistic'
      }).then(res => {
        this.pictext = res.data.results
        this.count = res.data.total_count
      })
    },
    getchannel () {
      this.$axios({
        url: '/channels'
      }).then(res => {
        this.channel = res.data.channels
      })
    }
  },

  created () {
    this.getcontent(1)
  },
  mounted () {
    this.getchannel()
  },
  filters: {
    becomestatus (val) {
      switch (val) {
        case 0:
          return '草稿'
        case 1:
          return '待审核'
        case 2:
          return '已发布'
        case 3:
          return '审核失败'
        case 4:
          return '已删除'
      }
    },
    changecolor (value) {
      switch (value) {
        case 0:
          return 'warning'
        case 1:
          return 'primary'
        case 2:
          return 'success'
        case 3:
          return 'danger'
        case 4:
          return 'info'
      }
    }
  }
}
</script>

<style lang='less' scoped>
.text {
  margin: 10px;
  height: 30px;
  border-bottom: 1px dashed #ccc;
}
.listli {
  list-style: none;
  height: 200px;
  margin-bottom: 15px;
  .pic {
    float: left;
  }
  .listbox {
    width: 300px;
    height: 100%;
    float: left;
    display: flex;
    flex-direction: column;
    margin-left: 15px;
    // align-content:space-around;
    justify-content: space-around;
  }
  .right {
    float: right;
    margin: 15px;
  }
}
ul {
  padding: 0;
  margin-left: 10px;
}
.header {
  padding-bottom: 20px;
  border-bottom: 1px dashed #999;
}
.box-card {
  margin: 30px 10px 10px;
  height: 300px;
}
.page {
  margin-top: 30px;
  display: flex;
  justify-content: center;
}
</style>
