<template>
  <div class="of-box">
    <!--抽屉表单区域------------------------------>
    <of-drawer v-model="showDrawer"></of-drawer>
    <!--抽屉表单区域------------------------------>
    <div class="of-container is-vertical">
      <div class="of-aside">
        <div class="of-filter clearfix">
          <div class="filter-left">
            <el-button type="primary" size="small" icon="fa fa-plus" @click="showDrawer = !showDrawer">新增</el-button>
            <el-button type="default" size="small" icon="fa fa-trash-alt">删除</el-button>
          </div>
          <div class="filter-right">
            <el-input v-model="keyword"
                      placeholder="请输入关键字搜索"
                      size="small"
                      suffix-icon="fa fa-search"
                      @change="filterChange">
            </el-input>
          </div>
        </div>
      </div>
      <div ref="tableBox" class="of-main no-scroll">
        <div class="of-table">
          <el-table :data="pageData" :max-height="pageHeight" style="width: 100%">
            <el-table-column type="selection"
                             width="50"
                             fixed>
            </el-table-column>
            <el-table-column prop="date"
                             label="日期"
                             width="250">
            </el-table-column>
            <el-table-column prop="name"
                             label="姓名"
                             width="120">
            </el-table-column>
            <el-table-column prop="province"
                             label="省份"
                             width="120">
            </el-table-column>
            <el-table-column prop="city"
                             label="市区"
                             width="120">
            </el-table-column>
            <el-table-column prop="address"
                             label="地址">
            </el-table-column>
            <el-table-column prop="zip"
                             label="邮编"
                             width="120">
            </el-table-column>
            <el-table-column fixed="right"
                             label="操作"
                             width="150">
              <template slot-scope="scope">
                <el-button class="table-ctrlbtn"
                           type="text"
                           size="small"
                           icon="fa fa-search"
                           @click="viewClick(scope.row)">查看</el-button>
                <el-button class="table-ctrlbtn"
                           type="text"
                           size="small"
                           icon="fa fa-edit">编辑</el-button>
                <el-dropdown class="table-ctrlbtn"
                             @command="menuClick">
                  <el-button type="text"
                             size="small"
                             icon="fa fa-ellipsis-h"></el-button>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item :command="{'type': 'menu-HTML', 'data': scope.row}">HTML</el-dropdown-item>
                    <el-dropdown-item :command="{'type': 'menu-JavaScript', 'data': scope.row}">JavaScript</el-dropdown-item>
                    <el-dropdown-item :command="{'type': 'menu-CSS', 'data': scope.row}">CSS</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div class="of-aside">
        <of-pagination :pageIndex="pageIndex" :pageSize="pageSize" :total="totalCount" @change="pageChange"></of-pagination>
      </div>
    </div>
  </div>

</template>

<script>
import OfPagination from '../../components/pagination'
import OfDrawer from './drawer'

export default {
  components: {
    OfPagination, OfDrawer
  },
  data () {
    return {
      showDrawer: false,
      keyword: '',
      pageHeight: 0,
      pageIndex: 1,
      pageSize: 15,
      totalCount: 0,
      pageData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1517 弄',
          zip: 200333
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1519 弄',
          zip: 200333
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1516 弄',
          zip: 200333
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1517 弄',
          zip: 200333
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1519 弄',
          zip: 200333
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1516 弄',
          zip: 200333
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1517 弄',
          zip: 200333
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1519 弄',
          zip: 200333
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1516 弄',
          zip: 200333
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1516 弄',
          zip: 200333
        }
      ]
    }
  },
  mounted () {
    this.utils.mixinTableHeight(this)
  },
  methods: {
    pageChange (index, size) {
      this.pageIndex = index
      this.pageSize = size
      this.totalCount = Math.floor(Math.random() * 100) + 100
      this.$message({ message: `获取数据：条件 ${this.keyword} ，第 ${this.pageIndex} 页，每页${this.pageSize} 条，共 ${this.totalCount} 条记录` })
    },
    filterChange () {
      this.pageChange(1, this.pageSize)
    },
    viewClick (row) {
      this.$message({ message: `查看操作：${JSON.stringify(row)} 条` })
    },
    menuClick (command) {
      this.$message({ message: `菜单操作命令：${command.type} ，操作对象：${JSON.stringify(command.data)} 条` })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
