<template>
  <!-- 新增或修改客户对话框 -->
  <d2-container class="page">
    <el-card>
      <el-tag style="color: red; margin-bottom: 10px">字段名添加后无法修改，请谨慎操作</el-tag>
      <el-form ref="form" :model="form" :rules="rules" label-width="100px">
        <el-row v-for="(item,key) in form.fieldTemplateList" :key="key">
          <el-col :span="5">
            <el-form-item label="字段名">
              <el-input :minlength="1" :disabled="!item.del" :maxlength="10" placeholder="请输入内容" v-model="item.field"
                        @change="edit"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="显示名">
              <el-input :minlength="1" :maxlength="10" placeholder="请输入显示名" v-model="item.label"
                        @change="edit"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="字段类型">
              <el-select placeholder="请选择字段类型" @change="edit" v-model="item.type" filterable style="width: 200px">
                <el-option v-for="item in fieldType" :key="item.value" :label="item.label"
                           :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-form-item>
              <el-checkbox v-model="item.required" @change="edit">必填</el-checkbox>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item>
              <el-button v-show="item.type===5 || item.type===6" type="primary" size="mini"
                         @click="editOption(item.field)">编辑/查看选项
              </el-button>
              <el-button v-if="!item.del" type="danger" size="mini" @click="deleteField(item.field)">删除</el-button>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row style="text-align: center;">
          <el-col :span="12">
            <el-form-item>
              <el-button :type="btnType" @click="addField">{{ btnName }}</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item>
              <el-button type="success" @click="back">返回列表</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>

    <!-- 添加或修改对话框 -->
    <el-dialog :modal="true" :title="title" :visible.sync="open" width="800px" append-to-body>

      <b v-if="form.option && form.option.length>0">选项名(悬浮显示选项值)：</b>
      <span v-for="(item,i) in form.option" :key="i" style="margin: 3px">
        <el-tooltip placement="top">
          <div slot="content">{{ item.value }}</div>
          <el-button @click="delOption(item.label)">{{ item.label }}</el-button>
        </el-tooltip>
      </span>
      <br>
      <span v-if="form.option && form.option.length>0" style="color: red">(单击选项名删除选项)</span>
      <hr>
      <el-form ref="form" :model="form.map" :rules="rules" label-width="100px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="选项名" prop="label">
              <el-input placeholder="选项名" v-model="form.map.label"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="选项值" prop="value">
              <el-input placeholder="选项值" v-model="form.map.value"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item>
              <el-button type="primary" size="mini" @click="addOption">确 定</el-button>
              <el-button size="mini" @click="open=false">取 消</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
  </d2-container>

</template>

<script>

import {addFieldTemplate, deleteField, getFieldTemplate, queryOption} from './fieldTemplate'

export default {
  name: 'editField',
  data() {
    return {
      field: null,
      flag: false,
      btnName: '新增字段',
      btnType: 'primary',
      open: false,
      title: null,
      fieldType: [
        {
          label: '字符',
          value: 1
        },
        {
          label: 'boolean类型',
          value: 2
        },
        {
          label: '日期时间类型',
          value: 3
        },
        {
          label: '数字类型',
          value: 4
        },
        {
          label: '单选类型',
          value: 5
        },
        {
          label: '多选类型',
          value: 6
        }
      ],
      type: null,
      form: {
        fieldTemplateList: [],
        type: null,
        option: {},
        map: {}
      },
      rules: {
        label: [
          {
            required: true, message: '选项名不能为空', trigger: 'blur'
          }
        ],
        value: [
          {
            required: true, message: '选项值不能为空', trigger: 'blur'
          }
        ]
      }
    }
  },
  created() {
    this.type = this.$route.query.type
    this.getList()
  },
  methods: {
    getList() {
      getFieldTemplate(this.type).then((res) => {
        if (res.data.data.length <= 0) {
          this.form.fieldTemplateList.push({
            field: '',
            label: '',
            type: 1,
            required: false,
            del: true
          })
          this.btnName = '保存'
          this.btnType = 'success'
        }else{
          let templates = res.data.data[0].template
          console.log(templates.length)
          let jsonArray = JSON.parse(templates);
          jsonArray.forEach((key) => {
            this.form.fieldTemplateList.push({
              field: key.field,
              label: key.label,
              type: key.type,
              required: key.required,
              del: key.del
            })
            console.log(key)
          })
          console.log(this.form.fieldTemplateList)
        }
      })
    },
    addField() {
      if (this.btnName === '新增字段') {
        this.form.fieldTemplateList.push({
          field: '',
          label: '',
          type: 1,
          required: false,
          del: true
        })
        this.btnName = '保存'
        this.btnType = 'success'
      } else {
        for (let i = 0; i < this.form.fieldTemplateList.length; i++) {
          const fieldData = this.form.fieldTemplateList[i]
          if (fieldData.field.length <= 0 || fieldData.field.length > 10) {
            this.$message.error('请确保每个字段名长度大于0小于或等于10')
            return
          }
          if (fieldData.label.length <= 0 || fieldData.label.length > 10) {
            this.$message.error('请确保每个显示名长度大于0小于或等于10')
            return
          }
        }
        this.form.type = this.type
        addFieldTemplate(this.form).then((res) => {
          this.$message(res.data.msg)
          this.btnName = '新增字段'
          this.btnType = 'primary'
          this.getList()
        })
      }
    },
    editOption(field) {
      this.open = true
      this.title = '编辑选项'
      queryOption(field, this.type).then(res => {
        this.field = field
        this.form.option = res.data.data
      })
    },
    edit() {
      this.btnName = '保存'
      this.btnType = 'success'
    },
    back() {
      this.$router.replace('/server')
    },
    deleteField(field) {
      this.$confirm('此操作将永久删除该字段,并且使用该字段的数据也将删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (field === undefined || field === null) {
          this.$message({
            type: 'info',
            message: '字段名为空无法删除'
          })
        }
        deleteField(field, this.type).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          getFieldTemplate(this.type).then((res) => {
            this.form.fieldTemplateList = res.data.data
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 添加选项方法
    addOption() {
      this.$refs.form.validate(valid => {
          if (valid) {
            for (let i = 0; i < this.form.fieldTemplateList.length; i++) {
              if (this.form.fieldTemplateList[i].field === this.field) {
                if (this.form.fieldTemplateList[i].map === null || this.form.fieldTemplateList[i].map === undefined) {
                  this.form.fieldTemplateList[i].map = []
                }
                console.log(this.form.fieldTemplateList[i].map.length)
                for (let j = 0; j < this.form.fieldTemplateList[i].map.length; j++) {
                  if (this.form.fieldTemplateList[i].map[j].label === this.form.map.label) {
                    this.$message.error('存在重复选项名，无法添加')
                    return
                  }
                  if (this.form.fieldTemplateList[i].map[j].value.toString() === this.form.map.value.toString()) {
                    this.$message.error('存在重复选项值，无法添加')
                    return
                  }
                }
                this.form.fieldTemplateList[i].map.push({
                  label: this.form.map.label,
                  value: this.form.map.value
                })
                this.form.type = this.type
                addFieldTemplate(this.form).then(() => {
                  queryOption(this.field, this.type).then(res => {
                    this.form.option = res.data.data
                  })
                  this.$message.success('保存成功')
                  this.btnName = '新增字段'
                  this.btnType = 'primary'
                  this.form.map.label = ''
                  this.form.map.value = ''
                })
              }
            }
          }
        }
      )
    },
    // 删除选项方法
    delOption(label) {
      this.$confirm('此操作将永久删除该选项, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        for (let i = 0; i < this.form.fieldTemplateList.length; i++) {
          if (this.form.fieldTemplateList[i].field === this.field) {
            for (let j = 0; j < this.form.fieldTemplateList[i].map.length; j++) {
              if (this.form.fieldTemplateList[i].map[j].label === label) {
                this.form.fieldTemplateList[i].map.splice(j, 1)
                this.form.type = this.type
                addFieldTemplate(this.form).then(() => {
                  this.$message.success('删除成功')
                  queryOption(this.field, this.type).then(res => {
                    this.form.option = res.data.data
                  })
                })
              }
            }
          }
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>

<style scoped>
.container {
  padding: 20px;
}
</style>
