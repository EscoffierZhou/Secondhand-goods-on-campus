<template>
  <div class="jobs-view page-container">
    <div class="pc-container">
      <div class="page-title-row">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>校园兼职与勤工助学</el-breadcrumb-item>
        </el-breadcrumb>
        <el-button type="primary" size="small" @click="goToPublishJob">
          + 发布兼职职位
        </el-button>
      </div>

      <!-- 顶部通知 banner -->
      <div class="job-banner">
        <div class="banner-text">
          <h2>校园兼职 · 勤工助学诚信专区</h2>
          <p>校内部门、教职员工与认证同学岗位直招，课余充电，安全透明</p>
        </div>
      </div>

      <!-- 搜索与列表 -->
      <div class="job-filter-bar">
        <el-input
          v-model="keyword"
          placeholder="搜索兼职名称、地点、薪资（如：家教、图书馆、驿站）..."
          clearable
          style="max-width: 460px;"
          :prefix-icon="Search"
        />
        <span class="job-count-text">共 {{ filteredJobs.length }} 个有效岗位</span>
      </div>

      <div v-if="filteredJobs.length > 0" class="job-list-grid">
        <div
          v-for="job in filteredJobs"
          :key="job.jobid"
          class="job-card hover-card"
          @click="router.push(`/job/${job.jobid}`)"
        >
          <div class="card-top">
            <h3 class="job-title">{{ job.title }}</h3>
            <span class="job-salary">{{ job.workpay }}</span>
          </div>

          <div class="job-info-chips">
            <span class="info-chip"><el-icon><Location /></el-icon> {{ job.workplace }}</span>
            <span class="info-chip"><el-icon><Clock /></el-icon> {{ job.worktime }}</span>
          </div>

          <div class="job-req-box">
            <span class="req-title">任职要求：</span>
            <p class="req-text">{{ job.workrequirement }}</p>
          </div>

          <div class="card-bottom">
            <div class="poster-info">
              <el-avatar :size="24" src="./images/tabBar/mine.fill.png" />
              <span>{{ job.username || '校园认证发布者' }}</span>
            </div>
            <el-button type="primary" size="small">查看岗位详情</el-button>
          </div>
        </div>
      </div>

      <div v-else class="empty-state">
        <el-empty description="暂未找到匹配的兼职职位" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { Search, Location, Clock } from '@element-plus/icons-vue'
import { useMarketStore } from '../stores/market'
import { useUserStore } from '../stores/user'

const router = useRouter()
const marketStore = useMarketStore()
const userStore = useUserStore()

const keyword = ref('')

const filteredJobs = computed(() => {
  if (!keyword.value.trim()) return marketStore.jobs
  const kw = keyword.value.trim().toLowerCase()
  return marketStore.jobs.filter(j =>
    (j.title && j.title.toLowerCase().includes(kw)) ||
    (j.workplace && j.workplace.toLowerCase().includes(kw)) ||
    (j.workpay && j.workpay.toLowerCase().includes(kw)) ||
    (j.discription && j.discription.toLowerCase().includes(kw))
  )
})

const goToPublishJob = () => {
  if (!userStore.isLoggedIn) {
    userStore.openAuthDialog()
    return
  }
  router.push('/publish?tab=job')
}
</script>

<style scoped>
.page-title-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.job-banner {
  background: linear-gradient(135deg, #1e3a8a, #1E68C9);
  border-radius: var(--radius-base);
  padding: 30px;
  color: #ffffff;
  margin-bottom: 24px;
}

.banner-text h2 {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 8px;
}

.banner-text p {
  font-size: 14px;
  opacity: 0.9;
}

.job-filter-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #ffffff;
  padding: 16px 20px;
  border-radius: var(--radius-base);
  border: 1px solid #ebeef5;
  margin-bottom: 20px;
}

.job-count-text {
  font-size: 13px;
  color: #64748b;
}

.job-list-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.job-card {
  background: #ffffff;
  border-radius: var(--radius-base);
  padding: 22px;
  border: 1px solid #ebeef5;
  box-shadow: var(--shadow-sm);
  cursor: pointer;
  display: flex;
  flex-direction: column;
}

.card-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
  gap: 12px;
}

.job-title {
  font-size: 17px;
  font-weight: 600;
  color: #1e293b;
  line-height: 1.4;
}

.job-salary {
  font-size: 16px;
  font-weight: 700;
  color: var(--price-color);
  white-space: nowrap;
}

.job-info-chips {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 14px;
  font-size: 13px;
  color: #64748b;
}

.info-chip {
  display: flex;
  align-items: center;
  gap: 6px;
}

.job-req-box {
  background: #f8fafc;
  padding: 10px 12px;
  border-radius: 6px;
  font-size: 13px;
  color: #475569;
  margin-bottom: 16px;
  line-height: 1.5;
}

.req-title {
  font-weight: 600;
  color: #334155;
}

.card-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  padding-top: 14px;
  border-top: 1px dashed #f0f2f5;
}

.poster-info {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: #64748b;
}

.empty-state {
  background: #ffffff;
  border-radius: var(--radius-base);
  padding: 40px;
  border: 1px solid #ebeef5;
}
</style>
