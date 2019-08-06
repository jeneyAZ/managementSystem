<template>
  <div>
    <div class="query-c">
    </div>
    <div class="az-p">
      <span>全选/不全选</span>
      <i-button type="error" @click="handleDel(ids)">删除所选</i-button>
    </div>
    <br />
    <el-table
      ref="multipleTable"
      :data="dataList"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="id" label="ID"></el-table-column>
      <el-table-column prop="title" label="信息名称"></el-table-column>
      <el-table-column label="所属分类">
        <template slot-scope="scope">
          <span>{{scope.row.adType | adType}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="发表时间"></el-table-column>
      <el-table-column label="操作" width="120">
        <template slot-scope="scope">
          <el-button @click="open(scope.row.id)" type="text" size="small">编辑</el-button>
          <el-button style="color:red" @click="handleDel(scope.row.id)" type="text" size="small">删除</el-button>
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
      value: "",
      dataList: [],
      total: null,
      pageSize: 10,
      currentPage: 1,
      keywords: "",
      endTime: "",
      startTime: "",
      selectArr: [],
      ids: ''
    };
  },
  created() {
    this.getOrderData();
  },
  methods: {
    open (id) {
      sessionStorage.setItem('adverId',id)
      this.$router.push({
        path: '/AddAdvert',
        query: {
          id: id
        }
      })
    },
    handleSelectionChange(val) {
      this.selectArr = []
      for (let index = 0; index < val.length; index++) {
        const ele = val[index].id
        this.selectArr[index] = ele
      }
      this.ids = this.selectArr.join(",")
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
      }
      this.$get("/admin/advertisement/getList", data).then(res => {
        if (res.code == "SUCC") {
          var res = res.result;
          this.total = res.total;
          this.dataList = res.data;
        } else {
          this.$Message.warning(res.message);
        }
      });
    },
    // 删除文章
    handleDel(id) {
      this.$post("/admin/advertisement/delete?ids=" + id)
        .then(res => {
          if (res.code == "SUCC") {
            this.getOrderData();
            this.$Message.success(res.message);
          } else {
            this.$Message.warning(res.message);
          }
        })
        .catch(req => {});
    }
  },
  filters: {
    adType (value) {
      return value = value = 1 ? '首页广告' : '内页广告'
    }
  }
};
</script>

<style scoped>
.query-c {
  margin-bottom: 15px;
}
.az-p span {
  font-size: 14px;
  margin-right: 10px;
}
.ivu-page {
  text-align: right;
  margin-right: 30px;
}
</style>