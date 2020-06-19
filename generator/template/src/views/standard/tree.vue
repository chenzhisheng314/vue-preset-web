<template>
  <div class="of-box of-listbox">
    <div class="of-container">
      <div class="listbox-aside of-aside"
           :style="{'width': treeWidth}">
        <of-tree v-model="treeData"
                 :title="treeTitle"
                 @change="treeChange"></of-tree>
      </div>
      <div class="listbox-main"
           :style="{'width': 'calc(100% - ' + treeWidth +')'}">
        <div class="of-container">
          <div class="of-main">
            OfTree
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import OfTree from '../../components/tree'

export default {
  components: {
    OfTree
  },
  data () {
    return {
      treeWidth: '300px',
      treeTitle: '默认树',
      treeData: [
        {
          id: '16551d8402734b9ba2646e541e818542',
          text: '一级节点01',
          children: [
            {
              id: 'c6841953796b4fc49ec098455c3b98fb',
              text: '01客户01',
              parent_id: '16551d8402734b9ba2646e541e818542'
            },
            {
              id: '85d9548589f143d48f2ba16c1e613686',
              text: '01客户02',
              parent_id: '16551d8402734b9ba2646e541e818542'
            }]
        },
        {
          id: 'f06a229e988c4aa2a203c8713e9a2429',
          text: '一级节点02',
          children: [
            {
              id: '221531cce9954c819feb867ab53cb454',
              text: '02需求01',
              parent_id: 'f06a229e988c4aa2a203c8713e9a2429'
            },
            {
              id: '41140fb1f72140ad9bddd537049200a7',
              text: '02需求02',
              parent_id: 'f06a229e988c4aa2a203c8713e9a2429'
            }]
        },
        {
          id: '711b3641718c46bb9b2bb7276c67f455',
          text: '一级节点03',
          children: [
            {
              id: '1cdbd3cd2cd54c488771e3e786ae463c',
              text: '03虚机01',
              parent_id: '711b3641718c46bb9b2bb7276c67f455'
            },
            {
              id: 'caba303a42f24f0a86dc42214b33e702',
              text: '03虚机02',
              parent_id: '711b3641718c46bb9b2bb7276c67f455'
            }]
        }]
    }
  },
  mounted () {

  },
  methods: {
    treeChange (type, params) {
      this.$message({ message: `操作类型： ${type} ；操作数据${JSON.stringify(params)}` })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
