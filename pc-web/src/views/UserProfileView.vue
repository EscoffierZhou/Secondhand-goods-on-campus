<template>
  <div class="user-profile-view page-container">
    <div class="pc-container">
      <div class="page-title-row">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>学生中心</el-breadcrumb-item>
        </el-breadcrumb>
      </div>

      <!-- 未登录提示 -->
      <div v-if="!userStore.isLoggedIn" class="profile-auth-gate">
        <el-empty description="您尚未完成学生身份认证，请先认证登录">
          <el-button type="primary" @click="userStore.openAuthDialog">
            立即进行学生身份认证
          </el-button>
        </el-empty>
      </div>

      <!-- 个人中心主体布局 -->
      <div v-else class="profile-layout">
        <!-- 左侧学生信息名片与菜单 -->
        <div class="profile-sidebar">
          <div class="student-card">
            <el-avatar :size="64" src="./images/tabBar/mine.fill.png" class="student-avatar" />
            <h3 class="student-name">{{ userStore.nickName }}</h3>
            <span class="student-id-badge">学号：{{ userStore.studentId }}</span>
            <div class="student-dept-text">
              <span>{{ userStore.currentUser?.department || '计算机与信息工程学院' }}</span>
              <span>{{ userStore.currentUser?.college || userStore.currentCampus }}</span>
            </div>
            <div class="sidebar-divider"></div>
            <el-button type="danger" plain size="small" class="logout-btn" @click="handleLogout">
              退出身份认证
            </el-button>
          </div>

          <div class="menu-box">
            <div
              :class="['menu-item', { active: activeMenu === 'posts' }]"
              @click="activeMenu = 'posts'"
            >
              <el-icon><Upload /></el-icon>
              <span>我的发布管理 ({{ myPublishedTotal }})</span>
            </div>
            <div
              :class="['menu-item', { active: activeMenu === 'orders' }]"
              @click="activeMenu = 'orders'"
            >
              <el-icon><List /></el-icon>
              <span>预约与交易订单 ({{ myOrders.length }})</span>
            </div>
            <div
              :class="['menu-item', { active: activeMenu === 'favorites' }]"
              @click="activeMenu = 'favorites'"
            >
              <el-icon><Star /></el-icon>
              <span>我的收藏夹 ({{ myFavorites.length }})</span>
            </div>
            <div
              :class="['menu-item', { active: activeMenu === 'address' }]"
              @click="activeMenu = 'address'"
            >
              <el-icon><Location /></el-icon>
              <span>自提地址与寝室</span>
            </div>
            <div
              :class="['menu-item', { active: activeMenu === 'notices' }]"
              @click="activeMenu = 'notices'"
            >
              <el-icon><Bell /></el-icon>
              <span>系统校园通知</span>
            </div>
          </div>
        </div>

        <!-- 右侧内容面板 -->
        <div class="profile-main-panel">
          <!-- 1. 我的发布 -->
          <div v-if="activeMenu === 'posts'" class="panel-section">
            <div class="section-top">
              <h3 class="panel-heading">我发布的二手闲置</h3>
              <el-button type="primary" size="small" @click="router.push('/publish')">
                + 发布新物品
              </el-button>
            </div>

            <el-tabs v-model="postSubTab">
              <el-tab-pane :label="`二手图书 (${myBooks.length})`" name="books">
                <div v-if="myBooks.length > 0" class="my-items-list">
                  <div v-for="b in myBooks" :key="b.bookid" class="my-item-row">
                    <img :src="b.picture || './images/tuijian.png'" class="my-item-img" />
                    <div class="my-item-details">
                      <h4 class="my-item-name" @click="router.push(`/book/${b.bookid}`)">{{ b.bname }}</h4>
                      <p class="my-item-desc">{{ b.author }} · {{ b.college }} · {{ b.bstatus }}</p>
                      <span class="price-val" style="color: var(--price-color); font-weight: bold;">
                        ¥{{ Number(b.bprice).toFixed(2) }}
                      </span>
                    </div>
                    <div class="my-item-actions">
                      <el-button size="small" @click="router.push(`/book/${b.bookid}`)">查看</el-button>
                      <el-button size="small" type="danger" plain @click="handleDeleteBook(b.bookid)">
                        下架删除
                      </el-button>
                    </div>
                  </div>
                </div>
                <el-empty v-else description="您暂未发布过二手图书" />
              </el-tab-pane>

              <el-tab-pane :label="`闲置好物 (${myGoods.length})`" name="goods">
                <div v-if="myGoods.length > 0" class="my-items-list">
                  <div v-for="g in myGoods" :key="g.goodid" class="my-item-row">
                    <img :src="g.gpicture || './images/zahuopu.png'" class="my-item-img" />
                    <div class="my-item-details">
                      <h4 class="my-item-name" @click="router.push(`/good/${g.goodid}`)">{{ g.gname }}</h4>
                      <p class="my-item-desc">{{ g.gcollege }} · {{ g.gstatus }}</p>
                      <span class="price-val" style="color: var(--price-color); font-weight: bold;">
                        ¥{{ Number(g.gprice).toFixed(2) }}
                      </span>
                    </div>
                    <div class="my-item-actions">
                      <el-button size="small" @click="router.push(`/good/${g.goodid}`)">查看</el-button>
                      <el-button size="small" type="danger" plain @click="handleDeleteGood(g.goodid)">
                        下架删除
                      </el-button>
                    </div>
                  </div>
                </div>
                <el-empty v-else description="您暂未发布过闲置物品" />
              </el-tab-pane>
            </el-tabs>
          </div>

          <!-- 2. 预约与订单管理 -->
          <div v-if="activeMenu === 'orders'" class="panel-section">
            <h3 class="panel-heading">预约与面交订单</h3>

            <div v-if="myOrders.length > 0" class="orders-list">
              <div v-for="order in myOrders" :key="order.orderId" class="order-card">
                <div class="order-header">
                  <div class="order-meta">
                    <span class="order-id">单号：{{ order.orderId }}</span>
                    <span class="order-date">{{ order.createdAt }}</span>
                  </div>
                  <el-tag :type="order.status === 'completed' ? 'success' : (order.status === 'cancelled' ? 'info' : 'warning')">
                    {{ order.status === 'completed' ? '已面交完成' : (order.status === 'cancelled' ? '已取消' : '待线下当面交接') }}
                  </el-tag>
                </div>

                <div class="order-items-box">
                  <div v-for="it in order.items" :key="it.id" class="order-item-line">
                    <img :src="it.picture || './images/tuijian.png'" class="order-item-thumb" />
                    <span class="order-item-title">{{ it.title }}</span>
                    <span class="order-item-price">¥{{ Number(it.price).toFixed(2) }}</span>
                  </div>
                </div>

                <div class="order-details-info">
                  <span>约定地点：{{ order.campus }} · {{ order.meetPlace }}</span>
                  <span>约定时间：{{ order.meetTime }}</span>
                  <span>联系人：{{ order.buyerName }} ({{ order.buyerPhone }})</span>
                  <span v-if="order.note">留言：{{ order.note }}</span>
                </div>

                <div class="order-footer">
                  <div class="order-total-price">
                    <span>订单金额：</span>
                    <span class="price-val" style="color: var(--price-color); font-weight: bold; font-size: 18px;">
                      ¥{{ Number(order.totalAmount).toFixed(2) }}
                    </span>
                  </div>
                  <div class="order-action-btns" v-if="order.status === 'pending'">
                    <el-button size="small" type="success" @click="handleCompleteOrder(order.orderId)">
                      确认已线下交接完成
                    </el-button>
                    <el-button size="small" type="info" plain @click="handleCancelOrder(order.orderId)">
                      取消预约
                    </el-button>
                  </div>
                </div>
              </div>
            </div>
            <el-empty v-else description="您当前暂无任何预约与交易订单" />
          </div>

          <!-- 3. 我的收藏夹 -->
          <div v-if="activeMenu === 'favorites'" class="panel-section">
            <div class="section-top">
              <h3 class="panel-heading">我的心愿与收藏物品 ({{ myFavorites.length }})</h3>
              <el-tag type="info">点击物品可直接查看详情或前往留言沟通</el-tag>
            </div>

            <div v-if="myFavorites.length > 0" class="my-items-list">
              <div v-for="fav in myFavorites" :key="fav.favoriteId" class="my-item-row">
                <img :src="fav.picture || './images/tuijian.png'" class="my-item-img" />
                <div class="my-item-details">
                  <h4 class="my-item-name" @click="handleGoToDetail(fav)">
                    <el-tag size="small" :type="fav.type === 'book' ? 'success' : 'warning'" style="margin-right: 6px;">
                      {{ fav.type === 'book' ? '二手图书' : '闲置好物' }}
                    </el-tag>
                    {{ fav.title }}
                  </h4>
                  <p class="my-item-desc">
                    <span>校区：{{ fav.college }}</span>
                    <span v-if="fav.status" style="margin-left: 10px;">成色：{{ fav.status }}</span>
                    <span style="margin-left: 10px; color: #94a3b8;">收藏于：{{ fav.savedAt }}</span>
                  </p>
                  <span class="price-val" style="color: var(--price-color); font-weight: bold;">
                    ¥{{ Number(fav.price).toFixed(2) }}
                  </span>
                </div>
                <div class="my-item-actions">
                  <el-button size="small" type="primary" plain @click="handleGoToDetail(fav)">
                    查看详情
                  </el-button>
                  <el-button size="small" type="danger" plain @click="handleRemoveFavorite(fav.favoriteId)">
                    移出收藏
                  </el-button>
                </div>
              </div>
            </div>
            <el-empty v-else description="您当前暂未收藏任何二手物品，去市场上逛逛吧！">
              <el-button type="primary" @click="router.push('/books')">去浏览二手教材</el-button>
              <el-button @click="router.push('/goods')">去发现闲置好物</el-button>
            </el-empty>
          </div>

          <!-- 4. 自提与寝室地址 -->
          <div v-if="activeMenu === 'address'" class="panel-section">
            <h3 class="panel-heading">常用自提地点与宿舍</h3>
            <div class="address-box">
              <el-form :model="addressForm" label-width="100px" style="max-width: 500px;">
                <el-form-item label="所在校区">
                  <el-radio-group v-model="addressForm.campus">
                    <el-radio label="咸安校区">咸安校区</el-radio>
                    <el-radio label="温泉校区">温泉校区</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="寝室楼栋">
                  <el-input v-model="addressForm.dorm" placeholder="如：7号学生公寓 402室" />
                </el-form-item>
                <el-form-item label="常用面交地">
                  <el-input v-model="addressForm.favoriteSpot" placeholder="如：一食堂大门、图书馆台阶" />
                </el-form-item>
                <el-form-item label="备用手机">
                  <el-input v-model="addressForm.phone" placeholder="接收面交电话" />
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="saveAddress">保存地址设置</el-button>
                </el-form-item>
              </el-form>
            </div>
          </div>

          <!-- 4. 校园系统通知 -->
          <div v-if="activeMenu === 'notices'" class="panel-section">
            <h3 class="panel-heading">校园系统通知公告</h3>
            <div class="notices-list">
              <div v-for="n in INITIAL_NOTICES" :key="n.id" class="notice-card">
                <div class="notice-top">
                  <span class="notice-title">{{ n.title }}</span>
                  <span class="notice-time">{{ n.time }}</span>
                </div>
                <p class="notice-body">{{ n.content }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, reactive, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { Upload, List, Star, Location, Bell } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useUserStore } from '../stores/user'
import { useMarketStore } from '../stores/market'
import { getOrders, updateOrderStatus, getFavorites, removeFavorite } from '../services/storage'
import { INITIAL_NOTICES } from '../mock/initialData'

const router = useRouter()
const userStore = useUserStore()
const marketStore = useMarketStore()

const activeMenu = ref('posts')
const postSubTab = ref('books')
const ordersList = ref([])
const favoritesList = ref([])

const addressForm = reactive({
  campus: '咸安校区',
  dorm: '东区 5号楼 312',
  favoriteSpot: '一号教学楼门口或图书馆',
  phone: '13888888888'
})

const myBooks = computed(() => {
  return marketStore.books.filter(b => b.studentId === userStore.studentId)
})

const myGoods = computed(() => {
  return marketStore.goods.filter(g => g.studentId === userStore.studentId)
})

const myPublishedTotal = computed(() => myBooks.value.length + myGoods.value.length)

const myOrders = computed(() => {
  return ordersList.value
})

const myFavorites = computed(() => {
  return favoritesList.value
})

const loadOrders = () => {
  if (userStore.studentId) {
    ordersList.value = getOrders(userStore.studentId)
  }
}

const loadFavorites = () => {
  if (userStore.studentId) {
    favoritesList.value = getFavorites(userStore.studentId)
  }
}

const handleRemoveFavorite = (favId) => {
  removeFavorite(favId)
  loadFavorites()
  ElMessage.success('已从收藏夹移出')
}

const handleGoToDetail = (fav) => {
  if (fav.type === 'book') {
    router.push(`/book/${fav.productId}`)
  } else {
    router.push(`/good/${fav.productId}`)
  }
}

onMounted(() => {
  loadOrders()
  loadFavorites()
  if (userStore.currentUser?.phone) {
    addressForm.phone = userStore.currentUser.phone
  }
})

watch(activeMenu, (newVal) => {
  if (newVal === 'favorites') {
    loadFavorites()
  } else if (newVal === 'orders') {
    loadOrders()
  }
})

const handleDeleteBook = (id) => {
  ElMessageBox.confirm('确定要下架并删除该二手图书吗？', '删除提示', {
    type: 'warning'
  }).then(() => {
    marketStore.removeBook(id)
    ElMessage.success('已下架删除')
  }).catch(() => {})
}

const handleDeleteGood = (id) => {
  ElMessageBox.confirm('确定要下架并删除该闲置好物吗？', '删除提示', {
    type: 'warning'
  }).then(() => {
    marketStore.removeGood(id)
    ElMessage.success('已下架删除')
  }).catch(() => {})
}

const handleCompleteOrder = (orderId) => {
  updateOrderStatus(orderId, 'completed')
  loadOrders()
  ElMessage.success('订单已标记为线下交接完成！')
}

const handleCancelOrder = (orderId) => {
  ElMessageBox.confirm('确定要取消此项预约面交吗？', '取消提示', {
    type: 'warning'
  }).then(() => {
    updateOrderStatus(orderId, 'cancelled')
    loadOrders()
    ElMessage.info('预约已取消')
  }).catch(() => {})
}

const saveAddress = () => {
  ElMessage.success('自提与寝室地址信息已保存！')
}

const handleLogout = () => {
  userStore.logout()
  ElMessage.info('已退出学生认证')
}
</script>

<style scoped>
.page-title-row {
  margin-bottom: 20px;
}

.profile-auth-gate {
  background: #ffffff;
  padding: 60px;
  border-radius: var(--radius-lg);
  border: 1px solid #ebeef5;
}

.profile-layout {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 24px;
}

.profile-sidebar {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.student-card {
  background: #ffffff;
  border-radius: var(--radius-base);
  padding: 24px;
  border: 1px solid #ebeef5;
  box-shadow: var(--shadow-sm);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.student-avatar {
  margin-bottom: 12px;
}

.student-name {
  font-size: 18px;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 4px;
}

.student-id-badge {
  background: #eff6ff;
  color: var(--primary-color);
  font-size: 12px;
  font-weight: 500;
  padding: 2px 8px;
  border-radius: 4px;
  margin-bottom: 10px;
}

.student-dept-text {
  display: flex;
  flex-direction: column;
  font-size: 12px;
  color: #64748b;
  gap: 2px;
}

.sidebar-divider {
  width: 100%;
  height: 1px;
  background: #f1f5f9;
  margin: 16px 0;
}

.logout-btn {
  width: 100%;
}

.menu-box {
  background: #ffffff;
  border-radius: var(--radius-base);
  border: 1px solid #ebeef5;
  overflow: hidden;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 20px;
  font-size: 14px;
  color: #475569;
  cursor: pointer;
  border-left: 3px solid transparent;
  transition: all 0.2s;
}

.menu-item:hover {
  background: #f8fafc;
  color: var(--primary-color);
}

.menu-item.active {
  background: #eff6ff;
  color: var(--primary-color);
  font-weight: 600;
  border-left-color: var(--primary-color);
}

/* 主面板 */
.profile-main-panel {
  background: #ffffff;
  border-radius: var(--radius-base);
  padding: 26px;
  border: 1px solid #ebeef5;
  box-shadow: var(--shadow-sm);
  min-height: 480px;
}

.section-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.panel-heading {
  font-size: 18px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 16px;
}

/* 我的发布列表 */
.my-items-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 14px;
}

.my-item-row {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 14px;
  border: 1px solid #f1f5f9;
  border-radius: var(--radius-base);
  transition: background-color 0.2s;
}

.my-item-row:hover {
  background-color: #fbfcfe;
}

.my-item-img {
  width: 60px;
  height: 60px;
  object-fit: contain;
  border-radius: 4px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
}

.my-item-details {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.my-item-name {
  font-size: 15px;
  font-weight: 600;
  color: #1e293b;
  cursor: pointer;
}

.my-item-name:hover {
  color: var(--primary-color);
}

.my-item-desc {
  font-size: 12px;
  color: #64748b;
}

.my-item-actions {
  display: flex;
  gap: 10px;
}

/* 订单卡片 */
.orders-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.order-card {
  border: 1px solid #e2e8f0;
  border-radius: var(--radius-base);
  padding: 18px;
}

.order-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 10px;
  border-bottom: 1px solid #f1f5f9;
  margin-bottom: 12px;
}

.order-meta {
  display: flex;
  gap: 16px;
  font-size: 13px;
  color: #64748b;
}

.order-id {
  font-weight: 600;
  color: #1e293b;
}

.order-items-box {
  background: #f8fafc;
  padding: 12px;
  border-radius: 6px;
  margin-bottom: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.order-item-line {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 13px;
}

.order-item-thumb {
  width: 36px;
  height: 36px;
  object-fit: contain;
  border-radius: 4px;
  border: 1px solid #cbd5e1;
}

.order-item-title {
  flex: 1;
  color: #334155;
}

.order-item-price {
  font-weight: 600;
  color: #1e293b;
}

.order-details-info {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 6px;
  font-size: 12px;
  color: #64748b;
  margin-bottom: 12px;
}

.order-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 10px;
  border-top: 1px dashed #e2e8f0;
}

.order-total-price {
  font-size: 14px;
  color: #1e293b;
}

.order-action-btns {
  display: flex;
  gap: 10px;
}

.notices-list {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.notice-card {
  background: #f8fafc;
  border-radius: var(--radius-base);
  padding: 16px;
  border: 1px solid #e2e8f0;
}

.notice-top {
  display: flex;
  justify-content: space-between;
  margin-bottom: 6px;
}

.notice-title {
  font-size: 14px;
  font-weight: 600;
  color: #1e293b;
}

.notice-time {
  font-size: 12px;
  color: #94a3b8;
}

.notice-body {
  font-size: 13px;
  line-height: 1.6;
  color: #475569;
}
</style>
