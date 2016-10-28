<template>
  <div>
    这是app,用户{{user.name}}
    <div>
      <ul>
        <li><a v-link="'/home'">home</a></li>
        <li v-if="user"><a v-link="'/post'">发表文章</a></li>
        <li v-if="!user"><a v-link="'/reg'">注册</a></li>
        <li v-if="!user"><a v-link="'/log'">登录</a></li>
        <li v-if="user"><a href="/logout" @click="logOut">退出登录</a></li>
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
      var content = JSON.stringify({
            access_token:token
          })
      if(token){
        fetch('http://localhost:3000/user',{
          method:'POST',
          headers: {
                      "Content-Type": "application/json",
                      "Content-Length": content.length.toString(),
                    },
          body: content
        }).then(function(res){
          if(res.ok){
            res.json().then(function(data){
              console.log(data.user.name);
              _this.user = data.user;
            });
          } else {
            _this.user = undefined;
          }
        });
      } else {
        this.user = undefined;
      }
    },
    data(){
      return {
        user:undefined
      }
    },
    methods:{
      logOut(e){
        e.preventDefault();
        localStorage.removeItem("token");
        this.$router.go("/");
        window.location.reload();
      }
    }
  }
</script>