export const crudOptions = (vm) => {
  return {
    pageOptions: {
      compact: true
    },
    options: {
      height: '100%',
      tableType: 'vxe-table',
      rowKey: true // 必须设置，true or false
    },
    rowHandle: {
      width: 240,
      fixed: 'right',
      view: {
        thin: true,
        text: ''
      },
      edit: {
        thin: true,
        text: '',
        show: false,
        disabled: true
      },
      remove: {
        thin: true,
        text: '',
        show: false,
        disabled: true
      },
      custom: [
        {
          thin: true,
          text: '保存',
          size: 'small',
          type: 'success',
          icon: 'el-icon-plus',
          emit: 'saveRequest'
        }
      ]
    },
    viewOptions: {
      componentType: 'form'
    },
    formOptions: {
      defaultSpan: 12 // 默认的表单 span
    },
    indexRow: { // 或者直接传true,不显示title，不居中
      title: '序号',
      align: 'center',
      width: 60
    },
    columns: [
      {
        title: '用户类型',
        key: 'user_type',
        disabled: true,
        search: {
          disabled: false
        },
        width: 145,
        type: 'select',
        dict: {
          data: vm.dictionary('user_type')
        },
        form: {
          show: false,
          value: 0,
          component: {
            span: 12
          }
        }
      },
      {
        title: 'ID',
        key: 'id',
        disabled: true,
        form: {
          disabled: true
        }
      },
      {
        title: '账号',
        key: 'screen_name',
        search: {
          disabled: false
        },
        minWidth: 100,
        type: 'input',
        form: {
          component: {
            props: {
              clearable: true
            },
            placeholder: '请输入账号'
          }
        }
      },
      {
        title: '姓名',
        key: 'name',
        minWidth: 100,
        type: 'input'
      },
      {
        title: '地址',
        key: 'location',
        minWidth: 110,
        type: 'input'
      }, {
        title: '用户描述',
        key: 'description',
        minWidth: 180,
        type: 'textarea'
      },
      {
        title: '是否认证',
        key: 'verified',
        type: 'radio',
        width: 100,
        dict: ({
          data: [{ value: false, label: '否' }, { value: true, label: '是' }]
        })
      }, {
        title: '粉丝数',
        key: 'followers_count',
        width: 70
      }, {
        title: '关注数',
        key: 'friends_count',
        width: 70,
        type: 'input'
      },
      {
        title: '点赞数',
        key: 'favourites_count',
        type: 'input',
        width: 70
      },
      {
        title: '发布数',
        key: 'statuses_count',
        width: 70
      },
      {
        title: '创建时间',
        key: 'created_at',
        minWidth: 130,
        type: 'datetime'
      }
    ].concat()
  }
}
