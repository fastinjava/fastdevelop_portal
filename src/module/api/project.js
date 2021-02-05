import http from '../../base/httpUtil'
const qs = require('qs');


// export const question_FindOne = (id) => {
//   return http.requestQuickGet(`/api/aq_manage/question/findOne?id=${id}`)
// }
// export const question_saveAnswer = (reload) => {
//   return http.requestPost(`/api/aq_manage/answer/saveOne`,reload)
// }
export const listProjects = ( reload) => {
  return http.requestPost(`/api/fastdevelop_biz_web/project/listProjects`,reload)
}
export const detailProject = ( id ) => {
  return http.requestQuickGet(`/api/fastdevelop_biz_web/project/detail?id=${id}`)
}

export const saveProject = (reload) => {
  return http.requestPost(`/api/fastdevelop_biz_web/project/save`,reload)
}
export const blogContentSet = (reload) => {
  return http.requestPost(`/api/fastdevelop_biz_web/project/contentSet`,reload)
}

export const blogContentGet = (projectId,projectType) => {
  return http.requestQuickGet(`/api/fastdevelop_biz_web/project/blogContentGet?projectId=${projectId}&projectType=${projectType}`)
}

export const userLogin = (reload) => {
  return http.requestQuickGet(`/api/fastdevelop/user/userlogin?`+qs.stringify(reload))
}
export const userList = (reload) => {
  return http.requestQuickGet(`/api/fastdevelop_biz_web/user/listUser?`+qs.stringify(reload))
}
export const chapterInsert = (reload) => {
  return http.requestPost(`/api/fastdevelop_biz_web/chapter/insertSelective`,reload)
}
export const deleteChapter = (reload) => {
  return http.requestPost(`/api/fastdevelop_biz_web/chapter/deleteChapter`,reload)
}
export const updateSelective = (reload) => {
  return http.requestPost(`/api/fastdevelop_biz_web/chapter/updateSelective`,reload)
}
