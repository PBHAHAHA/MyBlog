<template>
    <div class="remarkMain">
        <div class="remarkCont">
            <div class="img" style="margin-bottom:10px;">
                <img src="../assets/logo.png" width="40px" height="40px" alt="">
                <!-- <div class="remark-form">
                    <b-form-input size="sm" type="text" placeholder="Enter your name" />  
                </div>
                <div class="remark-form">
                    <b-form-input size="sm" type="text" placeholder="Enter your name" />
                </div> -->
            </div>
            <!-- <img src="https://unsplash.it/50/50/?randoma" width="40px" height="40px" alt=""> -->
            <!-- <img src="../assets/avator1.jpg" alt=""> -->
            <textarea name="" id="" class="remarkBox" v-model="remarkContent"></textarea>
            <p v-show="warning" :class={warning:warning}>至少五个字符！</p>
            <button @click="addRemark">发布评论</button>
            <p style="font-size:20px;font-weight:600">评论</p>
            <div v-if="!remarkListLength">
                <ul class="list" v-for="(item,index) in remarkList" :key="index">
                    <li>
                        <img src="https://unsplash.it/50/50/?randoma" width="40px" height="40px" alt="">
                        {{item.content}}
                    </li>
                </ul>
            </div>
            <div v-if="remarkListLength" class="listNo">
                <p style="text-align:center;font-size:12px;font-weight:600;color:#666">智慧如你，不想发表一点想法咩~</p>
            </div>
        </div>
    </div>
</template>
<script>
import remarkApi from '../http/remark.js'
export default {
    name:'Remark',
    props:['remarkId','test'],
    data() {
        return {
            newremarkId : '',
            remarkListLength:true,
            remarkList:[],
            remarkContent:'',
            warning:false,
            test1:'',
            avatorImg:''
        }
    },
    watch: {
        remarkId:function(newVal,oldVal){
            this.newremarkId = newVal
            this.getRemark(newVal)
        }
    },
    mounted() {
        this.newremarkId = this.remarkId

        console.log(this.remarkContent)
    },
    methods: {
        //增加评论
        addRemark(){
            const params = {
                remarkId:this.newremarkId,
                content : this.remarkContent
            }
            console.log(params)

            //判断输入的字数
            if((params.content).length < 5){
                this.warning = true
                this.getRemark()
            }else{
                remarkApi.addRemark(params,(res) => {
                    this.getRemark(params.remarkId)
                    this.remarkContent = ''
                })
                this.warning = false
            }
            
        },
        //获取评论
        getRemark(id){
            remarkApi.getRemark(id,(res) => {
                console.log(res)
                if(res.data.length>0){
                    this.remarkListLength = false
                }
                this.remarkList = res.data.reverse()
                let random = Math.floor(Math.random()*3)
                // this.avatorImg = require(`../assets/avator${random}.jpg`)
                // console.log(this.avatorImg)
                // this.remarkList[0].push(this.avatorImg)
                // console.log(this.remarkList[0])
            })
            
        }
    },
}
</script>
<style scoped>
    .remarkMain{
        width: 100%;
        height: 100%;
        background-color: #fff;
        margin: 0 auto
    }
    @media (min-width: 768px) {
        .remarkMain{
            width: 800px;
            height: 100%;
            background-color: #fff;
            margin: 0 auto
        }
    }
    .remarkCont img{
        vertical-align: top
    }
    .remark-form{
        display: inline-block;
        /* width: 100px; */
    }
    .remarkBox{
        width: 100%;
        height: 120px;
        background:transparent;
    }
    .list{
        position: relative;
    }
    .list img{
        position:absolute;
        left:0;
    }
    .list li{
        list-style: none;
        font-size: 16px;
        margin: 15px 0 15px 15px;
        padding: 10px;
        border-radius: 10px;
        border: 1px solid #ccc;
    }
    .listNo{
        width: 100%;
        height: 300px;
        background: url('../assets/remark.png') no-repeat center;
    }
    /* 至少五个字符 */
    .warning{
        color: #f00;
        font-size: 14px;
    }
</style>
