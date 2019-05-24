<template>
    <div class="main">
        <span class="index" @click="pushIndex()">
            <i class="fa fa-home" aria-hidden="true"></i>
        </span>
        <h2>{{datas}}</h2>
    </div>    
</template>
<script>
export default {
    name: 'headDesc',
    props:[
        'datas'
    ],
    methods: {
        pushIndex(){
            this.$router.push('/')
        }
    },
}
</script>
<style scoped>
    .main{
        height: 200px;
        background-color: #000;
        position: relative;
    }
    .index{
        color: #333;
        background-color: rgb(226, 222, 222);
        display: block;
        width: 70px;
        height: 30px;
        border: 1px solid transparent;
        border-radius: 20px;
        font-size: 24px;
        text-align: center;
        line-height: 30px;
        cursor: pointer;
        position: absolute;
        left: 10px;
        top: 5px;
    }
    .index:hover{
        background-color: #333;
        color: #fff;
    }
    h2{
        color: #fff;
        text-align: center;
        line-height: 200px;
    }
</style>
