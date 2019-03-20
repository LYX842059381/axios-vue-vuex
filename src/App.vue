<template>
  <div class="page flex-ver">
    <router-view></router-view>
  </div>
</template>


<script>
export default {
  name: 'app',
}
</script>

<style lang="scss">
.page {
  width: 100%;
  height: 100%;
  position: relative;
}
</style>

