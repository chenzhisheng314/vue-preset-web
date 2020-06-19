<template>
  <div class="of-tree">
    <div class="of-container is-vertical">
      <div v-if="title"
           class="of-aside">
        <div class="tree-title">
          {{ title }}
        </div>
      </div>
      <div class="of-aside">
        <div class="tree-tool">
          <div class="tablelayout">
            <div class="tablelayout-l">
              <el-input v-model="filterText"
                        placeholder="输入关键字搜索"
                        size="small"
                        suffix-icon="fa fa-search"></el-input>
            </div>
            <div class="tablelayout-s">
              <el-button icon="fa fa-plus"
                         circle
                         size="small"
                         @click="appendRoot()"></el-button>
            </div>
          </div>
        </div>
      </div>
      <div class="of-main">
        <div class="tree-main">
          <el-tree ref="tree"
                   :data="tmpValue"
                   node-key="id"
                   default-expand-all
                   :expand-on-click-node="false"
                   :filter-node-method="filterNode"
                   :draggable="draggable"
                   :allow-drop="allowDrop"
                   @node-click="treeClick"
                   @node-drop="handleDrop">
            <span slot-scope="{ node, data }"
                  class="tree-node">
              <el-dropdown v-if="menu && menu.length > 0"
                           class="tree-more"
                           @command="menuClick">
                <span class="tree-more-btn">
                  <i class="fa fa-ellipsis-h"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item v-for="(item, index) in menu"
                                    :key="index"
                                    :command="{'item': item, 'data': data, 'node': node}">
                    {{ item.name }}
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
              <span class="tree-node-name">
                <el-input v-if="data.id === currentEdit.id"
                          :ref="'node-' + data.id"
                          v-model="currentEdit.text"
                          size="mini"
                          @blur="updateEnd"
                          @keyup.enter.native="updateEnd"></el-input>
                <span v-else>{{ data.text }}</span>
              </span>
            </span>
          </el-tree>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Array,
      default () {
        return []
      }
    },
    title: {
      type: String,
      default: ''
    },
    defaultName: {
      type: String,
      default: '未命名'
    },
    draggable: {
      type: Boolean,
      default: false
    },
    depth: {
      type: Number,
      default: 5
    },
    menu: {
      type: Array,
      default () {
        return [
          {
            type: 'create',
            name: '新建'
          },
          {
            type: 'update',
            name: '重命名'
          },
          {
            type: 'delete',
            name: '删除',
            tip: '确定删除吗？'
          }
        ]
      }
    }
  },
  data () {
    return {
      filterText: '',
      tmpValue: this.value,
      currentEdit: {}
    }
  },
  watch: {
    filterText (val) {
      this.$refs.tree.filter(val)
    },
    value: {
      handler (n) {
        this.tmpValue = n
      },
      deep: true
    },
    tmpValue: {
      handler (n) {
        this.$emit('input', n)
      },
      deep: true
    }
  },
  methods: {
    change (type, params) {
      this.$emit('change', type, params)
    },
    appendRoot () {
      const newChild = {
        id: this.guid(),
        text: '',
        children: []
      }
      this.tmpValue.push(newChild)
      this.$nextTick(function () {
        this.update(newChild)
      })
    },
    append (data) {
      const list = (data.children || []).filter(n => n.id.length > 6)
      const newChild = {
        id: this.guid(),
        text: '',
        parent_id: data.id,
        sort_num: list.length,
        children: []
      }
      if (!data.children) {
        this.$set(data, 'children', [])
      }
      data.children.push(newChild)
      this.$nextTick(function () {
        this.update(newChild)
      })
    },
    update (data) {
      if (data) {
        this.currentEdit = data
        this.$nextTick(function () {
          this.$refs['node-' + data.id].focus()
        })
      }
    },
    updateEnd () {
      if (!this.currentEdit.text) {
        this.currentEdit.text = this.defaultName
      }
      this.change('update', this.currentEdit)
      this.currentEdit = {}
    },
    remove (item, node, data) {
      const parent = node.parent
      const children = parent.data.children || parent.data
      const index = children.findIndex(d => d.id === data.id)
      this.$confirm(item.tip, '系统提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.change('delete', children[index])
          children.splice(index, 1)
        })
        .catch(err => console.log(err))
    },
    filterNode (value, data) {
      if (!value) return true
      return data.text.indexOf(value) !== -1
    },
    menuClick (command) {
      if (command) {
        const item = command.item
        const data = command.data
        const node = command.node
        switch (item.type) {
          case 'create':
            this.append(data)
            break
          case 'update':
            this.update(data)
            break
          case 'delete':
            this.remove(item, node, data)
            break
        }
      }
    },
    handleDrop (draggingNode, dropNode, dropType) {
      console.log('draggingNode: ', draggingNode.data.id)
      console.log('dropNode: ', dropNode.data.id)
      console.log('dropType: ', dropType)
      this.change('move', { source: draggingNode.data, target: dropNode.data })
    },
    allowDrop (draggingNode, dropNode, dropType) {
      if (dropType === 'inner') return false
      if (draggingNode.data.parent_id === dropNode.data.parent_id) return true
      return false
    },
    treeClick (data) {
      this.change('click', data)
    },
    guid () {
      return 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'.replace(/[x]/g, function (c) {
        const r = Math.random() * 16 | 0
        const v = c === 'x' ? r : (r & 0x3 | 0x8)
        return v.toString(16)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
