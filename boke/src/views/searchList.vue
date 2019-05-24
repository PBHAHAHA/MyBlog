<template>
    <div>
        <div class="main">
            <HeadDesc :datas="searchString"></HeadDesc>
        </div>
        <div class="list">
            <b-container>
                <b-row class="pt-cont">
                    <b-col md="4" v-for="(item,index) in contents" :key="index" class="pt-Box">
                        <div class="pt-box">
                            <div class="pt-box-top">
                                <a class="pt-box-img" >
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
            </b-container>
        </div>
    </div>
</template>
<script>
import Header from '../components/header';;
import HeadDesc from '../components/headDesc';
import essayApi from '../http/home.js';
import {formatDate} from '../utils/date.js';
export default {
    name: 'Contents',
    components:{
        HeadDesc
    },
    data() {
        return {
            searchString: this.$route.query.searchString,
            contents:[]
        }
    },
    methods: {
        //搜索功能
        search(){
            console.log('click')
            console.log(typeof(this.searchString))
            essayApi.getSearch({searchString:this.searchString},res => {
                this.contents = res.data
            })
        },
        toCont(index){
            this.$router.push('/contents?id='+this.contents[index]._id)
        }
    },
    filters: {
        formatDate(time) {
            var date = new Date(time);
            return formatDate(date, 'yyyy-MM-dd');
        }
    },
    mounted() {
        this.search()
        console.log(this.searchString)
    },
}
</script>
<style scoped> 
    @import url('../style/index.css');
    .list{
        margin-top: 12px;
    }
</style>
