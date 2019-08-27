<template>
  <el-breadcrumb separator=">">
    <el-breadcrumb-item :to="{ path: '/home/refrence' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>
      <slot></slot>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {}
</script>

<style lang='less' scoped>
</style>
