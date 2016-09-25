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
                $.ajax({
                    type:'POST',
                    url:'/log',
                    data:{
                        name:_this.name,
                        password:_this.password
                    }
                })
            }
        }
    }
</script>