<template>
    <!-- <div class="login-vue" :style="bg"> -->
    <div class="login-vue">
        <div class="container">
            <p class="title">登录</p>
            <div class="input-c">
                <Input prefix="ios-contact" v-model="account" placeholder="用户名" clearable/>
            </div>
            <div class="input-c az-pa">
                <Input type="password" v-model="pwd" prefix="md-lock" placeholder="密码" clearable/>
            </div>
            <Button :loading="isShowLoading" class="submit" type="primary" @click="submit()">登录</Button>
            <!-- <p class="account"><span @click="register">注册账号</span> | <span @click="forgetPwd">忘记密码</span></p> -->
        </div>
    </div>
</template>

<script>
export default {
    name: 'login',
    data() {
        return {
            account: '',
            pwd: '',
            isShowLoading: false,
            bg: {}
        }
    },
    created() {
        // this.bg.backgroundImage = 'url(' + require('../assets/imgs/bg0' + new Date().getDay() + '.jpg') + ')'
    },
    // watch: {
    //     $route: {
    //         handler: function(route) {
    //             this.redirect = route.query && route.query.redirect
    //         },
    //         immediate: true
    //     }
    // },
    methods: {
        register() {
            console.log('注册账号')
        },
        forgetPwd() {
            console.log('忘记密码')
        },
        submit() {
            // var data = {
            //      "username":this.account,
            //      "password":this.pwd
            // }
            // console.log(data)
            // this.$post("/sys-user/login",data).then(res => {
            //     console.log(res)
            //    if (res.code == "SUCC") {
            //        this.$Message.success(res.message)
            //    } else {
            //        this.$Message.warning(res.message)
            //    }
		    // })
		    // .catch(req => {
		    // })
            if (this.account === 'admin' && this.pwd === '123456') {
                this.isShowLoading = true
                // 登陆成功 设置用户信息
                localStorage.setItem('userImg', 'https://avatars3.githubusercontent.com/u/22117876?s=460&v=4')
                localStorage.setItem('userName', '管理员')
                // 登陆成功 假设这里是后台返回的 token
                localStorage.setItem('token', 'i_am_token')
                // console.log(this.redirect)
                // this.$router.push({path: this.redirect || '/'})
                this.$router.push({path: '/ClassifiedManagement'})
            }
        }
    }
}
</script>

<style>
.login-vue {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    background-image: url('../assets/imgs/bg05.jpg');
}
.login-vue .container {
    background: rgba(255, 255, 255, .5);
    width: 400px;
    text-align: center;
    border-radius: 10px;
    padding: 40px;
}
.login-vue .ivu-input {
    background-color: transparent;
    color: #fff;
    outline: #fff;
    border-color: #fff;
}
.login-vue ::-webkit-input-placeholder { /* WebKit, Blink, Edge */
    color: rgba(255, 255, 255, .8);
}
.login-vue :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
    color: rgba(255, 255, 255, .8);
}
.login-vue ::-moz-placeholder { /* Mozilla Firefox 19+ */
    color: rgba(255, 255, 255, .8);
}
.login-vue :-ms-input-placeholder { /* Internet Explorer 10-11 */
    color: rgba(255, 255, 255, .8);
}
.login-vue .title {
    font-size: 20px;
    margin-bottom: 30px;
}
.login-vue .input-c {
    margin: auto;
    width: 300px;
}
.login-vue .error {
    color: red;
    text-align: left;
    margin: 5px auto;
    font-size: 12px;
    padding-left: 30px;
    height: 20px;
}
.login-vue .submit {
    width: 300px;
}
.login-vue .account {
    margin-top: 30px;
}
.login-vue .account span {
    cursor: pointer;
}
.login-vue .ivu-icon {
    color: #eee;
}
.login-vue .ivu-icon-ios-close-circle {
    color: #777;
}
.az-pa{
    margin: 30px auto !important
}
</style>


