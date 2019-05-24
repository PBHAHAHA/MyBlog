<template>
    <div class="main">
        <div class="pageOne">
            <Header></Header>
            <div class="head-cont">
                <h1 class="title">生活至简、思想至行</h1>
                <div class="search">
                    <input type="text" class="search-cont" @keyup.13="search()" v-model="searchString">
                    <span class="search-icon" @click="search()">
                        <i class="fa fa-search" aria-hidden="true" style="color:#fff;font-size:20px;line-height:40px;margin-left:18px"></i>
                    </span>
                </div>
                <div class="pageOne-cont">
                    <a href="https://weibo.com/3188912382/profile?rightmod=1&wvr=6&mod=personinfo&is_all=1"><i class="fa fa-weibo" aria-hidden="true"></i></a>
                    <a href="https://github.com/PBHAHAHA"><i class="fa fa-github" aria-hidden="true"></i></a>
                    <div class="wechat" @click="wechat()" @blur="wechat()">
                        <a class="wechat-a"><i class="fa fa-weixin" aria-hidden="true"></i></a>
                        <div class="wechat-img" v-if="wechatshow">
                            <img src="../assets/wchat.jpg" alt="">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="pageTwo">
            <b-container class="container" style="margin-top:20px;">
                <b-row class="pt-cont">
                    <b-col md="4" v-for="(item,index) in contents" :key="index" class="pt-Box">
                        <div class="pt-box">
                            <div class="pt-box-top">
                                <a class="pt-box-img">
                                    <img :src="item.imgURL" alt="img">
                                </a>
                                <span class="desc">{{item.tags}}</span>
                            </div>
                            <div class="pt-box-bottom" @click="toCont(index)">
                                <h5 style="text-align:center">{{item.title}}</h5>
                                <div v-html="item.part" class="part"></div>
                                <span class="pt-time">
                                    <i class="fa fa-clock-o" aria-hidden="true"></i>
                                    {{item.date | formatDate}}
                                    <span style="margin-left:155px;">查看详情</span>
                                </span>
                            </div>
                        </div>
                    </b-col>
                    
                </b-row>
                <b-pagination @click="changePage()" size="md" :total-rows="page.totalRows" v-model="page.currentPage" :per-page="page.prePage">
                </b-pagination>
                <a href="">NEXT ===></a>
            </b-container>
        </div>
        <div class="pageThree">
            <b-container style="margin-top:20px;
            padding-top:30px;">
                <b-row>
                    <b-col md='4'>
                        <h5>最新文章</h5>
                        <b-row>
                            <b-col v-for="(item,index) in newConts" :key="index" md="12" class="newConts" @click="toCont(index)">
                                <b-media>
                                    <b-img  slot = "aside" blank-color = "#ccc" :src="item.imgURL" width = "90" height="90" alt = "img"/> 
                                    <h5 class = "mt-0">{{item.title}}</h5> 
                                    <p class = 'mb-0'>
                                    {{item.date | formatDate}}
                                    </p> 
                                </b-media>
                            </b-col>
                        </b-row>
                    </b-col>
                    <b-col md='4'>
                        <h5>标签</h5>
                        <b-button size="sm" v-for="(item,index) in tags" :key="index" style="margin:10px 10px 10px 0">{{item.tags}}</b-button>
                    </b-col>
                    <b-col md='4'>
                        <h5>友情链接</h5>
                        <b-button size="sm">121312</b-button>
                        <b-button size="sm">121312</b-button>
                    </b-col>
                </b-row>
            </b-container>
        </div>
        <div class="footer">
            <p>Proudly published with Ghost | Theme Maple by @Ponat---蒲兵  </p>

            <p>蒲兵© 2015-2018 • All rights reserved.</p>

            <p>川ICP备1701934002</p>
        </div>
    </div>
   
</template>
<script>
// import axios from 'axios'
import Header from '../components/header'
import essayApi from '../http/home.js';
import tagsApi from '../http/tags.js';
import {formatDate} from '../utils/date.js'
import Oh from '../utils/oh.js'
export default {
    name: 'Index',
    data(){
        return {
            wechatshow: false,
            page: {
                totalRows:0,//总条数
                currentPage:1, //当前页
                prePage: 6, //每页显示多少条
            },
            img:require('../assets/cont1.jpg'),
            contents:[],
            allContents:[],
            searchString: '',//搜索字符串
            newConts:[ //最新文章
                {
                    imgUrl:require('../assets/cont1.jpg'),
                    title: '技术',
                    time: '2019.1.21'
                },{
                    imgUrl:require('../assets/cont1.jpg'),
                    title: '技术',
                    time: '2019.1.21'
                },{
                    imgUrl:require('../assets/cont1.jpg'),
                    title: '技术',
                    time: '2019.1.21'
                }
            ],
            tags:[]
        }
    },
    created(){
        console.log(this.page.currentPage)
    },
    watch: {
        'page.currentPage' : 'changePage'
    },
    methods: {
        //获取所有文章
        getEssay(){
            essayApi.getEssay({},(res) => {
                console.log(res)
                if(res.status === 200) {
                    this.allContents = res.data.reverse()
                    this.newConts = res.data.slice(0,3)
                    console.log(this.newConts)
                    //设置分页数据
                    this.setPage();

                }else{
                    console.log(err)
                }
            })
        },
        //getTags
        getTags(){
            tagsApi.getTags({},res => {
                this.tags = res.data
                console.log(this.tags)
            })
        },
        setPage(){
            //分页属性设置
            this.page.totalRows   = this.allContents.length;
            this.page.currentPage = 1;
            this.page.prePage     = 6
            //设置默认的分页数据
            this.contents = this.allContents.filter((item,index) => {
                // console.log(item)
                // console.log(index)
                return index < this.page.prePage;
            })
        },
        changePage(){
            const currentPage = this.page.currentPage
            //获取当前页
            let index = this.page.prePage * (currentPage-1);
            //数据的总数
            let num = this.page.prePage * currentPage;
            //容器
            let tables = [];

            for(let i = index;i<num;i++){
                if(this.allContents[i]){
                    tables.push(this.allContents[i])
                }
                this.contents = tables
            }
        },
        toCont(index){
            this.$router.push('/contents?id='+this.contents[index]._id)
        },
        //搜索功能
        search(){
            console.log('click')
            console.log(typeof(this.searchString))
            essayApi.getSearch({searchString:this.searchString},res => {
                console.log(res)
                if(res.data.length!==0){
                    this.$router.push('/searchList?searchString='+this.searchString)
                }else{
                    var sure = new Oh()
                    sure.alert('没有你搜索的内容！')
                }
            })
        },
        wechat(){
            this.wechatshow = !this.wechatshow
        }
    },
    filters: {
        formatDate(time) {
            var date = new Date(time);
            return formatDate(date, 'yyyy-MM-dd');
        }
    },
    mounted() {
        this.changePage()
        this.getTags()
    },
    updated() {
        console.log(this.searchString)
    },
    created() {
        this.getEssay()
        
        // this.$axios.get('http://localhost:8686/api/essay')
    },
    components:{
        Header
    }
}
</script>
<style scoped>
    @import url('../style/index.css');
    .wechat {
        display: inline
    }
    .wechat-img{
        width: 100px;
        height: 100px;
        position: absolute;
        left: 50%;
        margin-left: -50px;
        background-color: #fff;
    }
    .wechat-img img{
        position: absolute;
        z-index: 999;
        margin-left: -50px;
        width: 100px;
        height: 100px;
    }
</style>

<style>
    .pt-box .pt-box-bottom .part h1,
    .pt-box .pt-box-bottom .part h2,
    .pt-box .pt-box-bottom .part h3,
    .pt-box .pt-box-bottom .part h4,
    .pt-box .pt-box-bottom .part h5,
    .pt-box .pt-box-bottom .part h6{
        font-size: 14px;
        font-weight:normal
    }
</style>
