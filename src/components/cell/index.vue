<template>
  <!-- router-link，定义tag为li标签 -->
  <router-link tag="li" class="cell-item cell-border-bottom" :to="{ name: 'detail', params: { artTarget: target }}">
    <h3>{{title || ''}}</h3>
    <p class="desc" v-html="desc"></p>
    <div class="cell-bottom">
      <div class="author">
        <img v-if="formatUser.avatar" :src="formatUser.avatar" alt="img">
        <span>{{formatUser.screen_name || ''}} · {{column || ''}}</span>
      </div>
      <div class="create-time">{{formatTime}}</div>
    </div>
  </router-link>
</template>

<script>
import fecha from 'fecha'
export default {
  name: 'cell',
  computed: {
    formatTime() {
      let { created_time } = this
      if (!created_time) return ""
      return fecha.format(new Date(created_time), "MM-DD hh:mm")
    },
    // 格式化数据
    formatUser() {
      const { user = {} } = this
      let { photo_domain, profile_image_url, screen_name } = user
      let avatar =
        photo_domain + profile_image_url.split(",")[2] ||
        profile_image_url.split(",")[0]
      return {
        screen_name: screen_name || "",
        avatar: avatar || ""
      }
    }
  },
  props: {
    title: String,
    desc: String,
    created_time: [Number, String],
    column: String,
    target: String,
    user: Object
  }
}
</script>

<style lang="scss" scoped>
.cell-item {
  width: 100%;
  box-sizing: border-box;
  padding: 30px;
  background: #fff;
  &:active {
    background: rgba(246, 247, 250, 0.8);
  }
  &:last-child {
    &:after {
      display: none;
    }
  }
  h3 {
    text-align: left;
    font-size: 34px;
    line-height: 1.3;
    font-weight: 700;
    margin-bottom: 20px;
  }
  .desc {
    text-align: left;
    font-size: 26px;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    line-height: 1.6em;
    max-height: 3.2em;
    color: #666;
  }
  .cell-bottom {
    display: table;
    width: 100%;
    margin-top: 36px;
    font-size: 24px;
    color: #aaa;
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
}
</style>
