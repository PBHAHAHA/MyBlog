<template>
    <div class="menu-wrap">
        <el-menu
        class="el-menu-vertical-demo"
        :router="true"
        unique-opened
        :default-active="$route.path"
        background-color="#2d3a4b"
        text-color="#fff"
        >
            <el-menu-item index="/indexInfo">
                <i class="el-icon-menu"></i>
                <span slot="title">首页</span>
            </el-menu-item>
            <el-submenu index="/addessay">
                <template slot="title" >
                    <i class="fa fa-book" aria-hidden="true"></i>
                    <span slot="title">文章管理</span>
                </template>
                <el-menu-item index="/addessay">
                    <i class="fa fa-pencil-square" aria-hidden="true"></i>
                    <span slot="title">写文章</span>
                </el-menu-item>
                <el-menu-item index="/essaylist">
                    <i class="fa fa-list-ul" aria-hidden="true"></i>
                    <span slot="title">文章列表</span>
                </el-menu-item>
                <el-menu-item index="/essayTags">
                    <i class="fa fa-sticky-note" aria-hidden="true"></i>
                    <span slot="title">文章分类</span>
                </el-menu-item>
            </el-submenu>
            <el-menu-item index="/remark">
                <i class="fa fa-comments" aria-hidden="true"></i>
                <span slot="title">评论管理</span>
            </el-menu-item>
            <el-submenu index="">
                <template slot="title" >
                    <i class="fa fa-cog" aria-hidden="true"></i>
                    <span slot="title">系统设置</span>
                </template>
                <el-menu-item index="2">
                    <i class="fa fa-minus-square" aria-hidden="true"></i>
                    <span slot="title">导航设置</span>
                </el-menu-item>
                <el-menu-item index="/setting">
                    <i class="fa fa-wrench" aria-hidden="true"></i>
                    <span slot="title">网站设置</span>
                </el-menu-item>
            </el-submenu>
        </el-menu>
    </div>
</template>
<script>
export default {
    name: 'Menu'
}
</script>
<style scoped>
    .menu-wrap{
        height: 100%
    }
    .el-menu-vertical-demo i{
        font-size: 18px;
        width: 18px;
        height: 18px;
        margin-right: 10px;
    }
</style>

