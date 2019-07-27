<template>
  <div>
    7489
  </div>
</template>

<script>
export default {
  name: "CommentDetail",
  data() {
    return {
      updateContent: '',
      updateid: '',
      updateisShow: '',
      updateisTop: '',
      nickname: '',
      portraitUrl: '',
      praiseTimes: '',
      reply: '',
      replyPraiseTimes: ''
    };
  },
  created() {
    this.getOrderData();
  },
  methods: {
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
        this.dialogVisible = true
        this.updateid = id
    },
    handleUpdata () {
        var data = {
            id: this.updateid,
            content : this.updateContent
        }
       this.$post("/admin/article_comment/update", data).then(res => {
        // this.$post("/admin/article_category/update", data).then(res => {
           console.log(res)
           if (res.code == "SUCC") {
               this.dialogVisible = false
               this.getOrderData()
               this.$Message.success(res.message)
           } else {
               this.$Message.warning(res.message)
           }
	    })
	    .catch(req => {
	    })
    },
    lookDetail(id) {
        this.$prompt('请输入修改评论内容', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
        }).then(({ value }) => {
            this.updateContent = value
            this.handleUpdata(id)
        }).catch(() => {
            this.$message({
                type: 'info',
                message: '取消输入'
            })
        })
    },
  }
};
</script>

<style scoped>
</style>