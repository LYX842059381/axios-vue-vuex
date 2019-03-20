
<template>
  <div class="new-item flex-ver flex__item">
    <!-- 顶部slide，可左右滑动 -->
    <nav-bar :type="type" v-model="typeName"></nav-bar>
    <!-- 使用main标签，语义化，更易理解，方便搜索引擎爬虫解析 -->
    <main class="new-content flex__item">
      <!-- 使用无序列表 -->
      <ul class="new-content-warp">
        <cell
          v-for="(item,index) in newsList"
          :key="index"
          :title="item.data.title"
          :desc="item.data.description"
          :created_time="item.data.created_at"
          :user="item.data.user"
          :column="item.column"
          :target="item.data.target"
        >
        </cell>
      </ul>
    </main>
  </div>
</template>

<script>
// @ is an alias to /src，自定义别名
import navBar from '@/components/navBar'
import cell from '@/components/cell'
import { fetchList } from '@/apis'
export default {
  name: 'home',
  data() {
    return {
      newsList: [],
      typeName: '',
      title: '头条',
      type: 0,
      page: 1
    }
  },
  watch: {
    typeName(val) {
      if (val === "头条") this.typeName = ''
      this.title = val || '头条'
    },
    $route: function(router) {
      const { params } = router
      this.type = params.newsType
      this.init()
    }
  },
  components: {
    navBar,
    cell
  },
  created() {
    const { params } = this.$route
    this.type = params.newsType || 0
    this.init()
  },
  methods: {
    init() {
      const vm = this
      // 解构
      const { page, typeName } = vm
      fetchList(page, typeName).then(
        res => {
          const { content } = res && res.data
          vm.newsList = content || []
        },
        error => {
          vm.newsList = []
        }
      )
    }
  }
}
</script>

<style lang="scss" scoped>
.news-content {
  position: relative;
}
.new-content {
  height: 100%;
  overflow: hidden;
  position: relative;
}
.new-content-warp {
  overflow: auto;
  height: 100%;
  width: 100%;
}
</style>
