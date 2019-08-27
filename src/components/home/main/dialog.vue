<template>
  <div>
    <div class="clearfix">
      <div
        class="imgpic"
        v-for="(item,index) in resdata"
        :ref="'de'+index"
        :key="index"
        @click="clickImg(item,index)"
      >
        <span>
          <i class="el-icon-success" :ref="'heh'+index"></i>
        </span>
        <img :src="item.url" />
      </div>
    </div>
    <div>
      <el-pagination background layout="prev, pager, next" :total="total"></el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      resdata: [],
      imgsrc: '',
      total: 1
    }
  },
  methods: {
    clickImg (item, index) {
      var itag = Array.from(
        this.$refs['de' + index][0].parentElement.getElementsByTagName('i')
      )
      itag.forEach(item => {
        item.style.display = 'none'
      })
      this.$refs['heh' + index][0].style.display = 'block'
      this.imgsrc = item.url
      this.$emit('getsrc', item.url, index)
    },
    getImg () {
      this.$axios({
        url: '/user/images',
        params: {
          per_page: 12
        }
      }).then(res => {
        this.resdata = res.data.results
        this.total = res.data.total_count
        console.log()
      })
    }
  },
  created () {
    this.getImg()
  }
}
</script>
<style lang="less" scoped>
.imgpic {
  width: 150px;
  height: 150px;
  float: left;
  margin: 5px;
  position: relative;
  i {
    position: absolute;
    right: 15px;
    bottom: 5px;
    font-size: 30px;
    color: #409eff;
    display: none;
  }
  img {
    width: 100%;
    height: 100%;
  }
}
</style>
