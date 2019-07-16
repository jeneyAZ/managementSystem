<template>
    <div>
        <i-form :model="formItem" :label-width="80">
            <Form-item label="标题：">
                <i-input :value.sync="formItem.title" placeholder="请输入广告标题"></i-input>
            </Form-item>
            <Form-item label="图片">
                <i-input :value.sync="formItem.imgurl" readonly style="width:60%" placeholder="点击上传文件"></i-input>
                <template>
                    <div class="file">点击选择上传文件
                        <input type="file" id="fileId" placeholder="点击上传文件" @change="uploadFile($event)">
                        <!-- <div class="clickBtn"></div> -->
                    </div>
                </template>
            </Form-item>
             <Form-item label="网址：">
                <i-input :value.sync="formItem.address" placeholder="请输入网址"></i-input>
            </Form-item>
             <Form-item label="备注：">
                <i-input :value.sync="formItem.remark" placeholder="请输入备注信息"></i-input>
            </Form-item>
            <Form-item label="类型：">
                <i-select :model.sync="model" style="width:150px" @on-change='handleSelectKind($event)' placeholder="请选择广告类型">
                    <i-option v-for="item in kindList" :value="item.value">{{item.label}}</i-option>
                </i-select>
            </Form-item>
            <Form-item>
                <i-button type="primary" size="large" @click="submit()">确定</i-button>
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
            // 类型选择
            kindList: [
                {
                    value: 1,
                    label: '首页广告'
                },
                {
                    value: 2,
                    label: '内页广告'
                }
            ],
            formItem: {
                title: '',
                address: '',
                remark: '',
                imgurl: ''
            }
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
        // 类型选择触发
        handleSelectKind (val) {
            console.log(val)
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
        // 获取列表数据
        getOrderData () {}
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