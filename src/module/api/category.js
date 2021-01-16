import http from '../../base/httpUtil'
const qs = require('qs');


// export const question_FindOne = (id) => {
//   return http.requestQuickGet(`/api/aq_manage/question/findOne?id=${id}`)
// }
// export const question_saveAnswer = (reload) => {
//   return http.requestPost(`/api/aq_manage/answer/saveOne`,reload)
// }
export const listProjects = ( ) => {
  return http.requestQuickGet(`/api/fastdevelop_biz_web/project/listProjects`)
}

export const saveProject = (reload) => {
  return http.requestPost(`/api/fastdevelop_biz_web/project/save`,reload)
}
export const blogContentSet = (reload) => {
  return http.requestPost(`/api/fastdevelop_biz_web/project/contentSet`,reload)
}

export const blogContentGet = (projectId) => {
  return http.requestQuickGet(`/api/fastdevelop_biz_web/project/blogContentGet?projectId=${projectId}`)
}

export const userLogin = (reload) => {
  return http.requestQuickGet(`/api/fastdevelop/user/userlogin?`+qs.stringify(reload))
}
export const listAll = (reload) => {
  return http.requestQuickGet(`/api/fastdevelop_biz_web/category/listAll?`+qs.stringify(reload))
}
export const categorySave = (reload) => {
  return http.requestPost(`/api/fastdevelop_biz_web/category/save`,reload)
}
export const categorySelectTree = ( ) => {
  return http.requestQuickGet(`/api/fastdevelop_biz_web/category/selectTree`)
}
