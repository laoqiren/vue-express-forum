<template>
    <div>
        <form v-if="!user">
            <div class="form-group">
                <label for="name">用户名
                    <input type="text" id="name" class="form-control"  v-model="name"/>
                </label>
                <label for="key">密码
                    <input type="password" class="form-control" id="key" v-model="password"/>
                </label>
                <input type="button" class="btn btn-block" value="登录" @click="handleLog"/>
            </div>
        </form>
        <p v-else>您已经登录</p>
    </div>
</template>

<script>
    import $ from 'jquery';
    export default {
        data(){
            return {
                name:'',
                password:'',
                user:this.existUser
            }
        },
        props:['existUser'],
        methods:{
            handleLog(){
                let _this = this;
                let content = JSON.stringify({
                        name:_this.name,
                        password:_this.password
                    });
                fetch('http://localhost:3000/log',{
                    method:'POST',
                    headers: {
                        "Content-Type": "application/json",
                        "Content-Length": content.length.toString(),
                    },
                    body: content
                    }).then(function(res){
                        if(res.ok){
                            res.json().then(function(data){
                            localStorage.setItem("token",data.token);
                            _this.user = data.user;
                            _this.$dispatch('log',data.user);
                            _this.$router.go('/');
                            });
                        } else {
                            _this.user = undefined;
                        }
                    });
            }
        }
    }
</script>