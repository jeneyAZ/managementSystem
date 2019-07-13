<template>
    <div>
        <i-form :model="formItem" :label-width="80">
            <Form-item label="所属分类：">
                <i-select :model.sync="model" style="width:100px" @on-change='handleSelectKind($event)' placeholder="请选择分类">
                    <i-option v-for="item in kindList" :value="item.value">{{item.label}}</i-option>
                </i-select>
            </Form-item>
            <Form-item label="信息标题：">
                <i-input :value.sync="formItem.title" placeholder="请输入信息标题"></i-input>
            </Form-item>
            <Form-item label="图片">
                <i-input :value.sync="formItem.imgurl" readonly style="width:60%"></i-input>
                <template>
                    <div class="file">点击选择上传文件
                        <input type="file" id="fileId" placeholder="点击上传文件" @change="uploadFile($event)">
                        <!-- <div class="clickBtn"></div> -->
                    </div>
                </template>
            </Form-item>
            <Form-item label="添加时间：">
                <row>
                     <i-col span="12">
                         <Date-picker type="date" :value.sync='formItem.time' placeholder="选择日期" style="width: 200px" @on-change="getDate($event)"></Date-picker>
                     </i-col>
                </row>
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
                <i-input :value.sync="Browsing" readonly></i-input>
            </Form-item>
            <Form-item label="点赞量：">
                <i-input :value.sync="Browsing" readonly></i-input>
            </Form-item>
            <Form-item label="属性标记：">
                <Radio-group :model.sync="value" @on-change="xxx($event)">
                    <Radio v-for="(item, index) in radioList" :label="item.value" :key="index">{{item.label}}</Radio>
                    <!-- <Radio ref="radio0" value="0">推荐</Radio>
                    <Radio ref="radio1" value="1">原创</Radio>
                    <Radio ref="radio2" value="2">回收站</Radio> -->
                </Radio-group>
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
            kindList: [
                {
                    value: 1,
                    label: '科幻'
                },
                {
                    value: 2,
                    label: '恐怖'
                }
            ], // 类型选择
            formItem: {
                title: '',
                time: '',
                imgurl: ''
            },
            // 文本编辑
            content: '',
            editorOption: {},
            str: '',
            // 浏览量
            Browsing: '',
            zan: '',
            radioList: [
                {
                  label: '推荐',
                  value: '0'
                }, {
                  label: '原创',
                  value: '1'
                }, {
                  label: '回收站',
                  value: '2'
                }
            ],
            value: 0
        }
    },
    created() {
        this.getOrderData()
        switch (this.value) {
            case 0:

                break;

            default:
                break;
        }
    },
    methods: {
        xxx (val) {
            console.log(val, 'az')
            this.value = val
        },
        // 类型选择触发
        handleSelectKind (val) {
            console.log(val)
        },
        // 日期选择
        getDate (val) {
            this.formItem.time = val
            console.log(this.formItem.time)
        },
        // 文件上传
        uploadFile (event, i) {
          let file = event.target.files[0]
          console.log(file)
          return false
          let param = new FormData()
          param.append('file', file, file.name)
          param.append('type', '1')
          let url = this.$api.order + '/api/Upload/uploadComplainFile'
          postImg(url, param)
            .then(res => {
              console.log(res)
            })
            .catch(e => {
              // alert(e)
              console.log(e)
              this.$toast(e.msg)
            })
        },
        // 富文本
        onEditorReady(editor) { // 准备编辑器

        },
        onEditorBlur(){}, // 失去焦点事件
        onEditorFocus(){}, // 获得焦点事件
        onEditorChange(){}, // 内容改变事件
        escapeStringHTML(str) {
            str = str.replace(/&lt;/g,'<');
            str = str.replace(/&gt;/g,'>');
            return str;
        },
        // 获取列表数据
        getOrderData () {}
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