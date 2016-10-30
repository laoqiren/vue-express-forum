<template>
    <div>
        <ul class="nav">
            <li><a v-link="'/home'">首页</a></li>
            <li v-if="user"><a v-link="'/post'">发表文章</a></li>
            <li v-if="!user"><a v-link="'/reg'">注册</a></li>
            <li v-if="!user"><a v-link="'/log'">登录</a></li>
            <li v-if="user"><a href="/logout" @click="logOut">退出登录</a></li>
        </ul>
    </div>
</template>

<script>
    import Log from './Log.vue';
    import Reg from './Reg.vue'
    export default {
        data(){
            return {
                user:this.existUser
            }
            
        },
        components:{
            Log,
            Reg
        },
        props:['existUser'],
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