<template>
    <div class="indexInfo">
        <!-- <div class="cont">
            <h2>生活至简、思想致行</h2>
            <el-button class="infoBtn" @click="addEssay">写博客</el-button>
        </div> -->
        <div class="contCharts">
            <div ref="essay" class="charts"></div>
            <div ref="month" class="charts"></div>
            <div ref="pinlun" class="charts"></div>
        </div>
       
    </div>
</template>
<script>
import eCharts from 'echarts'
import charts from '../utils/echarts'
export default {
    name:'indexInfo',
    methods: {
        getEcharts(){
            eCharts.init(this.$refs.essay).setOption(charts.essay)
            eCharts.init(this.$refs.month).setOption(charts.month)
            eCharts.init(this.$refs.pinlun).setOption(charts.pinlun)
        },
        addEssay(){
            this.$router.push('/addEssay')
        }
    },
    mounted() {
        this.getEcharts()
    },
}
</script>
<style scoped>
    .indexInfo{
        width: 100%;
        height: 100%;
        padding: 15px;
    }
    .cont{
        position: relative;
        width: 100%;
        height: 320px;
        margin: 0 auto;
        background-color: #eeeeee;
    }
    .cont h2{
        font-weight: 700;
        font-size: 30px;
        line-height: 230px;
        text-align: center;
    }
    .infoBtn{
        position: absolute;
        top: 190px;
        left: 47%;
    }
    .contCharts{
        margin-top: 15px;
        display: flex;
        justify-content:space-around
    }
    .charts{
        width: 400px;
        height: 300px;
        background-color: #eee;
    }
</style>
