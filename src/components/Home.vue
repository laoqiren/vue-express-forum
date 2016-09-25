<template>
    <div>
        <h1>首页</h1>
        <div>
            <div v-for="post in posts">
                <h3>题目:{{post.title}}</h3>
                <span>作者:{{post.name}}</span>
                <p>内容:{{post.content}}</p>
            </div>
        </div>
    </div>
</template>

<script>
    export default{
        data(){
            return {
                user:user,
                posts:posts
            }
        }
    }
</script>