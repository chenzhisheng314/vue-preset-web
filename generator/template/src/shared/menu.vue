<template>
  <div v-if="showMenu" class="of-container">
    <div class="of-menu-main">
      <ul>
        <li
          v-for="(item, index) in menuList"
          :key="index"
          :class="{'active': index === activePath[0], 'open': item.isOpen }"
        >
          <el-tooltip effect="dark" :content="item.name" placement="right">
            <span @click="clickItem(menuList, index, 'main')">
              <i v-if="item.iconFont" :class="item.iconFont"></i>
              <i v-else-if="item.iconImg">
                <img :src="item.iconImg" />
              </i>
              <i v-else class="fa fa-th-large"></i>
            </span>
          </el-tooltip>
          <div class="of-menu-sub">
            <div class="of-menu-title">{{ item.name }}</div>
            <ul>
              <li
                v-for="(subItem, subIndex) in item.children"
                :key="subIndex"
                :class="{
                  'active': subIndex === activePath[1],
                  'open': subItem.isOpen
                }"
              >
                <span @click="clickItem(item.children, subIndex)">
                  <i v-if="hasChildren(subItem)" class="fa fa-chevron-down"></i>
                  <a>{{ subItem.name }}</a>
                </span>
                <ul>
                  <li
                    v-for="(childItem, childIndex) in subItem.children"
                    :key="childIndex"
                    :class="{ 'active': childIndex === activePath[2] }"
                    @click="clickItem(subItem.children, childIndex)"
                  >
                    <a>{{ childItem.name }}</a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
          <!-- sub -->
        </li>
      </ul>
    </div>
    <div class="of-menu-robot">
      <el-tooltip effect="dark" content="底部头部" placement="right">
        <span>
          <img src="@/assets/images/base/header-default.jpg" />
        </span>
      </el-tooltip>
    </div>
    <!-- main -->
  </div>
</template>

<script>
export default {
  props: {
    showMenu: Boolean
  },
  data() {
    return {
      activePath: [],
      menuList: [
        {
          name: '菜单',
          url: '',
          iconFont: 'fa fa-list',
          iconImg: '',
          isOpen: false,
          children: [
            {
              name: '标准模板',
              url: '',
              isOpen: false,
              children: [
                { name: '标准表格', url: '/standard/list' },
                { name: '标准表单', url: '/standard/form' },
                { name: '标准树', url: '/standard/tree' }
              ]
            }
          ]
        }
      ]
    }
  },
  watch: {
    $route(val) {
      this.foreachMenu(this.menuList, val.path, []);
    }
  },
  created() {
    const path = this.$route.path;
    this.foreachMenu(this.menuList, path, []);
    const total = this.activePath.length;
    this.foreachMenuOpen(this.menuList, 0, total);
  },
  methods: {
    foreachMenu(arr, path, crumbs) {
      for (let i = 0; i < arr.length; i++) {
        arr[i].crumbs = JSON.parse(JSON.stringify(crumbs));
        arr[i].crumbs.push(i);
        if (arr[i].url === path) {
          this.activePath = arr[i].crumbs;
          return;
        } else if (arr[i].children) {
          this.foreachMenu(arr[i].children, path, arr[i].crumbs);
        }
      }
    },
    foreachMenuOpen(arr, current, total) {
      const index = this.activePath[current];
      if (
        arr[index] &&
        current <= total &&
        arr[index].children &&
        arr[index].children.length > 0
      ) {
        arr[index].isOpen = true;
        current++;
        if (arr[index].children) {
          this.foreachMenuOpen(arr[index].children, current, total);
        }
        if (current === 0) this.$emit("handleSub", true);
      } else {
        if (current === 0) this.$emit("handleSub", false);
        return false;
      }
    },
    clickItem(data, index, type) {
      const item = data[index];
      const children = item.children;
      if (type === "main") {
        data.forEach((dataItem, dataIndex) => {
          if (dataIndex !== index) {
            dataItem.isOpen = false;
          }
        });
        if (children && children.length > 0) {
          this.$emit("handleSub", !item.isOpen);
        } else {
          this.$emit("handleSub", false);
        }
      }
      if (children && children.length > 0) {
        item.isOpen = !item.isOpen;
      }
      this.goto(item.url);
    },
    hasChildren(item) {
      let hasChildren = false;
      if (item && item.children && item.children.length > 0) {
        hasChildren = true;
      }
      return hasChildren;
    },
    goto(path) {
      if (path) {
        this.$router.push(path);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
