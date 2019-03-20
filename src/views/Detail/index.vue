<template>
  <main class="detail-item">
    <!-- 标题 -->
    <h2 class="title" v-text="formatContent.title"></h2>
    <div class="info">
      <div class="author">
        <img v-if="formatContent.avatar" :src="formatContent.avatar" alt="">
        <span>{{formatContent.author || ''}}</span>
      </div>
      <div class="create-time">{{formatContent.create_time || ''}}</div>
    </div>
    <!-- 正文部分 -->
    <article class="content cell-border-top" v-html="formatContent.detail"></article>
  </main>
</template>

<script>
import fecha from "fecha"
import { fetchArticle } from "@/apis"
export default {
  data() {
    return {
      content: null
    };
  },
  computed: {
    // 格式化数据
    formatContent() {
      let { content } = this
      if (!content) return {}
      let { author, create_time, title, avatar, detail } = content || {}
      // 时间处理
      let time =(create_time && fecha.format(new Date(Number(create_time)), "MM-DD hh:mm")) || ""
      return {
        author,
        create_time: time,
        title,
        avatar,
        detail
      };
    }
  },
  created() {
    this.init()
  },
  methods: {
    // 调用详情接口
    init() {
      const vm = this;
      const { params: {artTarget = ''} } = this.$route
      fetchArticle(artTarget).then(
        res => {
          const { content } = res && res.data
          vm.content = content
        },
        error => {
        }
      );
    }
  }
};
</script>

<style lang="scss" scoped>
.detail-item {
  position: relative;
  box-sizing: border-box;
  padding: 30px 26px;
  background: #fff;
}
.title {
  font-size: 42px;
  line-height: 1.2;
  font-weight: 600;
  text-align: left;
  padding-bottom: 40px;
}

.info {
  display: table;
  width: 100%;
  font-size: 24px;
  color: #aaa;
  padding-bottom: 40px;
  div {
    display: table-cell;
    vertical-align: middle;
  }
  .author {
    text-align: left;
    img {
      display: inline-block;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      overflow: hidden;
      vertical-align: middle;
    }
    span {
      margin-left: 8px;
      color: #999;
    }
  }
  .create-time {
    text-align: right;
    font-size: 24px;
    color: #999;
  }
}
.content {
  padding: 30px 0;
  padding-top: 40px;
  /deep/ * {
    font-size: 32px;
    text-align: justify;
    line-height: 1.4;
  }
  /deep/ img {
    max-width: 100%;
  }
  /deep/ p {
    padding-bottom: 16px;
    /deep/ b {
      font-weight: bold;
    }
  }
}
</style>
