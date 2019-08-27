<template>
  <div>
    <div class="logo123">
      <img src="../../assets/img/logo.png" />
    </div>
    <el-col :span="24">
      <el-menu
        :default-active="activeIndex"
        background-color="#2c3e50"
        active-background-color="#ffd04b"
        text-color="#fff"
        active-text-color="#ffd04b"
        style="border-right:0"
        @select="handleSelect"
      >
        <el-menu-item index="refrence">
          <i class="el-icon-menu"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-submenu index="content">
          <template slot="title">
            <span>内容管理</span>
          </template>
          <el-menu-item index="2-1">发布文章</el-menu-item>
          <el-menu-item index="2-2">内容列表</el-menu-item>
          <el-menu-item index="2-3">评论列表</el-menu-item>
          <el-menu-item index="2-4">素材管理</el-menu-item>
        </el-submenu>
        <el-submenu index="fans">
          <template slot="title">
            <span>粉丝管理</span>
          </template>
          <el-menu-item index="3-1">图文数据</el-menu-item>
          <el-menu-item index="3-2">粉丝概况</el-menu-item>
          <el-menu-item index="3-3">粉丝画像</el-menu-item>
          <el-menu-item index="3-4">粉丝列表</el-menu-item>
        </el-submenu>
        <el-menu-item index="accont">
          <span slot="title">账户信息</span>
        </el-menu-item>
      </el-menu>
    </el-col>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeIndex: 'refrence'
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      keyPath[1]
        ? this.$router.push('/home/' + keyPath[0] + '/' + keyPath[1])
        : this.$router.push('/home/' + keyPath[0])
    }
  }
}
</script>

<style lang='less' scoped>
.logo123 {
  height: 60px;
  background-color: #2e2f32;
  text-align: center;
  line-height: 60px;
  img {
    width: 70%;
    vertical-align: middle;
  }
}
</style>
