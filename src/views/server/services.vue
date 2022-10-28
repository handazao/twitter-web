<template>
  <d2-container>
    <div>
      <div slot="header">
        <el-row :gutter="10" class="mb8">
          <el-col :span="1.5">
            <el-button type="primary" @click="handleUpdate" size="mini">新增</el-button>
            <el-button type="success" @click="goTree" icon="el-icon-plus" size="mini">编辑自定义字段</el-button>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-table :data="serviceList" style="width: 100%">
              <el-table-column type="expand">
                <template slot-scope="props">
                  <el-form label-position="left" inline class="demo-table-expand">
                    <el-form-item label="到期时间">
                      <span>{{ props.row.expire_time }}</span>
                    </el-form-item>
                    <el-form-item label="付款类型">
                      <span>{{ props.row.pay_type }}</span>
                    </el-form-item>
                    <el-form-item label="付款金额">
                      <span>{{ props.row.pay_amount }}</span>
                    </el-form-item>
                  </el-form>
                </template>
              </el-table-column>
              <el-table-column prop="name" label="名称"/>
              <el-table-column prop="address" label="地址"/>
              <el-table-column prop="ip" label="IP"/>
              <el-table-column prop="configuration" label="配置"/>
              <el-table-column prop="user_name" label="用户名"/>
              <el-table-column prop="pass_word" label="密码"/>

              <el-table-column v-for="item in form.fieldTemplateList" :key="item" :prop="item.field"
                               :label="item.label"/>

              <el-table-column align="right">
                <template slot="header">
                  <el-table-column v-for="item in form.fieldTemplateList" :key="item" :prop="item.field"
                                   :label="item.value"/>
                </template>
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    type="text"
                    icon="el-icon-edit"
                    @click="handleUpdate(scope.row)"
                  >修改
                  </el-button>
                  <el-button
                    size="mini"
                    type="text"
                    icon="el-icon-delete"
                    @click="handleDelete(scope.row)"
                  >删除
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
      </div>

      <el-dialog :title="title" :visible.sync="open" width="1000px" append-to-body>
        <el-form ref="form" label-width="120px" :rules="rules" :model="form">
          <el-row>
            <el-col :span="12">
              <el-form-item label="名称" prop="name">
                <el-input v-model="form.name" placeholder="请输入名称" style="width: 220px"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="地址" prop="address">
                <el-input v-model="form.address" placeholder="请输入地址" style="width: 220px"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="IP" prop="ip">
                <el-input v-model="form.ip" placeholder="请输入IP" style="width: 220px"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="配置" prop="configuration">
                <el-input v-model="form.configuration" placeholder="请输入配置" style="width: 220px"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="用户名称" prop="user_name">
                <el-input v-model="form.user_name" placeholder="请输入用户名称" style="width: 220px"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="密码" prop="pass_word">
                <el-input v-model="form.pass_word" placeholder="请输入密码" style="width: 220px"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="付款类型" prop="pay_type">
                <el-select v-model="form.pay_type">
                  <el-option :value="-1" label="白嫖"></el-option>
                  <el-option :value="0" label="月付"></el-option>
                  <el-option :value="1" label="季付"></el-option>
                  <el-option :value="2" label="半年付"></el-option>
                  <el-option :value="3" label="年付"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="付款金额" prop="pay_amount">
                <el-input v-model="form.pay_amount" placeholder="请输入付款金额" style="width: 220px"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="到期时间" prop="expire_time">
                <el-date-picker
                  v-model="form.expire_time"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期时间">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <template>
                <p style="border-top: 1px solid #dcdfe6;"></p>
              </template>
            </el-col>
          </el-row>
          <strong v-if="form.fieldTemplateList && form.fieldTemplateList.length>0"
                  style="display: block;margin-bottom: 20px">自定义字段属性</strong>
          <div style="float: left">
            <el-form-item style="float: left;margin: 20px 100px 20px 20px;" v-for="item in form.fieldTemplateList"
                          :key="item.field" :label="item.label" :required="item.required">
              <el-input v-if="item.type===1" v-model="item.value" placeholder="请输入内容"/>
              <el-switch v-else-if="item.type===2" v-model="item.value"
                         active-value="true"
                         inactive-value="false"
                         active-color="#13ce66"
                         inactive-color="#ff4949">
              </el-switch>
              <el-date-picker
                v-else-if="item.type===3"
                v-model="item.value"
                type="datetime"
                value-format="yyyy-MM-dd HH:mm:ss"
                placeholder="选择日期时间">
              </el-date-picker>
              <el-input-number v-if="item.type===4" v-model="item.value"/>
              <el-select
                v-else-if="item.type===5"
                v-model="item.value" placeholder="请选择">
                <el-option
                  v-for="tem in item.map"
                  :key="tem.value"
                  :label="tem.label"
                  :value="tem.value">
                </el-option>
              </el-select>
              <el-select
                v-else-if="item.type===6"
                v-model="item.value" multiple placeholder="请选择">
                <el-option
                  v-for="tem in item.map"
                  :key="tem.value"
                  :label="tem.label"
                  :value="tem.value">
                </el-option>
              </el-select>
            </el-form-item>
          </div>
          <br class="clear" style="clear:both"/>
          <el-form-item>
            <el-button type="primary" @click="saveOrUpdata">确认</el-button>
            <el-button @click="cancel">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </d2-container>
</template>

<script>
import * as api from './api'


export default {
  name: 'services',
  created() {
    this.getServiceList()
  },
  data() {
    return {
      title: '',
      open: false,
      total: 0,
      loading: true,
      serviceList: [],
      form: {
        name: '',
        ip: '',
        address: '',
        configuration: '',
        user_name: '',
        pass_word: '',
        pay_type: '',
        pay_amount: '',
        expire_time: '',
        fieldTemplateList: []
      },
      rules: {
        name: [{
          required: true, message: '名称必填', trigger: 'blur'
        }]
      }
    }
  },

  methods: {
    goTree() {
      this.$router.push({path: 'editField', query: {type: 'server'}})
    },
    cancel() {
      this.open = false
      this.form = {}
    },
    getServiceList() {
      this.loading = true
      const query = {
        limit: 10,
        page: 1
      }
      api.getServiceList(query).then(res => {
        this.serviceList = res.data.data
        this.total = res.data.total
        this.loading = false
      })
    },
    handleUpdate(row) {
      if (row.id) {
        api.getInfo(row.id).then(res => {
          this.form = res.data
          this.title = '修改用户'
          this.open = true
        })
      } else {
        /*  queryFieldTemplate(1).then((res) => {
            this.form = res.data.data
          })*/
        this.title = '新增用户'
        this.open = true
      }
    },
    saveOrUpdata() {
      this.$refs.form.validate(valid => {
          if (valid) {
            if (this.form.id) {
              api.updateServices(this.form).then(res => {
                if (res.code !== 2000) {
                  this.$message.error(res.msg)
                  return
                }
                this.$message.success(res.msg)
                this.open = false
                this.getServiceList()
              })
            } else {
              api.saveServices(this.form).then(res => {
                if (res.code !== 2000) {
                  this.$message.error(res.msg)
                  return
                }
                this.$message.success(res.msg)
                this.open = false
                this.getServiceList()
              })
            }
          }
        }
      )
    },
    handleDelete(row) {
      this.$confirm('是否确认删除编号为"' + row.id + '"的数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function () {
        return api.delServices(row.id)
      }).then(() => {
        this.getServiceList()
        this.$message.success('删除成功')
      })
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
