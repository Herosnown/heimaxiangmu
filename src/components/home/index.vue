<template>
  <el-container class="page">
    <el-aside :width="width" class="aside">
      <com-side></com-side>
    </el-aside>
    <el-container>
      <el-header class="header">
        <com-header></com-header>
      </el-header>
      <el-main class="main">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import eventBus from '../../eventBus'
export default {
  data () {
    return {
      width: '200px'
    }
  },
  created () {
    eventBus.$on('closeopen', () => {
      this.width = this.width === '200px' ? '40px' : '200px'
    })
  },
  mounted () {}
}
</script>

<style lang='less' scoped>
.page {
  height: 100vh;
  margin: 0;

  .aside {
    background-color: #2c3e50;
  }
}
.main {
  padding: 0;
}
</style>
