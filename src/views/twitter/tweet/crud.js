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
      }
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
        title: '推文ID',
        key: 'since_id',
        search: {
          disabled: false,
          width: 250
        },
        disabled: true,
        form: {
          disabled: true,
          component: {
            props: {
              clearable: true
            },
            placeholder: '返回大于指定ID的结果'
          }
        }
      },
      {
        title: '推文ID',
        key: 'until_id',
        disabled: true,
        search: {
          disabled: false,
          width: 250
        },
        minWidth: 100,
        form: {
          disabled: true,
          component: {
            props: {
              clearable: true
            },
            placeholder: '返回小于指定ID的结果'
          }
        }
      },
      {
        title: '查询条件',
        key: 'query',
        disabled: true,
        search: {
          disabled: false,
          width: 200
        },
        minWidth: 120,
        type: 'input',
        form: {
          component: {
            props: {
              clearable: true
            },
            placeholder: '请输入查询条件'
          }
        }
      },
      {
        title: '推文ID',
        key: 'id',
        minWidth: 120,
        type: 'input'
      },
      {
        title: '推文',
        key: 'text',
        minWidth: 500,
        type: 'textarea'
      },
      {
        title: '附件',
        key: 'attachments',
        minWidth: 200,
        type: 'input'
      }, {
        title: '作者',
        key: 'author_id',
        minWidth: 80,
        type: 'input'
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
