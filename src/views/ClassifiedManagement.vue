<template>
    <div>
        <div class="query-c">
            添加分类：
            <Input placeholder="请输入类别名称" v-model="addKind" style="width: auto" />
            <i-button type="primary"  @click="handleAdd()">添加</i-button>
        </div>
        <br>
         <el-table
          :data="dataList"
          style="width: 100%">
            <el-table-column prop="id" label="ID"></el-table-column>
            <el-table-column prop="name" label="类别名称"></el-table-column>
            <el-table-column prop="sortNumber" label="排序"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button @click="open(scope.row.id, scope.row.name)" type="text" size="small">编辑</el-button>
                    <el-button style="color:red" @click="handleDel(scope.row.id)" type="text" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <br>
        <Page :total="total"  show-sizer show-elevator @on-change='handleCurrentPage($event)' @on-page-size-change='handlePageSize($event)'/>
    </div>
</template>

<script>
import { log } from 'util';
export default {
    name: 'ClassifiedManagement',
    data() {
        return {
            dataList: [],
            total: null,
            pageSize: 10,
            currentPage: 1,
            addKind: ''
        }
    },
    created() {
        this.getkindData()
        this.getOrderData()
    },
    methods: {
        handleCurrentPage (val) {
            this.currentPage = val
            this.getOrderData()
        },
        handlePageSize (val) {
            this.pageSize = val
            this.getOrderData()
        },
        // 获取列表数据
        getOrderData () {
            // /admin/article_category/getList
            var data = {
                pageSize: this.pageSize,
                pageNum: this.currentPage
            }
            this.$get("/admin/article_category/getList", data).then(res=>{
                if (res.code == "SUCC") {
                    var res = res.result
                    this.total = res.total
                    this.dataList = res.data
                    // localStorage.setItem('kindTxt', JSON.stringify(res.data))
                } else {
                   this.$Message.warning(res.message)
               }
            })
        },
        // 获取列表数据
        getkindData () {
            var data = {
                pageSize: 100,
                pageNum: 1
            }
            this.$get("/admin/article_category/getList", data).then(res=>{
                if (res.code == "SUCC") {
                    localStorage.setItem('kindTxt', JSON.stringify(res.result.data))
                } else {
                   this.$Message.warning(res.message)
               }
            })
        },
        // 添加文章分类
        handleAdd () {
           this.$post("/admin/article_category/add?name="+this.addKind).then(res => {
               if (res.code == "SUCC") {
                   this.getOrderData()
                   this.$Message.success(res.message)
               } else {
                   this.$Message.warning(res.message)
               }
		    })
		    .catch(req => {
		    })
        },
        // 删除文章分类
        handleDel (id) {
           this.$post("/admin/article_category/delete?ids="+id).then(res => {
               if (res.code == "SUCC") {
                   this.getOrderData()
                   this.$Message.success(res.message)
               } else {
                   this.$Message.warning(res.message)
               }
		    })
		    .catch(req => {
		    })
        },
        // 修改文章分类
        open(id, name) {
            this.$prompt('请输入修改分类名称', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                inputValue: name
            }).then(({ value }) => {
                this.updateName = value
                this.handleUpdata(id)
                // this.$message({
                //     type: 'success',
                //     message: '你的邮箱是: ' + value
                // })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '取消输入'
                })
            })
        },
        handleUpdata (id) {
            var data = {
                id: id,
                name: this.updateName,
                sortNumber: 0,
                status: 1
            }
           this.$post("/admin/article_category/update?id="+id+"&name="+this.updateName+"&sortNumber=0&status=1").then(res => {
            // this.$post("/admin/article_category/update", data).then(res => {
               console.log(res)
               if (res.code == "SUCC") {
                   this.getOrderData()
                   this.$Message.success(res.message)
               } else {
                   this.$Message.warning(res.message)
               }
		    })
		    .catch(req => {
		    })
        }
    }
}
</script>

<style scoped>
.query-c{
    margin-bottom: 15px
}
.ivu-page{
    text-align: right;
    margin-right: 30px
}
.ivu-btn-primary{
    margin-left: 10px
}
</style>