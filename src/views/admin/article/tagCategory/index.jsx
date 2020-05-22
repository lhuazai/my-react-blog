import React, { Component, useState, useEffect } from 'react'
import { connect, useSelector, useDispatch } from 'react-redux'
import { Table, Form, Tag, Switch, message, Input, Button, Popconfirm, Select } from 'antd'
import axios from '@/utils/axios'
import { Link } from 'react-router-dom'
import useBreadcrumb from '@/hooks/useBreadcrumb'

function TagAndCategory() {
  useBreadcrumb(['标签及分类管理'])

  const store = useSelector(state => ({
    tagList: state.article.tagList,
    categoryList: state.article.categoryList
  }))

  const [tagList, setTagList] = useState([])
  const [categoryList, setCategoryList] = useState([])
  const [canEdit, setCanEdit] = useState(true)

  useEffect(() => {
    const tag = addDisable(store.tagList)
    const category = addDisable(store.categoryList)
    setTagList(tag)
    setCategoryList(category)
  }, [store.tagList, store.categoryList])

  function addDisable(arr) {
    return arr.map(item => {
      return {
        ...item,
        disabled: true
      }
    })
  }

  function handleSubmit(data, type) {
    const url = type === 'tag' ? '/tag/update' : '/category/update'
    const params = type === 'tag' ? {
      tagName: data.name,
      tagId: data.id
    } : {
      categoryName: data.name,
      categoryId: data.id
    }
    axios.put(url, params).then(res => {
      console.log('success====', res)
      message.info('修改成功！')
    })
  }

  function saveTag(type, item, index) {
    const data = type === 'tag' ? tagList : categoryList
    const add = JSON.parse(JSON.stringify(data))
    if (!add[index].name || add.some(item => item.name === '')) {
      message.error('请输入完整内容')
      setCanEdit(false)
      return
    } else {
      setCanEdit(true)
    }
    const select = add[index].disabled
    for (let i = 0; i < add.length; i++) {
      if (i === index) {
        add[index].disabled = !select
        if (!select) {
          handleSubmit(add[index], type)
        }
      } else if (select) {
        add[i].disabled = select
      }
    }
    type === 'tag' ? setTagList([...add]) : setCategoryList([...add])
  }

  function setInputValue(value, index, type) {
    const data = type === 'tag' ? tagList : categoryList
    const add = JSON.parse(JSON.stringify(data))
    add[index].name = value
    type === 'tag' ? setTagList([...add]) : setCategoryList([...add])
  }

  return (
    <div className='admin-article-manager'>
      <p>标签修改</p>
      {tagList.map((item, index) => {
        return (
          <div key={item.id} style={{ marginBottom: 10 }}>
            <Input
              style={{ width: 160, marginRight: 30 }}
              type='text'
              size='small'
              disabled={item.disabled}
              defaultValue={item.name}
              onChange={e => setInputValue(e.target.value, index, 'tag')}
            />
            <Button type='primary' size='small' onClick={e => saveTag('tag', item, index)}>{item.disabled ? '编辑' : '完成'}</Button>
          </div>
        )
      })}
      <p>分类修改</p>
      {categoryList.map((item, index) => {
        return (
          <div key={item.id} style={{ marginBottom: 10 }}>
            <Input
              style={{ width: 160, marginRight: 30 }}
              type='text'
              size='small'
              disabled={item.disabled}
              defaultValue={item.name}
              onChange={e => setInputValue(e.target.value, index, 'category')}
            />
            <Button type='primary' size='small' onClick={e => saveTag('category', item, index)}>{item.disabled ? '编辑' : '完成'}</Button>
          </div>
        )
      })}
    </div>
  )
}
export default TagAndCategory

