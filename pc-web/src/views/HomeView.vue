<template>
  <div class="home-view page-container">
    <div class="pc-container">
      <!-- 顶部 Hero 区域：大屏轮播 + 学生身份卡片 -->
      <div class="hero-section">
        <!-- 轮播 Banner -->
        <div class="hero-banner">
          <el-carousel trigger="click" height="340px" class="banner-carousel">
            <el-carousel-item v-for="item in INITIAL_BANNERS" :key="item.id">
              <div class="banner-slide" @click="handleBannerClick(item.link)">
                <img :src="item.image" :alt="item.title" class="banner-img" />
                <div class="banner-overlay">
                  <h2 class="banner-title">{{ item.title }}</h2>
                  <p class="banner-subtitle">{{ item.subtitle }}</p>
                </div>
              </div>
            </el-carousel-item>
          </el-carousel>
        </div>

        <!-- 右侧个人快捷卡片与快捷服务 -->
        <div class="hero-sidebar">
          <div class="user-quick-card">
            <div class="card-avatar-box">
              <el-avatar :size="54" src="./images/tabBar/mine.fill.png" />
              <div class="user-greeting">
                <span class="greeting-text">
                  {{ userStore.isLoggedIn ? userStore.nickName : '欢迎来到校园二手' }}
                </span>
                <span class="student-id-text">
                  {{ userStore.isLoggedIn ? `学号: ${userStore.studentId}` : '认证后解锁完整功能' }}
                </span>
              </div>
            </div>

            <div class="quick-status-row">
              <div class="status-item" @click="router.push('/profile')">
                <span class="status-num">{{ myPublishedCount }}</span>
                <span class="status-label">我的发布</span>
              </div>
              <div class="status-item" @click="router.push('/profile')">
                <span class="status-num">{{ myOrdersCount }}</span>
                <span class="status-label">预约订单</span>
              </div>
              <div class="status-item" @click="router.push('/cart')">
                <span class="status-num">{{ cartStore.totalCount }}</span>
                <span class="status-label">购物车</span>
              </div>
            </div>

            <div class="quick-btn-box">
              <el-button
                v-if="!userStore.isLoggedIn"
                type="primary"
                class="full-btn"
                @click="userStore.openAuthDialog"
              >
                学生身份认证 / 登录
              </el-button>
              <el-button
                v-else
                type="primary"
                class="full-btn"
                @click="router.push('/publish')"
              >
                + 快速发布二手闲置
              </el-button>
            </div>
          </div>

          <!-- 校园保障公告卡片 -->
          <div class="safety-card">
            <div class="card-header-small">
              <el-icon color="#e6a23c"><Bell /></el-icon>
              <span>绿色校园交易准则</span>
            </div>
            <p class="card-desc">
              本系统严格采用学生学号认证体系，为校园同学提供课本资料循环与旧物转让保障，线下白天当面验货。
            </p>
          </div>
        </div>
      </div>

      <!-- 校园头条滚动公告跑马灯 -->
      <div class="headline-bar">
        <div class="headline-tag">
          <img :src="'./images/toutiao.png'" alt="头条" class="toutiao-icon" />
          <span>校园头条</span>
        </div>
        <div class="headline-content">
          <el-carousel height="36px" direction="vertical" :autoplay="true" :interval="4000" indicator-position="none">
            <el-carousel-item v-for="item in INITIAL_HEADLINES" :key="item.id">
              <div class="headline-item">
                <span class="headline-badge">最新</span>
                <span class="headline-text">{{ item.title }}</span>
                <span class="headline-date">{{ item.date }}</span>
              </div>
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>

      <!-- 四大快捷金刚入口 -->
      <div class="category-grid">
        <div class="category-card hover-card" @click="router.push('/books')">
          <div class="cat-icon-box cat-book">
            <el-icon :size="26"><Reading /></el-icon>
          </div>
          <div class="cat-info">
            <h4 class="cat-title">二手书店</h4>
            <p class="cat-desc">考研专业教材 · 高分笔记资料</p>
          </div>
        </div>

        <div class="category-card hover-card" @click="router.push('/goods')">
          <div class="cat-icon-box cat-good">
            <el-icon :size="26"><Goods /></el-icon>
          </div>
          <div class="cat-info">
            <h4 class="cat-title">闲置杂货</h4>
            <p class="cat-desc">数码配件 · 宿舍小家电 · 自行车</p>
          </div>
        </div>

        <div class="category-card hover-card" @click="router.push('/jobs')">
          <div class="cat-icon-box cat-job">
            <el-icon :size="26"><Briefcase /></el-icon>
          </div>
          <div class="cat-info">
            <h4 class="cat-title">校园兼职</h4>
            <p class="cat-desc">图书馆助理 · 家教 · 勤工助学</p>
          </div>
        </div>

        <div class="category-card hover-card" @click="router.push('/publish')">
          <div class="cat-icon-box cat-pub">
            <el-icon :size="26"><Upload /></el-icon>
          </div>
          <div class="cat-info">
            <h4 class="cat-title">我要发布</h4>
            <p class="cat-desc">毕业大甩卖 · 一键快速转让</p>
          </div>
        </div>
      </div>

      <!-- 今日好书推荐 (Book Section) -->
      <section class="market-section">
        <div class="section-header">
          <div class="section-title">今日好书推荐 (二手图书专区)</div>
          <el-button link type="primary" @click="router.push('/books')">
            查看更多图书 <el-icon><ArrowRight /></el-icon>
          </el-button>
        </div>

        <div class="product-grid">
          <ProductCard
            v-for="book in topBooks"
            :key="book.bookid"
            :item="book"
            type="book"
          />
        </div>
      </section>

      <!-- 精选闲置好物推荐 (Goods Section) -->
      <section class="market-section">
        <div class="section-header">
          <div class="section-title">精选闲置好物 (宿舍生活与数码)</div>
          <el-button link type="primary" @click="router.push('/goods')">
            查看更多物品 <el-icon><ArrowRight /></el-icon>
          </el-button>
        </div>

        <div class="product-grid">
          <ProductCard
            v-for="good in topGoods"
            :key="good.goodid"
            :item="good"
            type="good"
          />
        </div>
      </section>

      <!-- 校园兼职速递 (Jobs Section) -->
      <section class="market-section">
        <div class="section-header">
          <div class="section-title">校园兼职与勤工助学速递</div>
          <el-button link type="primary" @click="router.push('/jobs')">
            查看全部职位 <el-icon><ArrowRight /></el-icon>
          </el-button>
        </div>

        <div class="jobs-row-grid">
          <div
            v-for="job in topJobs"
            :key="job.jobid"
            class="job-card hover-card"
            @click="router.push(`/job/${job.jobid}`)"
          >
            <div class="job-header">
              <h4 class="job-title">{{ job.title }}</h4>
              <span class="job-pay">{{ job.workpay }}</span>
            </div>
            <div class="job-meta">
              <span><el-icon><Location /></el-icon> {{ job.workplace }}</span>
              <span><el-icon><Clock /></el-icon> {{ job.worktime }}</span>
            </div>
            <p class="job-req">{{ job.workrequirement }}</p>
            <div class="job-footer">
              <span class="job-poster">发布者：{{ job.username }}</span>
              <el-button size="small" type="primary" plain>查看详情</el-button>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import {
  Reading,
  Goods,
  Briefcase,
  Upload,
  ArrowRight,
  Bell,
  Location,
  Clock
} from '@element-plus/icons-vue'
import ProductCard from '../components/ProductCard.vue'
import { INITIAL_BANNERS, INITIAL_HEADLINES } from '../mock/initialData'
import { useUserStore } from '../stores/user'
import { useCartStore } from '../stores/cart'
import { useMarketStore } from '../stores/market'
import { getOrders } from '../services/storage'

const router = useRouter()
const userStore = useUserStore()
const cartStore = useCartStore()
const marketStore = useMarketStore()

const topBooks = computed(() => marketStore.books.slice(0, 4))
const topGoods = computed(() => marketStore.goods.slice(0, 4))
const topJobs = computed(() => marketStore.jobs.slice(0, 3))

const myPublishedCount = computed(() => {
  if (!userStore.studentId) return 0
  const bCount = marketStore.books.filter(b => b.studentId === userStore.studentId).length
  const gCount = marketStore.goods.filter(g => g.studentId === userStore.studentId).length
  return bCount + gCount
})

const myOrdersCount = computed(() => {
  if (!userStore.studentId) return 0
  return getOrders(userStore.studentId).length
})

const handleBannerClick = (link) => {
  if (link) router.push(link)
}
</script>

<style scoped>
/* Hero 区域 */
.hero-section {
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: 20px;
  margin-bottom: 20px;
}

.banner-carousel {
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
}

.banner-slide {
  position: relative;
  width: 100%;
  height: 100%;
  cursor: pointer;
}

.banner-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.banner-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.75), transparent);
  color: #ffffff;
  padding: 24px 20px;
}

.banner-title {
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 6px;
}

.banner-subtitle {
  font-size: 14px;
  color: #e2e8f0;
}

.hero-sidebar {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.user-quick-card {
  background: #ffffff;
  border-radius: var(--radius-lg);
  padding: 20px;
  box-shadow: var(--shadow-sm);
  border: 1px solid #ebeef5;
}

.card-avatar-box {
  display: flex;
  align-items: center;
  gap: 14px;
  padding-bottom: 16px;
  border-bottom: 1px solid #f0f2f5;
}

.user-greeting {
  display: flex;
  flex-direction: column;
}

.greeting-text {
  font-size: 16px;
  font-weight: 600;
  color: #1e293b;
}

.student-id-text {
  font-size: 12px;
  color: #94a3b8;
  margin-top: 2px;
}

.quick-status-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  text-align: center;
  padding: 16px 0;
}

.status-item {
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.status-num {
  font-size: 18px;
  font-weight: 700;
  color: var(--primary-color);
}

.status-label {
  font-size: 12px;
  color: #64748b;
}

.full-btn {
  width: 100%;
}

.safety-card {
  background: #ffffff;
  border-radius: var(--radius-lg);
  padding: 16px;
  box-shadow: var(--shadow-sm);
  border: 1px solid #ebeef5;
  flex: 1;
}

.card-header-small {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 600;
  color: #334155;
  margin-bottom: 8px;
}

.card-desc {
  font-size: 12px;
  line-height: 1.6;
  color: #64748b;
}

/* 跑马灯 */
.headline-bar {
  background: #ffffff;
  border-radius: var(--radius-base);
  padding: 0 16px;
  height: 48px;
  display: flex;
  align-items: center;
  box-shadow: var(--shadow-sm);
  border: 1px solid #ebeef5;
  margin-bottom: 24px;
  gap: 16px;
}

.headline-tag {
  display: flex;
  align-items: center;
  gap: 6px;
  font-weight: 600;
  color: #e6a23c;
  font-size: 14px;
  border-right: 1px solid #ebeef5;
  padding-right: 16px;
  white-space: nowrap;
}

.toutiao-icon {
  width: 20px;
  height: 20px;
}

.headline-content {
  flex: 1;
  overflow: hidden;
}

.headline-item {
  display: flex;
  align-items: center;
  gap: 10px;
  line-height: 36px;
  font-size: 13px;
}

.headline-badge {
  background: #fdf6ec;
  color: #e6a23c;
  border: 1px solid #faecd8;
  font-size: 11px;
  padding: 0 6px;
  border-radius: 4px;
  line-height: 18px;
}

.headline-text {
  flex: 1;
  color: #334155;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.headline-date {
  color: #94a3b8;
  font-size: 12px;
}

/* 四大金刚分类 */
.category-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 30px;
}

.category-card {
  background: #ffffff;
  border-radius: var(--radius-base);
  padding: 18px;
  display: flex;
  align-items: center;
  gap: 14px;
  border: 1px solid #ebeef5;
  cursor: pointer;
}

.cat-icon-box {
  width: 52px;
  height: 52px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
}

.cat-book { background: linear-gradient(135deg, #3b82f6, #1d4ed8); }
.cat-good { background: linear-gradient(135deg, #10b981, #047857); }
.cat-job { background: linear-gradient(135deg, #f59e0b, #d97706); }
.cat-pub { background: linear-gradient(135deg, #8b5cf6, #6d28d9); }

.cat-title {
  font-size: 16px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 4px;
}

.cat-desc {
  font-size: 12px;
  color: #64748b;
}

/* 商品网格 */
.market-section {
  margin-bottom: 36px;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 18px;
}

/* 兼职卡片 */
.jobs-row-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
}

.job-card {
  background: #ffffff;
  border-radius: var(--radius-base);
  padding: 18px;
  border: 1px solid #ebeef5;
  cursor: pointer;
  display: flex;
  flex-direction: column;
}

.job-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 10px;
  gap: 8px;
}

.job-title {
  font-size: 15px;
  font-weight: 600;
  color: #1e293b;
  line-height: 1.4;
}

.job-pay {
  color: var(--price-color);
  font-weight: 600;
  font-size: 14px;
  white-space: nowrap;
}

.job-meta {
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 12px;
  color: #64748b;
  margin-bottom: 10px;
}

.job-meta span {
  display: flex;
  align-items: center;
  gap: 4px;
}

.job-req {
  font-size: 12px;
  color: #94a3b8;
  line-height: 1.5;
  margin-bottom: 14px;
  height: 36px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.job-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  padding-top: 10px;
  border-top: 1px dashed #f0f2f5;
}

.job-poster {
  font-size: 12px;
  color: #64748b;
}
</style>
