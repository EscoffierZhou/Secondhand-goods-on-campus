<template>
  <div class="books-view page-container">
    <div class="pc-container">
      <!-- 顶部面包屑与标题 -->
      <div class="page-title-row">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>二手书城</el-breadcrumb-item>
        </el-breadcrumb>
        <span class="items-total-tag">共找到 {{ filteredBooks.length }} 本二手书</span>
      </div>

      <!-- 复合筛选卡片 -->
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
          <span class="filter-label">图书成色：</span>
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

        <div class="filter-row">
          <span class="filter-label">图书性质：</span>
          <div class="filter-options">
            <span
              :class="['filter-opt', { active: isTextbookFilter === 'all' }]"
              @click="isTextbookFilter = 'all'"
            >
              全部类型
            </span>
            <span
              :class="['filter-opt', { active: isTextbookFilter === 'true' }]"
              @click="isTextbookFilter = 'true'"
            >
              仅看专业资料/教材
            </span>
            <span
              :class="['filter-opt', { active: isTextbookFilter === 'false' }]"
              @click="isTextbookFilter = 'false'"
            >
              课外读物/文学杂书
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
              placeholder="在当前分类搜书名、作者、出版社..."
              clearable
              size="small"
              style="width: 260px;"
              :prefix-icon="Search"
            />
          </div>
        </div>
      </div>

      <!-- 图书展示网格 -->
      <div v-if="filteredBooks.length > 0" class="books-grid">
        <ProductCard
          v-for="book in filteredBooks"
          :key="book.bookid"
          :item="book"
          type="book"
        />
      </div>

      <!-- 无数据空状态 -->
      <div v-else class="empty-state">
        <el-empty description="暂未找到符合条件的二手书，换个筛选条件试试吧">
          <el-button type="primary" plain @click="resetFilters">重置筛选条件</el-button>
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
const conditionOptions = ['全部成色', '全新', '几乎全新', '少量笔记', '较多笔记', '不影响阅读']
const sortOptions = [
  { label: '最新上架', value: 'newest' },
  { label: '价格从低到高', value: 'priceAsc' },
  { label: '价格从高到低', value: 'priceDesc' },
  { label: '最多浏览', value: 'views' }
]

const selectedCampus = ref('全部校区')
const selectedCondition = ref('全部成色')
const isTextbookFilter = ref('all')
const currentSort = ref('newest')
const keyword = ref('')

onMounted(() => {
  if (route.query.q) {
    keyword.value = String(route.query.q)
  }
})

const filteredBooks = computed(() => {
  let list = [...marketStore.books]

  // 校区筛选
  if (selectedCampus.value !== '全部校区') {
    list = list.filter(b => b.college === selectedCampus.value)
  }

  // 成色筛选
  if (selectedCondition.value !== '全部成色') {
    list = list.filter(b => b.bstatus === selectedCondition.value)
  }

  // 教材筛选
  if (isTextbookFilter.value === 'true') {
    list = list.filter(b => b.reference === true)
  } else if (isTextbookFilter.value === 'false') {
    list = list.filter(b => b.reference === false)
  }

  // 关键词检索
  if (keyword.value.trim()) {
    const kw = keyword.value.trim().toLowerCase()
    list = list.filter(b =>
      (b.bname && b.bname.toLowerCase().includes(kw)) ||
      (b.author && b.author.toLowerCase().includes(kw)) ||
      (b.press && b.press.toLowerCase().includes(kw)) ||
      (b.bnote && b.bnote.toLowerCase().includes(kw))
    )
  }

  // 排序
  if (currentSort.value === 'priceAsc') {
    list.sort((a, b) => Number(a.bprice) - Number(b.bprice))
  } else if (currentSort.value === 'priceDesc') {
    list.sort((a, b) => Number(b.bprice) - Number(a.bprice))
  } else if (currentSort.value === 'views') {
    list.sort((a, b) => Number(b.views || 0) - Number(a.views || 0))
  }

  return list
})

const resetFilters = () => {
  selectedCampus.value = '全部校区'
  selectedCondition.value = '全部成色'
  isTextbookFilter.value = 'all'
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

.books-grid {
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
