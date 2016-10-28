<template>
    <div>
        <form>
            <label for="name">用户名
                <input type="text" id="name" v-model="name"/>
            </label>
            <label for="key">密码
                <input type="password" id="key" v-model="password"/>
            </label>
            <input type="button" value="登录" @click="handleLog"/>
        </form>
    </div>
</template>

<script>
    import $ from 'jquery';
    export default {
        data(){
            return {
                name:'',
                password:''
            }
        },
        methods:{
            handleLog(){
                let _this = this;
                let content = JSON.stringify({
                        name:_this.name,
                        password:_this.password
                    });
                fetch('/log',{
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
                            _this.$router.go('/');
                            window.location.reload();
                            });
                        } else {
                            _this.user = undefined;
                        }
                    });
            }
        }
    }
</script>