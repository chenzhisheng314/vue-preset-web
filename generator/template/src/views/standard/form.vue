<template>
  <div class="of-box">
    <div class="of-container is-vertical">
      <div class="of-aside">
        <div class="of-box-header clearfix">
          <!--表单标题区域------------------------------>
          <div class="header-text box-left">
            <dl>
              <dt class="clearfix">
                <span>表单标题</span>
                <el-tooltip content="表单说明，简单说明表单内容">
                  <i class="fa fa-question-circle question-mark"></i>
                </el-tooltip>
              </dt>
              <dd>表单副标题表单副标题表单副标题</dd>
            </dl>
          </div>
          <div class="header-ctrl box-right">
            <el-button type="primary"
                       size="small"
                       icon="fa fa-file-import">导入数据</el-button>
            <el-button type="default"
                       size="small"
                       icon="fa fa-file-export">导出数据</el-button>
          </div>
          <!--表单标题区域------------------------------>
        </div>
      </div>
      <div class="of-main">
        <el-row>
          <el-col :span="12">
            <!--表单内容区域------------------------------>
            <div class="of-form">
              <el-form ref="form"
                       :model="form"
                       label-width="80px"
                       size="small"
                       label-position="top">
                <el-form-item label="活动名称">
                  <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="活动区域">
                  <el-select v-model="form.region"
                             placeholder="请选择活动区域">
                    <el-option label="区域一"
                               value="shanghai"></el-option>
                    <el-option label="区域二"
                               value="beijing"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="活动时间">
                  <el-col :span="11">
                    <el-date-picker v-model="form.date1"
                                    type="date"
                                    placeholder="选择日期"
                                    style="width: 100%;"></el-date-picker>
                  </el-col>
                  <el-col class="line text-center"
                          :span="2">-</el-col>
                  <el-col :span="11">
                    <el-time-picker v-model="form.date2"
                                    placeholder="选择时间"
                                    style="width: 100%;"></el-time-picker>
                  </el-col>
                </el-form-item>
                <el-form-item label="活动性质">
                  <el-checkbox-group v-model="form.type">
                    <el-checkbox-button label="美食/餐厅线上活动"
                                        name="type"></el-checkbox-button>
                    <el-checkbox-button label="地推活动"
                                        name="type"></el-checkbox-button>
                    <el-checkbox-button label="线下主题活动"
                                        name="type"></el-checkbox-button>
                  </el-checkbox-group>
                </el-form-item>
                <el-form-item label="特殊资源">
                  <el-radio-group v-model="form.resource">
                    <el-radio label="线上品牌商赞助"></el-radio>
                    <el-radio label="线下场地免费"></el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="活动名称">
                  <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="活动区域">
                  <el-select v-model="form.region"
                             placeholder="请选择活动区域">
                    <el-option label="区域一"
                               value="shanghai"></el-option>
                    <el-option label="区域二"
                               value="beijing"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="活动时间">
                  <el-col :span="11">
                    <el-date-picker v-model="form.date1"
                                    type="date"
                                    placeholder="选择日期"
                                    style="width: 100%;"></el-date-picker>
                  </el-col>
                  <el-col class="line text-center"
                          :span="2">-</el-col>
                  <el-col :span="11">
                    <el-time-picker v-model="form.date2"
                                    placeholder="选择时间"
                                    style="width: 100%;"></el-time-picker>
                  </el-col>
                </el-form-item>
                <el-form-item label="活动性质">
                  <el-checkbox-group v-model="form.type">
                    <el-checkbox-button label="美食/餐厅线上活动"
                                        name="type"></el-checkbox-button>
                    <el-checkbox-button label="地推活动"
                                        name="type"></el-checkbox-button>
                    <el-checkbox-button label="线下主题活动"
                                        name="type"></el-checkbox-button>
                  </el-checkbox-group>
                </el-form-item>
                <el-form-item label="特殊资源">
                  <el-radio-group v-model="form.resource">
                    <el-radio label="线上品牌商赞助"></el-radio>
                    <el-radio label="线下场地免费"></el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-form>
            </div>
            <!--表单内容区域------------------------------>
          </el-col>
        </el-row>
      </div>
      <div class="of-aside">
        <div class="of-filter clearfix">
          <!--表单按钮区域------------------------------>
          <div class="filter-left">
            <el-button type="primary"
                       size="small"
                       icon="fa fa-check">提交</el-button>
            <el-button type="default"
                       size="small"
                       icon="fa fa-save">保存</el-button>
            <el-button type="danger"
                       size="small"
                       icon="fa fa-minus-circle">禁止</el-button>
            <el-button type="warning"
                       size="small"
                       icon="fa fa-exclamation-triangle">警告</el-button>
            <el-button type="success"
                       size="small"
                       icon="fa fa-check">成功</el-button>
          </div>
          <div class="filter-right">
            <el-button type="primary"
                       size="small"
                       icon="fa fa-plus">新增</el-button>
            <el-button type="default"
                       size="small"
                       icon="fa fa-trash-alt">删除</el-button>
          </div>
          <!--表单按钮区域------------------------------>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  components: {
  },
  data () {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      }
    }
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
</style>
