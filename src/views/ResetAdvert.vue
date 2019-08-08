<template>
    <div>
        <i-form :model="formItem" :label-width="80">
            <Form-item label="所属分类：">
                <i-select v-model="model" style="width:100px" @on-change='handleSelectKind($event)' placeholder="请选择分类">
                    <i-option v-for="item in kindList" :value="item.id">{{item.name}}</i-option>
                </i-select>
            </Form-item>
            <Form-item label="广告标题：">
                <i-input :value.sync="formItem.title" v-model="formItem.title" placeholder="请输入信息标题"></i-input>
            </Form-item>
            <Form-item label="广告链接：">
                <i-input :value.sync="formItem.forwareUrl" v-model="formItem.forwareUrl" placeholder="请输入广告链接"></i-input>
            </Form-item>
            <Form-item label="图片：">
                <i-input :value.sync="formItem.imgurl" readonly style="width:60%"></i-input>
                <template>
                    <div class="file">点击选择上传文件
                        <input type="file" id="fileId" placeholder="点击上传文件" @change="uploadFile($event)">
                    </div>
                </template>
            </Form-item>
            <Form-item label="状态：">
                <RadioGroup v-model="status">
                    <Radio label="1">显示</Radio>
                    <Radio label="2">隐藏</Radio>
                </RadioGroup>
            </Form-item>
             <Form-item label="序号：">
                <i-input :value.sync="sortNumber" v-model="sortNumber"></i-input>
            </Form-item>
            <Form-item label="备注：">
                <i-input :value.sync="formItem.remark" v-model="formItem.remark" placeholder="请输入备注"></i-input>
            </Form-item>
            <Form-item>
                <i-button type="warning" size="large" @click="resetArticle()">修改</i-button>
            </Form-item>
        </i-form>
    </div>
</template>

<script>
import { quillEditor } from "vue-quill-editor"; //调用编辑器
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css'
export default {
    name: 'ResetAdvert',
    components: {
        quillEditor
    },
    data() {
        return {
            model: 1,
            formItem: {
                title: '',
                imgurl: '',
                remark: '',
                forwareUrl: ''
            },
            sortNumber: null,
            status: '1',
            kindList: [
                {
                    id: 1,
                    name: '首页广告'
                },
                {
                    id: 2,
                    name: '内页广告'
                }
            ],
            adverId: ''
        }
    },
    created() {
        if (this.$route.query.id) {
             this.adverId = this.$route.query.id
         } else {
             this.adverId = sessionStorage.getItem('adverId')
         }
        this.getArticledetail()
    },
    methods: {
        // 类型选择触发
        handleSelectKind (val) {
            this.model = val
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
             that.formItem.imgurl = e.target.result
         }
        },
        // 获取广告详情
        getArticledetail () {
            var id = this.adverId
            if (id == undefined) {
                return false
            }
            this.$post("/admin/advertisement/getDetail?id="+id).then(res => {
               if (res.code == "SUCC") {
                   var res = res.result
                   this.formItem.title = res.title
                   this.formItem.imgurl = res.imageUrl
                   this.formItem.remark = res.remark
                   this.model = res.adType
                   this.sortNumber = res.sortNumber
                   this.status = res.status + ''
                   this.formItem.forwareUrl = res.forwardUrl
                   this.$Message.success(res.message)
               } else {
                   this.$Message.warning(res.message)
               }
		    })
		    .catch(req => {
		    })
        },
        // 修改广告
        resetArticle () {
            var data = {
                adType: this.model,
                forwareUrl: this.formItem.forwareUrl,
                remark: this.formItem.remark,
                id: this.adverId,
                sortNumber: this.sortNumber,
                status: this.status,
                imageUrl: this.formItem.imgurl,
                title: this.formItem.title
            }
            console.log(data, '456')
            this.$post("/admin/advertisement/update", data).then(res => {
               if (res.code == "SUCC") {
                   this.$Message.success(res.message)
                   this.$router.push('/AdvertManagement')
               } else {
                   this.$Message.warning(res.message)
               }
		    })
		    .catch(req => {
		    })
        },
    }
}
</script>

<style scoped>
.tip{
    margin-top: 20px;color: red;
    margin-bottom: 5px
}
.ivu-form-item{
    width: 40%
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
    top: 2px;
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
/* 富文本 */
.edit_container{
    margin-bottom: 60px
}
.quill-editor{
    height: 400px;
}
.ivu-btn-warning{
    margin-right: 20px
}
</style>
</style>