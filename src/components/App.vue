<template>
  <div>
    这是app,用户{{user.name}}
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
  import $ from 'jquery';
  export default {
    created(){
      var token = localStorage.getItem("token");
      var _this = this;
      if(token){
        $.ajax({
          url:'http://localhost:3000/user',
          type:'POST',
          data:{
            access_token:token
          }
        }).done(function(res){
          console.log(res.user.name);
          _this.user = res.user;
        })
      }
    },
    data(){
      return {
        user:undefined
      }
    }
  }
</script>