<template>
  <!-- 头部区域 -->
  <el-container class="home-container">
    <el-header>
      <div>
        <img src="../assets/下载.png" alt="" />
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <!-- 页面主体区域 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="isCollapse ? '46px' : '200px'">
        <div class="toggle-button" @click="toggleCollapse">
          <el-button
            icon="el-icon-caret-left"
           
            style="margin-right: 20px"
            size="mini"
          ></el-button>
        </div>
        <!-- 侧边栏菜单区域 -->
        <el-menu
          background-color="white"
          text-color="grey"
          active-text-color="#409EFF"
          :unique-opened="true"
          :collapse="isCollapse"
          :collapse-transition="false"
          :default-active="activePath"
          router
        >
          <!-- 一级菜单 -->
          <el-submenu
            :index="item.id + ''"
            v-for="item in menuList"
            :key="item.id"
          >
            <!-- 一级菜单模板区域 -->
            <template slot="title">
              <i :class="iconObj[item.id]"></i>
              <span>{{ item.authName }}</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item
              :index="'/' + subItem.path"
              v-for="subItem in item.children"
              :key="subItem.id"
              @click="saveNavState('/' + subItem.path)"
              ><template slot="title">
                <i class="el-icon-menu"></i>
                <span>{{ subItem.authName }}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 内容主体 -->
      <el-main class="color">
        <!-- 路由占位符 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      // 左侧菜单数据
      menuList: [],
      iconObj: {
        125: "iconfont icon-user",
        103: "iconfont icon-tijikongjian",
        101: "iconfont icon-shangpin",
        102: "iconfont icon-danju",
        145: "iconfont icon-baobiao",
      },
      isCollapse: false,
      //   被激活的链接地址
      activePath: "",
    };
  },
  created() {
    this.getMenuList();
    this.activePath = window.localStorage.getItem("activePath");
  },
  methods: {
    logout() {
      window.localStorage.clear();
      this.$router.push("/login");
    },
    async getMenuList() {
      const { data: res } = await this.$http.get("menus");
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg);
      this.menuList = res.data;
      console.log(res);
    },
    // 菜单折叠收起
    toggleCollapse() {
      this.isCollapse = !this.isCollapse;
    },
    // 保存连接的激活状态
    saveNavState(activePath) {
      window.localStorage.setItem("activePath", activePath);
      this.activePath = activePath;
    },
  },
  //   获取菜单
};
</script>

<style lang="less" scoped>
.home-container {
  height: 100%;
}
.el-header {
background: linear-gradient(to right,white 200px,#e4e9f7 10px);
  display: flex;
  justify-content: space-between;
  padding-left: 50px;
  align-items: center;
  color: #fff;
  font-size: 20px;
  div {
    display: flex;
    align-items: center;
    span {
      margin-left: 10px;
    }
  }
  img {
    margin-left: 17px;
    width: 50px;
    border-radius: 10px;
  }
}
// 侧边栏
.el-aside {
  background-color: white;
  transition: 0.5s;
  .el-menu {
    border-right: none;
  }
}
.el-main {
  background-color: white;
}
.iconfont {
  margin-right: 10px;
}
.toggle-button {
  background-color: white;
  font-size: 18px;
  line-height: 50px;
  color: grey;
  text-align: center;
  cursor: pointer;
}
.color {
  background-color: #e4e9f7;
}
/deep/.el-submenu__title {
  font-size: 18px;
  margin-bottom: 20px;
  transition: all 0.3s;

}
.el-menu-item {
  margin-bottom: 15px;
  transition: all 0.3s;
}
.el-menu-item:hover {
  background: #695cfe !important;
  color: #fff !important;
  border-radius: 15px;
  transform: scale(1.2);
}
/deep/.el-submenu__title:hover {
  background: #695cfe !important;
  color: #fff !important;
  border-radius: 10px;
  transform: scale(1.2);
}
.el-menu-item.is-active {
  background: #695cfe !important;
  color: #fff !important;
}
.el-submenu__title.is-active {
  background: #695cfe !important;
  color: #fff !important;
}
::-webkit-scrollbar {
  width: 0 !important;
}
::-webkit-scrollbar {
  width: 0 !important;
  height: 0;
}

</style>