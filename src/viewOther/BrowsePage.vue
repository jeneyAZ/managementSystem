<template>
    <div class="Browse">
        <div class="head"><Icon type="social-reddit-outline"></Icon></div>
        <div class="contant">
            <h3 class="title">{{detailData.title}}</h3>
            <span class="time">发表于：{{detailData.updateTime}}</span><i class="kind">{{detailData.categoryName}}</i>
            <div class="articleBox">{{detailData.content}}</div>
            <div class="opration">
                <div class="comm">
                    <Icon type="ios-chatbubble"></Icon>
                    <span @click="handleC(0)">评论</span>
                    <div v-if="isShowC" class="commBox">
                         <i-input type="textarea" v-model="commentText" :rows="4" placeholder="请输入..."></i-input>
                         <Button type="primary" long @click="submitComm()">提交</Button>
                    </div>
                </div>
                <div class="zan" @click="clickZan(0, '')">
                    <Icon type="ios-thumbs-up-outline"/>{{detailData.praiseTimes}}赞
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
                     <i-input type="textarea" v-model="appealText" :rows="4" placeholder="请输入..."></i-input>
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
             userName: '你认识',
             userUrl: 'uijuhhi',
             phone: '15514538697',
             commentText: '',
             appealText: '',
             isShowC: false,
             isShowC2: false,
             detailData: {},
             appealData: []
         }
     },
     created() {
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
            var id = this.$route.query.id
            // if (id == undefined) {
            //     return false
            // }
            this.$post("/front/article/getDetail?id=1").then(res => {
                console.log(res)
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
            this.$post("/front/article_comment/getList?pageNum=1&pageSize=100&articleId=1").then(res => {
                console.log(res)
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
            this.$post("/front/article_complaint/submitComplaint?articleId="+this.detailData.id+"&userName="+this.userName+"&tel="+this.phone+"&content="+this.appealText).then(res => {
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
.comm span{
    cursor: pointer
}
.zan{
    cursor: pointer
}
 </style>
