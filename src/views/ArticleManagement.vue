<template>
    <div>
        <div class="query-c">
            <i-select :model.sync="model" style="width:100px" @on-change='handleSelectKind($event)'>
                <i-option v-for="item in kindList" :value="item.value">{{ item.label }}</i-option>
            </i-select>
            <Input placeholder="请输入ID" style="width: auto; margin:10px" />
            <i-button type="primary"  @click="handleSearch()">查询</i-button>
        </div>
        <div class="az-p">
            <span>全选/不全选</span>
            <i-button type="error"  @click="handleSearch()">删除所选</i-button>
        </div>
        <br>
        <Table border stripe  :columns="columns" :data="dataList" @on-select='handleSelect($event)' @on-select-all='handleSelectAll($event)'></Table>
        <br>
        <Page :total="total"  show-sizer show-elevator @on-change='handleCurrentPage($event)' @on-page-size-change='handlePageSize($event)'/>
    </div>
</template>

<script>
export default {
    name: 'ArticleManagement',
    data() {
        return {
            kindList: [
                {
                    value: 1,
                    label: '科幻'
                },
                {
                    value: 2,
                    label: '恐怖'
                }
            ],
            model: '',
            columns: [
                {
                    type: 'selection',
                    width: 60,
                    align: 'center'
                },
                {
                    title: 'ID',
                    key: 'id'
                },
                {
                    title: '信息名称',
                    key: 'name'
                },
                {
                    title: '所属分类',
                    key: 'rank'
                },
                {
                    title: '操作',
                    width: 250,
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
                                }, '删除到回收站'
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
        // 类型选择触发
        handleSelectKind (val) {
            console.log(val)
        },
        // 单选触发
        handleSelect (val) {
            console.log(val)
        },
        // 全选触发
        handleSelectAll (val) {
            console.log(val)
        },
        // 切换页面触发
        handleCurrentPage (val) {
            console.log(val, 'currentPage')
        },
        // 切换pageSize触发
        handlePageSize (val) {
            console.log(val, 'pageSize')
        },
        // 查询数据触发
        handleSearch () {},
        // 获取列表数据
        getOrderData () {}
    },
}
</script>

<style scoped>
.query-c{
    margin-bottom: 15px
}
.az-p span{
 font-size: 14px;
 margin-right: 10px
}
.ivu-page{
    text-align: right;
    margin-right: 30px
}
</style>