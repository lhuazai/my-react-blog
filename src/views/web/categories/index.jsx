import React, { Component } from 'react'
import './index.less'
import { useSelector } from 'react-redux'
import { Badge, Tag } from 'antd'
import { Link } from 'react-router-dom'

function Categories(props) {
  const categoryList = useSelector(state => state.article.categoryList)

  return (
    <div className='app-categories'>
      <h2 className='title'>分类</h2>
      <p className='category-all-title'>{`总共 ${categoryList.length} 类`}</p>

      <div className='categories-list'>
        {categoryList.map((item, i) => (
          <Badge count={item.count} key={item.name}>
            <Tag color={item.color}>
              <Link to={`/categories/${item.name}`}>{item.name}</Link>
            </Tag>
          </Badge>
        ))}
      </div>
    </div>
  )
}

export default Categories
