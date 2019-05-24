<template>
    <div class="admin-wrap">
        <div class="wrap-cont">
        <div class="admin-head">
            <div class="header">
                <div class="logo-box">
                    <img src="../assets/logo.png" alt="LOGO" class="head-logo">
                </div>       
                <div class="head-user">
                    <div class="avator">
                        <img src="../assets/default.png" alt="" style="width:100%;height:100%;">
                    </div>
                    <span style="float:right;margin:17px 30px 0 0;color:#666">Ponat</span>
                    <el-dropdown class="drop-cont">
                        <span class="el-dropdown-link">
                             <span class="user-icon"></span>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>个人信息</el-dropdown-item>
                            <el-dropdown-item>退出</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </div>
        </div>
        <div class="admin-content">
            <div class="admin-menu">
                <Menu></Menu>
            </div>
            <div class="admin-info">
                <router-view></router-view>
            </div>
        </div>
        </div>
    </div>
</template>
<script>
import Menu from '../components/menu'
export default {
    name: 'Home',
    components:{
        Menu
    },
    data() {
        return {
            avator: '../assets/logo.png'
        }
    },
}
</script>
<style scoped>
    .admin-wrap{
        /* background-color: #2d3a4b; */
        height: 100vh;
    }
    .wrap-cont{
        /* max-width: 100vw; */
        height: 100%;
        width: 100%;
        margin: 0 auto;
        position: relative;
    }
    .header{
        height: 55px;
        background-color: #fff;
        border-bottom: 1px solid #ccc
    }
    .head-logo{
        height: 55px;
    }
    .head-user{
        float: right;
        width: 150px;
        position: relative;
    }
    .avator{
        height: 53px;
        width: 55px;
        border-radius: 50%;
        background-color: transparent;
        overflow: hidden;
        display:inline-block
    }
    .drop-cont{
        position: absolute;
        right: 0;
        top: 50%;
        margin-top: 5px;
    }
    .logo-box{
        float: left;
        width: 225px;
        height: 55px;
        background-color: #2d3a4b;
    }
    .user-icon{
        border-top: 8px solid #666;
        border-left: 8px solid transparent;
        border-right: 8px solid transparent;
    }
    .admin-content{
        position: relative;
        height: -moz-calc(100% - 55px);
        height: -webkit-calc(100% - 55px);
        height: calc(100% - 55px);
       
    }
    .admin-menu{
        position: absolute;
        height: 100%;
        width: 225px;
        /* border-right: 2px solid #2d3a4b; */
        background-color: #2d3a4b;
    }
    .admin-info{
        margin-left: 225px;
        height: 100%;
        /* width: 100%; */
        background-color: #f8f9fb;
         width: -moz-calc(100%-225px);
        width: -webkit-calc(100%-225px);
        width: calc(100%-225px);
    }
    .el-menu{
        border-right: 0px;
    }
</style>
