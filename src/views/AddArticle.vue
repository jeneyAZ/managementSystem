<template>
    <div>
        <i-form :model="formItem" :label-width="80">
            <Form-item label="所属分类：">
                <i-select :model.sync="model" style="width:100px" @on-change='handleSelectKind($event)' placeholder="请选择分类">
                    <i-option v-for="item in kindList" :value="item.id">{{item.name}}</i-option>
                </i-select>
            </Form-item>
            <Form-item label="信息标题：">
                <i-input :value.sync="formItem.title" v-model="formItem.title" placeholder="请输入信息标题"></i-input>
            </Form-item>
            <Form-item label="文章简介：">
                <i-input :value.sync="formItem.intro" v-model="formItem.title" placeholder="请输入文章简介"></i-input>
            </Form-item>
            <Form-item label="图片：">
                <i-input :value.sync="formItem.imgurl" readonly style="width:60%"></i-input>
                <template>
                    <div class="file">点击选择上传文件
                        <input type="file" id="fileId" placeholder="点击上传文件" @change="uploadFile($event)">
                    </div>
                </template>
            </Form-item>
            <div class="edit_container">
               <quill-editor
                    v-model="content"
                        ref="myQuillEditor"
                        :options="editorOption"
                        @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
                        @change="onEditorChange($event)">
                    </quill-editor>
                <div v-html="str" class="ql-editor">{{str}}</div>
            </div>
            <Form-item label="浏览量：">
                <i-input :value.sync="Browsing" v-model="Browsing"></i-input>
            </Form-item>
            <Form-item label="点赞量：">
                <i-input :value.sync="zan" v-model="zan"></i-input>
            </Form-item>
            <Form-item label="属性标记：">
                <Radio-group :model.sync="value" @on-change="tagChange($event)">
                    <Radio v-for="(item, index) in tagList" :label="item.id" :key="index">{{item.name}}</Radio>
                </Radio-group>
            </Form-item>
            <Form-item>
                <i-button type="warning" size="large" @click="resetArticle()">修改</i-button>
                <i-button type="primary" size="large" @click="addArticle()">添加</i-button>
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
    name: 'AddArticle',
    components: {
        quillEditor
    },
    data() {
        return {
            model: '',
            formItem: {
                title: '',
                time: '',
                imgurl: '',
                intro: ''
            },
            // 文本编辑
            content: '',
            editorOption: {},
            str: '',
            // 浏览量
            Browsing: '',
            zan: '',
            tagList: [],
            kindID: '',
            status: 1,
            sortNumber: 1,
            value: 0,
            kindList: []
        }
    },
    created() {
        this.kindList = JSON.parse(localStorage.getItem('kindTxt'))
        this.getArticledetail()
        this.getTag()
    },
    methods: {
        // 获取标签
        getTag () { 
            var data = {
                pageNum: 1,
                pageSize: 10
            }
            this.$get("/admin/article_tag/getList", data).then(res => {
                if (res.code == "SUCC") {
                var res = res.result;
                this.tagList = res.data;
                } else {
                this.$Message.warning(res.message);
                }
            });
         },
        //  标签触发
        tagChange (val) {
            this.value = val
        },
        // 类型选择触发
        handleSelectKind (val) {
            this.kindID = val
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
        // 富文本
        onEditorReady(editor) {}, // 准备编辑器 
        onEditorBlur(val){}, // 失去焦点事件
        onEditorFocus(val){}, // 获得焦点事件
        onEditorChange(val){}, // 内容改变事件
        escapeStringHTML(str) {
            str = str.replace(/&lt;/g,'<');
            str = str.replace(/&gt;/g,'>');
            return str;
        },
        // 获取文章详情
        getArticledetail () {
            var id = this.$route.query.id
            if (id == undefined) {
                return false
            }
            this.$post("/admin/article/getDetail?id="+id).then(res => {
                console.log(res)
               if (res.code == "SUCC") {
                   var res = res.result
                   this.kindID = res.articleCategoryId
                   this.Browsing = res.browseTimes
                   this.content = res.content
                   this.zan = res.praiseTimes
                   this.sortNumber = res.sortNumber
                   this.status = res.status
                   this.value = res.tagIdList[0]
                   this.formItem.imgurl = res.thumbnailUrl
                   this.formItem.title = res.title
                   this.formItem.intro = res.intro
                   this.$Message.success(res.message)
               } else {
                   this.$Message.warning(res.message)
               }
		    })
		    .catch(req => {
		    })
        },
        // 修改文章
        resetArticle () {
            var data = {
                articleCategoryId: this.kindID,
                browseTimes: this.Browsing,
                content: this.content,
                id: this.$route.query.id,
                praiseTimes: this.zan,
                sortNumber: this.sortNumber,
                status: this.status,
                tagIds: this.value,
                thumbnailUrl: this.formItem.imgurl,
                title: this.formItem.title,
                intro: this.formItem.intro
            }
            this.$post("/admin/article/update", data).then(res => {
                console.log(res)
               if (res.code == "SUCC") {
                   this.$Message.success(res.message)
               } else {
                   this.$Message.warning(res.message)
               }
		    })
		    .catch(req => {
		    })
        },
        // 添加文章
        addArticle () {
            var data = {
                articleCategoryId: this.kindID,
                browseTimes: this.Browsing,
                content: this.content,
                praiseTimes: this.zan,
                sortNumber: this.sortNumber,
                status: this.status,
                tagIds: this.value,
                thumbnailUrl: this.formItem.imgurl,
                title: this.formItem.title,
                intro: this.formItem.intro
            }
            this.$post("/admin/article/add", data).then(res => {
               if (res.code == "SUCC") {
                   this.$Message.success(res.message)
               } else {
                   this.$Message.warning(res.message)
               }
		    })
		    .catch(req => {
		    })
        }
    },
    mounted() {
        let content = '';  // 请求后台返回的内容字符串
        this.str = this.escapeStringHTML(content);
    },
    computed: {
        editor() {
            return this.$refs.myQuillEditor.quill;
        },
    }
}
</script>

<style scoped>
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
</style>