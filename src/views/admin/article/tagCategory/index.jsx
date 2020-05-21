import React, { Component, useState, useEffect } from 'react'
import { connect, useSelector, useDispatch } from 'react-redux'
import { Table, Form, Tag, Switch, message, Input, Button, Popconfirm, Select } from 'antd'

import axios from '@/utils/axios'

import { Link } from 'react-router-dom'
import moment from 'moment'
import download from '@/utils/download'

import useAntdTable from '@/hooks/useAntdTable'

function TagAndCategory() {
  const { tagList, categoryList } = useSelector(state => ({
    tagList: state.article.tagList,
    categoryList: state.article.categoryList
  }))

  const [editObj, setEditObj] = useState({})
  const [isEdit, setIsEdit] = useState(false)

  function handleSubmit() {
    axios.post(`/tag/update`, {
      tagName: editObj.name,
      tagId: editObj.id
    }).then(res => {
      console.log('success====', res)
    })
  }

  function setInputValue(value, id) {
    const data = {
      id,
      name: value
    }
    setEditObj(data)
  }

  return (
    <div className='admin-article-manager'>
      {tagList.map(item => {
        return (
          <Input
            key={item.id}
            style={{ width: 78, }}
            type='text'
            size='small'
            value={item.name}
            onChange={e => setInputValue(e.target.value, item.id)}
            onPressEnter={handleSubmit}
          />
        )
      })}
      {/* {categoryList.map(item => {
        return (
          <Input
            key={item.id}
            style={{ width: 78, display: 'inline' }}
            type='text'
            size='small'
            value={item.name}
            onChange={e => setInputValue(e.target.value)}
            onPressEnter={handleSubmit}
          />
        )
      })} */}
    </div>
  )
}
export default TagAndCategory

