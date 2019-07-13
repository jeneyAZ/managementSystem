<template>
    <div>
        <div class="query-c">
            添加分类：
            <Input placeholder="请输入类别名称" style="width: auto" />
            <i-button type="primary"  @click="handleAdd()">添加</i-button>
        </div>
        <br>
        <Table border stripe  :columns="columns" :data="dataList"></Table>
        <br>
        <Page :total="total"  show-sizer show-elevator @on-change='handleCurrentPage($event)' @on-page-size-change='handlePageSize($event)'/>
    </div>
</template>

<script>
export default {
    name: 'ClassifiedManagement',
    data() {
        return {
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
                    key: 'rank'
                },
                {
                    title: '操作',
                    width: 150,
                    align: 'center',
                    render (h, params) {
                        return h('span', [
                            h('span',
                                {
                                    style:{color:'blue', cursor: 'pointer'},
                                    on: {
                                        click: () => {
                                            console.log(params.row)
                                        }
                                    }
                                }, '修改'
                            ),
                            h('span',
                                {
                                    style:{color: 'red', marginLeft: '20px', cursor: 'pointer'},
                                    on: {
                                        click: () => {
                                            console.log(params.row)
                                        }
                                    }
                                }, '删除'
                            )
                        ])
                    }
                }
            ],
            dataList: [
                {
                    id: 1,
                    name: 'jeneny',
                    rank: 1
                },
                {
                    id: 2,
                    name: 'az',
                    rank: 2
                },
                {
                    id: 3,
                    name: 'jeneybu',
                    rank: 3
                },
                {
                    id: 3,
                    name: 'jeneybu',
                    rank: 4
                },
                {
                    id: 3,
                    name: 'jeneybu',
                    rank: 5
                },
                {
                    id: 3,
                    name: 'jeneybu',
                    rank: 6
                },
                {
                    id: 3,
                    name: 'jeneybu',
                    rank: 7
                },
                {
                    id: 3,
                    name: 'jeneybu',
                    rank: 8
                },
                {
                    id: 3,
                    name: 'jeneybu',
                    rank: 9
                },
                {
                    id: 3,
                    name: 'jeneybu',
                    rank: 10
                },
                {
                    id: 3,
                    name: 'jeneybu',
                    rank: 11
                }
            ],
            total: null,
            pageSize: 10,
            currentPage: 1

        }
    },
    created() {
        this.getOrderData()
    },
    methods: {
        handleCurrentPage (val) {
            console.log(val, 'currentPage')
        },
        handlePageSize (val) {
            console.log(val, 'pageSize')
        },
        handleAdd () {},
        // 获取列表数据
        getOrderData () {}
    },
}
</script>

<style scoped>

</style>