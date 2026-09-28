<template>
  <div class="goods-view page-container">
    <div class="pc-container">
      <!-- 顶部面包屑与标题 -->
      <div class="page-title-row">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>闲置杂货大厅</el-breadcrumb-item>
        </el-breadcrumb>
        <span class="items-total-tag">共找到 {{ filteredGoods.length }} 件闲置物品</span>
      </div>

      <!-- 筛选卡片 -->
      <div class="filter-card">
        <div class="filter-row">
          <span class="filter-label">校区选择：</span>
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
          <span class="filter-label">物品成色：</span>
          <div class="filter-options">
            <span
              v-for="cond in conditionOptions"
              :key="cond"
              :class="['filter-opt', { active: selectedCondition === cond }]"
              @click="selectedCondition = cond"
            >
              {{ cond }}
            </span>
          </div>
        </div>

        <div class="filter-toolbar">
          <div class="sort-tabs">
            <span
              v-for="s in sortOptions"
              :key="s.value"
              :class="['sort-tab', { active: currentSort === s.value }]"
              @click="currentSort = s.value"
            >
              {{ s.label }}
            </span>
          </div>

          <div class="inline-search">
            <el-input
              v-model="keyword"
              placeholder="搜索闲置单车、台灯、数码、宿舍好物..."
              clearable
              size="small"
              style="width: 280px;"
              :prefix-icon="Search"
            />
          </div>
        </div>
      </div>

      <!-- 物品网格 -->
      <div v-if="filteredGoods.length > 0" class="goods-grid">
        <ProductCard
          v-for="good in filteredGoods"
          :key="good.goodid"
          :item="good"
          type="good"
        />
      </div>

      <!-- 无数据空状态 -->
      <div v-else class="empty-state">
        <el-empty description="暂未找到符合条件的闲置好物">
          <el-button type="primary" plain @click="resetFilters">重置筛选</el-button>
        </el-empty>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { Search } from '@element-plus/icons-vue'
import ProductCard from '../components/ProductCard.vue'
import { useMarketStore } from '../stores/market'

const route = useRoute()
const marketStore = useMarketStore()

const campusOptions = ['全部校区', '咸安校区', '温泉校区']
const conditionOptions = [
  '全部成色',
  '全新',
  '几乎全新',
  '九成新',
  '八成新',
  '七成新',
  '六成新',
  '五成新及以下'
]
const sortOptions = [
  { label: '最新发布', value: 'newest' },
  { label: '价格从低到高', value: 'priceAsc' },
  { label: '价格从高到低', value: 'priceDesc' },
  { label: '最多浏览', value: 'views' }
]

const selectedCampus = ref('全部校区')
const selectedCondition = ref('全部成色')
const currentSort = ref('newest')
const keyword = ref('')

onMounted(() => {
  if (route.query.q) {
    keyword.value = String(route.query.q)
  }
})

const filteredGoods = computed(() => {
  let list = [...marketStore.goods]

  if (selectedCampus.value !== '全部校区') {
    list = list.filter(g => g.gcollege === selectedCampus.value)
  }

  if (selectedCondition.value !== '全部成色') {
    list = list.filter(g => g.gstatus === selectedCondition.value)
  }

  if (keyword.value.trim()) {
    const kw = keyword.value.trim().toLowerCase()
    list = list.filter(g =>
      (g.gname && g.gname.toLowerCase().includes(kw)) ||
      (g.gnote && g.gnote.toLowerCase().includes(kw))
    )
  }

  if (currentSort.value === 'priceAsc') {
    list.sort((a, b) => Number(a.gprice) - Number(b.gprice))
  } else if (currentSort.value === 'priceDesc') {
    list.sort((a, b) => Number(b.gprice) - Number(a.gprice))
  } else if (currentSort.value === 'views') {
    list.sort((a, b) => Number(b.views || 0) - Number(a.views || 0))
  }

  return list
})

const resetFilters = () => {
  selectedCampus.value = '全部校区'
  selectedCondition.value = '全部成色'
  currentSort.value = 'newest'
  keyword.value = ''
}
</script>

<style scoped>
.page-title-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.items-total-tag {
  font-size: 13px;
  color: #64748b;
}

.filter-card {
  background: #ffffff;
  border-radius: var(--radius-base);
  padding: 18px 20px;
  border: 1px solid #ebeef5;
  box-shadow: var(--shadow-sm);
  margin-bottom: 24px;
}

.filter-row {
  display: flex;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px dashed #f0f2f5;
  font-size: 13px;
}

.filter-label {
  width: 90px;
  color: #94a3b8;
  font-weight: 500;
  flex-shrink: 0;
}

.filter-options {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.filter-opt {
  padding: 3px 10px;
  border-radius: 4px;
  cursor: pointer;
  color: #475569;
  transition: all 0.2s;
}

.filter-opt:hover {
  color: var(--primary-color);
}

.filter-opt.active {
  background-color: var(--primary-color);
  color: #ffffff;
  font-weight: 500;
}

.filter-toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 14px;
}

.sort-tabs {
  display: flex;
  gap: 16px;
  font-size: 13px;
}

.sort-tab {
  cursor: pointer;
  color: #64748b;
  transition: color 0.2s;
}

.sort-tab:hover {
  color: var(--primary-color);
}

.sort-tab.active {
  color: var(--primary-color);
  font-weight: 600;
}

.goods-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.empty-state {
  background: #ffffff;
  border-radius: var(--radius-base);
  padding: 40px;
  border: 1px solid #ebeef5;
}
</style>
