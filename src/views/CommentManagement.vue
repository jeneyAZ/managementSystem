<template>
  <div>
    <el-table
      ref="multipleTable"
      :data="dataList"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column prop="id" label="评论内容"></el-table-column>
      <el-table-column prop="title" label="文章标题"></el-table-column>
      <el-table-column prop="nickname" label="昵称"></el-table-column>
      <el-table-column label="头像">
        <template slot-scope="scope">
            <img :src="scope.row.portraitUrl" alt="" style="width: 40px;min-height:50px">
        </template>
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <span>{{scope.row.status | filterStatus}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="日期"></el-table-column>
      <el-table-column label="操作" width="120">
        <template slot-scope="scope">
          <el-button @click="open(scope.row.id)" type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <br />
    <Page
      :total="total"
      show-sizer
      show-elevator
      @on-change="handleCurrentPage($event)"
      @on-page-size-change="handlePageSize($event)"
    />
  </div>
</template>

<script>
export default {
  name: "ArticleManagement",
  data() {
    return {
      dataList: [],
      total: null,
      pageSize: 10,
      currentPage: 1,
    };
  },
  created() {
    this.getOrderData();
  },
  methods: {
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 切换页面触发
    handleCurrentPage(val) {
      this.currentPage = val;
      this.getOrderData();
    },
    // 切换pageSize触发
    handlePageSize(val) {
      this.pageSize = val;
      this.getOrderData();
    },
    // 获取列表数据
    getOrderData() {
      var data = {
        pageSize: this.pageSize,
        pageNum: this.currentPage
      };
      this.$get("/admin/article_comment/getList", data).then(res => {
        if (res.code == "SUCC") {
          var res = res.result;
          this.total = res.total;
          this.dataList = res.data;
        } else {
          this.$Message.warning(res.message);
        }
      });
    },
    open(id) {
        sessionStorage.setItem('commonId',id)
        this.$router.push({
            path: '/CommentDetail',
            query: {
              id: id
            }
        })
    }
  },
  filters: {
    filterStatus (value) {
      return value == 1 ? '未读' : '已读'
    }
  }
}
</script>

<style scoped>
.query-c {
  margin-bottom: 15px;
}
.ivu-page {
  text-align: right;
  margin-right: 30px;
}
</style>