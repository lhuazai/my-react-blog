import * as TYPES from '@/redux/types'
import axios from '@/utils/axios'

export const getTagList = () => dispatch =>
  axios.get('/tag/list').then(list => {
    console.log('tag', list)
    dispatch({
      type: TYPES.ARTICLE_GET_TAG_LIST,
      payload: list
    })
  })

export const getCategoryList = () => dispatch =>
  axios.get('/category/list').then(list => {
    console.log('category', list)
    dispatch({
      type: TYPES.ARTICLE_GET_CATEGORY_LIST,
      payload: list
    })
  })
