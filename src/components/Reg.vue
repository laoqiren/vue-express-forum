<template>
    <div>
        <form>
            <label for="name">用户名
                <input type="text" id="name" v-model="name"/>
            </label>
            <label for="key">密码
                <input type="password" id="key" v-model="password"/>
            </label>
            <input type="button" value="注册" @click="handleReg"/>
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
                $.ajax({
                    type:'POST',
                    url:'reg',
                    data:{
                        name:that.name,
                        password:that.password
                    }
                });
            }
        }
    }
</script>