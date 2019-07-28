<template>
  <div>
    <el-form label-position="" label-width="120px" :model="form">
      <el-form-item label="昵称：">
        <el-input v-model="form.nickname"></el-input>
      </el-form-item>
      <el-form-item label="头像：">
        <i-input :value.sync="form.portraitUrl" readonly style="width:60%"></i-input>
        <div class="file">点击选择上传文件
          <input type="file" id="fileId" placeholder="点击上传文件" @change="uploadFile($event)">
        </div>
      </el-form-item>
      <el-form-item label="评论内容：">
        <el-input v-model="form.content"></el-input>
      </el-form-item>
      <el-form-item label="回复：">
        <el-input v-model="form.reply"></el-input>
      </el-form-item>
      <el-form-item label="回复点赞量：">
        <el-input v-model="form.replyPraiseTimes"></el-input>
      </el-form-item>
      <el-form-item label="点赞量：">
        <el-input v-model="form.praiseTimes"></el-input>
      </el-form-item>
      <el-form-item label="是否置顶：">
        <el-switch v-model="form.isTop"></el-switch>
      </el-form-item>
      <el-form-item label="是否显示：">
        <el-switch v-model="form.isShow"></el-switch>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="resetComment()">修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "CommentDetail",
  data() {
    return {
      form: {
        content: "",
        isShow: true,
        isTop: true,
        nickname: '',
        portraitUrl: '',
        praiseTimes: 0,
        reply: '',
        replyPraiseTimes: 0
      }
};
  },
  created() {
    this.getDetailData()
  },
  methods: {
    // 获取评论详情
    getDetailData() {
      var id = this.$route.query.id
      console.log(id);
      
      if (id == undefined) {
          return false
      }
      this.$post("/admin/article_comment/getDetail?id="+id).then(res => {
          if (res.code == "SUCC") {
            //  this.$Message.success(res.message)
            var res = res.result
            this.form.content = res.content
            this.form.isShow = res.isShow
            this.form.isTop = res.isTop
            this.form.nickname = res.nickname
            this.form.portraitUrl = res.portraitUrl
            this.form.praiseTimes = res.praiseTimes
            this.form.reply = res.reply
            this.form.replyPraiseTimes = res.replyPraiseTimes
          } else {
             this.$Message.warning(res.message)
          }
		    })
		    .catch(req => {
		    })
    },
    // 文件上传
      uploadFile (event, i) {
          var that = this
          let file = event.target.files[0]
          let param = new FormData()
        //   param.append('file', file, file.name)
        //   param.append('type', '1')
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function (e) {
             // 读取到的图片base64 数据编码 将此编码字符串传给后台即可
            that.form.portraitUrl = e.target.result
         }
        },
    resetComment () {
        var data = {
          nickname: this.form.nickname,
          portraitUrl: this.form.portraitUrl,
          content: this.form.content,
          reply: this.form.reply,
          id: this.$route.query.id,
          replyPraiseTimes: this.form.replyPraiseTimes,
          praiseTimes: this.form.praiseTimes,
          isTop: this.form.isTop,
          isShow: this.form.isShow
        }
        this.$post("/admin/article_comment/update", data).then(res => {
          if (res.code == "SUCC") {
            this.getDetailData()
            this.$Message.success(res.message)
          } else {
            this.$Message.warning(res.message)
          }
		    }).catch(req => {})
    },
  }
};
</script>

<style scoped>
.el-form{
  width: 52%;
  padding: 50px
}
.el-button{
  width: 50%
}
.ivu-input{
  height: 38px
}
.file {
    display: inline-block;
    background: #D0EEFF;
    border: 1px solid #99D3F5;
    border-radius: 4px;
    padding: 4px 12px;
    overflow: hidden;
    color: #1E88C7;
    text-decoration: none;
    line-height: 20px;
    position: absolute;
    top: 5px;
    right: 0;
}
.file input {
    position: absolute;
    font-size: 100px;
    right: 0;
    top: 0;
    opacity: 0;
}
.file:hover {
    background: #AADFFD;
    border-color: #78C3F3;
    color: #004974;
    text-decoration: none;
}
</style>