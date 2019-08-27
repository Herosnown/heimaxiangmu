<template>
  <el-row :gutter="20" class="header">
    <el-col :span="10 ">
      <div class="grid-content bg-purple">
        <i class="el-icon-s-fold"></i>&nbsp;&nbsp;
        <span>江苏传智播客教育科技股份有限公司</span>
      </div>
    </el-col>
    <el-col :span="8" class="right">
      <div class="grid-content bg-purple">
        <el-input placeholder="请输入内容" v-model="search" class="search">
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
      </div>&nbsp;&nbsp;
      <span>消息</span>
      <div class="personimg">
        <img :src="dataform.photo" />
      </div>
      <el-dropdown @command="cancel">
        <span class="el-dropdown-link">
          {{dataform.name}}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人信息</el-dropdown-item>
          <el-dropdown-item>git地址</el-dropdown-item>
          <el-dropdown-item command="t" divided>退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-col>
  </el-row>
</template>

<script>
import eventBus from '../../eventBus'
export default {
  data () {
    return {
      search: '',
      dataform: {
        name: '',
        photo: ''
      }
    }
  },
  methods: {
    getinfo () {
      this.$axios({
        url: 'user/profile'
      }).then(res => {
        this.dataform = res.data
      })
    },
    cancel (command) {
      if (command !== 't') {
        return
      }
      var bool = confirm('确定退出吗')
      if (bool) {
        window.localStorage.clear()
        this.$router.push('/login')
      }
    }
  },
  created () {
    this.getinfo()
    eventBus.$on('changeuerinfo', () => {
      this.getinfo()
    })
  }
}
</script>

<style lang='less' scoped>
.header {
  height: 100%;
  .grid-content {
    line-height: 60px;
    width: 60%;
    height: 60px;
    float: left;
  }
  .personimg {
    width: 45px;
    height: 45px;
    float: left;
    background-size: 100%;
    border-radius: 50%;
    margin: 0 15px;
    overflow: hidden;
    line-height: 45px;
    img {
      width: 100%;
      height: 100%;
      vertical-align: middle;
    }
  }
}
.el-icon-s-fold {
  font-size: 20px;
}
.right {
  float: right;
  display: flex;
  align-items: center;
}
.el-dropdown-link {
  cursor: pointer;
  color: black;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>
