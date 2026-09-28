<template>
  <div class="wishlist-view page-container">
    <div class="pc-container">
      <!-- 顶部标题与行动区 -->
      <div class="page-title-row">
        <div>
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>求购互助广场</el-breadcrumb-item>
          </el-breadcrumb>
          <h1 class="page-main-title">求购互助广场 · 校园寻书求物心愿单</h1>
          <p class="page-sub-title">没找到想要的专业课本或二手好物？在这里发起求购，同校学长学姐看到会第一时间联络你！</p>
        </div>
        <el-button type="primary" size="large" :icon="Plus" class="publish-want-btn" @click="openPublishModal">
          发布我的求购需求
        </el-button>
      </div>

      <!-- 筛选栏 -->
      <div class="filter-card">
        <div class="filter-row">
          <span class="filter-label">需求分类：</span>
          <div class="filter-options">
            <span
              v-for="cat in categoryOptions"
              :key="cat"
              :class="['filter-opt', { active: selectedCat === cat }]"
              @click="selectedCat = cat"
            >
              {{ cat }}
            </span>
          </div>
        </div>

        <div class="filter-row">
          <span class="filter-label">所在校区：</span>
          <div class="filter-options">
            <span
              v-for="c in campusOptions"
              :key="c"
              :class="['filter-opt', { active: selectedCampus === c }]"
              @click="selectedCampus = c"
            >
              {{ c }}
            </span>
          </div>
        </div>

        <div class="filter-row">
          <span class="filter-label">求购状态：</span>
          <div class="filter-options">
            <span
              :class="['filter-opt', { active: selectedStatus === 'all' }]"
              @click="selectedStatus = 'all'"
            >
              全部状态
            </span>
            <span
              :class="['filter-opt', { active: selectedStatus === '求购中' }]"
              @click="selectedStatus = '求购中'"
            >
              正在求购
            </span>
            <span
              :class="['filter-opt', { active: selectedStatus === '已收到' }]"
              @click="selectedStatus = '已收到'"
            >
              已圆满收到
            </span>
          </div>
        </div>
      </div>

      <!-- 求购卡片列表 -->
      <div v-if="filteredWants.length > 0" class="wants-grid">
        <div
          v-for="item in filteredWants"
          :key="item.wantId"
          :class="['want-card hover-card', { 'is-fulfilled': item.status === '已收到' }]"
        >
          <div class="want-header">
            <div class="tags-group">
              <el-tag
                :type="item.urgency === '高' ? 'danger' : 'info'"
                size="small"
                effect="dark"
                class="urgency-tag"
              >
                {{ item.urgency === '高' ? '🔥 紧急求购' : '求购心愿' }}
              </el-tag>
              <el-tag size="small" type="primary" effect="plain">{{ item.category }}</el-tag>
              <el-tag size="small" type="success" effect="plain">{{ item.campus }}</el-tag>
            </div>
            <span :class="['status-badge', item.status === '已收到' ? 'done' : 'active']">
              {{ item.status }}
            </span>
          </div>

          <h3 class="want-title">{{ item.title }}</h3>
          <p class="want-detail">{{ item.detail }}</p>

          <div class="want-meta-row">
            <div class="budget-box">
              <span class="budget-label">期望预算：</span>
              <span class="budget-val">¥{{ item.budget }}</span>
            </div>
            <div class="user-box">
              <el-icon><User /></el-icon>
              <span>{{ item.userName }} ({{ item.college }})</span>
            </div>
          </div>

          <div class="want-footer">
            <span class="time-text">{{ item.createdAt }}</span>
            <div class="action-btns">
              <el-button
                v-if="item.status === '求购中'"
                type="primary"
                size="small"
                plain
                @click="handleRespond(item)"
              >
                🤝 我有此物 / 联系求购人
              </el-button>
              <el-button
                v-if="userStore.isLoggedIn"
                size="small"
                link
                @click="handleToggleStatus(item)"
              >
                {{ item.status === '求购中' ? '设为已收到' : '重开求购' }}
              </el-button>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="empty-state">
        <el-empty description="暂无符合条件的求购需求">
          <el-button type="primary" @click="openPublishModal">发起第一个求购需求</el-button>
        </el-empty>
      </div>

      <!-- 发布求购弹窗 -->
      <el-dialog
        v-model="publishModalVisible"
        title="发布求购心愿 · 校园互助"
        width="560px"
        :close-on-click-modal="false"
      >
        <el-form :model="wantForm" label-width="90px">
          <el-form-item label="求购标题" required>
            <el-input v-model="wantForm.title" placeholder="如：求大二下《编译原理》教材、求二手代步单车" />
          </el-form-item>

          <el-form-item label="需求分类" required>
            <el-select v-model="wantForm.category" style="width: 100%;">
              <el-option label="专业教材" value="专业教材" />
              <el-option label="考研专区" value="考研专区" />
              <el-option label="数码配件" value="数码配件" />
              <el-option label="宿舍好物" value="宿舍好物" />
              <el-option label="运动出行" value="运动出行" />
              <el-option label="其他物品" value="其他物品" />
            </el-select>
          </el-form-item>

          <el-form-item label="期望预算" required>
            <el-input-number v-model="wantForm.budget" :min="1" :step="5" style="width: 180px;" />
            <span style="margin-left: 10px; color: var(--text-secondary);">元 (预算心理价位)</span>
          </el-form-item>

          <el-form-item label="面交校区" required>
            <el-radio-group v-model="wantForm.campus">
              <el-radio label="咸安校区">咸安校区</el-radio>
              <el-radio label="温泉校区">温泉校区</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="紧急程度">
            <el-radio-group v-model="wantForm.urgency">
              <el-radio label="高">🔥 急求 (近期上课/考试急需)</el-radio>
              <el-radio label="中">正常淘物</el-radio>
              <el-radio label="低">随缘等低价</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="具体要求" required>
            <el-input
              v-model="wantForm.detail"
              type="textarea"
              rows="3"
              placeholder="详细说明版次、出版社、成色心理预期，或联系偏好习惯等"
            />
          </el-form-item>
        </el-form>

        <template #footer>
          <el-button @click="publishModalVisible = false">取消</el-button>
          <el-button type="primary" @click="handleConfirmPublish">立即提交求购</el-button>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, reactive, onMounted } from 'vue'
import { Plus, User } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useMarketStore } from '../stores/market'
import { useUserStore } from '../stores/user'

const marketStore = useMarketStore()
const userStore = useUserStore()

const categoryOptions = ['全部品类', '专业教材', '考研专区', '数码配件', '宿舍好物', '运动出行']
const campusOptions = ['全部校区', '温泉校区', '咸安校区']

const selectedCat = ref('全部品类')
const selectedCampus = ref('全部校区')
const selectedStatus = ref('all')

const publishModalVisible = ref(false)
const wantForm = reactive({
  title: '',
  category: '专业教材',
  budget: 20,
  campus: '温泉校区',
  urgency: '高',
  detail: ''
})

onMounted(() => {
  marketStore.loadAll()
})

const filteredWants = computed(() => {
  return marketStore.wants.filter(item => {
    const matchCat = selectedCat.value === '全部品类' || item.category === selectedCat.value
    const matchCampus = selectedCampus.value === '全部校区' || item.campus === selectedCampus.value
    const matchStatus = selectedStatus.value === 'all' || item.status === selectedStatus.value
    return matchCat && matchCampus && matchStatus
  })
})

const openPublishModal = () => {
  if (!userStore.isLoggedIn) {
    userStore.openAuthDialog()
    return
  }
  publishModalVisible.value = true
}

const handleConfirmPublish = () => {
  if (!wantForm.title.trim()) {
    ElMessage.warning('请输入求购标题')
    return
  }
  if (!wantForm.detail.trim()) {
    ElMessage.warning('请填写具体要求说明')
    return
  }

  marketStore.publishWant({
    title: wantForm.title.trim(),
    category: wantForm.category,
    budget: wantForm.budget,
    campus: wantForm.campus,
    urgency: wantForm.urgency,
    detail: wantForm.detail.trim(),
    userName: userStore.nickName || '热心同学',
    college: userStore.college || '本校学子'
  })

  publishModalVisible.value = false
  wantForm.title = ''
  wantForm.detail = ''
  ElMessage.success('🎉 您的求购心愿已成功发布到广场！')
}

const handleRespond = (item) => {
  ElMessageBox.alert(
    `求购人：${item.userName} (${item.campus})\n期望预算：¥${item.budget}\n需求备注：${item.detail}\n\n已向求购同学发送“我有此物”提醒！可前往校区线下预约或在留言区当面面交。`,
    '🤝 提供闲置 / 响应求购',
    { confirmButtonText: '收到，准备当面联络' }
  )
}

const handleToggleStatus = (item) => {
  marketStore.toggleWant(item.wantId)
  ElMessage.success('求购状态已更新！')
}
</script>

<style scoped>
.wishlist-view {
  min-height: calc(100vh - 200px);
}

.page-title-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 24px;
}

.page-main-title {
  font-size: 24px;
  font-weight: 700;
  color: var(--text-main);
  margin: 10px 0 6px;
}

.page-sub-title {
  font-size: 13px;
  color: var(--text-secondary);
  margin: 0;
}

.publish-want-btn {
  background-color: var(--primary-color);
  border-color: var(--primary-color);
  padding: 12px 24px;
  border-radius: var(--radius-base);
}

/* 筛选卡片 */
.filter-card {
  background: var(--bg-card);
  border-radius: var(--radius-lg);
  padding: 20px 24px;
  margin-bottom: 24px;
  border: 1px solid var(--border-color);
  box-shadow: var(--shadow-sm);
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.filter-row {
  display: flex;
  align-items: center;
}

.filter-label {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-secondary);
  width: 80px;
}

.filter-options {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.filter-opt {
  font-size: 13px;
  padding: 5px 14px;
  border-radius: var(--radius-full);
  cursor: pointer;
  color: var(--text-regular);
  transition: all 0.2s ease;
  background-color: var(--bg-card-subtle);
  border: 1px solid transparent;
}

.filter-opt:hover {
  color: var(--primary-color);
  border-color: var(--primary-color);
}

.filter-opt.active {
  background-color: var(--primary-color);
  color: #ffffff;
  font-weight: 500;
}

/* 求购卡片列表 */
.wants-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
}

.want-card {
  background: var(--bg-card);
  border-radius: var(--radius-lg);
  padding: 22px;
  border: 1px solid var(--border-color);
  box-shadow: var(--shadow-sm);
  display: flex;
  flex-direction: column;
  gap: 12px;
  transition: all 0.25s ease;
}

.want-card.is-fulfilled {
  opacity: 0.75;
  background-color: var(--bg-card-subtle);
}

.want-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.tags-group {
  display: flex;
  gap: 6px;
  align-items: center;
}

.status-badge {
  font-size: 12px;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 4px;
}

.status-badge.active {
  color: var(--primary-color);
  background: var(--primary-light);
}

.status-badge.done {
  color: #10b981;
  background: rgba(16, 185, 129, 0.12);
}

.want-title {
  font-size: 16px;
  font-weight: 700;
  color: var(--text-main);
  line-height: 1.4;
  margin: 0;
}

.want-detail {
  font-size: 13px;
  color: var(--text-regular);
  line-height: 1.6;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.want-meta-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 10px;
  border-top: 1px dashed var(--border-subtle);
}

.budget-box {
  display: flex;
  align-items: baseline;
  gap: 4px;
}

.budget-label {
  font-size: 12px;
  color: var(--text-secondary);
}

.budget-val {
  font-size: 18px;
  font-weight: 800;
  color: var(--price-color);
}

.user-box {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: var(--text-secondary);
}

.want-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  padding-top: 10px;
}

.time-text {
  font-size: 12px;
  color: var(--text-muted);
}

.empty-state {
  background: var(--bg-card);
  padding: 60px;
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-color);
}
</style>
