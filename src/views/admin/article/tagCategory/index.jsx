import React, { Component, useState, useEffect } from 'react'
import { connect, useSelector, useDispatch } from 'react-redux'
import { Table, Form, Tag, Switch, message, Input, Button, Popconfirm, Select } from 'antd'

import axios from '@/utils/axios'

import { Link } from 'react-router-dom'
import moment from 'moment'
import download from '@/utils/download'

import useAntdTable from '@/hooks/useAntdTable'

function TagAndCategory() {
  return (
    <div>
      <p>hahha</p>
    </div>
  )
}
export default TagAndCategory

