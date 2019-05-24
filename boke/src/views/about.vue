<template>
    <div class="main">
        <Header></Header>
        <div class="box">

        </div>
    </div>
</template>
<script>
import Header from '../components/header'
export default {
    name: 'About',
    components:{
        Header
    }
}
</script>
<style scoped>
    .main{
        width: 100%;
        height: 100vh
    }
    .box{
        width: 100%;
        height: 100%;
        background: url(../assets/about.gif) center
    }
</style>
