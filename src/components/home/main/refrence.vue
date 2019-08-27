<template>
  <div class="frence">
    <div id="refrence"></div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      total_count: 1,
      typelist: [],
      idlist: [],
      countlist: []
    }
  },
  methods: {
    dravpic () {
      let myChart = this.$echarts.init(document.getElementById('refrence'))
      myChart.setOption({
        title: { text: '文章总量为' + this.total_count },
        tooltip: {},
        xAxis: {
          data: this.typelist
        },
        yAxis: {},
        series: [
          {
            name: '频道类型',
            type: 'bar',
            data: this.countlist
          }
        ]
      })
    }
  },
  created () {
    this.$axios({
      url: '/articles'
    }).then(res => {
      this.total_count = res.data.total_count
    })
    this.$axios({
      url: 'channels'
    }).then(res => {
      this.typelist = res.data.channels.map(itm => {
        return itm.name
      })

      this.idlist = res.data.channels.map(itm => {
        return itm.id
      })
      this.idlist.map((itm, index, arr) => {
        if (index < arr.length - 1) {
          this.$axios({
            url: 'articles',
            params: {
              channel_id: itm
            }
          }).then(res => {
            this.countlist.push(res.data.total_count)
          })
        } else {
          this.$axios({
            url: 'articles',
            params: {
              channel_id: itm
            }
          }).then(res => {
            this.countlist.push(res.data.total_count)
            console.log(this.typelist)
            this.dravpic()
          })
        }
      })
    })
  }
}
</script>

<style>
.frence {
  width: 100%;
  height: 100vh;
  background: url('../../../assets/img/main.jpg') no-repeat;
  background-size: cover;
}
#refrence {
  width: 2300px;
  height: 900px;
}
</style>
