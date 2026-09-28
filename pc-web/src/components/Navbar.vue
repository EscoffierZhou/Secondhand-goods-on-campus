<template>
  <header class="navbar-wrapper">
    <!-- 顶部状态栏 -->
    <div class="top-bar">
      <div class="pc-container top-bar-inner">
        <div class="top-left">
          <!-- 校区切换 -->
          <span class="campus-label">当前校区：</span>
          <el-dropdown @command="handleCampusChange">
            <span class="campus-selector">
              <el-icon><Location /></el-icon>
              {{ userStore.currentCampus }}
              <el-icon><ArrowDown /></el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="咸安校区">咸安校区</el-dropdown-item>
                <el-dropdown-item command="温泉校区">温泉校区</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>

          <span class="divider">|</span>
          <WeatherWidget />
        </div>

        <div class="top-right">
          <span class="demo-tip">
            测试学号: <b>20151621029</b> (密码: 666666)
          </span>

          <el-button link size="small" type="info" @click="handleResetData" title="一键恢复最初演示数据">
            <el-icon><Refresh /></el-icon> 重置演示数据
          </el-button>

          <span class="divider">|</span>

          <template v-if="userStore.isLoggedIn">
            <el-dropdown @command="handleUserMenu">
              <span class="user-profile-badge">
                <el-icon><UserFilled /></el-icon>
                {{ userStore.nickName }} ({{ userStore.studentId }})
                <el-icon><ArrowDown /></el-icon>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item command="profile">个人发布 & 订单</el-dropdown-item>
                  <el-dropdown-item command="cart">我的购物车</el-dropdown-item>
                  <el-dropdown-item command="logout" divided>退出身份认证</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </template>

          <template v-else>
            <el-button type="primary" size="small" plain @click="userStore.openAuthDialog">
              学生身份认证 / 登录
            </el-button>
          </template>
        </div>
      </div>
    </div>

    <!-- 中部 Logo 与 搜索栏 -->
    <div class="main-header">
      <div class="pc-container header-inner">
        <!-- Logo -->
        <router-link to="/" class="logo-area">
          <div class="logo-icon">
            <el-icon :size="24"><Reading /></el-icon>
          </div>
          <div class="logo-text">
            <span class="brand-title">校园二手交易平台</span>
            <span class="brand-sub">CAMPUS SECOND-HAND TRADING · 电脑端</span>
          </div>
        </router-link>

        <!-- 搜索条 -->
        <div class="search-area">
          <el-input
            v-model="searchKeyword"
            placeholder="搜二手好书、期末教材、单车、数码、兼职..."
            class="header-search-input"
            clearable
            @keyup.enter="handleSearch"
          >
            <template #prefix>
              <el-icon><Search /></el-icon>
            </template>
            <template #append>
              <el-button type="primary" class="search-btn" @click="handleSearch">
                搜索
              </el-button>
            </template>
          </el-input>
          <div class="search-hot-tags">
            <span class="hot-label">热门：</span>
            <a @click="quickSearch('高等数学')">高等数学</a>
            <a @click="quickSearch('考研英语')">考研英语</a>
            <a @click="quickSearch('自行车')">自行车</a>
            <a @click="quickSearch('台灯')">宿舍台灯</a>
            <a @click="quickSearch('图书馆兼职')">家教兼职</a>
          </div>
        </div>

        <!-- 快捷操作区 -->
        <div class="action-area">
          <el-button
            type="primary"
            class="publish-btn"
            :icon="Plus"
            @click="goToPublish"
          >
            发布二手
          </el-button>

          <el-badge :value="cartStore.totalCount" :hidden="cartStore.totalCount === 0" class="cart-badge">
            <el-button
              class="cart-btn"
              :icon="ShoppingCart"
              @click="goToCart"
            >
              购物车
            </el-button>
          </el-badge>
        </div>
      </div>
    </div>

    <!-- 底部主导航条 -->
    <nav class="nav-bar">
      <div class="pc-container nav-inner">
        <ul class="nav-list">
          <li :class="{ active: currentRoute === '/' }">
            <router-link to="/">
              <el-icon><House /></el-icon> 门户首页
            </router-link>
          </li>
          <li :class="{ active: currentRoute === '/books' }">
            <router-link to="/books">
              <el-icon><Reading /></el-icon> 二手书城
            </router-link>
          </li>
          <li :class="{ active: currentRoute === '/goods' }">
            <router-link to="/goods">
              <el-icon><Goods /></el-icon> 闲置杂货
            </router-link>
          </li>
          <li :class="{ active: currentRoute === '/jobs' }">
            <router-link to="/jobs">
              <el-icon><Briefcase /></el-icon> 校园兼职
            </router-link>
          </li>
          <li :class="{ active: currentRoute === '/cart' }">
            <router-link to="/cart">
              <el-icon><ShoppingCart /></el-icon> 购物车与预订
            </router-link>
          </li>
          <li :class="{ active: currentRoute === '/publish' }">
            <router-link to="/publish">
              <el-icon><Upload /></el-icon> 发布中心
            </router-link>
          </li>
          <li :class="{ active: currentRoute === '/profile' }">
            <router-link to="/profile">
              <el-icon><User /></el-icon> 学生中心
            </router-link>
          </li>
        </ul>

        <div class="nav-right-tip">
          <el-tag type="success" size="small" effect="light">纯前端静态运行 · 支持 GitHub Pages</el-tag>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  Location,
  ArrowDown,
  UserFilled,
  Search,
  ShoppingCart,
  Plus,
  House,
  Reading,
  Goods,
  Briefcase,
  Upload,
  User,
  Refresh
} from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import WeatherWidget from './WeatherWidget.vue'
import { useUserStore } from '../stores/user'
import { useCartStore } from '../stores/cart'
import { useMarketStore } from '../stores/market'
import { resetAllData } from '../services/storage'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const cartStore = useCartStore()
const marketStore = useMarketStore()

const searchKeyword = ref('')
const currentRoute = computed(() => route.path)

const handleCampusChange = (campus) => {
  userStore.setCampus(campus)
  ElMessage.success(`已切换至：${campus}`)
}

const handleUserMenu = (cmd) => {
  if (cmd === 'profile') {
    router.push('/profile')
  } else if (cmd === 'cart') {
    router.push('/cart')
  } else if (cmd === 'logout') {
    userStore.logout()
    ElMessage.info('已退出学生认证')
  }
}

const handleSearch = () => {
  const kw = searchKeyword.value.trim()
  if (!kw) {
    ElMessage.info('请输入搜索关键词')
    return
  }
  marketStore.globalSearchKeyword = kw
  // 默认跳转到图书页或闲置页进行搜索
  router.push({ path: '/books', query: { q: kw } })
}

const quickSearch = (kw) => {
  searchKeyword.value = kw
  handleSearch()
}

const goToPublish = () => {
  if (!userStore.isLoggedIn) {
    userStore.openAuthDialog()
    return
  }
  router.push('/publish')
}

const goToCart = () => {
  router.push('/cart')
}

const handleResetData = () => {
  ElMessageBox.confirm(
    '重置将清空您新增的发布与本地订单，恢复为系统内置的20+条初始高质量演示数据，确认重置吗？',
    '重置数据提示',
    {
      confirmButtonText: '确认重置',
      cancelButtonText: '取消',
      type: 'warning'
    }
  ).then(() => {
    resetAllData()
    marketStore.loadAll()
    cartStore.loadCart()
    ElMessage.success('已恢复系统初始演示数据！')
  }).catch(() => {})
}
</script>

<style scoped>
.navbar-wrapper {
  background: #ffffff;
  border-bottom: 1px solid #e4e7ed;
  box-shadow: var(--shadow-sm);
  position: sticky;
  top: 0;
  z-index: 1000;
}

/* 顶部状态栏 */
.top-bar {
  background-color: #f7f9fa;
  border-bottom: 1px solid #ebeef5;
  font-size: 12px;
  color: #606266;
  height: 34px;
}

.top-bar-inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
}

.top-left, .top-right {
  display: flex;
  align-items: center;
  gap: 12px;
}

.campus-label {
  color: #909399;
}

.campus-selector {
  color: var(--primary-color);
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
}

.divider {
  color: #dcdfe6;
}

.demo-tip {
  color: #e6a23c;
  background: #fdf6ec;
  padding: 1px 8px;
  border-radius: 4px;
  border: 1px solid #faecd8;
}

.user-profile-badge {
  cursor: pointer;
  color: #303133;
  display: flex;
  align-items: center;
  gap: 4px;
  font-weight: 500;
}

/* 中部品牌与搜索 */
.main-header {
  padding: 16px 0;
}

.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 30px;
}

.logo-area {
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
}

.logo-icon {
  width: 44px;
  height: 44px;
  background: linear-gradient(135deg, #1E68C9, #3a8ee6);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  box-shadow: 0 4px 10px rgba(30, 104, 201, 0.3);
}

.logo-text {
  display: flex;
  flex-direction: column;
}

.brand-title {
  font-size: 20px;
  font-weight: 700;
  color: #1e293b;
  letter-spacing: 0.5px;
}

.brand-sub {
  font-size: 10px;
  color: #94a3b8;
  letter-spacing: 0.8px;
  margin-top: 2px;
}

.search-area {
  flex: 1;
  max-width: 540px;
}

.header-search-input :deep(.el-input-group__append) {
  background-color: var(--primary-color);
  color: #ffffff;
  border-color: var(--primary-color);
  padding: 0 20px;
  font-weight: 500;
}

.search-btn {
  color: #ffffff !important;
}

.search-hot-tags {
  margin-top: 6px;
  font-size: 12px;
  color: #909399;
  display: flex;
  gap: 10px;
}

.search-hot-tags a {
  cursor: pointer;
  transition: color 0.2s;
}

.search-hot-tags a:hover {
  color: var(--primary-color);
}

.action-area {
  display: flex;
  align-items: center;
  gap: 14px;
}

.publish-btn {
  background-color: var(--primary-color);
  border-color: var(--primary-color);
  font-weight: 500;
  padding: 10px 20px;
}

.publish-btn:hover {
  background-color: var(--primary-hover);
}

.cart-btn {
  border-color: #dcdfe6;
  color: #606266;
}

/* 导航栏 */
.nav-bar {
  background-color: #ffffff;
  border-top: 1px solid #f0f2f5;
}

.nav-inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-list {
  display: flex;
  list-style: none;
  gap: 4px;
}

.nav-list li a {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 18px;
  font-size: 15px;
  font-weight: 500;
  color: #334155;
  transition: all 0.2s;
  border-bottom: 2px solid transparent;
}

.nav-list li a:hover {
  color: var(--primary-color);
}

.nav-list li.active a {
  color: var(--primary-color);
  border-bottom-color: var(--primary-color);
}
</style>
