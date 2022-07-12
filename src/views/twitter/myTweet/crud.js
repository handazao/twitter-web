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
      width: 120,
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
        key: 'id',
        width: 200,
        type: 'input'
      },
      {
        title: '推文',
        key: 'text',
        type: 'textarea'
      },
      {
        title: '创建时间',
        key: 'created_at',
        width: 200,
        type: 'datetime'
      }
    ].concat()
  }
}
