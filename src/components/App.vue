<template>
  <div>
    这是app
    <div>
      <ul>
        <li><a v-link="'/home'">home</a></li>
        <li v-if="user"><a v-link="'/post'">发表文章</a></li>
        <li v-if="!user"><a v-link="'/reg'">注册</a></li>
        <li v-if="!user"><a v-link="'/log'">登录</a></li>
        <li v-if="user"><a href="/logout">退出登录</a></li>
      </ul>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
  import Home from './Home.vue';
  export default {
    data(){
      return {
        user:user
      }
     
    }
  }
</script>