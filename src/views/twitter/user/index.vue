<template>
  <d2-container :class="{ 'page-compact': crud.pageOptions.compact }">
    <d2-crud-x
      ref="d2Crud"
      v-bind="_crudProps"
      v-on="_crudListeners"
      @saveRequest="saveRequest"
    >
      <div slot="header">
        <crud-search
          ref="search"
          :options="crud.searchOptions"
          @submit="handleSearch"
        />
        <el-button-group>
          <el-button
            size="small"
            type="danger"
            @click="onExport"
            v-permission="'Export'"
            ><i class="el-icon-download" /> 导出
          </el-button>
        </el-button-group>
        <crud-toolbar
          :search.sync="crud.searchOptions.show"
          :compact.sync="crud.pageOptions.compact"
          :columns="crud.columns"
          @refresh="doRefresh()"
          @columns-filter-changed="handleColumnsFilterChanged"
        />
      </div>
    </d2-crud-x>
  </d2-container>
</template>

<script>
import * as api from './api'
import { crudOptions } from './crud'
import { d2CrudPlus } from 'd2-crud-plus'

export default {
  name: 'twitteruser',
  mixins: [d2CrudPlus.crud],
  methods: {
    getCrudOptions () {
      this.crud.searchOptions.form.user_type = 0
      return crudOptions(this)
    },
    pageRequest (query) {
      if (query.user_type) {
        return api.GetTwitterList(query)
      }
      return api.GetList(query)
    },
    saveRequest (scope) {
      const params = {
        id: scope.row.id,
        screenName: scope.row.screen_name
      }
      return api.SaveObj(params)
    },
    onExport () {
      this.$confirm('是否确认导出所有数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function () {
        return api.exportData()
      })
    }
  }
}
</script>

<style lang="scss">
.yxtInput {
  .el-form-item__label {
    color: #49a1ff;
  }
}
</style>
