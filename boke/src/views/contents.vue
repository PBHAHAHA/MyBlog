<template>
    <div class="main">
        <div class="header">
            <Header></Header>
        </div>
        <div class="contents">
            <b-container>
                <div class="title">{{title}}</div>
                <div class="date">发布时间：{{date | formatDate}}</div>
                <b-row>
                    <b-col md="1"></b-col>
                    <b-col md="10" class="conts" v-html="contents">
                    </b-col>
                    <b-col md="1"></b-col>
                </b-row>
                <div class="remark">
                    <Remark :remarkId="remarkId" :test="12312"></Remark>
                </div>
            </b-container>
        </div>
    </div>
</template>
<script>
import Header from '../components/header'
import Remark from '../components/remark'
import essayApi from '../http/home.js';
import {formatDate} from '../utils/date.js';
export default {
    name: 'Contents',
    components:{
        Header,
        Remark
    },
    data() {
        return {
            title:'',
            date:'',
            contents:'',
            remarkId:''
        }
    },
    methods: {
        getContents(){
            essayApi.getContents(this.$route.query.id, (res) => {
                // console.log(res)
                this.title = res.data.title
                this.date = res.data.date
                this.contents = res.data.contents
                this.remarkId = res.data.remarkId
            })
        }
    },
    filters:{
        formatDate(time) {
            var date = new Date(time);
            return formatDate(date,'yyyy-MM-dd')
        }
    },
    mounted() {
        
    },
    created() {
        this.getContents()
        // console.log(this.$route.query.id)
    },
}
</script>
<style scoped>
    .conts{
        width: 100%;
        height: 100%;
        /* border: 1px solid #ccc */
    }
    .side{
        width: 100%;
        height: 500px;
        background-color: #ccc;
    }
    .contents{
        padding-top: 20px;
        height: 100%;
    }
    .title{
        margin: 80px 0 10px 0;
        font-size: 36px;
        text-align: center
    }
    .date{
        font-size: 12px;
        font-weight: 600;
        text-align: center
    }
    .remark{
        width: 100%;
        height: 100%;
        margin-top: 50px;
        padding: 50px 0;
        border-top: 1px solid #ccc;
    }

</style>
