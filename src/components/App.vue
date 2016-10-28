<template>
  <div>
      <header>
        <h1>多人自由论坛</h1>
        <p class="user" v-if="user">用户:<span style="color:white">{{user.name}}</span></p>
      </header>
      
    <ul class="nav">
      <li><a v-link="'/home'">首页</a></li>
        <li v-if="user"><a v-link="'/post'">发表文章</a></li>
        <li v-if="!user"><a v-link="'/reg'">注册</a></li>
        <li v-if="!user"><a v-link="'/log'">登录</a></li>
        <li v-if="user"><a href="/logout" @click="logOut">退出登录</a></li>
    </ul>
    <router-view></router-view>
  </div>
</template>

<style lang="less" scoped>
  header {
    width:100%;
    height:15%;
    display:flex;
    justify-content:center;
    flex-direction:column;
    align-items:center;
    flex-wrap:wrap;
    font-weight:bold;
    color:yellow;
    background-color:#00CD00;
    h1 {
      font-size:1.2em;
    }
    .user {
      font-size:1em;
    }
  }
  a {
    text-decoration:none
  }
</style>
<script>
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