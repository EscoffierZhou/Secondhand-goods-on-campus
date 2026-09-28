<template>
  <div class="weather-widget">
    <el-icon class="weather-icon"><Sunny /></el-icon>
    <span class="city-name">{{ cityName }}</span>
    <span class="weather-desc">{{ weatherDesc }}</span>
    <span class="temp-badge">{{ temperature }}</span>
    <span class="pm-badge">空气: {{ pm25 }}</span>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Sunny } from '@element-plus/icons-vue'

const cityName = ref('济南')
const weatherDesc = ref('秋高气爽 · 晴')
const temperature = ref('16℃ ~ 25℃')
const pm25 = ref('28 优')
</script>

<style scoped>
.weather-widget {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: var(--text-secondary);
}

.weather-icon {
  color: #e6a23c;
  font-size: 15px;
}

.city-name {
  font-weight: 600;
  color: var(--text-main);
}

.weather-desc {
  color: var(--text-regular);
}

.temp-badge {
  color: var(--primary-color);
  font-weight: 600;
}

.pm-badge {
  background: rgba(16, 185, 129, 0.1);
  color: #059669;
  padding: 1px 6px;
  border-radius: 4px;
  border: 1px solid rgba(16, 185, 129, 0.2);
}
</style>
