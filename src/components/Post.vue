<template>
    <div>
        <p v-if="!user">
            请先登录
        </p>
        <form v-if="user" role="form">
            <div class="form-group">
                <label for="title">标题</label>
                <input type="text" id="title" class="form-control" v-model="title"/>
                <label for="content">内容
                    <textarea rols=40 cols=40 id="content" class="form-control" v-model="content"></textarea>
                </label>
                <input type="button" value="发表" class="btn btn-block" @click="handlePost"/>
            </div>
        </form>
    </div>
</template>

<script>
    import $ from 'jquery';

    export default{
        data(){
            return {
                title:'',
                content:'',
                user:this.existUser
            }
        },
        props:["existUser"],
        methods:{
            handlePost(){
                let _this = this;
                let content = JSON.stringify({
                        access_token:localStorage.getItem("token"),
                        title:_this.title,
                        content:_this.content
                    });
                fetch('http://localhost:3000/post',{
                    method:'POST',
                    headers: {
                        "Content-Type": "application/json",
                        "Content-Length": content.length.toString(),
                    },
                    body: content
                    }).then(function(res){
                        if(res.ok){  
                            _this.$router.go('/');
                            window.location.reload();
                        } else {
                           console.log("发表文章失败")
                        }
                    });
            }
        }
    }
</script>