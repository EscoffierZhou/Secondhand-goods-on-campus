<template>
  <div class="admin-view page-container">
    <div class="pc-container">
      <div class="page-title-row">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>管理运营后台</el-breadcrumb-item>
        </el-breadcrumb>
        <el-tag type="danger" effect="dark">管理员权限已激活</el-tag>
      </div>

      <!-- 统计指标卡片 -->
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon stat-total"><el-icon :size="24"><GoodsFilled /></el-icon></div>
          <div class="stat-info">
            <span class="stat-num">{{ allItems.length }}</span>
            <span class="stat-label">全站物品总数</span>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon stat-active"><el-icon :size="24"><CircleCheckFilled /></el-icon></div>
          <div class="stat-info">
            <span class="stat-num">{{ activeCount }}</span>
            <span class="stat-label">正常在架流通</span>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon stat-banned"><el-icon :size="24"><WarnTriangleFilled /></el-icon></div>
          <div class="stat-info">
            <span class="stat-num">{{ bannedCount }}</span>
            <span class="stat-label">违规下架处置</span>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon stat-user"><el-icon :size="24"><UserFilled /></el-icon></div>
          <div class="stat-info">
            <span class="stat-num">1,280+</span>
            <span class="stat-label">认证在校学生</span>
          </div>
        </div>
      </div>

      <!-- 筛选与管理操作区 -->
      <div class="admin-main-card">
        <div class="card-header-bar">
          <div class="header-left">
            <h3 class="header-title">校园二手流转监督与审核看板</h3>
            <span class="header-desc">依据数字媒体大赛规范，支持管理员对违规违禁、虚假不良物品执行即时下架治理</span>
          </div>

          <div class="header-right">
            <el-input
              v-model="searchKeyword"
              placeholder="搜索品名、卖家学号..."
              clearable
              size="small"
              style="width: 220px;"
              :prefix-icon="Search"
            />
            <el-select v-model="filterType" size="small" style="width: 120px;">
              <el-option label="全部分类" value="all" />
              <el-option label="二手图书" value="book" />
              <el-option label="闲置杂货" value="good" />
            </el-select>
            <el-select v-model="filterStatus" size="small" style="width: 120px;">
              <el-option label="全部状态" value="all" />
              <el-option label="正常在架" value="active" />
              <el-option label="违规下架" value="banned" />
            </el-select>
          </div>
        </div>

        <!-- 物品管理表格 -->
        <el-table :data="filteredItems" style="width: 100%" stripe>
          <el-table-column prop="id" label="物品ID" width="110" />
          <el-table-column label="分类" width="110">
            <template #default="{ row }">
              <el-tag size="small" :type="row.type === 'book' ? 'primary' : 'warning'">
                {{ row.typeName }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="title" label="物品名称 / 书名" min-width="220" show-overflow-tooltip />
          <el-table-column label="转让价" width="110">
            <template #default="{ row }">
              <span class="price-val" style="color: var(--price-color); font-weight: bold;">
                ¥{{ Number(row.price).toFixed(2) }}
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="seller" label="发布学生" width="130" />
          <el-table-column prop="studentId" label="学生学号" width="130" />
          <el-table-column prop="college" label="校区" width="110" />
          <el-table-column label="监督状态" width="120">
            <template #default="{ row }">
              <el-tag size="small" :type="row.status === 'banned' ? 'danger' : 'success'">
                {{ row.status === 'banned' ? '已违规下架' : '正常流通' }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="管理操作" width="180" fixed="right">
            <template #default="{ row }">
              <el-button
                v-if="row.status !== 'banned'"
                size="small"
                type="danger"
                plain
                @click="handleBanItem(row)"
              >
                违规下架
              </el-button>
              <el-button
                v-else
                size="small"
                type="success"
                plain
                @click="handleRestoreItem(row)"
              >
                恢复上架
              </el-button>
              <el-button
                size="small"
                link
                type="primary"
                @click="viewItemDetail(row)"
              >
                预览
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import {
  GoodsFilled,
  CircleCheckFilled,
  WarnTriangleFilled,
  UserFilled,
  Search
} from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getAllItemsForAdmin, updateItemStatus } from '../services/storage'
import { useMarketStore } from '../stores/market'

const router = useRouter()
const marketStore = useMarketStore()

const allItems = ref([])
const searchKeyword = ref('')
const filterType = ref('all')
const filterStatus = ref('all')

const loadAdminData = () => {
  allItems.value = getAllItemsForAdmin()
}

onMounted(() => {
  loadAdminData()
})

const activeCount = computed(() => allItems.value.filter(i => i.status === 'active').length)
const bannedCount = computed(() => allItems.value.filter(i => i.status === 'banned').length)

const filteredItems = computed(() => {
  let list = [...allItems.value]

  if (filterType.value !== 'all') {
    list = list.filter(i => i.type === filterType.value)
  }

  if (filterStatus.value !== 'all') {
    list = list.filter(i => i.status === filterStatus.value)
  }

  if (searchKeyword.value.trim()) {
    const kw = searchKeyword.value.trim().toLowerCase()
    list = list.filter(i =>
      (i.title && i.title.toLowerCase().includes(kw)) ||
      (i.studentId && i.studentId.includes(kw)) ||
      (i.seller && i.seller.includes(kw))
    )
  }

  return list
})

const handleBanItem = (item) => {
  ElMessageBox.confirm(
    `确定要将《${item.title}》执行违规下架处理吗？下架后前台用户将无法检索到该商品。`,
    '违规下架处理',
    {
      confirmButtonText: '确认下架',
      cancelButtonText: '取消',
      type: 'warning'
    }
  ).then(() => {
    updateItemStatus(item.type, item.id, 'banned')
    loadAdminData()
    marketStore.loadAll()
    ElMessage.success('已成功下架违规物品！')
  }).catch(() => {})
}

const handleRestoreItem = (item) => {
  updateItemStatus(item.type, item.id, 'normal')
  loadAdminData()
  marketStore.loadAll()
  ElMessage.success('物品已恢复上架流通！')
}

const viewItemDetail = (item) => {
  if (item.type === 'book') {
    router.push(`/book/${item.id}`)
  } else {
    router.push(`/good/${item.id}`)
  }
}
</script>

<style scoped>
.page-title-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 18px;
  margin-bottom: 24px;
}

.stat-card {
  background: var(--bg-card);
  border-radius: var(--radius-xl, 20px);
  padding: 20px;
  border: 1px solid var(--border-color);
  box-shadow: var(--shadow-sm);
  display: flex;
  align-items: center;
  gap: 16px;
  transition: all 0.28s cubic-bezier(0.16, 1, 0.3, 1);
}

.stat-card:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-hover);
}

.stat-icon {
  width: 50px;
  height: 50px;
  border-radius: var(--radius-base);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
}

.stat-total { background: linear-gradient(135deg, #1E68C9, #3b82f6); }
.stat-active { background: linear-gradient(135deg, #10b981, #059669); }
.stat-banned { background: linear-gradient(135deg, #ef4444, #dc2626); }
.stat-user { background: linear-gradient(135deg, #8b5cf6, #7c3aed); }

.stat-info {
  display: flex;
  flex-direction: column;
}

.stat-num {
  font-size: 24px;
  font-weight: 700;
  color: var(--text-main);
  font-feature-settings: 'tnum';
}

.stat-label {
  font-size: 13px;
  color: var(--text-secondary);
  margin-top: 2px;
}

.admin-main-card {
  background: var(--bg-card);
  border-radius: var(--radius-xl, 20px);
  padding: 26px;
  border: 1px solid var(--border-color);
  box-shadow: var(--shadow-sm);
}

.card-header-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--border-subtle);
}

.header-title {
  font-size: 18px;
  font-weight: 700;
  color: var(--text-main);
  margin-bottom: 4px;
}

.header-desc {
  font-size: 12px;
  color: var(--text-secondary);
}

.header-right {
  display: flex;
  align-items: center;
  gap: 12px;
}
</style>
