<template>
  <div>
      <header>
        <h1>自由论坛,畅所欲言</h1>
        <p class="user" v-if="user">用户:<span style="color:white">{{user.name}}</span></p>
      </header>
      <div id="content">
        <router-view :exist-user="user"></router-view>
      </div>
      <div class="btn-wrap" id="footer">
          <div class="btn-group btn-group-justified">
              <a class="btn btn-default" v-link="'/home'"><i class="glyphicon glyphicon-home"></i><br/>首页</a>
              <a class="btn btn-default show-btn" v-link="'/post'"><i class="glyphicon glyphicon-plus"></i><br/><span v-if="hasNew" class="badge new-icon" >new</span>发表文章</a>
              <a class="btn btn-default"  v-link="'/my'"><i class="glyphicon glyphicon-tag"></i><br/>我的</a>
          </div>
      </div>
  </div>
</template>

<style lang="scss" scoped>
  header {
    width:100%;
    height:15%;
    display:flex;
    justify-content:center;
    flex-direction:column;
    align-items:center;
    flex-wrap:wrap;
    font-weight:bold;
    background-color:#00CD00;
    h1 {
      color:yellow;
      font-size:1.2em;
    }
    .user {
      font-size:1em;
    }
  }
  a {
    text-decoration:none;
  }
  #content {
    height:75%;
    overflow:scroll;
  }
  #footer {
    height:10%;
    display:flex;
    flex-direction:column;
    justify-content:flex-end;
    position:absolute;
    bottom:0;
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
    },
    events:{
      log(user){
        this.user = user;
      },
      logOut(){
        this.user = undefined;
      }
    }
  }
</script>