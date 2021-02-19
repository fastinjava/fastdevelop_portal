<template>
  <div>
    <el-button type="primary" @click="goToTop"
               style="padding: 20px;position: fixed;right: 20px;bottom: 20px;"
    ><i class="el-icon-caret-top"></i></el-button>
  </div>
</template>

<script>
  export default {
    name: "",
    methods: {
      goToTop() {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
      },
    }
  }
</script>

<style scoped>

</style>
