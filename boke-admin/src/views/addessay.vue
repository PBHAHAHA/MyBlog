<template>
    <div class="addessay">
        <el-form :model="essay" :rules="rules" ref="essay" label-width="100px" class="demo-ruleForm" style="width:500px;">
            <el-form-item class="content">
                <div id="editor"></div>
            </el-form-item>
            <el-form-item label="文章标题" prop="title">
                <el-input v-model="essay.title"></el-input>
            </el-form-item>
            <el-form-item label="封面图片地址" prop="imgURL">
                <el-input v-model="essay.imgURL"></el-input>
            </el-form-item>
            <el-form-item label="选择分类" prop="tags">
                <el-select v-model="essay.tags" placeholder="请选择文章分类">
                    <el-option v-for="(item,index) in allTags" :key="index" :label="item.tags" :value='item.tags'></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="push('essay')">发布</el-button>
            </el-form-item>
        </el-form>
        
        <!-- <div id="editor"></div> -->
    </div>
</template>
<script>
import E from 'wangeditor'
const editor = new E('#editor')
export default {
    name:'AddEssay',
    data() {
        return {
            essay:{
                title:'',
                tags:'',
                imgURL:'',
                part:'',
                contents:''
            },
            allTags:[],
            rules:{
                title: [
                    { required: true, message: '请输入标题', trigger: 'blur' }
                ],
                tags: [
                    { required: true, message: '请选择标签', trigger: 'blur' }
                ]
            }
        }
    },
    mounted() {
        editor.create()
        this.getTags()
    },
    methods: {
        push(essay){
            this.$refs[essay].validate((valid) => {
                if(valid){ 
                    this.essay.contents = editor.txt.html()
                    // 获取<p>在正文字符串中的索引
                    // const indexP = this.essay.contents.indexOf("<p>")
                    this.essay.part = this.essay.contents.slice(0,200)
                    // console.log(this.essay)
                    this.addEssay(this.essay)
                }else{
                    this.$message({
                        message: '请输入必要的信息！',
                        type: 'warning'
                    });
                    return false;
                }
            })
            
        },
        addEssay(params){
            // console.log(params)
            this.$axios.post('/api/essay/addEssay',params).then(res => {
                // console.log(res)
                this.$message({
                    message : '发布成功',
                    type    : 'success'
                })
                this.essay.title = ''
                this.essay.tags = ''
                editor.txt.html('')
            }).catch(err => {
                this.$message({
                    message : '发布失败',
                    type    : 'success'
                })
            })
        },
        //获取标签
        getTags(){
            this.$axios.get('/api/tags',{
                headers:{
                    'Authorization' : localStorage.getItem('bokeToken')
                }
            }).then(res => {
                this.allTags = res.data
            })
        }
    }
}
</script>
<style scoped>
    .addessay{
        width: 100%;
        height: 100%;
    }
    #editor{
        padding: 10px;
        width: 1290px;
    }
    .content{
        /* margin-left: 0px !important; */
        position: relative;
        left: -90px;
    }
</style>
