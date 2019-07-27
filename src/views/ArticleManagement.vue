<template>
  <div>
    <div class="query-c">
      <el-date-picker
        size="small"
        type="date"
        placeholder="选择开始日期"
        value-format="yyyy-MM-dd"
        v-model="startTime"
        style="width: 200px"
      ></el-date-picker>
      <el-date-picker
        size="small"
        type="date"
        placeholder="选择结束日期"
        value-format="yyyy-MM-dd"
        v-model="endTime"
        style="width: 200px;margin:0 10px"
      ></el-date-picker>
      <el-select size="small" v-model="value" placeholder="请选择文章类型">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-input
        size="small"
        v-model="keywords"
        placeholder="请输入文章关键字"
        style="width: auto;margin:0 10px"
      ></el-input>
      <el-button size="small" type="primary" @click="getOrderData()">查询</el-button>
    </div>
    <div class="az-p">
      <span>全选/不全选</span>
      <i-button type="error" @click="handleSearch()">删除所选</i-button>
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
      <el-table-column prop="categoryName" label="所属分类"></el-table-column>
      <el-table-column prop="发表时间" label="发表时间"></el-table-column>
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
      options: [
        {
          value: 1,
          label: "科幻"
        },
        {
          value: 2,
          label: "恐怖"
        }
      ],
      value: "",
      dataList: [],
      total: null,
      pageSize: 10,
      currentPage: 1,
      keywords: "",
      endTime: "",
      startTime: ""
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
        pageNum: this.currentPage,
        keywords: this.keywords,
        startTime: this.startTime,
        endTime: this.endTime
      };
      this.$get("/admin/article/getList", data).then(res => {
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
      this.$post("/admin/article/delete?ids=" + id)
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