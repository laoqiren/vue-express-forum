<template>
    <div>
        <form>
            <div class="form-group">
                <label for="name">用户名
                    <input type="text" id="name" v-model="name" class="form-control"/>
                </label>
                <label for="key">密码
                    <input type="password" id="key" v-model="password" class="form-control"/>
                </label>
                <input type="button" value="注册" class="btn btn-block" @click="handleReg"/>
            </div>
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
            handleReg(){
                let that = this;
                let content = JSON.stringify({
                        name:that.name,
                        password:that.password
                    })
                fetch('http://localhost:3000/reg',{
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
                                that.$router.go('/');
                                window.location.reload();
                            });
                        } else {
                            that.user = undefined;
                        }
                    });
            }
        }
    }
</script>