<template>
    <div class="editessay">
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
                    <el-option label="前端" value="qianduan"></el-option>
                    <el-option label="生活" value="shenghuo"></el-option>
                    <el-option label="杂谈" value="zatan"></el-option>
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
    name:'EditEssay',
    data() {
        return {
            essay:{
                title:'',
                tags:'',
                imgURL:'',
                part:'',
                contents:''
            },
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
        this.getEssay()
    },
    methods: {
        //根据id 获取信息
        getEssay(){
            this.$axios.get('/api/essay/'+this.$route.query.id).then(res => {
                this.essay.title = res.data.title
                this.essay.contents = res.data.contents
                this.essay.tags = res.data.tags
                this.essay.imgURL = res.data.imgURL
                editor.txt.html(`${this.essay.contents}`)
            })
        },
        push(essay){
            this.$refs[essay].validate((valid) => {
                if(valid){ 
                    this.essay.contents = editor.txt.html()
                    // 获取<p>在正文字符串中的索引
                    // const indexP = this.essay.contents.indexOf("<p>")
                    this.essay.part = this.essay.contents.substr(0,200)
                    console.log(this.essay)
                    this.updateEssay(this.essay)
                    
                }else{
                    this.$message({
                        message: '请输入必要的信息！',
                        type: 'warning'
                    });
                    return false;
                }
            })
            
        },
        updateEssay(params){
            // console.log(params)
            this.$axios.post(`/api/essay/edit/${this.$route.query.id}`,params).then(res => {
                console.log(res)
                this.$message({
                    message : '编辑成功',
                    type    : 'success'
                })
                this.essay.title = ''
                this.essay.tags = ''
                editor.txt.html('')
                this.$router.push('/essayList')
            }).catch(err => {
                this.$message({
                    message : '编辑失败',
                    type    : 'warning'
                })
            })
        }
    }
}
</script>
<style scoped>
    .editessay{
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
