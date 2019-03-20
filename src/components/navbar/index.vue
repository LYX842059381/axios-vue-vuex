<template>
  <header class="border-bottom-module">
    <slide>
      <router-link class="nav-title flex flex__center" :to="{ name: 'list', params: { newsType : item.type }}"
        v-for="(item,index) in paths" 
        :key="index"
        @click.native="btn(item.title)"
        replace
      >
        <span>{{item.title}}</span>
      </router-link>
    </slide>
  </header>
</template>


<script>
import slide from '@/components/slide'
import config from '@/config'

export default {
  name: "navBar",
  data() {
    return {}
  },
  computed: {
    paths() {
      let title = config.paths.filter(
        (item, index) => item.type == this.type
      )[0].title
      this.$emit("input", title)
      return config.paths || []
    }
  },
  components: {
    slide
  },
  props: {
    type: [Number, String]
  },
  methods: {
    btn(title) {
      this.$emit("input", title)
    }
  }
};
</script>

<style lang="scss" scoped>
header {
  width: 100%;
  background: #fff;
  height: 96px;
  position: relative;
  a {
    display: inline-block;
    height: 96px;
    line-height: 96px;
    width: 20vw;
    text-align: center;
    span {
      font-size: 28px;
      padding: 8px 18px;
      border-radius: 18px;
      background-color: #f6f7fa;
    }
    &.router-link-active {
      span {
        color: #3471d5;
        border: 1px solid #3471d5;
        background-color: transparent;
      }
    }
  }
}

</style>
