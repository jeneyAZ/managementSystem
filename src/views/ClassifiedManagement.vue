<template>
    <div>
        <div class="query-c">
            添加分类：
            <Input placeholder="请输入类别名称" v-model="addKind" style="width: auto" />
            <i-button type="primary"  @click="handleAdd()">添加</i-button>
        </div>
        <br>
        <i-table  border stripe  :columns="columns" :data="dataList"></i-table>
        <br>
        <Page :total="total"  show-sizer show-elevator @on-change='handleCurrentPage($event)' @on-page-size-change='handlePageSize($event)'/>
    </div>
</template>

<script>
export default {
    name: 'ClassifiedManagement',
    data() {
        return {
            self: this,
            columns: [
                {
                    title: 'ID',
                    key: 'id'
                },
                {
                    title: '类别名称',
                    key: 'name'
                },
                {
                    title: '排序',
                    key: 'sortNumber'
                },
                {
                    title: '操作',
                    width: 150,
                    align: 'center',
                    render: (h, params) => {
                        return h('span', [
                            h('span',
                                {
                                    style:{color:'blue', cursor: 'pointer'},
                                    on: {
                                        click () {
                                            console.log(params.row)
                                        }
                                    }
                                }, '修改'
                            ),
                            h('span',
                                {
                                    style:{color: 'red', marginLeft: '20px', cursor: 'pointer'},
                                    on: {
                                        click () {
                                            console.log(params.row.id)
                                            console.log(self, 'az')
                                            // self.handleDel(params.row.id)
                                        }
                                    }
                                }, '删除'
                            )
                        ])
                    }
                }
            ],
            dataList: [],
            total: null,
            pageSize: 10,
            currentPage: 1,
            addKind: ''

        }
    },
    created() {
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
                } else {
                   this.$Message.warning(res.message)
               }
            })

        },
        // 添加文章分类
        handleAdd () {
           this.$post("/admin/article_category/add?name="+this.addKind).then(res => {
               if (res.code == "SUCC") {
                   console.log(res)
                   this.getOrderData()
                   this.$Message.success(res.message)
               } else {
                   this.$Message.warning(res.message)
               }
		    })
		    .catch(req => {
		    });


        },
        // 删除文章分类
        handleDel (id) {
           this.$post("/admin/article_category/delete?ids"+id).then(res => {
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
        },
        // 修改文章分类
        handleDel (id) {
            var data = {
                id: id,
                name: this.updateName
            }
           this.$post("/admin/article_category/update", data).then(res => {
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
    },
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