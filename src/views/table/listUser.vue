<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input :placeholder="$t('table.title')" v-model="listQuery.title" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>
      <el-select v-model="listQuery.importance" :placeholder="$t('table.importance')" clearable style="width: 90px" class="filter-item">
        <el-option v-for="item in importanceOptions" :key="item" :label="item" :value="item"/>
      </el-select>
      <el-select v-model="listQuery.type" :placeholder="$t('table.type')" clearable class="filter-item" style="width: 130px">
        <el-option v-for="item in calendarTypeOptions" :key="item.key" :label="item.display_name+'('+item.key+')'" :value="item.key"/>
      </el-select>
      <el-select v-model="listQuery.sort" style="width: 140px" class="filter-item" @change="handleFilter">
        <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key"/>
      </el-select>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">{{ $t('table.search') }}</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">{{ $t('table.add') }}</el-button>
      <el-button v-waves :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload">{{ $t('table.export') }}</el-button>
      <el-button v-waves :loading="uploadLoading" class="filter-item" type="primary" icon="el-icon-upload" @click="dialogUploadCSVVisible = true">{{ $t('table.upload') }}</el-button>
      <el-checkbox v-model="showReviewer" class="filter-item" style="margin-left:15px;" @change="tableKey=tableKey+1">{{ $t('table.reviewer') }}</el-checkbox>
      <el-checkbox :value="selectAll" class="filter-item" style="margin-left:15px;" @change="handleSelectAll">{{ $t('table.select_all') }}</el-checkbox>
    </div>
    <el-table
      v-loading="listLoading"
      :key="tableKey"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      @sort-change="sortChange">
      <el-table-column label="#" align="center" width="65">
        <template slot-scope="scope">
          <input v-model="scope.row.selected" type="checkbox">
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.email')" width="300" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.email }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.function')" class-name="status-col" width="400">
        <template slot-scope="scope">
          <el-button size="mini" type="default" @click="handleShowDialogPostStatus(scope.row)">{{ $t('table.post_status') }}
          </el-button>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.actions')" align="center" width="400" class-name="small-padding fixed-width">
        <template slot-scope="scope" >
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">{{ $t('table.edit') }}</el-button>
          <el-button v-if="scope.row.status!= true" size="mini" type="danger" @click="handleDelete(scope.row,'delete')">{{ $t('table.delete') }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" custom-class="modal-info">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="150px" style="width: 100%; margin-left:10px;">
        <el-form-item :label="$t('table.email')" prop="email">
          <el-input
            v-model="temp.email"
            type="email"
            @keyup.enter.native="dialogStatus==='create'?createData():updateData()"
          />
        </el-form-item>
        <el-form-item :label="$t('table.password')" prop="password">
          <el-input
            v-model="temp.password"
            type="password"
            @keyup.enter.native="dialogStatus==='create'?createData():updateData()"

          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{ $t('table.cancel') }}</el-button>
        <el-button :loading="loading" type="primary" @click="dialogStatus==='create'?createData():updateData()">{{ $t('table.confirm') }}</el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="dialogDangerVisible" custom-class="modal-danger" title="Bạn chắc chắn muốn xóa chứ ?">
      Sau khi xóa, mọi dữ liệu liên qua cũng sẽ bị xóa!
      <span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="handleDelete">{{ $t('table.confirm') }}</el-button>
      </span>
    </el-dialog>
    <el-dialog :visible.sync="dialogPostStatusVisible" custom-class="modal-info" title="Đăng status lên Facebook">
      <textarea v-model="statusPostOne" class="form-control" rows="5" style="width: 100%" placeholder="Điền nội dung tin" required/>
      <span slot="footer" class="dialog-footer">
        <el-button type="success" @click="handlePostStatusOne">{{ $t('table.confirm') }}</el-button>
      </span>
    </el-dialog>
    <el-dialog :visible.sync="dialogUploadCSVVisible" custom-class="modal-info" title="Tải lên file CSV">
      <input type="file" class="form-control" @change="setCsvFileUpload">
      <span slot="footer" class="dialog-footer">
        <el-button v-waves :loading="uploadLoading" class="filter-item" type="success" icon="el-icon-upload" @click="handleUpload">{{ $t('table.upload') }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { fetchList, fetchPv, createAccount, updateAccount, deleteAccount } from '@/api/account'
import { isValidateEmail } from '@/utils/validate'
import waves from '@/directive/waves' // Waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination'
import { uploadCsv } from '../../api/account' // Secondary package based on el-pagination

const calendarTypeOptions = [
  { key: 'CN', display_name: 'China' },
  { key: 'US', display_name: 'USA' },
  { key: 'JP', display_name: 'Japan' },
  { key: 'EU', display_name: 'Eurozone' }
]

// arr to obj ,such as { CN : "China", US : "USA" }
const calendarTypeKeyValue = calendarTypeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})

export default {
  name: 'ListUser',
  components: { Pagination },
  directives: { waves },
  filters: {
    statusFilter(status) {
      const statusMap = {
        on: 'success',
        block: 'danger',
        off: 'warring'
      }
      return statusMap[status]
    },
    typeFilter(type) {
      return calendarTypeKeyValue[type]
    }
  },
  data() {
    const validateEmail = (rule, value, callback) => {
      if (!isValidateEmail(value)) {
        callback(new Error('Vui lòng điền Email'))
      } else {
        callback()
      }
    }
    return {
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: '+id'
      },
      importanceOptions: [1, 2, 3],
      calendarTypeOptions,
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      statusOptions: ['published', 'draft', 'deleted'],
      showReviewer: false,
      temp: {
        id: undefined,
        password: ''
      },
      dialogFormVisible: false,
      dialogPostStatusVisible: false,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      dialogDangerVisible: false,
      dialogUploadCSVVisible: false,
      pvData: [],
      rules: {
        email: [{ required: true, trigger: 'change', validator: validateEmail }],
        password: [{ required: true, trigger: 'plug', message: 'password không được để trống' }]
      },
      tempDelete: null,
      downloadLoading: false,
      uploadLoading: false,
      loading: false,
      statusPostOne: '',
      selectAll: false,
      csvFile: null
    }
  },
  sockets: {
    action: function(data) {
      this.$notify({
        title: this.$t('message.success'),
        message: data.message,
        type: 'success',
        duration: 2000
      })
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      const vm = this
      fetchList(this.listQuery).then(response => {
        this.list = response.data.data
        this.total = response.data.total
        for (let i = 0; i < this.list.length; i++) {
          const item = this.list[i]
          this.list[i]['selected'] = false
          this.$socket.on('action-' + item._id, function(data) {
            vm.$notify({
              title: vm.$t('message.success'),
              message: 'Đăng thành công tin cho tài khoản: ' + item.email,
              type: 'success',
              duration: 2000
            })
          })
        }
        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    sortChange(data) {
      const { prop, order } = data
      if (prop === 'id') {
        this.sortByID(order)
      }
    },
    sortByID(order) {
      if (order === 'ascending') {
        this.listQuery.sort = '+id'
      } else {
        this.listQuery.sort = '-id'
      }
      this.handleFilter()
    },
    resetTemp() {
      this.temp = {
        _id: undefined,
        email: '',
        password: ''
      }
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.loading = true
          createAccount(this.temp).then((data) => {
            this.temp = data.data
            this.list.push(this.temp)
            this.loading = false
            this.dialogFormVisible = false
            this.$notify({
              title: this.$t('message.success'),
              message: 'Thành công',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          this.loading = true
          updateAccount(tempData).then(() => {
            this.loading = false
            for (const v of this.list) {
              if (v.id === this.temp.id) {
                const index = this.list.indexOf(v)
                this.list.splice(index, 1, this.temp)
                break
              }
            }
            this.dialogFormVisible = false
            this.$notify({
              title: this.$t('message.success'),
              message: 'Update thành công',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleShowDialogPostStatus(row) {
      this.dialogPostStatusVisible = true
      this.temp = row
    },
    handlePostStatusOne() {
      if (this.statusPostOne == null || this.statusPostOne === '' || this.statusPostOne === undefined) {
        this.$notify({
          title: this.$t('message.error'),
          message: 'Vui lòng điền đầy đủ thông tin',
          type: 'error',
          duration: 2000
        })
      } else {
        this.$socket.emit('post-status-' + this.temp._id, this.statusPostOne)
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.temp.timestamp = new Date(this.temp.timestamp)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    handlePostStatusToFacebook(row, data) {
      console.log(row)
      // this.$socket.emit('post-status', data)
      //
    },
    handleDelete(row) {
      if (this.dialogDangerVisible === false) {
        this.dialogDangerVisible = true
        this.tempDelete = Object.assign({}, row)
      } else {
        this.dialogDangerVisible = false
        deleteAccount(this.tempDelete).then(() => {
          this.$notify({
            title: this.$t('message.success'),
            message: 'Xóa thành công',
            type: 'success',
            duration: 2000
          })
          row = this.tempDelete
          const index = this.list.indexOf(row)
          this.list.splice(index, 1)
          this.tempDelete = null
        }).catch(err => {
          console.log(err)
        })
      }
    },
    handleFetchPv(pv) {
      fetchPv(pv).then(response => {
        this.pvData = response.data.pvData
        this.dialogDangerVisible = true
      })
    },
    handleDownload() {
      this.downloadLoading = true
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = ['timestamp', 'title', 'type', 'importance', 'status']
          const filterVal = ['timestamp', 'title', 'type', 'importance', 'status']
          const data = this.formatJson(filterVal, this.list)
          excel.export_json_to_excel({
            header: tHeader,
            data,
            filename: 'table-list'
          })
          this.downloadLoading = false
        })
    },
    handleUpload() {
      this.uploadLoading = true
      const csvFile = this.csvFile
      uploadCsv(csvFile).then(data => {
        this.uploadLoading = false
      }).catch((err) => {
        console.log(err)
        this.$message('Có lỗi xảy ra', 'error')
        this.uploadLoading = false
      })
    },
    handleSelectAll() {
      if (this.selectAll === false) {
        this.selectAll = true
        const vm = this
        vm.list = this.list.map(item => {
          item.selected = true
          return item
        })
      } else {
        this.selectAll = false
        const vm = this
        vm.list = this.list.map(item => {
          item.selected = false
          return item
        })
      }
    },
    setCsvFileUpload(e) {
      if (e.target.files.length > 0) {
        this.csvFile = e.target.files[0]
      }
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    }
  }
}
</script>
