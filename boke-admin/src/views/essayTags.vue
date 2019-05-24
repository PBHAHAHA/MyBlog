<template>
    <div class="tags">
        <h5>添加标签</h5>
        <el-form :model="formTags" status-icon ref="formTags" label-width="100px" class="demo-ruleForm">
            <el-form-item label="标签" prop="tags">
                <el-input v-model="formTags.tags" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="别名" prop="age">
                <el-input v-model="formTags.nickName"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="addTags(formTags)">提交</el-button>
            </el-form-item>
        </el-form>
        <el-table
        :data='tagsData'>
            <el-table-column
            label="日期"
            width='180'>
            <template slot-scope="scope">
                <i class="el-icon-time"></i>
                <span style="margin-left:10px">{{scope.row.date | formatDate}}</span>
            </template>
            </el-table-column>
            <el-table-column
            label="标签"
            width='180'>
            <template slot-scope="scope">
                <span>{{scope.row.tags}}</span>
            </template>
            </el-table-column>
            <el-table-column
            label="别名"
            width='180'>
            <template slot-scope="scope">
                <span>{{scope.row.nickName}}</span>
            </template>
            </el-table-column>
            <el-table-column
            label="操作">
            <template
            slot-scope="scope">
                <el-button
                size='mini'
                @click="handleEdit(scope.$index,scope.row)">编辑</el-button>
                <el-button
                size='mini'
                type='danger'
                @click="handleDelete(scope.row._id)">删除</el-button>
            </template>
            </el-table-column>
        </el-table>
        <!-- 编辑弹出框 -->
        <el-dialog title="编辑标签" :visible.sync="dialogFormVisible">
            <el-form :model="form">
                <el-form-item label="标签" label-width="120px">
                    <el-input v-model="form.tags" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="别名" label-width="120px">
                    <el-input v-model="form.nickName" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="editForm">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import {formatDate} from '../utils/date.js'
    export default {
        name: 'EssayTags',
        data() {
            return {
                dialogFormVisible: false, //编辑弹出框
                form: {
                    tags: '',
                    nickName:''
                },
                labelPosition: 'right',
                formTags: {
                    tags:'',
                    nickName: '',
                },
                tagsData:[]
            };
        },
        mounted() {
            
            this.getTags()
            // console.log(this.tagsData)
        },
        filters: {
            formatDate(time) {
                var date = new Date(time);
                return formatDate(date, 'yyyy-MM-dd');
            }
        },
        methods: {
            getTags(){
                this.$axios.get('/api/tags',{
                    headers:{
                        'Authorization' : localStorage.getItem('bokeToken')
                    }
                }).then(res => {
                    console.log(res)
                    this.tagsData = res.data
                    //console.log(this.tagsData[0].tags)
                })
            },
            addTags(params){
                console.log(params)
                //console.log(params)
                this.$axios.post('/api/tags/addTags',params,{
                    headers:{'Authorization' : localStorage.getItem('bokeToken')}
                }).then(res => {
                    // console.log(res)
                    this.formTags.tags = ''
                    this.formTags.nickName = ''
                    this.getTags()
                })
            },
            handleEdit(index,row){
                this.dialogFormVisible=true
                this.form.tags = row.tags
                this.form.nickName = row.nickName
                this.form.id = row._id
            },
            handleDelete(id){
                this.$confirm('确认删除？')
                .then(() => {
                    this.$axios.post(`/api/tags/deleteTags/${id}`)
                    .then(res => {
                        this.$message({
                            message : '删除成功！',
                            type    : 'success'
                        })
                        this.getTags()
                    })
                    .catch(() => {
                        this.$message({
                            message : '删除失败！',
                            type    : 'warning'
                        })
                        return 
                    })
                })
                .catch(err => {
                    console.log(err)
                })
            },
            editForm(){
                console.log()
                this.$axios.post(`/api/tags/edit/${this.form.id}`,this.form).then(res => {
                    this.getTags()
                })
                this.dialogFormVisible = false
            }
        },
    }
</script>
<style scoped>
    .tags{
        width: 1000px;
        margin-left: 50px;
    }
</style>
