<template>
    <div>
        <div class="list-group">
            <div class="list-group-item" v-for="post in posts">
                 <h3>标题:{{post.title}}</h3>
                <span>作者:{{post.name}}</span>
                <p>内容:{{post.content}}</p>
            </div>
        </div>
    </div>
</template>

<script>
    export default{
        created(){
            let _this = this;
             fetch('http://localhost:3000/post',{
                    method:'GET'
                    }).then(function(res){
                        if(res.ok){
                            res.json().then(function(data){
                                _this.posts = data.posts;
                            });
                        } else {
                           _this.posts = undefined;
                        }
                    });
        },
        data(){
            return {
                posts:[]
            }
        }
    }
</script>