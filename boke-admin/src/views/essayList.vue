<template>
    <div class="essayList">
        <div class="listCont">
            <el-table
                :data="tableData"
                style="width: 1200px;margin:10px auto;border:1px solid #eee;text-align:center">
                <el-table-column
                label="日期"
                width="180" height="60px;">
                <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span style="margin-left: 10px">{{ scope.row.date | formatDate }}</span>
                </template>
                </el-table-column>
                <el-table-column
                label="标题"
                width="180">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.title }}</span>
                </template>
                </el-table-column>
                <el-table-column
                label="标签"
                width="180">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.tags}}</span>
                </template>
                </el-table-column>
                <el-table-column
                label="图片地址"
                width="180">
                <template slot-scope="scope">
                    <img :src="scope.row.imgURL" alt="" style="position:absolute;top:0;left:10%" width="50px" height="50px">
                    <!-- <span style="margin-left: 10px">{{ scope.row.imgURL }}</span> -->
                </template>
                </el-table-column>
                <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                    size="mini"
                    @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="block">
            <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync='paginations.page_index'
            :page-sizes="paginations.page_sizes"
            :page-size="paginations.page_size"
            :layout="paginations.page_layout"
            :total="paginations.total">
            </el-pagination>
        </div>
    </div>
</template>
<script>
import {formatDate} from '../utils/date.js'
export default {
    name: 'EssayList',
    data() {
      return {
        tableData      : [],
        allTableData   : [],
        paginations:{
            page_index : 1,
            total      : 100,
            page_size  : 10, //一页展示的数量
            page_sizes : [5,10],
            page_layout: "total, sizes, prev, pager, next, jumper"
        }
      }
    },
    mounted() {
        this.getEssay()
    },
    filters: {
        formatDate(time) {
            var date = new Date(time);
            return formatDate(date, 'yyyy-MM-dd');
        }
    },
    methods: {
      getEssay(){
          this.$axios.get('/api/essay/').then(res => {
              console.log(res)
              this.allTableData = res.data.reverse()
              this.setPage()
          })
      },
      handleEdit(index, row) {
        this.$router.push('/editEssay?id='+row._id)
        console.log(index, row);
      },
      handleDelete(index, row) {
        this.$confirm('确认删除？')
            .then(() => {
                let id = row._id
                this.$axios.post('/api/essay/delete',{'id':id})
                .then(res => {
                    this.$message({
                        message : '删除成功！',
                        type    : 'success'
                    })
                    this.getEssay()
                })
                .catch(() => {
                    return 
                })
            })
            .catch(err => {
                console.log(err)
            })
      },
      setPage(){
          this.paginations.total = this.allTableData.length
          this.paginations.page_index = 1;
          this.paginations.page_size  = 10;
          //设置每页展示条数
          this.tableData = this.allTableData.filter((item, index) => {
            return index < this.paginations.page_size;
          });
      },
      handleSizeChange(page_size){
          this.paginations.page_index = 1;
          //console.log(page_size)
          this.paginations.page_size = page_size;
          this.tableData = this.allTableData.filter((item, index) => {
            return index < page_size;
          });
      },
      handleCurrentChange(page){
          console.log(page)
          let sortnum = this.paginations.page_size * (page - 1);
          let table = this.allTableData.filter((item, index) => {
              //这里的过滤器是  ： 将allTableData 中  index>sortnum  的数据 赋值给table
              return index >= sortnum;
          });
          // 设置默认分页数据
          this.tableData = table.filter((item, index) => {
              return index < this.paginations.page_size;
          });
      }
    }
}
</script>
<style scoped>
    .essayList{
        width: 100%
    }
    .listCont{
        width: 100%;
        border-top: 1px solid #eee;
    }
</style>

