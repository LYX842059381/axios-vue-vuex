<template>
    <div id="app">
        <button @click="boxshow = !boxshow">点击展开/关闭</button>
        <button @click="a">点击展开</button>
        <button @click="b">点击关闭</button>
        <transition name="draw">   <!--这里的name 和 css 类名第一个字段要一样-->
            <div class="box"  v-show="boxshow"></div>
        </transition>
    </div>
</template>
<script>
  export default {
    data() {
        return {
            boxshow: false
        };
    },
    methods: {
    // 调用详情接口
    a() {
        this.boxshow = true
    },
    b() {
        this.boxshow = false
    }
  }
  }
</script>
<style>
.box{
    height:200px;width: 200px;
    background-color:black;
}
.draw-enter-active, .draw-leave-active {
    transition: all 1s ease;
}
.draw-enter, .draw-leave-to /* .fade-leave-active below version 2.1.8 */ {
    height: 0;
}
</style>
