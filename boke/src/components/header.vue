<template>
 <div class="header">
    <b-navbar toggleable="md" type="dark" variant="info">
      <div class="container">
        <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
        <b-navbar-brand href="#" class="d-inline-block align-top">
          <span class="logo">
            <img src="../assets/logo.png" alt="" width="50" height="50">
            <span>Ponat</span>
          </span>
        </b-navbar-brand>
        <b-collapse is-nav id="nav_collapse">
          <b-navbar-nav  style="margin:0 auto;" class="head-nav">
            <b-nav-item href="/">首页</b-nav-item>
            <b-nav-item v-for="(item,index) in tags" @click="changePage(item.tags)" :key="index">{{item.tags}}</b-nav-item>
            <!-- <b-nav-item href="#">随笔</b-nav-item>
            <b-nav-item href="#">前端</b-nav-item>-->
            <b-nav-item><router-link class="about" to="/about">关于我</router-link></b-nav-item> 
          </b-navbar-nav>
      </b-collapse>
      </div>
  </b-navbar>
</div>
</template>
<script>
import tagsApi from '../http/tags.js'
export default {
  name:'Header',
  data(){
    return {
      tags:[]
    }
  },
  methods: {
    getTags(){
      tagsApi.getTags({},res => {
        this.tags = res.data
        console.log(this.tags)
      })
    },
    changePage(tags){
      console.log(tags)
      this.$router.push('/tagsCont?tags='+tags)
    }
  },
  mounted() {
    this.getTags()
  },
}
</script>
<style scoped>
  .header .navbar{
    background-color: rgba(0, 0, 0, .5) !important;
  }
  .container{
    position: relative;
  }
  .head-nav{
    position: relative;
    z-index: 666
  }
  .head-nav:hover{
    color: #f00
  }
  .logo{
    position: absolute;
    z-index: 0;
    top: -5px;
    right: 10px;
    font-size: 16px;
    margin:0 0 0 80px;
  }
  .about{
    color: rgba(255, 255, 255, .5);
    text-decoration: none
  }
  .about:hover{
    color: rgba(255, 255, 255, .65);
  }
  .logo span{display:none}
  @media (min-width: 768px) { 
    .logo { font-size: 20px;left: 20px; } 
    .logo span{display:inline-block}
    } 
</style>

