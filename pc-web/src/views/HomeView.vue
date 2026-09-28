<template>
  <div class="home-view page-container">
    <div class="pc-container">
      <!-- 1. 先锋展示 Hero 区域：高质感视觉 + 呼吸感排版 -->
      <section class="hero-showcase">
        <div class="hero-left">
          <div class="hero-badge">
            <span class="badge-dot"></span>
            <span>🌱 山东财经大学绿色循环校园 · 官方认证闲置互助平台</span>
          </div>

          <h1 class="hero-headline">
            让课本传承温度<br />
            让闲置重获新生
          </h1>

          <p class="hero-subtext">
            专为全校师生打造的轻量化绿色循环互助平台。杜绝线上虚假打款风险，实行严格学籍认证与白天线下安全验货，让知识与善意在圣井、燕山、舜耕三校区自由流转。
          </p>

          <div class="hero-actions">
            <el-button type="primary" size="large" class="primary-hero-btn" @click="router.push('/books')">
              📚 探索二手书城
            </el-button>
            <el-button size="large" class="secondary-hero-btn" @click="router.push('/goods')">
              🎁 淘闲置杂货
            </el-button>
            <el-button size="large" class="secondary-hero-btn" @click="router.push('/wants')">
              🙋 发布求购需求
            </el-button>
          </div>

          <div class="hero-highlights">
            <div class="hl-item">
              <el-icon color="#10b981"><CircleCheckFilled /></el-icon>
              <span>100% 在校实名验真</span>
            </div>
            <div class="hl-item">
              <el-icon color="#10b981"><CircleCheckFilled /></el-icon>
              <span>线下公共区域当面核验</span>
            </div>
            <div class="hl-item">
              <el-icon color="#10b981"><CircleCheckFilled /></el-icon>
              <span>全程个人隐私强力脱敏</span>
            </div>
          </div>
        </div>

        <!-- 右侧：精美轮播与循环动态展板 -->
        <div class="hero-right">
          <div class="banner-wrapper">
            <el-carousel trigger="click" height="300px" class="showcase-carousel">
              <el-carousel-item v-for="item in INITIAL_BANNERS" :key="item.id">
                <div class="banner-slide" @click="router.push(item.link)">
                  <img :src="item.image" :alt="item.title" class="banner-img" />
                  <div class="banner-glass-overlay">
                    <span class="slide-tag">重点推荐</span>
                    <h3 class="slide-title">{{ item.title }}</h3>
                    <p class="slide-sub">{{ item.subtitle }}</p>
                  </div>
                </div>
              </el-carousel-item>
            </el-carousel>
          </div>

          <!-- 快捷操作小药丸条 -->
          <div class="quick-access-strip">
            <div class="strip-item" @click="router.push('/sustainability')">
              <span class="strip-icon">🌱</span>
              <div class="strip-text">
                <span class="strip-title">低碳足迹测算</span>
                <span class="strip-sub">查看全校减碳成果</span>
              </div>
            </div>
            <div class="strip-divider"></div>
            <div class="strip-item" @click="router.push('/guide')">
              <span class="strip-icon">📍</span>
              <div class="strip-text">
                <span class="strip-title">校区面交坐标</span>
                <span class="strip-sub">三校区安全点</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 2. 全校循环宏观数据仪表盘 (Metrics Bar) -->
      <section class="metrics-bar">
        <div class="metric-block">
          <span class="metric-num">3,850+</span>
          <span class="metric-label">册课本资料流转传承</span>
        </div>
        <div class="metric-sep"></div>
        <div class="metric-block">
          <span class="metric-num">4,960+</span>
          <span class="metric-label">kg 累计减少工业碳排</span>
        </div>
        <div class="metric-sep"></div>
        <div class="metric-block">
          <span class="metric-num">100%</span>
          <span class="metric-label">本校在读学籍实名核验</span>
        </div>
        <div class="metric-sep"></div>
        <div class="metric-block">
          <span class="metric-num">3 大校区</span>
          <span class="metric-label">圣井/燕山/舜耕全覆盖互通</span>
        </div>
      </section>

      <!-- 3. 六大核心专区传送门（明确分流，稀释信息架构） -->
      <section class="portals-section">
        <div class="section-title-box">
          <h2 class="sec-title">核心业务专区 · 一键直达</h2>
          <p class="sec-subtitle">分门别类的高校流转专区，根据你的需求直达独立页面</p>
        </div>

        <div class="portals-grid">
          <!-- 1. 二手教材馆 -->
          <div class="portal-card hover-card" @click="router.push('/books')">
            <div class="portal-icon-bg icon-bg-blue">
              <el-icon :size="26"><Reading /></el-icon>
            </div>
            <div class="portal-content">
              <h3 class="portal-title">二手教材馆</h3>
              <p class="portal-desc">经管专业教材、计量经济学、微观宏观与考研真题高分笔记</p>
              <span class="portal-link">进入书城选书 →</span>
            </div>
          </div>

          <!-- 2. 闲置杂货铺 -->
          <div class="portal-card hover-card" @click="router.push('/goods')">
            <div class="portal-icon-bg icon-bg-emerald">
              <el-icon :size="26"><Goods /></el-icon>
            </div>
            <div class="portal-content">
              <h3 class="portal-title">闲置杂货铺</h3>
              <p class="portal-desc">宿舍神器、护眼台灯、蓝牙键盘、圣井代步单车与生活好物</p>
              <span class="portal-link">挑选中意好物 →</span>
            </div>
          </div>

          <!-- 3. 求购互助广场 -->
          <div class="portal-card hover-card" @click="router.push('/wants')">
            <div class="portal-icon-bg icon-bg-orange">
              <el-icon :size="26"><Opportunity /></el-icon>
            </div>
            <div class="portal-content">
              <h3 class="portal-title">求购互助广场</h3>
              <p class="portal-desc">未找到所需物品？发布求购心愿单，三校区学长学姐在线响应</p>
              <span class="portal-link">探索心愿广场 →</span>
            </div>
          </div>

          <!-- 4. 勤工助学兼职 -->
          <div class="portal-card hover-card" @click="router.push('/jobs')">
            <div class="portal-icon-bg icon-bg-purple">
              <el-icon :size="26"><Briefcase /></el-icon>
            </div>
            <div class="portal-content">
              <h3 class="portal-title">校园兼职速递</h3>
              <p class="portal-desc">图书馆自习室助管、校外周末家教、课余勤工助学真实岗位</p>
              <span class="portal-link">查看兼职岗位 →</span>
            </div>
          </div>

          <!-- 5. 绿色低碳展馆 -->
          <div class="portal-card hover-card" @click="router.push('/sustainability')">
            <div class="portal-icon-bg icon-bg-teal">
              <el-icon :size="26"><Present /></el-icon>
            </div>
            <div class="portal-content">
              <h3 class="portal-title">绿色低碳展馆</h3>
              <p class="portal-desc">测算个人减碳足迹，查看各学院低碳排行榜与绿色流转先锋</p>
              <span class="portal-link">测算减碳积分 →</span>
            </div>
          </div>

          <!-- 6. 安全面交指南 -->
          <div class="portal-card hover-card" @click="router.push('/guide')">
            <div class="portal-icon-bg icon-bg-indigo">
              <el-icon :size="26"><Guide /></el-icon>
            </div>
            <div class="portal-content">
              <h3 class="portal-title">安全面交指南</h3>
              <p class="portal-desc">圣井/燕山/舜耕公共区域面交地图、隐私脱敏说明与验货约定</p>
              <span class="portal-link">阅读安全手册 →</span>
            </div>
          </div>
        </div>
      </section>

      <!-- 4. 精选流转 · 发现好物 (Curated Picks - 仅精选 4 个卡片，杜绝密集) -->
      <section class="featured-section">
        <div class="featured-header">
          <div>
            <h2 class="sec-title">精选好物 · 灵感流转</h2>
            <p class="sec-subtitle">全校热度最高、成色最好的优质转让与求购</p>
          </div>

          <div class="featured-tabs">
            <button
              :class="['tab-btn', { active: activeTab === 'books' }]"
              @click="activeTab = 'books'"
            >
              📚 热门高分教材
            </button>
            <button
              :class="['tab-btn', { active: activeTab === 'goods' }]"
              @click="activeTab = 'goods'"
            >
              💻 数码宿舍生活
            </button>
            <button
              :class="['tab-btn', { active: activeTab === 'wants' }]"
              @click="activeTab = 'wants'"
            >
              🙋 最新同学求购
            </button>
          </div>
        </div>

        <!-- 图书 Tab -->
        <div v-if="activeTab === 'books'" class="product-gallery">
          <div class="product-grid">
            <ProductCard
              v-for="book in topBooks"
              :key="book.bookid"
              :item="book"
              type="book"
            />
          </div>
          <div class="view-more-row">
            <el-button size="large" plain @click="router.push('/books')">
              查看全部 {{ marketStore.books.length }} 本二手图书与教材资料 <el-icon><ArrowRight /></el-icon>
            </el-button>
          </div>
        </div>

        <!-- 杂货 Tab -->
        <div v-else-if="activeTab === 'goods'" class="product-gallery">
          <div class="product-grid">
            <ProductCard
              v-for="good in topGoods"
              :key="good.goodid"
              :item="good"
              type="good"
            />
          </div>
          <div class="view-more-row">
            <el-button size="large" plain @click="router.push('/goods')">
              查看全部 {{ marketStore.goods.length }} 件闲置杂货好物 <el-icon><ArrowRight /></el-icon>
            </el-button>
          </div>
        </div>

        <!-- 求购 Tab -->
        <div v-else class="product-gallery">
          <div class="home-wants-grid">
            <div
              v-for="want in topWants"
              :key="want.wantId"
              class="home-want-card hover-card"
              @click="router.push('/wants')"
            >
              <div class="hw-top">
                <el-tag size="small" type="danger" effect="plain">{{ want.category }}</el-tag>
                <span class="hw-budget">期望 ¥{{ want.budget }}</span>
              </div>
              <h4 class="hw-title">{{ want.title }}</h4>
              <p class="hw-desc">{{ want.detail }}</p>
              <div class="hw-bottom">
                <span class="hw-user">{{ want.userName }} · {{ want.campus }}</span>
                <span class="hw-action">去响应求购 →</span>
              </div>
            </div>
          </div>
          <div class="view-more-row">
            <el-button size="large" plain @click="router.push('/wants')">
              进入求购广场查看全部心愿单 <el-icon><ArrowRight /></el-icon>
            </el-button>
          </div>
        </div>
      </section>

      <!-- 5. 极简 3 步安全面交流程 -->
      <section class="flow-section">
        <h2 class="sec-title text-center">三步完成一次温情的校园闲置互助</h2>
        <div class="flow-cards-row">
          <div class="flow-card">
            <div class="flow-index">01</div>
            <h4 class="flow-title">实名学籍认证</h4>
            <p class="flow-text">仅面向山东财经大学在读师生开放，核验校园身份，远离校外闲杂人员。</p>
          </div>
          <div class="flow-arrow">→</div>
          <div class="flow-card">
            <div class="flow-index">02</div>
            <h4 class="flow-title">线上预约锁定</h4>
            <p class="flow-text">选中心仪课本或闲置物，一键提交面交预约清单，无需线上打款付款。</p>
          </div>
          <div class="flow-arrow">→</div>
          <div class="flow-card">
            <div class="flow-index">03</div>
            <h4 class="flow-title">线下白天面交</h4>
            <p class="flow-text">在食堂或教学楼公共区域碰头，当面验货满意后再扫码或现金结算。</p>
          </div>
        </div>
      </section>

      <!-- 6. 校园互助心声 -->
      <section class="stories-section">
        <h2 class="sec-title text-center">山财大师生的真实流转故事</h2>
        <div class="stories-grid">
          <div class="story-card">
            <p class="story-quote">“大四考研高分上岸，把高数和专业课历年真题笔记挂到平台上，不到半小时就被金融学院学弟约下了，希望能帮到他考研！”</p>
            <div class="story-author">
              <span class="author-name">李学长</span>
              <span class="author-role">金融学院 · 2020级校友</span>
            </div>
          </div>
          <div class="story-card">
            <p class="story-quote">“开学急需一本西方经济学课本，在求购广场发了一条心愿，当天中午就在圣井校区博敏楼大厅拿到了，省了一大半！”</p>
            <div class="story-author">
              <span class="author-name">张同学</span>
              <span class="author-role">经济学院 · 2022级本科生</span>
            </div>
          </div>
          <div class="story-card">
            <p class="story-quote">“毕业离校行李箱装不下宿舍台灯和小风扇，在平台打包转让给了燕山校区同楼层学妹，既不浪费又践行了低碳环保。”</p>
            <div class="story-author">
              <span class="author-name">周同学</span>
              <span class="author-role">计算机科学与技术学院 (数字媒体专业) · 2021级</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import {
  Reading,
  Goods,
  Opportunity,
  Briefcase,
  Present,
  Guide,
  ArrowRight,
  CircleCheckFilled
} from '@element-plus/icons-vue'
import ProductCard from '../components/ProductCard.vue'
import { INITIAL_BANNERS } from '../mock/initialData'
import { useMarketStore } from '../stores/market'

const router = useRouter()
const marketStore = useMarketStore()
const activeTab = ref('books')

onMounted(() => {
  marketStore.loadAll()
})

const topBooks = computed(() => marketStore.books.slice(0, 4))
const topGoods = computed(() => marketStore.goods.slice(0, 4))
const topWants = computed(() => marketStore.wants.slice(0, 4))
</script>

<style scoped>
.home-view {
  padding-bottom: 60px;
}

/* 1. Hero Showcase */
.hero-showcase {
  display: grid;
  grid-template-columns: 1.15fr 0.95fr;
  gap: 40px;
  align-items: center;
  padding: 40px 0 30px;
}

.hero-left {
  display: flex;
  flex-direction: column;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: var(--bg-card-subtle);
  border: 1px solid var(--border-color);
  padding: 6px 14px;
  border-radius: var(--radius-full);
  font-size: 12px;
  color: var(--text-regular);
  font-weight: 500;
  width: fit-content;
  margin-bottom: 20px;
}

.badge-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #10b981;
  display: inline-block;
}

.hero-headline {
  font-size: 44px;
  font-weight: 900;
  color: var(--text-main);
  line-height: 1.25;
  letter-spacing: -0.5px;
  margin: 0 0 18px;
}

.hero-subtext {
  font-size: 15px;
  color: var(--text-secondary);
  line-height: 1.7;
  margin: 0 0 28px;
  max-width: 540px;
}

.hero-actions {
  display: flex;
  gap: 14px;
  margin-bottom: 28px;
  flex-wrap: wrap;
}

.primary-hero-btn {
  background-color: var(--primary-color);
  border-color: var(--primary-color);
  padding: 14px 28px;
  font-size: 15px;
  font-weight: 600;
  border-radius: var(--radius-base);
}

.secondary-hero-btn {
  background-color: var(--bg-card);
  border-color: var(--border-color);
  color: var(--text-main);
  padding: 14px 22px;
  font-size: 15px;
  font-weight: 500;
  border-radius: var(--radius-base);
}

.hero-highlights {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

.hl-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: var(--text-regular);
}

/* Hero Right Banner */
.hero-right {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.banner-wrapper {
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-md);
  border: 1px solid var(--border-color);
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

.banner-glass-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 24px;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
  color: #ffffff;
}

.slide-tag {
  background: var(--primary-color);
  font-size: 11px;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 4px;
  margin-bottom: 6px;
  display: inline-block;
}

.slide-title {
  font-size: 18px;
  font-weight: 700;
  margin: 4px 0 2px;
}

.slide-sub {
  font-size: 12px;
  opacity: 0.9;
  margin: 0;
}

.quick-access-strip {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: 14px 20px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  box-shadow: var(--shadow-sm);
}

.strip-item {
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  transition: opacity 0.2s;
}

.strip-item:hover {
  opacity: 0.8;
}

.strip-icon {
  font-size: 24px;
}

.strip-text {
  display: flex;
  flex-direction: column;
}

.strip-title {
  font-size: 13px;
  font-weight: 700;
  color: var(--text-main);
}

.strip-sub {
  font-size: 11px;
  color: var(--text-secondary);
}

.strip-divider {
  width: 1px;
  height: 30px;
  background: var(--border-color);
}

/* 2. Metrics Bar */
.metrics-bar {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: 24px 30px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 30px 0 50px;
  box-shadow: var(--shadow-sm);
}

.metric-block {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.metric-num {
  font-size: 32px;
  font-weight: 900;
  color: var(--primary-color);
  font-family: 'DIN Alternate', sans-serif;
}

.metric-label {
  font-size: 13px;
  color: var(--text-secondary);
}

.metric-sep {
  width: 1px;
  height: 40px;
  background: var(--border-color);
}

/* 3. Portals Grid */
.portals-section {
  margin-bottom: 50px;
}

.section-title-box {
  margin-bottom: 24px;
}

.sec-title {
  font-size: 24px;
  font-weight: 800;
  color: var(--text-main);
  margin: 0 0 6px;
}

.sec-title.text-center {
  text-align: center;
}

.sec-subtitle {
  font-size: 14px;
  color: var(--text-secondary);
  margin: 0;
}

.portals-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 22px;
}

.portal-card {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: 26px;
  display: flex;
  gap: 18px;
  cursor: pointer;
  box-shadow: var(--shadow-sm);
  transition: all 0.28s cubic-bezier(0.16, 1, 0.3, 1);
}

.portal-card:hover {
  transform: translateY(-4px);
  border-color: var(--primary-color);
  box-shadow: var(--shadow-hover);
}

.portal-icon-bg {
  width: 52px;
  height: 52px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.icon-bg-blue { background: rgba(37, 99, 235, 0.12); color: #2563eb; }
.icon-bg-emerald { background: rgba(16, 185, 129, 0.12); color: #059669; }
.icon-bg-orange { background: rgba(234, 88, 12, 0.12); color: #ea580c; }
.icon-bg-purple { background: rgba(124, 58, 237, 0.12); color: #7c3aed; }
.icon-bg-teal { background: rgba(13, 148, 136, 0.12); color: #0d9488; }
.icon-bg-indigo { background: rgba(79, 70, 229, 0.12); color: #4f46e5; }

.portal-content {
  display: flex;
  flex-direction: column;
}

.portal-title {
  font-size: 17px;
  font-weight: 700;
  color: var(--text-main);
  margin: 0 0 6px;
}

.portal-desc {
  font-size: 13px;
  color: var(--text-secondary);
  line-height: 1.5;
  margin: 0 0 12px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.portal-link {
  font-size: 13px;
  font-weight: 600;
  color: var(--primary-color);
  margin-top: auto;
}

/* 4. Featured Section */
.featured-section {
  margin-bottom: 60px;
}

.featured-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 24px;
}

.featured-tabs {
  display: flex;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  padding: 4px;
  border-radius: var(--radius-full);
  gap: 4px;
}

.tab-btn {
  background: transparent;
  border: none;
  padding: 8px 18px;
  border-radius: var(--radius-full);
  font-size: 13px;
  font-weight: 500;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.2s;
}

.tab-btn.active {
  background: var(--primary-color);
  color: #ffffff;
  font-weight: 600;
}

.product-gallery {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.home-wants-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.home-want-card {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: 20px;
  box-shadow: var(--shadow-sm);
  display: flex;
  flex-direction: column;
  gap: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.home-want-card:hover {
  border-color: var(--primary-color);
}

.hw-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.hw-budget {
  font-size: 14px;
  font-weight: 800;
  color: var(--price-color);
}

.hw-title {
  font-size: 15px;
  font-weight: 700;
  color: var(--text-main);
  margin: 0;
}

.hw-desc {
  font-size: 13px;
  color: var(--text-secondary);
  line-height: 1.5;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.hw-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  color: var(--text-muted);
  margin-top: 6px;
  padding-top: 8px;
  border-top: 1px dashed var(--border-subtle);
}

.hw-action {
  color: var(--primary-color);
  font-weight: 600;
}

.view-more-row {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}

/* 5. Flow Section */
.flow-section {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: 40px;
  margin-bottom: 60px;
  box-shadow: var(--shadow-sm);
}

.flow-cards-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  margin-top: 30px;
}

.flow-card {
  flex: 1;
  background: var(--bg-card-subtle);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-base);
  padding: 24px;
  text-align: center;
}

.flow-index {
  font-size: 32px;
  font-weight: 900;
  color: var(--primary-color);
  opacity: 0.3;
  margin-bottom: 6px;
  font-family: 'DIN Alternate', sans-serif;
}

.flow-title {
  font-size: 16px;
  font-weight: 700;
  color: var(--text-main);
  margin: 0 0 8px;
}

.flow-text {
  font-size: 13px;
  color: var(--text-secondary);
  line-height: 1.6;
  margin: 0;
}

.flow-arrow {
  font-size: 24px;
  color: var(--text-muted);
}

/* 6. Stories */
.stories-section {
  margin-bottom: 40px;
}

.stories-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 22px;
  margin-top: 24px;
}

.story-card {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: 24px;
  box-shadow: var(--shadow-sm);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.story-quote {
  font-size: 14px;
  color: var(--text-regular);
  line-height: 1.7;
  font-style: italic;
  margin: 0 0 16px;
}

.story-author {
  display: flex;
  flex-direction: column;
}

.author-name {
  font-size: 13px;
  font-weight: 700;
  color: var(--text-main);
}

.author-role {
  font-size: 11px;
  color: var(--text-muted);
}

@media (max-width: 960px) {
  .hero-showcase {
    grid-template-columns: 1fr;
  }
  .portals-grid, .stories-grid {
    grid-template-columns: 1fr;
  }
  .flow-cards-row {
    flex-direction: column;
  }
  .flow-arrow {
    display: none;
  }
  .home-wants-grid {
    grid-template-columns: 1fr;
  }
}
</style>
