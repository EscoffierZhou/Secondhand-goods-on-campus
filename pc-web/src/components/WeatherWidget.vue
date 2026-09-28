<template>
  <div class="weather-widget">
    <el-icon class="weather-icon"><Sunny /></el-icon>
    <span class="city-name">{{ cityName }}</span>
    <span class="weather-desc">{{ weatherDesc }}</span>
    <span class="temp-badge">{{ temperature }}</span>
    <span class="pm-badge">PM2.5: {{ pm25 }}</span>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Sunny } from '@element-plus/icons-vue'

const cityName = ref('咸宁 (校区所在地)')
const weatherDesc = ref('晴转多云')
const temperature = ref('22℃ ~ 28℃')
const pm25 = ref('36 优')
</script>

<style scoped>
.weather-widget {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: #606266;
}

.weather-icon {
  color: #e6a23c;
  font-size: 15px;
}

.city-name {
  font-weight: 500;
  color: #303133;
}

.temp-badge {
  color: #1e68c9;
  font-weight: 600;
}

.pm-badge {
  background: #f0f9eb;
  color: #67c23a;
  padding: 1px 6px;
  border-radius: 4px;
  border: 1px solid #e1f3d8;
}
</style>
