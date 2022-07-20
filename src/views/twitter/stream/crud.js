export const crudOptions = (vm) => {
  return {
    pageOptions: {
      compact: false
    },
    options: {
      height: '100%',
      tableType: 'vxe-table',
      rowKey: true // 必须设置，true or false
    },
    rowHandle: {
      width: 120,
      fixed: 'right',
      view: {
        thin: true,
        text: '',
        show: false
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
        show: true,
        disabled: false
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
        title: '过滤规则',
        key: 'query',
        disabled: true,
        minWidth: 120,
        type: 'input',
        form: {
          component: {
            props: {
              clearable: true
            },
            placeholder: '请添加过滤规则'
          }
        }
      },
      {
        title: 'id',
        key: 'id',
        width: 200,
        type: 'input',
        form: {
          disabled: true
        }
      },
      {
        title: '文本',
        key: 'value',
        type: 'textarea',
        form: {
          disabled: true
        }
      },
      {
        title: '标签',
        key: 'tag',
        width: 200,
        type: 'input',
        form: {
          disabled: true
        }
      }
    ].concat()
  }
}
