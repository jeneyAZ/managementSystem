<template>
    <div class="Browse">
        <div class="head"><Icon type="social-reddit-outline"></Icon></div>
        <div class="contant">
            <h3 class="title">{{title}}</h3>
            <span class="time">发表于：{{time}}</span>
            <div class="articleBox">
                sascdcfdvcfgfv fvdefvgfvrbvrwbfvdvdvscadwwdwcddv
            </div>
            <div class="opration">
                <div class="comm">
                    <Icon type="ios-chatbubble"></Icon>
                    <span @click="handleC()">评论</span>
                    <div v-if="isShowC" class="commBox">
                         <i-input type="textarea" v-model="commentText" :rows="4" placeholder="请输入..."></i-input>
                    </div>
                </div>
                <div class="zan">
                    <Icon type="thumbsup">点赞</Icon>
                </div>
            </div>
            <div class="comment">
                <h3 class="list_title">精彩评论<Icon type=" checkmark"></Icon></h3>
                <ul>
                    <li>
						<div class="list_block_l"><img src="../assets/imgs/logo.png" alt=""></div>
						<div class="list_block_r">
							<div class="list_block_r_info">Amaze</div>
							<div class="list_block_r_text">那时候有多好，任雨打湿裙角。忍不住哼起，心爱的旋律。绿油油的树叶，自由地在说笑。燕子忙归巢，风铃在舞蹈。</div>
							<div class="list_block_r_bottom">
								<div class="list_bottom_info_l">10分钟前</div>
								<div class="list_bottom_info_r">
									<span><i class="iconfont"></i>5 </span>
									<span> 回复</span></div>
							</div>
						</div>
                    </li>
                     <li>
						<div class="list_block_l"><img src="../assets/imgs/logo.png" alt=""></div>
						<div class="list_block_r">
							<div class="list_block_r_info">Amaze</div>
							<div class="list_block_r_text">那时候有多好，任雨打湿裙角。忍不住哼起，心爱的旋律。绿油油的树叶，自由地在说笑。燕子忙归巢，风铃在舞蹈。</div>
							<div class="list_block_r_bottom">
								<div class="list_bottom_info_l">10分钟前</div>
								<div class="list_bottom_info_r">
									<span><i class="iconfont"></i>5 </span>
									<span> 回复</span>
                                </div>
							</div>
						</div>
                    </li>
                </ul>
            </div>
            <div class="appeal">
                <span>—— 投诉 ——</span>
            </div>
        </div>
    </div>
</template>

 <script>
 export default {
     name: 'BrowsePage',
     data() {
         return {
             title: '你认识萌萌的小熊猫吗',
             time: '2019-7-18',
             commentText: '',
             isShowC: false
         }
     },
     methods: {
         handleC () {
             console.log(45)
             this.isShowC = !this.isShowC
         }
     },
 }
 </script>

 <style scoped>
.Browse{
    max-width: 640px;
    height: 100%;
    margin: 0 auto;
    position: relative;
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
}
 </style>
