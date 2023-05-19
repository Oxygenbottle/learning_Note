<template>
  <div class="eos-menu-container">
    <div v-for="menu in menus[menuDomain]">
      <div
        @click="renderPage(menu.url)"
        class="eos-menu-item"
        v-bind:class="getMenuClass(menu.url)"
      >
        <i class="eos-menu-item-icon" v-bind:class="menu.icon" />{{
          menu.title
        }}
      </div>
      <div
        @click="renderPage(subMenu.url)"
        v-if="menu.children"
        v-for="subMenu in menu.children"
        v-bind:class="getMenuClass(subMenu.url)"
        class="eos-menu-item eos-menu-item-sub"
      >
        {{ subMenu.title }}
      </div>
    </div>

    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
    >
      <!-- 对菜单栏做便利，有children用 <el-submenu>   else   <el-menu-item> -->
      <template
        v-for="(menu, index) in menus[menuDomain]"
        :key="menu.url + index"
      >
        <!-- 下拉菜单 -->
        <el-submenu v-if="menu.children" :index="index">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>{{ menu.title }}</span>
          </template>
          <el-menu-item-group>
            <el-menu-item
              v-for="(subMenu, subIndex) in menu.children"
              :index="index + '-' + subIndex"
              >{{ subMenu.title }}</el-menu-item
            >
          </el-menu-item-group>
        </el-submenu>
        <!-- 普通菜单 -->
        <el-menu-item v-else :index="index">
          <i class="el-icon-menu"></i>
          <span slot="title">{{ menu.title }}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script>
export default {
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>

<style></style>
