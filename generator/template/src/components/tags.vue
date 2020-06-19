<template>
  <div v-if="tmpValue"
       class="of-tags clear-both">
    <div v-for="(item, index) in tmpValue"
         :key="index"
         class="tags-item">
      <div class="tags-block">
        <div class="tags-label">
          <input v-model="tmpValue[index]"
                 type="text">
          <span>{{ item }}</span>
        </div>
        <i class="fa fa-times-circle"
           @click="removeTags(index)"></i>
      </div>
    </div>
    <div class="tags-btn">
      <div class="tags-block">
        <div class="tags-label">
          <input v-model="newTags"
                 type="text"
                 @keyup.enter="addTags()"
                 @blur="addTags()">
          <span>{{ newTags.length > 0 ? newTags : placeholder }}</span>
        </div>
        <i class="fa fa-plus-circle"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Oftags',
  props: {
    max: {
      type: Number,
      default: 0
    },
    placeholder: {
      type: String,
      default: '点击添加'
    },
    value: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      tmpValue: this.value,
      newTags: ''
    }
  },
  watch: {
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
  mounted () {
    this.tmpValue = this.value
  },
  methods: {
    addTags () {
      const tagContent = JSON.parse(JSON.stringify(this.newTags))
      if (!this.max && this.tmpValue.length >= this.max) {
        console.log(this.max)
      }
      if (tagContent) {
        this.tmpValue.push(tagContent)
      }
      this.newTags = ''
    },
    removeTags (index) {
      if (index || index === 0) {
        this.tmpValue.splice(index, 1)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
