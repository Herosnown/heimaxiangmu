<template>
  <el-container class="page">
    <el-aside width="200px" class="aside">
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
// import aside from './aside'
// import header from './header'
// export default {
//   components: {
//     'com-side': aside,
//     'com-header': header
//   }
// }
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
