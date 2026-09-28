<template>
  <div class="safety-guide-view page-container">
    <div class="pc-container">
      <!-- 头部 -->
      <div class="guide-hero">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>校园安全面交与隐私指南</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="hero-content">
          <div class="hero-tag">🛡️ 大赛合规 · 校园隐私安全与线下互助保障</div>
          <h1 class="hero-title">安全面交约定 · 个人隐私保护规范</h1>
          <p class="hero-desc">
            平台遵循全国大学生竞赛数据安全合规规范，对所有在校生手机号与学籍进行全程隐私脱敏，倡导“线下白天、校园公共区域、当面验货无误后再结算”的零风险流转原则。
          </p>
        </div>
      </div>

      <!-- 4 步无忧流转流程卡片 -->
      <div class="steps-section">
        <h3 class="section-title">✨ 标准校园二手互助流转全流程</h3>
        <div class="steps-grid">
          <div class="step-card">
            <div class="step-num">01</div>
            <h4 class="step-title">学籍互信认证</h4>
            <p class="step-desc">平台仅对本校在校大学生开放，严格核验学号与校园身份，筑牢源头真实信任基础。</p>
          </div>

          <div class="step-card">
            <div class="step-num">02</div>
            <h4 class="step-title">线上留言沟通</h4>
            <p class="step-desc">通过物品详情页留言板或在线预约发起沟通，讨论教材版次笔记与物品实际成色。</p>
          </div>

          <div class="step-card">
            <div class="step-num">03</div>
            <h4 class="step-title">生成预约凭证</h4>
            <p class="step-desc">加入购物车提交预订，系统生成专属面交预约凭证，无需线上打款，资金零风险。</p>
          </div>

          <div class="step-card">
            <div class="step-num">04</div>
            <h4 class="step-title">线下验货结算</h4>
            <p class="step-desc">在校园推荐公共地点（食堂、图书馆前）白天当面核验物品，确认满意后再扫码或现金付款。</p>
          </div>
        </div>
      </div>

      <!-- 校区推荐面交地点 -->
      <div class="places-section">
        <h3 class="section-title">📍 两大校区官方推荐安全面交点</h3>
        <div class="places-grid">
          <div v-for="spot in CAMPUS_SPOTS" :key="spot.name" class="spot-card hover-card">
            <div class="spot-header">
              <span class="spot-campus">{{ spot.campus }}</span>
              <span class="spot-security">监控全覆盖 · 光线充足</span>
            </div>
            <h4 class="spot-name">{{ spot.name }}</h4>
            <div class="spot-detail-row">
              <span class="spot-label">推荐时段：</span>
              <span class="spot-val">{{ spot.hours }}</span>
            </div>
            <div class="spot-detail-row">
              <span class="spot-label">具体坐标：</span>
              <span class="spot-val">{{ spot.location }}</span>
            </div>
            <p class="spot-tip">💡 贴士：{{ spot.tips }}</p>
          </div>
        </div>
      </div>

      <!-- 隐私数据安全保护架构展示 -->
      <div class="privacy-section">
        <div class="privacy-card">
          <div class="priv-left">
            <div class="priv-icon">🔒</div>
            <h3 class="priv-title">数据安全与个人隐私保护架构（大赛强制达标项）</h3>
            <p class="priv-desc">
              根据《中华人民共和国数据安全法》及数媒大赛合规规范，本平台对所有涉及学生隐私的字段实施强力脱敏机制，绝不直接将同学手机号与完整敏感学号暴露于公开页面。
            </p>
          </div>
          <div class="priv-right">
            <div class="demo-box">
              <div class="demo-row">
                <span class="demo-label">原始数据：</span>
                <span class="demo-val raw">13871234567 (学生手机)</span>
              </div>
              <div class="demo-arrow">⬇️ 平台隐私算法动态脱敏</div>
              <div class="demo-row">
                <span class="demo-label">页面展示：</span>
                <span class="demo-val safe">138****4567 (安全脱敏后)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 交易防骗四大铁律 -->
      <div class="rules-section">
        <h3 class="section-title">⚠️ 校园闲置交易防骗“四大铁律”</h3>
        <div class="rules-grid">
          <div class="rule-card">
            <span class="rule-icon">🚫</span>
            <h5 class="rule-title">严禁线上私下提前转账</h5>
            <p class="rule-desc">切勿在未当面见到商品和卖家前，通过微信、支付宝或不明链接先行垫付定金或货款。</p>
          </div>

          <div class="rule-card">
            <span class="rule-icon">☀️</span>
            <h5 class="rule-title">白天公共区域面交</h5>
            <p class="rule-desc">选择中午或课后下课高峰期在教学楼大厅、食堂、快递驿站等公共场所碰头，避开偏僻阴暗角落。</p>
          </div>

          <div class="rule-card">
            <span class="rule-icon">🔍</span>
            <h5 class="rule-title">高价值数码当场通电验机</h5>
            <p class="rule-desc">对于台灯、耳机、平板等电子数码用品，务必现场插电、开机测试屏幕、声音与充电接口是否正常。</p>
          </div>

          <div class="rule-card">
            <span class="rule-icon">🚨</span>
            <h5 class="rule-title">发现违规一键后台举报</h5>
            <p class="rule-desc">若发现假冒伪劣、虚假信息或校外商业推销，随时在后台管理运营中心提交审核下架。</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const CAMPUS_SPOTS = [
  {
    campus: '温泉校区',
    name: '温泉图书馆一楼正门服务大厅',
    hours: '08:30 - 21:30 (全天)',
    location: '图书馆正门旋转门内大理石休息区',
    tips: '人流密集、中央空调、保安值守，自习课余顺路交易的首选地点。'
  },
  {
    campus: '温泉校区',
    name: '学子二食堂一楼面包房门口',
    hours: '11:30 - 13:00 / 17:00 - 18:30',
    location: '二食堂正门玻璃门内侧休闲桌椅旁',
    tips: '午餐及晚餐就餐高峰期，买卖双方饭前碰头，方便快捷。'
  },
  {
    campus: '咸安校区',
    name: '一号综合教学楼一楼中央连廊',
    hours: '08:00 - 18:00 (教学作息时段)',
    location: '一教中庭公告栏长椅旁',
    tips: '大课间课间休息可快速交接课本资料，监控全方位无盲区。'
  },
  {
    campus: '咸安校区',
    name: '菜鸟驿站与青年公寓门前广场',
    hours: '12:00 - 19:30',
    location: '校内快递中心正门口树荫休息长凳',
    tips: '取快递或宿舍楼下顺路面交，方便检查大件闲置或自行车。'
  }
]
</script>

<style scoped>
.safety-guide-view {
  min-height: calc(100vh - 200px);
}

.guide-hero {
  margin-bottom: 28px;
}

.hero-tag {
  display: inline-block;
  font-size: 12px;
  font-weight: 600;
  color: #2563eb;
  background: rgba(37, 99, 235, 0.12);
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
  max-width: 820px;
  margin: 0;
}

.section-title {
  font-size: 18px;
  font-weight: 700;
  color: var(--text-main);
  margin: 0 0 18px;
}

/* 4 步流程 */
.steps-section {
  margin-bottom: 34px;
}

.steps-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 18px;
}

.step-card {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: 22px;
  box-shadow: var(--shadow-sm);
  position: relative;
}

.step-num {
  font-size: 28px;
  font-weight: 900;
  color: var(--primary-color);
  opacity: 0.25;
  line-height: 1;
  margin-bottom: 8px;
  font-family: 'DIN Alternate', sans-serif;
}

.step-title {
  font-size: 15px;
  font-weight: 700;
  color: var(--text-main);
  margin: 0 0 8px;
}

.step-desc {
  font-size: 13px;
  color: var(--text-secondary);
  line-height: 1.6;
  margin: 0;
}

/* 推荐面交地点 */
.places-section {
  margin-bottom: 34px;
}

.places-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.spot-card {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: 22px;
  box-shadow: var(--shadow-sm);
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.spot-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.spot-campus {
  font-size: 11px;
  font-weight: 600;
  color: #10b981;
  background: rgba(16, 185, 129, 0.12);
  padding: 2px 8px;
  border-radius: 4px;
}

.spot-security {
  font-size: 11px;
  color: var(--text-secondary);
}

.spot-name {
  font-size: 16px;
  font-weight: 700;
  color: var(--text-main);
  margin: 0;
}

.spot-detail-row {
  display: flex;
  font-size: 13px;
}

.spot-label {
  color: var(--text-secondary);
  width: 70px;
}

.spot-val {
  color: var(--text-regular);
  font-weight: 500;
}

.spot-tip {
  font-size: 12px;
  color: var(--text-muted);
  line-height: 1.5;
  background: var(--bg-card-subtle);
  padding: 8px 12px;
  border-radius: 6px;
  margin: 6px 0 0;
}

/* 隐私卡片 */
.privacy-section {
  margin-bottom: 34px;
}

.privacy-card {
  background: linear-gradient(135deg, rgba(37, 99, 235, 0.08), rgba(124, 58, 237, 0.08));
  border: 1px solid rgba(37, 99, 235, 0.25);
  border-radius: var(--radius-lg);
  padding: 26px 30px;
  display: flex;
  gap: 30px;
  align-items: center;
}

.priv-left {
  flex: 1.4;
}

.priv-icon {
  font-size: 26px;
  margin-bottom: 8px;
}

.priv-title {
  font-size: 18px;
  font-weight: 700;
  color: var(--text-main);
  margin: 0 0 8px;
}

.priv-desc {
  font-size: 13px;
  color: var(--text-regular);
  line-height: 1.7;
  margin: 0;
}

.priv-right {
  flex: 1;
}

.demo-box {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-base);
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.demo-row {
  display: flex;
  justify-content: space-between;
  font-size: 13px;
}

.demo-label {
  color: var(--text-secondary);
}

.demo-val.raw {
  color: var(--text-secondary);
  font-family: monospace;
}

.demo-val.safe {
  color: #10b981;
  font-weight: 700;
  font-family: monospace;
}

.demo-arrow {
  text-align: center;
  font-size: 11px;
  color: var(--primary-color);
  padding: 4px 0;
}

/* 防骗四大铁律 */
.rules-section {
  margin-bottom: 40px;
}

.rules-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 18px;
}

.rule-card {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: 20px;
  box-shadow: var(--shadow-sm);
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.rule-icon {
  font-size: 24px;
}

.rule-title {
  font-size: 14px;
  font-weight: 700;
  color: var(--text-main);
  margin: 0;
}

.rule-desc {
  font-size: 12px;
  color: var(--text-secondary);
  line-height: 1.6;
  margin: 0;
}

@media (max-width: 900px) {
  .steps-grid, .rules-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .places-grid {
    grid-template-columns: 1fr;
  }
  .privacy-card {
    flex-direction: column;
  }
}
</style>
