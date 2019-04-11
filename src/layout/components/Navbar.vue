<template>
  <div class="navbar">
    <hamburger :toggle-click="toggleSideBar" :is-active="sidebar.opened" class="hamburger-container"/>
    <breadcrumb class="breadcrumb-container" />
    <div class="right-menu">
      <template v-if="device!=='mobile'">
        <search class="right-menu-item" />
        <screenfull class="right-menu-item hover-effect" />
      </template>
      <div class="nickname_logout">
        <div class="nickname">
          <svg-icon class-name="avatar-icon" icon-class="avatar" @click.stop="click" />
          <span>{{ $store.state.user.myInfo.email }}</span>
        </div>
        <div class="logout" @click="logout">
          <span>退出</span>
          <svg-icon class-name="logout-icon" icon-class="logout" @click.stop="click" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import Search from '@/components/HeaderSearch'
import Screenfull from '@/components/Screenfull'

export default {
  components: {
    Breadcrumb,
    Hamburger,
    Search,
    Screenfull
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'device'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
    },
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 50px;
  line-height: 50px;
  overflow: hidden;
  user-select: none;
  .hamburger-container {
    // line-height: 60px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }
  .breadcrumb-container {
    float: left;
  }
  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;
    display: flex;
    align-items: center;
    &:focus {
      outline: none;
    }
    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }
    .nickname_logout {
      display: flex;
      align-items: center;
      font-size: 18px;
      .nickname {
        color: $BrandColor;
        display: flex;
        align-items: center;
        .avatar-icon {
          font-size: 22px;
          margin-right: 6px;
          margin-left: 20px;
        }
      }
      .logout {
        padding: 6px 15px;
        background-color: $bg-eee;
        border-radius: 20px;
        cursor: pointer;
        display: flex;
        align-items: center;
        margin-left: 20px;
        margin-right: 30px;
        font-size: 16px;
        color: $text999;
        box-sizing: border-box;
        line-height:normal;
        .logout-icon {
          margin-top: 3px;
        }
      }
    }
  }
}
</style>
