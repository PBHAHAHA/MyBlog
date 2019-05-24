<template>
    <div class="remark">
        <div class="options">
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.nickName"
              :label="item.tags"
              :value="item.nickName">
            </el-option>
          </el-select>
        </div>
        <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column
            label="日期"
            width="180">
            <template slot-scope="scope">
                <i class="el-icon-time"></i>
                <span style="margin-left: 10px">{{ scope.row.date }}</span>
            </template>
            </el-table-column>
            <el-table-column
            label="姓名"
            width="180">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.name }}</span>
                </template>
            </el-table-column>
            <el-table-column
            label="标签"
            width="180">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.tags }}</span>
                </template>
            </el-table-column>
            <el-table-column
            label="评论在"
            width="180">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.essay }}</span>
                </template>
            </el-table-column>
            <el-table-column
            label="评论内容"
            width="180">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.content}}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作">
            <template slot-scope="scope">
                <el-button 
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
  export default {
    name:'Remark',
    data() {
      return {
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          essay: '三体',
          tags: '前端',
          content: '哈哈哈哈',
          address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            tags: '前端',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            tags: '前端',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
        }],
        // 选择分类数据
         options: [{
            nickName: 'all',
            tags: '全部'
          }],
          value:''
      }
    },
    mounted() {
      // console.log(this.options)
      this.getAllTags()
    },
    updated() {
       this.getTags()
    },
    methods: {
      handleDelete(index, row) {
        console.log(index, row);
      },
      getTags(){
        this.$axios.get(`/api/remark/${this.value}`)
        .then(res => {
          console.log(res)
        })
      },
      getAllTags(){
          this.$axios.get('/api/tags',{
              headers:{
                  'Authorization' : localStorage.getItem('bokeToken')
              }
          }).then(res => {
              for(var key in res.data) {
                this.options[key] = res.data[key]
              }
              const all = {nickName:'all',tags:'全部'}
              this.options.unshift(all) 
              console.log(this.options)
          })
      }
    }
  }
</script>
<style scoped>
  .remark{
    border-top: 1px solid #fff;
    background-color: #fff;
  }
  .options{
    /* padding: 20px; */
  }
</style>
