<template>
    <div>
        <form>
            <label for="title">标题
                <input type="text" id="title" v-model="title"/>
            </label>
            <label for="content">内容
                <input type="textarea" id="content" v-model="content"/>
            </label>
            <input type="button" value="发表" @click="handlePost"/>
        </form>
    </div>
</template>

<script>
    import $ from 'jquery';

    export default{
        data(){
            return {
                title:'',
                content:''
            }
        },
        methods:{
            handlePost(){
                let _that = this;
                $.ajax({
                    type:'POST',
                    url:'/post',
                    data:{
                        access_token:localStorage.getItem("token"),
                        title:_that.title,
                        content:_that.content
                    }
                })
            }
        }
    }
</script>