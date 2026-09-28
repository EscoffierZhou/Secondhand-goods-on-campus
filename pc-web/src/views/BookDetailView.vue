<template>
  <div class="detail-view page-container">
    <div class="pc-container">
      <el-breadcrumb separator="/" class="mb-4">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/books' }">二手书城</el-breadcrumb-item>
        <el-breadcrumb-item>图书详情</el-breadcrumb-item>
      </el-breadcrumb>

      <div v-if="book" class="detail-card">
        <div class="detail-layout">
          <!-- 左侧封面 -->
          <div class="preview-col">
            <div class="cover-box">
              <img :src="book.picture || './images/tuijian.png'" :alt="book.bname" class="main-cover" />
              <span class="campus-badge">{{ book.college }}</span>
              <span v-if="book.reference" class="ref-badge">专业资料/教材</span>
            </div>
            <div class="security-box">
              <div class="sec-item"><el-icon color="#67c23a"><CircleCheck /></el-icon> 实名学号认证</div>
              <div class="sec-item"><el-icon color="#67c23a"><CircleCheck /></el-icon> 线下当面验货</div>
              <div class="sec-item"><el-icon color="#67c23a"><CircleCheck /></el-icon> 零手续费流转</div>
            </div>
          </div>

          <!-- 右侧详情与购买 -->
          <div class="info-col">
            <h1 class="book-title">{{ book.bname }}</h1>
            <p class="book-sub">{{ book.author }} 著 · {{ book.press }} 出版</p>

            <div class="price-banner">
              <div class="price-main">
                <span class="price-label">转让价：</span>
                <span class="price-symbol">¥</span>
                <span class="price-val">{{ Number(book.bprice).toFixed(2) }}</span>
                <span v-if="book.originalPrice" class="orig-price">
                  原价: ¥{{ Number(book.originalPrice).toFixed(2) }}
                </span>
              </div>
              <div class="save-tag" v-if="book.originalPrice">
                立省 ¥{{ (Number(book.originalPrice) - Number(book.bprice)).toFixed(2) }}
              </div>
            </div>

            <!-- 参数属性列表 -->
            <div class="specs-grid">
              <div class="spec-item">
                <span class="spec-label">图书成色：</span>
                <el-tag size="small" type="success">{{ book.bstatus }}</el-tag>
              </div>
              <div class="spec-item">
                <span class="spec-label">所属校区：</span>
                <span class="spec-value">{{ book.college }}</span>
              </div>
              <div class="spec-item">
                <span class="spec-label">教材属性：</span>
                <span class="spec-value">{{ book.reference ? '课程教材 / 考研笔记资料' : '文学 / 课外通识书籍' }}</span>
              </div>
              <div class="spec-item">
                <span class="spec-label">上架时间：</span>
                <span class="spec-value">{{ book.createdAt }}</span>
              </div>
            </div>

            <!-- 卖家信息卡片 -->
            <div class="seller-card">
              <div class="seller-header">
                <el-avatar :size="36" src="./images/tabBar/mine.fill.png" />
                <div class="seller-meta">
                  <span class="seller-name">{{ book.usersname }}</span>
                  <span class="seller-cert">学号: {{ book.studentId ? (book.studentId.substring(0, 4) + '****' + book.studentId.slice(-3)) : '已实名认证' }}</span>
                </div>
              </div>
              <div class="seller-contact">
                <div class="privacy-phone-row">
                  <span class="privacy-badge-text"><el-icon><Lock /></el-icon> 隐私保护脱敏：</span>
                  <span class="masked-phone">{{ maskPhone(book.phone) }}</span>
                </div>
                <span class="privacy-sub-hint">满足大赛个人信息保护标准，建议优先在下方留言或发起预约</span>
              </div>
            </div>

            <!-- 描述详情 -->
            <div class="description-box">
              <h4 class="box-title">书籍描述与笔记详情</h4>
              <p class="desc-content">{{ book.bnote || '卖家未留下详细文字描述，保存完整，无乱页缺损。' }}</p>
            </div>

            <!-- 操作按钮 -->
            <div class="action-buttons">
              <el-button
                :type="isFav ? 'danger' : 'default'"
                size="large"
                :icon="isFav ? StarFilled : Star"
                class="fav-btn"
                @click="handleToggleFav"
              >
                {{ isFav ? '已收藏' : '加入收藏' }}
              </el-button>
              <el-button
                type="warning"
                size="large"
                class="cart-action-btn"
                :icon="ShoppingCart"
                @click="addToCart"
              >
                加入购物车
              </el-button>
              <el-button
                type="primary"
                size="large"
                class="buy-action-btn"
                @click="openReserveDialog"
              >
                立即预约购买 / 面交
              </el-button>
            </div>
          </div>
        </div>

        <!-- 物品留言沟通板块 -->
        <CommentSection
          :product-id="String(book.bookid)"
          :seller-student-id="book.studentId"
        />
      </div>

      <div v-else class="not-found">
        <el-empty description="未找到该图书信息或该书已下架">
          <el-button type="primary" @click="router.push('/books')">返回图书大厅</el-button>
        </el-empty>
      </div>

      <!-- 预约购买模态框 -->
      <el-dialog
        v-model="reserveDialogVisible"
        title="确认预约购买图书"
        width="520px"
        :close-on-click-modal="false"
      >
        <div class="reserve-form">
          <el-alert
            title="提示：预约后系统将为您保留此书，请按约定校区与时间完成线下当面交易验货付款！"
            type="info"
            show-icon
            :closable="false"
            style="margin-bottom: 16px;"
          />

          <el-form :model="reserveForm" label-width="100px">
            <el-form-item label="预约物品">
              <span class="font-semibold">{{ book?.bname }}</span>
            </el-form-item>
            <el-form-item label="交易金额">
              <span class="price-val" style="color: var(--price-color); font-weight: bold;">
                ¥{{ Number(book?.bprice).toFixed(2) }}
              </span>
            </el-form-item>
            <el-form-item label="您的姓名">
              <el-input v-model="reserveForm.buyerName" placeholder="买家姓名" />
            </el-form-item>
            <el-form-item label="您的电话">
              <el-input v-model="reserveForm.buyerPhone" placeholder="联系手机号" />
            </el-form-item>
            <el-form-item label="约定校区">
              <el-radio-group v-model="reserveForm.campus">
                <el-radio label="咸安校区">咸安校区</el-radio>
                <el-radio label="温泉校区">温泉校区</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="约定地点">
              <el-input v-model="reserveForm.meetPlace" placeholder="如：图书馆门口、一餐二楼大厅" />
            </el-form-item>
            <el-form-item label="约定时间">
              <el-input v-model="reserveForm.meetTime" placeholder="如：今天下午 17:30 课后" />
            </el-form-item>
            <el-form-item label="买家留言">
              <el-input v-model="reserveForm.note" type="textarea" rows="2" placeholder="给卖家的留言或碰头细节说明" />
            </el-form-item>
          </el-form>
        </div>

        <template #footer>
          <div class="dialog-footer">
            <el-button @click="reserveDialogVisible = false">取消</el-button>
            <el-button type="primary" :loading="reserveLoading" @click="confirmReserve">
              确认发起预约
            </el-button>
          </div>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, reactive, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ShoppingCart, CircleCheck, Star, StarFilled, Lock } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import CommentSection from '../components/CommentSection.vue'
import { useMarketStore } from '../stores/market'
import { useUserStore } from '../stores/user'
import { useCartStore } from '../stores/cart'
import { createOrder, isFavorite, toggleFavorite } from '../services/storage'

const route = useRoute()
const router = useRouter()
const marketStore = useMarketStore()
const userStore = useUserStore()
const cartStore = useCartStore()

const bookId = computed(() => route.params.id)
const book = computed(() => marketStore.books.find(b => String(b.bookid) === String(bookId.value)))

const isFav = ref(false)

const maskPhone = (phone) => {
  if (!phone) return '未留联系电话'
  const str = String(phone).trim()
  if (str.length === 11) {
    return str.substring(0, 3) + '****' + str.substring(7)
  }
  return str.substring(0, 2) + '****' + str.slice(-2)
}

const checkFavStatus = () => {
  if (userStore.studentId && book.value) {
    isFav.value = isFavorite(userStore.studentId, book.value.bookid)
  }
}

const handleToggleFav = () => {
  if (!userStore.isLoggedIn) {
    userStore.openAuthDialog()
    return
  }
  const res = toggleFavorite(userStore.studentId, book.value, 'book')
  isFav.value = res.favorited
  if (res.favorited) {
    ElMessage.success(res.message)
  } else {
    ElMessage.info(res.message)
  }
}

const reserveDialogVisible = ref(false)
const reserveLoading = ref(false)
const reserveForm = reactive({
  buyerName: '',
  buyerPhone: '',
  campus: '咸安校区',
  meetPlace: '校内一号食堂大厅',
  meetTime: '今天课后 17:30',
  note: ''
})

onMounted(() => {
  checkFavStatus()
  if (userStore.isLoggedIn) {
    reserveForm.buyerName = userStore.currentUser?.nickName || ''
    reserveForm.buyerPhone = userStore.currentUser?.phone || ''
    reserveForm.campus = userStore.currentCampus
  }
})

const addToCart = () => {
  if (!userStore.isLoggedIn) {
    userStore.openAuthDialog()
    return
  }
  const res = cartStore.addItem(book.value, 'book')
  if (res.success) {
    ElMessage.success('已加入购物车！')
  } else {
    ElMessage.warning(res.message)
  }
}

const openReserveDialog = () => {
  if (!userStore.isLoggedIn) {
    userStore.openAuthDialog()
    return
  }
  reserveDialogVisible.value = true
}

const confirmReserve = () => {
  if (!reserveForm.buyerPhone) {
    ElMessage.warning('请填写您的联系手机号')
    return
  }

  reserveLoading.value = true
  setTimeout(() => {
    createOrder({
      items: [
        {
          id: book.value.bookid,
          type: 'book',
          title: book.value.bname,
          price: book.value.bprice,
          college: book.value.college,
          picture: book.value.picture,
          seller: book.value.usersname,
          sellerPhone: book.value.phone
        }
      ],
      totalAmount: Number(book.value.bprice),
      buyerStudentId: userStore.studentId,
      buyerName: reserveForm.buyerName,
      buyerPhone: reserveForm.buyerPhone,
      campus: reserveForm.campus,
      meetPlace: reserveForm.meetPlace,
      meetTime: reserveForm.meetTime,
      note: reserveForm.note
    })

    reserveLoading.value = false
    reserveDialogVisible.value = false
    ElMessage.success('恭喜，预购订单已生成！请前往个人中心查看或联系卖家')
    router.push('/profile')
  }, 500)
}

const copyPhone = (phone) => {
  if (!phone) return
  navigator.clipboard.writeText(phone).then(() => {
    ElMessage.success(`电话号码 ${phone} 已复制到剪贴板`)
  })
}
</script>

<style scoped>
.mb-4 {
  margin-bottom: 16px;
}

.detail-card {
  background: #ffffff;
  border-radius: var(--radius-lg);
  padding: 30px;
  border: 1px solid #ebeef5;
  box-shadow: var(--shadow-sm);
}

.detail-layout {
  display: grid;
  grid-template-columns: 360px 1fr;
  gap: 40px;
}

/* 左侧封面预览 */
.preview-col {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.cover-box {
  position: relative;
  width: 100%;
  height: 380px;
  background-color: #f8fafc;
  border-radius: var(--radius-base);
  border: 1px solid #e2e8f0;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.main-cover {
  max-width: 90%;
  max-height: 90%;
  object-fit: contain;
}

.campus-badge {
  position: absolute;
  top: 12px;
  left: 12px;
  background: var(--primary-color);
  color: #ffffff;
  padding: 3px 8px;
  font-size: 12px;
  border-radius: 4px;
}

.ref-badge {
  position: absolute;
  top: 12px;
  right: 12px;
  background: #67c23a;
  color: #ffffff;
  padding: 3px 8px;
  font-size: 12px;
  border-radius: 4px;
}

.security-box {
  background: #f8fafc;
  border-radius: var(--radius-base);
  padding: 14px;
  border: 1px dashed #cbd5e1;
  display: flex;
  justify-content: space-around;
  font-size: 12px;
  color: #475569;
}

.sec-item {
  display: flex;
  align-items: center;
  gap: 4px;
}

/* 右侧详情信息 */
.info-col {
  display: flex;
  flex-direction: column;
}

.book-title {
  font-size: 24px;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 8px;
  line-height: 1.3;
}

.book-sub {
  font-size: 14px;
  color: #64748b;
  margin-bottom: 20px;
}

.price-banner {
  background: #fff7ed;
  border-radius: var(--radius-base);
  padding: 16px 20px;
  border: 1px solid #ffedd5;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
}

.price-main {
  display: flex;
  align-items: baseline;
  gap: 4px;
}

.price-label {
  font-size: 14px;
  color: #9a3412;
}

.price-val {
  font-size: 28px;
  font-weight: 800;
  color: var(--price-color);
  font-family: 'DIN Alternate', sans-serif;
}

.orig-price {
  font-size: 13px;
  color: #94a3b8;
  text-decoration: line-through;
  margin-left: 10px;
}

.save-tag {
  background: #ea580c;
  color: #ffffff;
  padding: 3px 10px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
}

.specs-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  background: #f8fafc;
  padding: 16px;
  border-radius: var(--radius-base);
  margin-bottom: 20px;
  font-size: 13px;
}

.spec-item {
  display: flex;
  align-items: center;
}

.spec-label {
  color: #64748b;
  width: 80px;
}

.spec-value {
  color: #1e293b;
  font-weight: 500;
}

.seller-card {
  border: 1px solid #e2e8f0;
  border-radius: var(--radius-base);
  padding: 14px 18px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.seller-header {
  display: flex;
  align-items: center;
  gap: 10px;
}

.seller-meta {
  display: flex;
  flex-direction: column;
}

.seller-name {
  font-size: 14px;
  font-weight: 600;
  color: #1e293b;
}

.seller-cert {
  font-size: 12px;
  color: #10b981;
}

.seller-contact {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: #475569;
}

.description-box {
  margin-bottom: 26px;
}

.box-title {
  font-size: 15px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 8px;
}

.desc-content {
  font-size: 14px;
  line-height: 1.6;
  color: #475569;
  background: #ffffff;
  border: 1px solid #f1f5f9;
  padding: 14px;
  border-radius: 6px;
}

.action-buttons {
  display: flex;
  gap: 16px;
  margin-top: auto;
}

.cart-action-btn {
  flex: 1;
  padding: 14px;
  font-size: 16px;
}

.buy-action-btn {
  flex: 1.4;
  padding: 14px;
  font-size: 16px;
  background-color: var(--primary-color);
  border-color: var(--primary-color);
}

.not-found {
  background: #ffffff;
  padding: 60px;
  border-radius: var(--radius-base);
}
</style>
