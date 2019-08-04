<template>
    <div class="Browse">
        <div class="head"><Icon type="social-reddit-outline"></Icon></div>
        <div class="contant">
            <h3 class="title">{{detailData.title}}</h3>
            <span class="time">发表于：{{detailData.updateTime}}</span><i class="kind">{{detailData.categoryName}}</i>
            <div class="articleBox" v-html="detailData.content"></div>
            <div class="opration">
                <div class="boxsss">
                    <div class="read">
                        阅读：{{detailData.browseTimes}}
                    </div>
                    <div class="zan" @click="clickZan(0, '')">
                        <Icon type="ios-thumbs-up-outline"/>{{detailData.praiseTimes}}赞
                    </div>
                </div>
                <div class="comm">
                    <span @click="handleC(0)">评论</span>
                    <div v-if="isShowC" class="commBox">
                        <el-form label-position="right" label-width="80px" :model="formLabelAlign">
                            <el-form-item label="昵称：">
                                <el-input v-model="userName" placeholder="请输入昵称"></el-input>
                            </el-form-item>
                            <el-form-item label="头像：">
                                <el-input v-model="userUrl" placeholder="请填写Url绝对路径，http开头"></el-input>
                            </el-form-item>
                            <el-form-item label="留言：">
                                <el-input type="textarea" v-model="commentText" placeholder="留言将由平台筛选后显示，对所人可见"></el-input>
                            </el-form-item>
                        </el-form>
                        <Button type="primary" long @click="submitComm()">提交</Button>
                    </div>
                </div>
            </div>
            <div class="comment">
                <h3 class="list_title">精彩评论<Icon type=" checkmark"></Icon></h3>
                <ul>
                    <li v-for="(item, index) in appealData" :key="index">
						<div class="list_block_l"><img :src="item.portraitUrl" alt=""></div>
						<div class="list_block_r">
							<div class="list_block_r_info">{{item.nickname}}</div>
							<div class="list_block_r_text">{{item.content}}</div>
							<div class="list_block_r_bottom">
								<div class="list_bottom_info_l">{{item.createTime}}</div>
								<div class="list_bottom_info_r" @click="clickZan(1, item.id)">
									<span><Icon type="ios-thumbs-up-outline"/>{{item.praiseTimes}}</span>
									<span>赞</span>
                                </div>
							</div>
						</div>
                    </li>
                </ul>
            </div>
            <div class="appeal">
                <div v-if="isShowC2" class="commBox">
                     <!-- <i-input type="textarea" v-model="appealText" :rows="4" placeholder="请输入..."></i-input> -->
                      <el-form label-position="right" label-width="80px" :model="formLabelAlign">
                            <el-form-item label="姓名：">
                                <el-input v-model="name" placeholder=""></el-input>
                            </el-form-item>
                            <el-form-item label="电话：">
                                <el-input v-model="phone" placeholder=""></el-input>
                            </el-form-item>
                            <el-form-item label="留言：">
                                <el-input type="textarea" v-model="appealText" placeholder="请填写投诉原因"></el-input>
                            </el-form-item>
                        </el-form>
                     <i-button type="success" @click="submitAppeal()" long>提交</i-button>
                </div>
                <p class="appealsss" @click="handleC(1)">—— 投诉 ——</p>
            </div>
        </div>
    </div>
</template>

 <script>
 export default {
     name: 'BrowsePage',
     data() {
         return {
             userName: '',
             userUrl: '',
             phone: '',
             name: '',
             commentText: '',
             appealText: '',
             isShowC: false,
             isShowC2: false,
             detailData: {},
             appealData: [],
             titleId: null
         }
     },
     created() {
         if (this.$route.query.id) {
             this.titleId = this.$route.query.id
         } else {
             this.titleId = sessionStorage.getItem('titleId')
         }
         this.getArticledetail()
         this.getAppeal()
     },
     methods: {
         handleC (idx) {
             if (idx == 0) {
                 this.isShowC = !this.isShowC

             } else {
                 this.isShowC2 = !this.isShowC2
             }
         },
        // 获取文章详情
        getArticledetail () {
            this.$post("/front/article/getDetail?id="+this.titleId).then(res => {
               if (res.code == "SUCC") {
                   this.detailData = res.result
               } else {
                   this.$Message.warning(res.message)
               }
		    })
		    .catch(req => {
		    })
        },
        // 获取文章评论
        getAppeal () {
            this.$post("/front/article_comment/getList?pageNum=1&pageSize=100&articleId="+this.titleId).then(res => {
               if (res.code == "SUCC") {
                   this.appealData = res.result.data
               } else {
                   this.$Message.warning(res.message)
               }
		    })
		    .catch(req => {
		    })
        },
         // 点赞
        clickZan (id, id2) {
            this.$post("/front/article_praise/praise?articleId="+this.detailData.id+"&commentId="+id2+"&commentType="+id).then(res => {
               if (res.code == "SUCC") {
                   this.getAppeal()
                   this.$Message.success(res.message)
               } else {
                   this.$Message.warning(res.message)
               }
		    })
		    .catch(req => {
		    })
        },
         // 发布评论
        submitComm () {
            this.$post("/front/article_comment/submitComment?articleId="+this.detailData.id+"&nickname="+this.userName+"&portraitUrl="+this.userUrl+"&content="+this.commentText).then(res => {
               if (res.code == "SUCC") {
                   this.getAppeal()
                   this.isShowC = false
                   this.$Message.success(res.message)
               } else {
                   this.$Message.warning(res.message)
               }
		    })
		    .catch(req => {
		    })
        },
         // 投诉
        submitAppeal () {
            this.$post("/front/article_complaint/submitComplaint?articleId="+this.detailData.id+"&userName="+this.name+"&tel="+this.phone+"&content="+this.appealText).then(res => {
               if (res.code == "SUCC") {
                   this.getAppeal()
                   this.isShowC2 = !this.isShowC2
                   this.$Message.success(res.message)
               } else {
                   this.$Message.warning(res.message)
               }
		    })
		    .catch(req => {
		    })
        },
     },
 }
 </script>

 <style scoped>
.Browse{
    max-width: 640px;
    height: 100%;
    margin: 0 auto;
    position: relative;
    overflow: scroll
}
.head{
    position: fixed;
    height: 49px;
    width: 100%;
    left: 0;
    right: 0;
    z-index: 999;
    background: #303435;
    max-width: 640px;
    margin: 0 auto;
    line-height: 53px
}
.contant{
    padding-top: 70px
}
.contant img{
    width: 85%
}
.contant .title{
    font-size: 24px;
    color: #222;
    padding: 0 7px
}
.contant .time{
    color: #aaaaaa;
    font-size: 14px;
    margin-bottom: 10px;
    padding: 0 7px
}
.kind{
    color:deeppink;
    font-style: normal
}
.contant .articleBox{
    border-bottom: 1px solid #ececec;
    padding: 10px 7px
}
.opration{
    text-align: right;
    font-size: 14px;
    color: #757575;
    border-bottom: 20px solid #ececec;
    padding: 10px 7px
}
.opration .commBox{
    padding-top: 10px
}
.opration .commBox span{
    display: inline-block;
    margin-top: 20px;
    border: 1px solid #ececec;
    border-radius: 2px;
    padding: 10px 20px
}
.commBox .ivu-btn-primary{
    margin-top: 20px
}
.comment{
    border-bottom: 20px solid #ececec;
    padding: 0 7px
}
.comment ul li{
    width: 100%;
    padding: 15px 0;
    border-bottom: 1px solid #f1f1f1;
    overflow: hidden;
}
.comment .list_block_l{
    width: 50px;
    height: 50px;
    float: left;
    position: relative;
    border-radius: 50%;
    overflow: hidden;
}
.comment .list_block_l img {
    width: 100%;
}
.comment .list_block_r {
    position: relative;
    margin-left: 65px;
}
.comment .list_block_r_info {
    color: #222;
    font-size: 18px;
}
.comment .list_block_r_text {
    color: #222;
    font-size: 14px;
}
.comment .list_block_r_bottom {
    font-size: 14px;
    color: #757575;
    padding-top: 5px;
}
.comment .list_bottom_info_r{
    cursor: pointer
}
.comment .list_bottom_info_l {
    position: relative;
    float: left;
}
.comment .list_bottom_info_r {
    position: relative;
    text-align: right;
}
.comment .list_bottom_info_r span {
    display: inline-block;
    padding-right: 8px;
    padding-left: 3px;
}
.comment .list_title{
    position: relative;
    font-weight: bold;
    color: #222;
    font-size: 16px;
    width: 100%;
    border-bottom: 1px solid #f1f1f1;
    padding: 15px 0;
    margin-bottom: 5px;
}
.appeal{
    text-align: center;
    height: 60px;
    line-height: 60px;
    font-size: 14px;
    color: #757575;
    box-sizing: border-box;
    border-bottom: 1px solid #f1f1f1;
    padding-top: 20px
}
.appealsss{
    cursor: pointer   
}
.comm{
    margin-top: 10px;
    padding-top: 10px;
    border-top: 2px solid #ececec
}
.comm span{
    cursor: pointer
}
.zan{
    cursor: pointer
}
.boxsss{
    margin-top: 20px;
    display: flex;
    justify-content: space-between
}
 </style>
