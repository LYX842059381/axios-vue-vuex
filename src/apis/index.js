/*
 * @Author: liuxin 
 * @Date: 2018-07-01 13:48:41 
 * @Last Modified by: liuxin
 * @Last Modified time: 2018-09-26 16:24:32
 */

import axios from 'axios'

let origin = 'https://api.lxinr.top'

const instance = axios.create({
  baseURL: `${origin}/snowball/`
})


export const fetchList = (page = 1, type = "") => {
  return instance({
    method: "get",
    url: "/artlist",
    params: {
      page,
      type
    }
  })
}

export const fetchArticle = (target = "") => {
  return instance({
    method: "get",
    url: "/artdetail",
    params: {
      target
    }
  })
}
