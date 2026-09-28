<template>
  <div class="job-detail-view page-container">
    <div class="pc-container">
      <el-breadcrumb separator="/" class="mb-4">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/jobs' }">校园兼职</el-breadcrumb-item>
        <el-breadcrumb-item>兼职详情</el-breadcrumb-item>
      </el-breadcrumb>

      <div v-if="job" class="job-detail-card">
        <!-- 头部 -->
        <div class="job-detail-header">
          <div class="header-left">
            <h1 class="job-title">{{ job.title }}</h1>
            <div class="header-meta">
              <span>发布时间：{{ job.createdAt || '近期' }}</span>
              <span>发布主体：{{ job.username }}</span>
            </div>
          </div>
          <div class="header-right">
            <span class="salary-number">{{ job.workpay }}</span>
          </div>
        </div>

        <!-- 关键信息列表 -->
        <div class="key-info-grid">
          <div class="info-block">
            <el-icon class="block-icon" color="#1E68C9"><Location /></el-icon>
            <div class="block-text">
              <span class="block-label">工作地点</span>
              <span class="block-val">{{ job.workplace }}</span>
            </div>
          </div>

          <div class="info-block">
            <el-icon class="block-icon" color="#e6a23c"><Clock /></el-icon>
            <div class="block-text">
              <span class="block-label">工作时间</span>
              <span class="block-val">{{ job.worktime }}</span>
            </div>
          </div>

          <div class="info-block">
            <el-icon class="block-icon" color="#67c23a"><UserFilled /></el-icon>
            <div class="block-text">
              <span class="block-label">发布联系人</span>
              <span class="block-val">{{ job.username }}</span>
            </div>
          </div>
        </div>

        <!-- 岗位职责与详情 -->
        <div class="detail-section">
          <h3 class="sec-heading">岗位具体描述与工作内容</h3>
          <div class="sec-content">
            <p>{{ job.discription || '按部门要求开展日常工作，工作环境安全整洁，服从管理调度。' }}</p>
          </div>
        </div>

        <!-- 人员要求 -->
        <div class="detail-section">
          <h3 class="sec-heading">人员招聘要求</h3>
          <div class="sec-content">
            <p>{{ job.workrequirement }}</p>
          </div>
        </div>

        <!-- 联系方式卡片 -->
        <div class="contact-card">
          <div class="contact-left">
            <span class="contact-title">报名应聘与联系方式</span>
            <span class="contact-number">{{ job.workcontact }}</span>
            <span class="contact-sub">请在工作时间联系，说明来自“校园二手交易/兼职平台”</span>
          </div>
          <el-button type="primary" size="large" @click="copyContact(job.workcontact)">
            一键复制联系方式
          </el-button>
        </div>

        <!-- 兼职安全警示 -->
        <div class="job-safety-notice">
          <el-alert
            title="校园兼职安全防范提示"
            type="warning"
            :closable="false"
            show-icon
            description="校园兼职严禁向求职学生收取押金、报名费、服装费或扣押学生证件！如遇收费或虚假刷单兼职，请立即联系辅导员或保卫处！"
          />
        </div>
      </div>

      <div v-else class="not-found">
        <el-empty description="未找到该兼职岗位信息">
          <el-button type="primary" @click="router.push('/jobs')">返回兼职列表</el-button>
        </el-empty>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Location, Clock, UserFilled } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { useMarketStore } from '../stores/market'

const route = useRoute()
const router = useRouter()
const marketStore = useMarketStore()

const jobId = computed(() => route.params.id)
const job = computed(() => marketStore.jobs.find(j => String(j.jobid) === String(jobId.value)))

const copyContact = (contact) => {
  if (!contact) return
  navigator.clipboard.writeText(contact).then(() => {
    ElMessage.success(`联系方式已复制到剪贴板：${contact}`)
  })
}
</script>

<style scoped>
.mb-4 {
  margin-bottom: 16px;
}

.job-detail-card {
  background: #ffffff;
  border-radius: var(--radius-lg);
  padding: 36px;
  border: 1px solid #ebeef5;
  box-shadow: var(--shadow-sm);
}

.job-detail-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding-bottom: 24px;
  border-bottom: 1px solid #f0f2f5;
  margin-bottom: 24px;
}

.job-title {
  font-size: 24px;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 10px;
}

.header-meta {
  display: flex;
  gap: 20px;
  font-size: 13px;
  color: #64748b;
}

.salary-number {
  font-size: 24px;
  font-weight: 800;
  color: var(--price-color);
}

.key-info-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-bottom: 30px;
}

.info-block {
  background: #f8fafc;
  padding: 16px 20px;
  border-radius: var(--radius-base);
  border: 1px solid #e2e8f0;
  display: flex;
  align-items: center;
  gap: 14px;
}

.block-icon {
  font-size: 28px;
}

.block-text {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.block-label {
  font-size: 12px;
  color: #94a3b8;
}

.block-val {
  font-size: 14px;
  font-weight: 600;
  color: #1e293b;
}

.detail-section {
  margin-bottom: 26px;
}

.sec-heading {
  font-size: 16px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.sec-heading::before {
  content: "";
  display: inline-block;
  width: 4px;
  height: 16px;
  background: var(--primary-color);
  border-radius: 2px;
}

.sec-content {
  background: #fcfcfc;
  border: 1px solid #f1f5f9;
  border-radius: var(--radius-base);
  padding: 18px;
  font-size: 14px;
  line-height: 1.8;
  color: #475569;
}

.contact-card {
  background: #eff6ff;
  border: 1px solid #bfdbfe;
  border-radius: var(--radius-base);
  padding: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.contact-left {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.contact-title {
  font-size: 13px;
  color: #1e40af;
  font-weight: 500;
}

.contact-number {
  font-size: 22px;
  font-weight: 700;
  color: #1e3a8a;
  letter-spacing: 0.5px;
}

.contact-sub {
  font-size: 12px;
  color: #60a5fa;
}

.not-found {
  background: #ffffff;
  padding: 60px;
  border-radius: var(--radius-base);
}
</style>
