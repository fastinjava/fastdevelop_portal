require('es6-promise').polyfill()
import axios from 'axios'
import {Message} from 'element-ui';
import router from '../router/index'

axios.defaults.withCredentials = true //跨域
axios.defaults.timeout = 10000
axios.defaults.headers.post['Content-Type'] = 'application/x-www=form-urlencoded'


// function getCookie(name)
// {
//   var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
//
//   if(arr=document.cookie.match(reg))
//
//     return unescape(arr[2]);
//   else
//     return null;
// }


// let token = window.localStorage.getItem("token");
// let token = getCookie("token");
// let token = window.userinfoToken;
// console.log('outer',token);
axios.interceptors.request.use(function (config) {    // 这里的config包含每次请求的内容
  let token = window.localStorage.getItem("token");

  if (token) {
    // console.log('inner',token);
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, function (err) {
  return Promise.reject(err);
});



export default {
  //get请求
  requestGet (url, params = {}) {
    return new Promise((resolve, reject) => {
      axios.get(url, params).then(res => {
        resolve(res.data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  //get请求不带参数
  requestQuickGet (url) {
    return new Promise((resolve, reject) => {
      axios.get(url).then(res => {
        resolve(res.data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  //post请求
  requestPost (url, params = {}) {
    return new Promise((resolve, reject) => {
      axios.post(url, params).then(res => {
        resolve(res.data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  //post请求
  requestPostForm (url, params = {}) {
    return new Promise((resolve, reject) => {
      axios.post(url, params, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }).then(res => {
        resolve(res.data)//注意res是axios封装的对象，res.data才是服务端返回的信息
      }).catch(error => {
        reject(error)
      })
    })
  },
  //put请求
  requestPut (url, params = {}) {
    return new Promise((resolve, reject) => {
      axios.put(url, params).then(res => {
        resolve(res.data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  //delete请求
  requestDelete (url, params = {}) {
    return new Promise((resolve, reject) => {
      axios.delete(url, params).then(res => {
        resolve(res.data)
      }).catch(error => {
        reject(error)
      })
    })
  }
}


// http response 拦截器
axios.interceptors.response.use(
  response => {
    let success = response.data.success;
    if (!success) {
      let code = response.data.code + "";
      if (code.slice(0,-1)==='4000') {
        Message.error("请重新登录");
        router.push({name:'Login'})
      }
      else {
        Message.error(response.data.msg)
      }
    }else {
      return response;
    }

    return response;

  },
  error => {
    Message.error("系统错误");
    return Promise.reject(error)
  }
);
