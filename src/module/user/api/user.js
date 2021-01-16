import http from '../../../base/httpUtil'
const qs = require('qs');


// export const question_FindOne = (id) => {
//   return http.requestQuickGet(`/api/aq_manage/question/findOne?id=${id}`)
// }
// export const question_saveAnswer = (reload) => {
//   return http.requestPost(`/api/aq_manage/answer/saveOne`,reload)
// }
export const indexData = ( ) => {
  return http.requestQuickGet(`/api/cms_manage/indexData/indexData`)
}
export const userLogin = (reload) => {
  return http.requestQuickGet(`/api/fastdevelop/user/userlogin?`+qs.stringify(reload))
}
export const userjwt = ( ) => {
  return http.requestQuickGet(`/api/fastdevelop/user/userjwt`)
}
