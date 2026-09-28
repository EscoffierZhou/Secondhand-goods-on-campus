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
                <el-dropdown-item command="圣井校区">圣井校区</el-dropdown-item>
                <el-dropdown-item command="燕山校区">燕山校区</el-dropdown-item>
                <el-dropdown-item command="舜耕校区">舜耕校区</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>

          <span class="divider">|</span>
          <WeatherWidget />
        </div>

        <div class="top-right">
          <!-- 演示指引 Popover -->
          <el-popover placement="bottom-end" :width="320" trigger="hover">
            <template #reference>
              <el-button link size="small" type="primary" class="demo-guide-link">
                <el-icon><InfoFilled /></el-icon> 演示账号与指引
              </el-button>
            </template>
            <div class="demo-popover-content">
              <div class="popover-title">💡 平台使用与演示快捷指引</div>
              <p class="popover-desc">
                本系统支持全流程无缝体验，免配置即开即用：
              </p>
              <div class="popover-meta-box">
                <div class="popover-kv">
                  <span class="kv-k">演示学号：</span>
                  <code class="kv-v">2021081023</code>
                </div>
                <div class="popover-kv">
                  <span class="kv-k">初始密码：</span>
                  <code class="kv-v">666666</code>
                </div>
              </div>
              <div class="popover-actions">
                <el-button size="small" type="primary" @click="quickFillLogin">一键登录演示账号</el-button>
                <el-button size="small" @click="handleResetData">重置演示数据</el-button>
              </div>
            </div>
          </el-popover>

          <span class="divider">|</span>

          <el-button link size="small" type="primary" @click="router.push('/admin')">
            <el-icon><Management /></el-icon> 管理后台
          </el-button>

          <span class="divider">|</span>

          <el-button link size="small" type="primary" @click="themeStore.openDrawer" title="自定义网页主题色彩与布局间距">
            <el-icon><Brush /></el-icon> 配色风格
          </el-button>

          <span class="divider">|</span>

          <el-button link size="small" @click="themeStore.toggleDark" :title="themeStore.isDark ? '切换至浅色模式' : '切换至深色模式'">
            <el-icon v-if="themeStore.isDark"><Sunny /></el-icon>
            <el-icon v-else><Moon /></el-icon>
            {{ themeStore.isDark ? '浅色' : '深色' }}
          </el-button>

          <span class="divider">|</span>

          <template v-if="userStore.isLoggedIn">
            <el-dropdown @command="handleUserMenu">
              <span class="user-profile-badge">
                <el-avatar :size="20" src="./images/tabBar/mine.fill.png" class="nav-avatar" />
                <span class="user-name-text">{{ userStore.nickName }}</span>
                <el-tag size="small" type="success" effect="light" class="cert-pill">山财大认证</el-tag>
                <el-icon><ArrowDown /></el-icon>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item command="profile">个人发布 & 订单</el-dropdown-item>
                  <el-dropdown-item command="cart">预约清单</el-dropdown-item>
                  <el-dropdown-item command="admin">管理运营中心</el-dropdown-item>
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
            <span class="brand-title">山东财经大学 · 校园二手互助</span>
            <span class="brand-sub">SDUFE CAMPUS EXCHANGE · 绿色循环平台</span>
          </div>
        </router-link>

        <!-- 搜索条 -->
        <div class="search-area">
          <el-input
            v-model="searchKeyword"
            placeholder="搜二手课本、经管教材、单车、数码、求购..."
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
            <a @click="quickSearch('计量经济学')">计量经济学</a>
            <a @click="quickSearch('西方经济学')">西方经济学</a>
            <a @click="quickSearch('初级会计')">初级会计</a>
            <a @click="quickSearch('自行车')">圣井代步车</a>
            <a @click="router.push('/wants')">求购广场</a>
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
            发布物品 / 求购
          </el-button>

          <el-badge :value="cartStore.totalCount" :hidden="cartStore.totalCount === 0" class="cart-badge">
            <el-button
              class="cart-btn"
              :icon="ShoppingCart"
              @click="goToCart"
            >
              预约清单
            </el-button>
          </el-badge>
        </div>
      </div>
    </div>

    <!-- 底部主导航条（完整清晰分页面体系，不换行） -->
    <nav class="nav-bar">
      <div class="pc-container nav-inner">
        <ul class="nav-list">
          <li :class="{ active: currentRoute === '/' }">
            <router-link to="/">
              <el-icon><House /></el-icon>
              <span>首页</span>
            </router-link>
          </li>
          <li :class="{ active: currentRoute === '/books' }">
            <router-link to="/books">
              <el-icon><Reading /></el-icon>
              <span>二手书城</span>
            </router-link>
          </li>
          <li :class="{ active: currentRoute === '/goods' }">
            <router-link to="/goods">
              <el-icon><Goods /></el-icon>
              <span>闲置杂货</span>
            </router-link>
          </li>
          <li :class="{ active: currentRoute === '/wants' }">
            <router-link to="/wants">
              <el-icon><Opportunity /></el-icon>
              <span>求购广场</span>
            </router-link>
          </li>
          <li :class="{ active: currentRoute === '/jobs' }">
            <router-link to="/jobs">
              <el-icon><Briefcase /></el-icon>
              <span>校园兼职</span>
            </router-link>
          </li>
          <li :class="{ active: currentRoute === '/sustainability' }">
            <router-link to="/sustainability">
              <el-icon><Present /></el-icon>
              <span>低碳展馆</span>
            </router-link>
          </li>
          <li :class="{ active: currentRoute === '/guide' }">
            <router-link to="/guide">
              <el-icon><Guide /></el-icon>
              <span>面交指南</span>
            </router-link>
          </li>
          <li :class="{ active: currentRoute === '/publish' }">
            <router-link to="/publish">
              <el-icon><Upload /></el-icon>
              <span>发布中心</span>
            </router-link>
          </li>
          <li :class="{ active: currentRoute === '/profile' }">
            <router-link to="/profile">
              <el-icon><User /></el-icon>
              <span>学生中心</span>
            </router-link>
          </li>
        </ul>
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
  Refresh,
  Management,
  Brush,
  Sunny,
  Moon,
  InfoFilled,
  Opportunity,
  Present,
  Guide
} from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import WeatherWidget from './WeatherWidget.vue'
import { useUserStore } from '../stores/user'
import { useCartStore } from '../stores/cart'
import { useMarketStore } from '../stores/market'
import { useThemeStore } from '../stores/theme'
import { resetAllData } from '../services/storage'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const cartStore = useCartStore()
const marketStore = useMarketStore()
const themeStore = useThemeStore()

const searchKeyword = ref('')
const currentRoute = computed(() => route.path)

const quickFillLogin = () => {
  userStore.login('2021081023', '666666')
  ElMessage.success('已快捷登录演示账号：周同学 (山财大计科院)')
}

const handleCampusChange = (campus) => {
  userStore.setCampus(campus)
  ElMessage.success(`已切换至：${campus}`)
}

const handleUserMenu = (cmd) => {
  if (cmd === 'profile') {
    router.push('/profile')
  } else if (cmd === 'cart') {
    router.push('/cart')
  } else if (cmd === 'admin') {
    router.push('/admin')
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
    '重置将清空您新增的发布与本地订单，恢复为系统内置的高质量演示数据，确认重置吗？',
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
  background: var(--bg-card);
  border-bottom: 1px solid var(--border-color);
  box-shadow: var(--shadow-sm);
  position: sticky;
  top: 0;
  z-index: 1000;
  transition: background-color 0.3s ease, border-color 0.3s ease;
}

/* 顶部状态栏 */
.top-bar {
  background-color: var(--bg-card-subtle);
  border-bottom: 1px solid var(--border-subtle);
  font-size: 12px;
  color: var(--text-regular);
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
  color: var(--text-secondary);
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
  color: var(--border-color);
}

.demo-guide-link {
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 4px;
}

.demo-popover-content {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.popover-title {
  font-size: 13px;
  font-weight: 700;
  color: var(--text-main);
}

.popover-desc {
  font-size: 12px;
  color: var(--text-secondary);
  line-height: 1.5;
  margin: 0;
}

.popover-meta-box {
  background: var(--bg-card-subtle);
  border: 1px solid var(--border-color);
  border-radius: 6px;
  padding: 8px 10px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.popover-kv {
  display: flex;
  align-items: center;
  font-size: 12px;
}

.kv-k {
  color: var(--text-secondary);
  width: 70px;
}

.kv-v {
  color: var(--primary-color);
  font-weight: 700;
}

.popover-actions {
  display: flex;
  gap: 8px;
  margin-top: 4px;
}

.user-profile-badge {
  cursor: pointer;
  color: var(--text-main);
  display: flex;
  align-items: center;
  gap: 6px;
  font-weight: 500;
}

.nav-avatar {
  border: 1px solid var(--border-color);
}

.user-name-text {
  font-size: 13px;
  font-weight: 600;
}

.cert-pill {
  font-size: 10px;
  height: 20px;
  line-height: 18px;
  padding: 0 6px;
  border-radius: var(--radius-full);
}

/* 中部品牌与搜索 */
.main-header {
  padding: 14px 0;
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
  width: 42px;
  height: 42px;
  background: var(--primary-color);
  border-radius: var(--radius-base);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
  transition: background-color 0.3s ease;
}

.logo-text {
  display: flex;
  flex-direction: column;
}

.brand-title {
  font-size: 19px;
  font-weight: 700;
  color: var(--text-main);
  letter-spacing: 0.3px;
}

.brand-sub {
  font-size: 10px;
  color: var(--text-secondary);
  letter-spacing: 0.8px;
  margin-top: 1px;
}

.search-area {
  flex: 1;
  max-width: 520px;
}

.header-search-input :deep(.el-input-group__append) {
  background-color: var(--primary-color);
  color: #ffffff;
  border-color: var(--primary-color);
  padding: 0 20px;
  font-weight: 500;
  transition: background-color 0.3s ease;
}

.search-btn {
  color: #ffffff !important;
}

.search-hot-tags {
  margin-top: 6px;
  font-size: 12px;
  color: var(--text-secondary);
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
  padding: 9px 18px;
  border-radius: var(--radius-sm);
  transition: all 0.3s ease;
}

.publish-btn:hover {
  background-color: var(--primary-hover);
  border-color: var(--primary-hover);
}

.cart-btn {
  border-color: var(--border-color);
  color: var(--text-regular);
  background: var(--bg-card);
}

/* 导航栏 */
.nav-bar {
  background-color: var(--bg-card);
  border-top: 1px solid var(--border-subtle);
  transition: background-color 0.3s ease;
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
  flex-wrap: nowrap;
  margin: 0;
  padding: 0;
}

.nav-list li {
  flex-shrink: 0;
}

.nav-list li a {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 14px;
  font-size: 14px;
  font-weight: 500;
  color: var(--text-regular);
  transition: all 0.2s;
  border-bottom: 2px solid transparent;
  white-space: nowrap;
  flex-shrink: 0;
}

.nav-list li a:hover {
  color: var(--primary-color);
}

.nav-list li.active a {
  color: var(--primary-color);
  border-bottom-color: var(--primary-color);
  font-weight: 600;
}
</style>
