<template>
  <div class="sustainability-view page-container">
    <div class="pc-container">
      <!-- 顶部标语与导航 -->
      <div class="sustain-hero">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>绿色低碳循环展馆</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="hero-content">
          <div class="hero-tag">🌱 绿色低碳校园 · 闲置循环足迹展厅</div>
          <h1 class="hero-title">校园二手流转 · 守护绿水青山</h1>
          <p class="hero-desc">
            每流转一本二手教材，节约 1.2kg 木材消耗与 2.4kg 工业碳排放；每让一件闲置宿舍好物延续生命，减少一份电子与塑料废弃物。
          </p>
        </div>
      </div>

      <!-- 四大核心低碳宏观数据看板 -->
      <div class="stats-row">
        <div class="stat-card">
          <div class="stat-icon-box icon-tree">
            <span>🌲</span>
          </div>
          <div class="stat-info">
            <span class="stat-val">186 棵</span>
            <span class="stat-name">等效保护成林树木</span>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon-box icon-paper">
            <span>📄</span>
          </div>
          <div class="stat-info">
            <span class="stat-val">2,480 kg</span>
            <span class="stat-name">累计节省原浆纸张</span>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon-box icon-carbon">
            <span>🌍</span>
          </div>
          <div class="stat-info">
            <span class="stat-val">4,960 kg</span>
            <span class="stat-name">减少二氧化碳排放</span>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon-box icon-water">
            <span>💧</span>
          </div>
          <div class="stat-info">
            <span class="stat-val">32,400 L</span>
            <span class="stat-name">节省造纸与工业用水</span>
          </div>
        </div>
      </div>

      <!-- 交互式个人减碳计算器 + 院系排行榜 左右双栏 -->
      <div class="interactive-section">
        <!-- 左侧：减碳计算器 -->
        <div class="calc-card">
          <div class="card-head">
            <h3 class="card-title">🧮 个人流转减碳足迹计算器</h3>
            <span class="card-tip">测算你在本学期流转闲置为地球贡献的绿色价值</span>
          </div>

          <div class="calc-form">
            <div class="calc-field">
              <div class="field-label-row">
                <span>我已转让 / 购入的旧书教材：</span>
                <span class="field-val-display">{{ booksCount }} 本</span>
              </div>
              <el-slider v-model="booksCount" :min="0" :max="30" show-input />
            </div>

            <div class="calc-field">
              <div class="field-label-row">
                <span>我已流转的宿舍小家电 / 数码用品：</span>
                <span class="field-val-display">{{ goodsCount }} 件</span>
              </div>
              <el-slider v-model="goodsCount" :min="0" :max="15" show-input />
            </div>

            <!-- 测算结果卡片 -->
            <div class="calc-result-box">
              <div class="result-badge">测算成果</div>
              <div class="result-number-row">
                <div class="result-item">
                  <span class="r-label">减少碳排</span>
                  <span class="r-num">{{ calcCarbon }} <small>kg</small></span>
                </div>
                <div class="result-item">
                  <span class="r-label">保护森林面积</span>
                  <span class="r-num">{{ calcArea }} <small>㎡</small></span>
                </div>
                <div class="result-item">
                  <span class="r-label">绿色先锋评级</span>
                  <span class="r-badge-name">{{ badgeTitle }}</span>
                </div>
              </div>
              <el-button type="success" class="cert-btn" @click="handleGenerateCert">
                ✨ 查看我的“校园低碳流转先锋”荣誉证书
              </el-button>
            </div>
          </div>
        </div>

        <!-- 右侧：院系绿色先锋榜 -->
        <div class="rank-card">
          <div class="card-head">
            <h3 class="card-title">🏆 各学院流转减碳先锋榜</h3>
            <span class="card-tip">绿色校园低碳接力统计</span>
          </div>

          <div class="rank-list">
            <div v-for="(item, idx) in COLLEGE_RANKS" :key="item.name" class="rank-row">
              <div class="rank-left">
                <span :class="['rank-badge', idx < 3 ? 'top' : '']">{{ idx + 1 }}</span>
                <span class="college-name">{{ item.name }}</span>
              </div>
              <div class="rank-right">
                <span class="carbon-val">{{ item.carbon }} kg CO₂</span>
                <div class="progress-bar-bg">
                  <div class="progress-fill" :style="{ width: item.percent + '%' }"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 绿色校园行动倡议卡片 -->
      <div class="initiative-card">
        <h3 class="ini-title">📢 毕业季 · “知识传承 · 爱心循环” 绿色倡议</h3>
        <p class="ini-text">
          大学期间，山财大学子平均购买 35~50 本专业教材与考研参考书。毕业离校时，一本承载考研批注与划线重点的经管课本如果当废纸变卖，其文化价值被严重稀释。加入山东财经大学校园互助平台，让你的学识与笔记在圣井、燕山、舜耕三校区同学手中传递！
        </p>
        <div class="ini-actions">
          <el-button type="primary" size="large" @click="router.push('/publish')">立即发布我的闲置教材</el-button>
          <el-button size="large" @click="router.push('/books')">去书城看看学长学姐的书</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessageBox } from 'element-plus'

const router = useRouter()

const booksCount = ref(4)
const goodsCount = ref(2)

const calcCarbon = computed(() => {
  return (booksCount.value * 2.4 + goodsCount.value * 5.2).toFixed(1)
})

const calcArea = computed(() => {
  return (booksCount.value * 0.8 + goodsCount.value * 1.5).toFixed(1)
})

const badgeTitle = computed(() => {
  const total = booksCount.value + goodsCount.value
  if (total >= 15) return '👑 极境低碳大师'
  if (total >= 8) return '🌟 校园绿色榜样'
  if (total >= 3) return '🌱 低碳循环先锋'
  return '🍃 环保新秀同学'
})

const COLLEGE_RANKS = [
  { name: '金融学院', carbon: 1480, percent: 100 },
  { name: '会计学院', carbon: 1320, percent: 89 },
  { name: '计算机科学与技术学院 (数字媒体系)', carbon: 1150, percent: 78 },
  { name: '经济学院', carbon: 960, percent: 65 },
  { name: '工商管理学院', carbon: 820, percent: 55 },
  { name: '统计与数学学院', carbon: 710, percent: 48 }
]

const handleGenerateCert = () => {
  ElMessageBox.alert(
    `【校园绿色流转先锋荣誉认证】\n\n尊敬的同学：\n感谢你在校园二手互助平台积极参与书籍与闲置物品循环流转！\n你已累计助力全校减少二氧化碳排放 ${calcCarbon.value} kg，等效守护 ${calcArea.value} ㎡ 绿地森林。\n授予荣誉称号：【${badgeTitle.value}】！`,
    '🌿 绿色流转成就卡',
    { confirmButtonText: '保存并践行低碳' }
  )
}
</script>

<style scoped>
.sustainability-view {
  min-height: calc(100vh - 200px);
}

.sustain-hero {
  margin-bottom: 28px;
}

.hero-tag {
  display: inline-block;
  font-size: 12px;
  font-weight: 600;
  color: #059669;
  background: rgba(16, 185, 129, 0.12);
  padding: 4px 12px;
  border-radius: var(--radius-full);
  margin-top: 14px;
}

.hero-title {
  font-size: 28px;
  font-weight: 800;
  color: var(--text-main);
  margin: 10px 0 8px;
}

.hero-desc {
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.6;
  max-width: 800px;
  margin: 0;
}

/* 四大宏观看板 */
.stats-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 30px;
}

.stat-card {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: 22px;
  display: flex;
  align-items: center;
  gap: 16px;
  box-shadow: var(--shadow-sm);
  transition: all 0.25s ease;
}

.stat-card:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-hover);
}

.stat-icon-box {
  width: 52px;
  height: 52px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
}

.icon-tree { background: rgba(16, 185, 129, 0.15); }
.icon-paper { background: rgba(59, 130, 246, 0.15); }
.icon-carbon { background: rgba(124, 58, 237, 0.15); }
.icon-water { background: rgba(14, 165, 233, 0.15); }

.stat-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.stat-val {
  font-size: 24px;
  font-weight: 800;
  color: var(--text-main);
  font-family: 'DIN Alternate', sans-serif;
}

.stat-name {
  font-size: 12px;
  color: var(--text-secondary);
}

/* 交互部分 */
.interactive-section {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 24px;
  margin-bottom: 30px;
}

.calc-card, .rank-card {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: 26px;
  box-shadow: var(--shadow-sm);
}

.card-head {
  margin-bottom: 20px;
}

.card-title {
  font-size: 18px;
  font-weight: 700;
  color: var(--text-main);
  margin: 0 0 4px;
}

.card-tip {
  font-size: 12px;
  color: var(--text-secondary);
}

.calc-form {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.field-label-row {
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  color: var(--text-regular);
  margin-bottom: 4px;
}

.field-val-display {
  font-weight: 700;
  color: var(--primary-color);
}

.calc-result-box {
  background: var(--bg-card-subtle);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-base);
  padding: 18px;
  margin-top: 10px;
}

.result-badge {
  font-size: 11px;
  font-weight: 600;
  color: #059669;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 10px;
}

.result-number-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.result-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.r-label {
  font-size: 12px;
  color: var(--text-secondary);
}

.r-num {
  font-size: 20px;
  font-weight: 800;
  color: var(--text-main);
}

.r-num small {
  font-size: 12px;
  font-weight: normal;
  color: var(--text-secondary);
}

.r-badge-name {
  font-size: 14px;
  font-weight: 700;
  color: #059669;
}

.cert-btn {
  width: 100%;
}

/* 排行榜 */
.rank-list {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.rank-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.rank-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.rank-badge {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: var(--bg-card-subtle);
  color: var(--text-secondary);
  font-size: 12px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
}

.rank-badge.top {
  background: var(--primary-color);
  color: #ffffff;
}

.college-name {
  font-size: 13px;
  color: var(--text-main);
  font-weight: 500;
}

.rank-right {
  display: flex;
  align-items: center;
  gap: 12px;
}

.carbon-val {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-regular);
  min-width: 80px;
  text-align: right;
}

.progress-bar-bg {
  width: 100px;
  height: 6px;
  background: var(--border-color);
  border-radius: 3px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #10b981, #059669);
  border-radius: 3px;
}

/* 倡议卡片 */
.initiative-card {
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.08), rgba(59, 130, 246, 0.08));
  border: 1px solid rgba(16, 185, 129, 0.2);
  border-radius: var(--radius-lg);
  padding: 30px;
  text-align: center;
  margin-bottom: 40px;
}

.ini-title {
  font-size: 20px;
  font-weight: 700;
  color: var(--text-main);
  margin: 0 0 10px;
}

.ini-text {
  font-size: 14px;
  color: var(--text-regular);
  line-height: 1.8;
  max-width: 820px;
  margin: 0 auto 20px;
}

.ini-actions {
  display: flex;
  justify-content: center;
  gap: 16px;
}

@media (max-width: 900px) {
  .stats-row {
    grid-template-columns: repeat(2, 1fr);
  }
  .interactive-section {
    grid-template-columns: 1fr;
  }
}
</style>
