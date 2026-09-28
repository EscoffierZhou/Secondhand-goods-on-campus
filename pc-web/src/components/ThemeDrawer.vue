<template>
  <div>
    <!-- 全局右下角悬浮快捷调色盘工具胶囊 -->
    <div class="floating-theme-pill" title="自定义网页配色与暗黑模式">
      <button
        class="pill-btn mode-btn"
        @click="themeStore.toggleDark"
        :title="themeStore.isDark ? '切换至明亮模式' : '切换至暗黑夜间模式'"
      >
        <el-icon :size="17" v-if="themeStore.isDark"><Sunny /></el-icon>
        <el-icon :size="17" v-else><Moon /></el-icon>
      </button>

      <div class="pill-divider"></div>

      <button
        class="pill-btn palette-btn"
        @click="themeStore.openDrawer"
        title="打开网页主题配色调色板"
      >
        <span class="active-dot" :style="{ backgroundColor: currentPrimaryColor }"></span>
        <span class="palette-text">风格配色</span>
      </button>
    </div>

    <!-- 侧边抽屉：网页配色与视觉风格定制面板 -->
    <el-drawer
      v-model="themeStore.isDrawerOpen"
      title="网页视觉风格与配色定制"
      size="360px"
      direction="rtl"
      :destroy-on-close="false"
      class="theme-drawer"
    >
      <div class="theme-drawer-body">
        <p class="drawer-subtitle">
          随心切换主题色彩与界面布局间距，打造专属您的现代简约视觉体验。
        </p>

        <!-- 1. 明暗模式切换 -->
        <div class="setting-group">
          <h4 class="group-title">
            <el-icon><Monitor /></el-icon>
            <span>外观模式 (Light / Dark)</span>
          </h4>
          <div class="mode-toggle-grid">
            <div
              :class="['mode-card', { active: !themeStore.isDark }]"
              @click="themeStore.isDark && themeStore.toggleDark()"
            >
              <div class="preview-mini-box light-preview">
                <div class="mini-nav"></div>
                <div class="mini-content">
                  <div class="mini-bar"></div>
                  <div class="mini-bar short"></div>
                </div>
              </div>
              <div class="mode-label">
                <el-icon><Sunny /></el-icon>
                <span>极简明亮</span>
              </div>
            </div>

            <div
              :class="['mode-card', { active: themeStore.isDark }]"
              @click="!themeStore.isDark && themeStore.toggleDark()"
            >
              <div class="preview-mini-box dark-preview">
                <div class="mini-nav"></div>
                <div class="mini-content">
                  <div class="mini-bar"></div>
                  <div class="mini-bar short"></div>
                </div>
              </div>
              <div class="mode-label">
                <el-icon><Moon /></el-icon>
                <span>深色夜间</span>
              </div>
            </div>
          </div>
        </div>

        <el-divider />

        <!-- 2. 主题色彩切换 -->
        <div class="setting-group">
          <h4 class="group-title">
            <el-icon><Brush /></el-icon>
            <span>主题核心色系</span>
          </h4>
          <div class="palette-list">
            <div
              v-for="item in themeStore.palettes"
              :key="item.key"
              :class="['palette-item-card', { active: themeStore.colorKey === item.key }]"
              @click="themeStore.setColor(item.key)"
            >
              <span class="color-circle" :style="{ backgroundColor: item.primary }">
                <el-icon v-if="themeStore.colorKey === item.key" color="#ffffff" :size="14"><Check /></el-icon>
              </span>
              <div class="color-info">
                <div class="color-name-row">
                  <span class="color-name">{{ item.name }}</span>
                  <el-tag
                    v-if="themeStore.colorKey === item.key"
                    size="small"
                    type="primary"
                    effect="light"
                  >
                    当前激活
                  </el-tag>
                </div>
                <span class="color-desc">{{ item.desc }}</span>
              </div>
            </div>
          </div>
        </div>

        <el-divider />

        <!-- 3. 布局密度调节 (解决“很密集”的痛点) -->
        <div class="setting-group">
          <h4 class="group-title">
            <el-icon><FullScreen /></el-icon>
            <span>界面密度与留白感</span>
          </h4>
          <div class="density-selector">
            <div
              :class="['density-option', { active: themeStore.density === 'spacious' }]"
              @click="themeStore.setDensity('spacious')"
            >
              <div class="density-icon">🌿</div>
              <div class="density-text">
                <span class="title">舒适舒朗 (推荐)</span>
                <span class="sub">留白更多、通透简约、呼吸感极强</span>
              </div>
            </div>

            <div
              :class="['density-option', { active: themeStore.density === 'compact' }]"
              @click="themeStore.setDensity('compact')"
            >
              <div class="density-icon">📐</div>
              <div class="density-text">
                <span class="title">标准紧凑</span>
                <span class="sub">间距紧凑、单屏容纳更多卡片</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 底部重置操作 -->
        <div class="drawer-footer">
          <el-button plain @click="themeStore.resetTheme" class="full-btn">
            恢复默认极简样式
          </el-button>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import {
  Sunny,
  Moon,
  Brush,
  Check,
  Monitor,
  FullScreen
} from '@element-plus/icons-vue'
import { useThemeStore } from '../stores/theme'

const themeStore = useThemeStore()

const currentPrimaryColor = computed(() => {
  return themeStore.palettes[themeStore.colorKey]?.primary || '#2563eb'
})
</script>

<style scoped>
/* 悬浮微型调色器胶囊 */
.floating-theme-pill {
  position: fixed;
  bottom: 28px;
  right: 28px;
  z-index: 2000;
  display: flex;
  align-items: center;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  padding: 6px 10px;
  border-radius: var(--radius-full);
  box-shadow: 0 8px 24px -4px rgba(0, 0, 0, 0.12), 0 2px 6px rgba(0, 0, 0, 0.04);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.25s ease;
}

.floating-theme-pill:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 30px -4px rgba(0, 0, 0, 0.18);
}

.pill-btn {
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 8px;
  border-radius: var(--radius-full);
  color: var(--text-regular);
  font-size: 13px;
  font-weight: 500;
  transition: all 0.2s ease;
}

.pill-btn:hover {
  color: var(--primary-color);
  background-color: var(--primary-light);
}

.mode-btn {
  padding: 6px;
  border-radius: 50%;
}

.pill-divider {
  width: 1px;
  height: 16px;
  background-color: var(--border-color);
  margin: 0 4px;
}

.active-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  display: inline-block;
  box-shadow: 0 0 0 2px var(--bg-card);
}

.palette-text {
  font-size: 12px;
}

/* 抽屉样式 */
.theme-drawer-body {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.drawer-subtitle {
  font-size: 13px;
  color: var(--text-secondary);
  line-height: 1.5;
  margin-bottom: 4px;
}

.setting-group {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.group-title {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-main);
  display: flex;
  align-items: center;
  gap: 8px;
}

/* 明暗模式对比卡片 */
.mode-toggle-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.mode-card {
  border: 2px solid var(--border-color);
  border-radius: var(--radius-base);
  padding: 10px;
  cursor: pointer;
  background: var(--bg-card);
  transition: all 0.2s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.mode-card:hover {
  border-color: var(--primary-color);
  transform: translateY(-2px);
}

.mode-card.active {
  border-color: var(--primary-color);
  background: var(--primary-light);
}

.preview-mini-box {
  width: 100%;
  height: 56px;
  border-radius: 6px;
  border: 1px solid var(--border-color);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.light-preview {
  background: #f8fafc;
}
.light-preview .mini-nav {
  height: 14px;
  background: #ffffff;
  border-bottom: 1px solid #e2e8f0;
}
.light-preview .mini-bar {
  height: 6px;
  background: #e2e8f0;
  border-radius: 3px;
  margin: 4px 8px 0;
}
.light-preview .mini-bar.short {
  width: 50%;
}

.dark-preview {
  background: #0a0e17;
}
.dark-preview .mini-nav {
  height: 14px;
  background: #121927;
  border-bottom: 1px solid #1e293b;
}
.dark-preview .mini-bar {
  height: 6px;
  background: #1e293b;
  border-radius: 3px;
  margin: 4px 8px 0;
}
.dark-preview .mini-bar.short {
  width: 50%;
}

.mode-label {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  font-weight: 600;
  color: var(--text-main);
}

/* 主题颜色列表 */
.palette-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.palette-item-card {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  border-radius: var(--radius-base);
  border: 1px solid var(--border-color);
  cursor: pointer;
  transition: all 0.2s ease;
  background: var(--bg-card);
}

.palette-item-card:hover {
  border-color: var(--primary-color);
  transform: translateX(3px);
}

.palette-item-card.active {
  border-color: var(--primary-color);
  background: var(--primary-light);
}

.color-circle {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
}

.color-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.color-name-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.color-name {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-main);
}

.color-desc {
  font-size: 11px;
  color: var(--text-secondary);
}

/* 间距密度卡片 */
.density-selector {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.density-option {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 14px;
  border-radius: var(--radius-base);
  border: 1px solid var(--border-color);
  cursor: pointer;
  transition: all 0.2s ease;
  background: var(--bg-card);
}

.density-option:hover {
  border-color: var(--primary-color);
}

.density-option.active {
  border-color: var(--primary-color);
  background: var(--primary-light);
}

.density-icon {
  font-size: 20px;
}

.density-text {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.density-text .title {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-main);
}

.density-text .sub {
  font-size: 11px;
  color: var(--text-secondary);
}

.drawer-footer {
  margin-top: 10px;
  padding-top: 10px;
}

.full-btn {
  width: 100%;
}
</style>
