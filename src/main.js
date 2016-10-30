import Vue from 'vue';
import App from './components/App.vue';
import Home from './components/Home.vue';
import Log from './components/Log.vue';
import Post from './components/Post.vue';
import Reg from './components/Reg.vue';
import My from './components/My.vue';
import stylesheets from './assets/style/main.css';
const VueRouter = require('vue-router');

Vue.use(VueRouter);
let router = new VueRouter();

router.map({
  "/log":{
    component:Log
  },
  "/reg":{
    component:Reg
  },
  "/home":{
    component:Home
  },
  "/post":{
    component:Post
  },
  "my":{
    component:My
  }
});
router.redirect({
  "*":"/home"
});
router.start(App,"#app");