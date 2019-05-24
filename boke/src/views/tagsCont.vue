<template>
    <div class="main">
        <HeadDesc :datas="tags"></HeadDesc>
        <div class="cont">
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
import HeadDesc from '../components/headDesc'
import TagsContApi from '../http/home'
import {formatDate} from '../utils/date.js';
export default {
    name: 'TagsCont',
    components:{
        HeadDesc
    },
    data() {
        return {
            contents:[],
            tags:this.$route.query.tags
        }
    },
    methods: {
        getTagsCont(){
            TagsContApi.getTagsCont({tags:this.tags},(res) => {
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
        this.getTagsCont()
    },
}
</script>
<style scoped>
    @import url('../style/index.css');
    .cont{
        margin-top: 15px;
    }
</style>

