<template>
    <div class="webset">
        <div class="webset_main">
            <el-form :model="webInfo" ref="webinfo" label-width="100px" class="demo-ruleForm">
                <el-form-item label="网站图标" prop="icon">
                    <el-upload
                    ref="upload"
                    class="upload-demo"
                    action="127.0.0.1:8686/api/setting/icon"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :file-list="fileList2"
                    list-type="picture">
                    <el-button size="small" type="primary">点击上传</el-button>
                    </el-upload>
                </el-form-item>
                <el-form-item label="站点名称" prop="name">
                    <el-input v-model="webInfo.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="站点描述" prop="desc">
                    <el-input
                    type="textarea"
                    :rows="3"
                    placeholder="请输入内容"
                    v-model="webInfo.desc">
                    </el-input>
                </el-form-item>
                <el-form-item label="站点关键字" prop="keys">
                    <el-input v-model="webInfo.keys" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="评论" prop="remark">
                    <el-checkbox :checked="false">开启评论功能</el-checkbox>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('webInfo')">提交</el-button>
                </el-form-item>
            </el-form>
            
        </div>
    </div>
</template>
<script>
export default {
    name:'WebSet',
    data() {
        return {
            fileList2: [],
            webInfo:{
                icon:'',
                name:'',
                desc:'',
                keys:'',
                remark:''
            }
        }
    },
    methods: {
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      submitForm(data){
          console.log(data)
      }
    }
}
</script>
<style scoped>
    .webset{
        overflow: hidden;
        width: 1200px;
    }
    .webset_main{
        width: 900px;
        margin: 20px auto;
    }
</style>

