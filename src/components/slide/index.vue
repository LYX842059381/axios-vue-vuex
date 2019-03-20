<template>
  <div class="slide-wrap" ref="slide">
    <div class="slide-content" ref="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  name: 'slide',
  data() {
    return {
      instance: null
    }
  },
  mounted() {
    // 确保在dom渲染完成后初始化better-scroll
    const { $nextTick, init } = this
    $nextTick(init)
  },
  methods: {
    init() {
      const { $el } = this
      this._setWidth()
      // better-scroll 组件配置项
      this.instance = new BScroll($el, {
        probeType: 2,
        click: true,
        tap: true,
        scrollX: true,
        scrollY: false,
        momentum: true
      })
    },
    _setWidth() {
      const { $refs } = this
      let children = $refs.content.children
      // Array.from 将类数组转成数组
      // reduce 累加方法
      let width = Array.from(children).reduce((prev, cur, index, arr) => {
        return prev + cur.clientWidth
      }, 0)
      this.$refs.content.style.width = width + "px"
    }
  }
}
</script>

<style lang="scss" scoped>
.slide-wrap {
  width: 100%;
  position: relative;
  overflow: hidden;
}
.slide-content {
  width: 100%;
  position: relative;
  white-space: nowrap;
}
</style>
