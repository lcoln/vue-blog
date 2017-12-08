<template>
  <div class="do-mod-login login" @keyup.enter="submit">
      <span class="title">BLOG-VUE</span>
      <section>
          <div class="sign-in" :class="{show: !signUp}">
              <span class="msg" :class="{show: msg}">{{msg}}</span>
              <section class="input">
                  <i class="iconfont">&#xe609;</i>
                  <input type="text" class="txt" placeholder="邮箱" v-model="form.email" />
              </section>
              <section class="input">
                  <i class="iconfont">&#xe604;</i>
                  <input type="password" class="txt" placeholder="密码" v-model="form.password" />
              </section>
              <a href="javascript:;" class="forget a" @click="forget">忘记密码?</a>
              <a href="javascript:;" class="submit" @click="submit">登录</a>
              <p>没有账号?<a href="javascript:;" class="a" @click="toggle">点击注册</a></p>
          </div>
          <div class="sign-up" :class="{show: signUp}">
              <span class="msg" :class="{show: msg}">{{msg}}</span>
              <section class="input">
                  <i class="iconfont">&#xe70f;</i>
                  <input type="text" class="txt" placeholder="邮箱" v-model="form.email" />
              </section>
              <section class="input">
                  <i class="iconfont">&#xe609;</i>
                  <input type="text" class="txt" placeholder="昵称" v-model="form.alias" />
              </section>
              <section class="input">
                  <i class="iconfont">&#xe604;</i>
                  <input type="password" class="txt" placeholder="密码" v-model="form.password" />
              </section>
              <section class="input">
                  <i class="iconfont">&#xe604;</i>
                  <input type="password" class="txt" placeholder="请再次输入密码" v-model="form.passwordConfirm" />
              </section>
              <section class="input">
                  <i class="iconfont">&#xe636;</i>
                  <input type="text" class="txt w-30" placeholder="验证码" v-model="form.code" />
                  <img class="code" @click="changeCode" src="https://api.cncoders.me/user/captcha" />
                  <!-- <a href="javascript:;" class="getCode" @click="getCode">获取验证码</a> -->
              </section>
              <a href="javascript:;" class="submit" @click="submit">注册</a>
              <a href="javascript:;" class="submit" @click="toggle">←</a>
          </div>
      </section>
      <Layer></Layer>
  </div>
</template>

<script>

import vue from "vue";
import store from 'store';
import common from 'common';
import dialog from './components/layer/';
vue.use(dialog)

var reg = {}

export default {
  data () {
      return {
          signUp: false,
          form: {
              email: '',
              code: '',
              password: '',
              alias: '',
              passwordConfirm: ''
          },
          msg: '',
      }
  },
  mounted () {
    reg = store.state.reg
  },
  methods: {
    forget: function(){

    },
    submit: async function(){
      let _this = this
      let form = this.form
      let json = {}

      if(!reg.email.test(form.email)){
        return this.$layer.alert('邮箱格式不正确', {title: '提示', icon: 2})
      }
      if(!reg.passwd.test(form.password)){
        return this.$layer.alert('密码为6-18位包含数字与字母的字符', {title: '提示', icon: 2})
      }

      if(this.signUp && this.password !== this.passwordConfirm){
        return this.$layer.alert('两次输入密码不一致', {title: '提示', icon: 2})
      }

      if(this.signUp){
        json = await common.post(baseUrl + 'user/register', form)
      }else{
        json = await common.post(baseUrl + 'user/login', form)
      }
      if(json && !json.err){
        return this.$layer.alert(json.msg, {icon: 2})
      }

      /*this.$layer.confirm(111, {
        title: 'confirm',
        icon: 3,
        yes: function(){console.log('yes');_this.$layer.close()},
        no: function(){console.log('no');}
      })*/

      /*this.$layer.prompt('Are you a boy or a girl', {
        title: 'prompt',
        icon: 4,
        yes: function(v){console.log(v);},
        no: function(v){console.log(v);}
      })*/
    },
    toggle: function(){
      for(let it of Object.keys(this.form)){
        this.form[it] = ''
      }
      this.signUp = !this.signUp
    },
    changeCode: function(){

    },
  },
  components: {

  }
}
</script>

<style lang="scss">

</style>
