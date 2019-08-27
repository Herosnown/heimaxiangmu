<template>
  <div>
    <com-bread>评论列表</com-bread>
    <el-table :data="conment" style="width: 100%">
      <el-table-column prop="title" label="标题" width="400"></el-table-column>
      <el-table-column :formatter="formatter" prop="comment_status" label="评论状态" width="200"></el-table-column>
      <el-table-column prop="total_comment_count" label="总评论数"></el-table-column>
      <el-table-column prop="fans_comment_count" label="粉丝评论数"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="obj">
          <el-button type="text">修改评论</el-button>
          <el-button
            type="text"
            @click="modifyStatus(obj.row)"
          >{{obj.row.comment_status?'关闭评论':'打开评论'}}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="box">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total_count"
        class="page"
        @current-change="pagechange"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      conment: [],
      requests: {
        page: 1,
        response_type: 'comment'
      },
      total_count: 1
    }
  },
  methods: {
    // costatus (index, row) {
    //   this.status = row.comment_status ? '打开评论' : '关闭评论'
    // },
    pagechange (nowpage) {
      this.requests.page = nowpage
      this.fn(this.requests)
    },
    fn (params) {
      this.$axios({
        url: '/articles',
        params
      }).then(res => {
        this.conment = res.data.results
        this.total_count = res.data.total_count
      })
    },
    modifyStatus (row) {
      var str = row.comment_status ? '关闭' : '打开'
      this.$confirm(`您确定${str}评论吗`)
        .then(() => {
          this.$axios({
            method: 'put',
            url: '/comments/status?article_id=' + row.id.toString(),
            data: {
              allow_comment: !row.comment_status
            }
          })
        })
        .then(() => {
          row.comment_status = !row.comment_status
          this.fn(this.requests)
        })
    },
    formatter (row, column, cellValue, index) {
      return (cellValue = cellValue ? '正常' : '关闭')
    }
  },

  created () {
    this.fn(this.requests)
  }
}
</script>

<style lang='less' scoped>
.box {
  display: flex;
  justify-content: center;
  .page {
    margin: 25px auto;
  }
}
</style>
