<template>
  <div class="detail-view page-container">
    <div class="pc-container">
      <el-breadcrumb separator="/" class="mb-4">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/goods' }">闲置杂货</el-breadcrumb-item>
        <el-breadcrumb-item>物品详情</el-breadcrumb-item>
      </el-breadcrumb>

      <div v-if="good" class="detail-card">
        <div class="detail-layout">
          <!-- 左侧实物图 -->
          <div class="preview-col">
            <div class="cover-box">
              <img :src="good.gpicture || './images/zahuopu.png'" :alt="good.gname" class="main-cover" />
              <span class="campus-badge">{{ good.gcollege }}</span>
              <span class="condition-badge-float">{{ good.gstatus }}</span>
            </div>
            <div class="security-box">
              <div class="sec-item"><el-icon color="#67c23a"><CircleCheck /></el-icon> 实名学号认证</div>
              <div class="sec-item"><el-icon color="#67c23a"><CircleCheck /></el-icon> 线下当面验货</div>
              <div class="sec-item"><el-icon color="#67c23a"><CircleCheck /></el-icon> 支持当场试用</div>
            </div>
          </div>

          <!-- 右侧详情与购买 -->
          <div class="info-col">
            <h1 class="good-title">{{ good.gname }}</h1>
            <p class="good-sub">发布于 {{ good.createdAt || '近期' }} · 校园闲置绿色流转</p>

            <div class="price-banner">
              <div class="price-main">
                <span class="price-label">转让价：</span>
                <span class="price-symbol">¥</span>
                <span class="price-val">{{ Number(good.gprice).toFixed(2) }}</span>
                <span v-if="good.originalPrice" class="orig-price">
                  参考原价: ¥{{ Number(good.originalPrice).toFixed(2) }}
                </span>
              </div>
              <div class="save-tag" v-if="good.originalPrice">
                立省 ¥{{ (Number(good.originalPrice) - Number(good.gprice)).toFixed(2) }}
              </div>
            </div>

            <!-- 参数列表 -->
            <div class="specs-grid">
              <div class="spec-item">
                <span class="spec-label">成色品质：</span>
                <el-tag size="small" type="success">{{ good.gstatus }}</el-tag>
              </div>
              <div class="spec-item">
                <span class="spec-label">所在校区：</span>
                <span class="spec-value">{{ good.gcollege }}</span>
              </div>
              <div class="spec-item">
                <span class="spec-label">浏览热度：</span>
                <span class="spec-value">{{ good.views || 100 }} 次浏览</span>
              </div>
              <div class="spec-item">
                <span class="spec-label">交易方式：</span>
                <span class="spec-value">校内线下当面验货付款</span>
              </div>
            </div>

            <!-- 卖家卡片 -->
            <div class="seller-card">
              <div class="seller-header">
                <el-avatar :size="36" src="./images/tabBar/mine.fill.png" />
                <div class="seller-meta">
                  <span class="seller-name">{{ good.usersname }}</span>
                  <span class="seller-cert">🌟 真实学籍已核验 · {{ good.gcollege }}</span>
                </div>
              </div>
              <div class="seller-contact">
                <div class="privacy-phone-row">
                  <span class="privacy-badge-text"><el-icon><Lock /></el-icon> 隐私保护脱敏：</span>
                  <span class="masked-phone">{{ maskPhone(good.phone) }}</span>
                </div>
                <span class="privacy-sub-hint">校园真实学籍安全认证，建议优先在下方留言沟通或提交预约清单</span>
              </div>
            </div>

            <!-- 实物描述 -->
            <div class="description-box">
              <h4 class="box-title">物品实拍与转让原因</h4>
              <p class="desc-content">{{ good.gnote || '卖家未留下详细文字说明，功能完好无损坏，当面验货满意再付款。' }}</p>
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
          :product-id="String(good.goodid)"
          :seller-student-id="good.studentId"
        />
      </div>

      <div v-else class="not-found">
        <el-empty description="未找到该闲置物品或已转让下架">
          <el-button type="primary" @click="router.push('/goods')">返回闲置大厅</el-button>
        </el-empty>
      </div>

      <!-- 预约购买模态框 -->
      <el-dialog
        v-model="reserveDialogVisible"
        title="确认预约购买闲置物品"
        width="520px"
        :close-on-click-modal="false"
      >
        <div class="reserve-form">
          <el-alert
            title="提示：预约后系统将为您保留此物品，请按约定校区与时间进行线下当面试用与付款！"
            type="info"
            show-icon
            :closable="false"
            style="margin-bottom: 16px;"
          />

          <el-form :model="reserveForm" label-width="100px">
            <el-form-item label="预约物品">
              <span class="font-semibold">{{ good?.gname }}</span>
            </el-form-item>
            <el-form-item label="交易金额">
              <span class="price-val" style="color: var(--price-color); font-weight: bold;">
                ¥{{ Number(good?.gprice).toFixed(2) }}
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
              <el-input v-model="reserveForm.meetPlace" placeholder="如：宿舍楼栋楼下、校门口" />
            </el-form-item>
            <el-form-item label="约定时间">
              <el-input v-model="reserveForm.meetTime" placeholder="如：今晚 19:30" />
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

const goodId = computed(() => route.params.id)
const good = computed(() => marketStore.goods.find(g => String(g.goodid) === String(goodId.value)))

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
  if (userStore.studentId && good.value) {
    isFav.value = isFavorite(userStore.studentId, good.value.goodid)
  }
}

const handleToggleFav = () => {
  if (!userStore.isLoggedIn) {
    userStore.openAuthDialog()
    return
  }
  const res = toggleFavorite(userStore.studentId, good.value, 'good')
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
  meetPlace: '宿舍楼下',
  meetTime: '今晚 19:30',
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
  const res = cartStore.addItem(good.value, 'good')
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
          id: good.value.goodid,
          type: 'good',
          title: good.value.gname,
          price: good.value.gprice,
          college: good.value.gcollege,
          picture: good.value.gpicture,
          seller: good.value.usersname,
          sellerPhone: good.value.phone
        }
      ],
      totalAmount: Number(good.value.gprice),
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
    ElMessage.success('恭喜，闲置预购订单已生成！请前往个人中心查看')
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
  background: var(--bg-card);
  border-radius: var(--radius-xl, 20px);
  padding: 32px;
  border: 1px solid var(--border-color);
  box-shadow: var(--shadow-sm);
}

.detail-layout {
  display: grid;
  grid-template-columns: 360px 1fr;
  gap: 40px;
}

.preview-col {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.cover-box {
  position: relative;
  width: 100%;
  height: 380px;
  background-color: var(--bg-card-subtle);
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-color);
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

.condition-badge-float {
  position: absolute;
  top: 12px;
  right: 12px;
  background: var(--warning-color);
  color: #ffffff;
  padding: 3px 8px;
  font-size: 12px;
  border-radius: 4px;
}

.security-box {
  background: var(--bg-card-subtle);
  border-radius: var(--radius-base);
  padding: 14px;
  border: 1px dashed var(--border-color);
  display: flex;
  justify-content: space-around;
  font-size: 12px;
  color: var(--text-regular);
}

.sec-item {
  display: flex;
  align-items: center;
  gap: 4px;
}

.info-col {
  display: flex;
  flex-direction: column;
}

.good-title {
  font-size: 24px;
  font-weight: 700;
  color: var(--text-main);
  margin-bottom: 8px;
  line-height: 1.3;
}

.good-sub {
  font-size: 14px;
  color: var(--text-secondary);
  margin-bottom: 20px;
}

.price-banner {
  background: var(--bg-card-subtle);
  border-radius: var(--radius-base);
  padding: 16px 20px;
  border: 1px solid var(--border-color);
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
  color: var(--text-regular);
}

.price-val {
  font-size: 28px;
  font-weight: 800;
  color: var(--price-color);
  font-family: 'DIN Alternate', sans-serif;
}

.orig-price {
  font-size: 13px;
  color: var(--text-secondary);
  text-decoration: line-through;
  margin-left: 10px;
}

.save-tag {
  background: var(--price-color);
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
  background: var(--bg-card-subtle);
  padding: 16px;
  border-radius: var(--radius-base);
  margin-bottom: 20px;
  font-size: 13px;
  border: 1px solid var(--border-subtle);
}

.spec-item {
  display: flex;
  align-items: center;
}

.spec-label {
  color: var(--text-secondary);
  width: 80px;
}

.spec-value {
  color: var(--text-main);
  font-weight: 500;
}

.seller-card {
  border: 1px solid var(--border-color);
  border-radius: var(--radius-base);
  padding: 14px 18px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  background: var(--bg-card);
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
  color: var(--text-main);
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
  color: var(--text-regular);
}

.description-box {
  margin-bottom: 26px;
}

.box-title {
  font-size: 15px;
  font-weight: 600;
  color: var(--text-main);
  margin-bottom: 8px;
}

.desc-content {
  font-size: 14px;
  line-height: 1.6;
  color: var(--text-regular);
  background: var(--bg-card-subtle);
  border: 1px solid var(--border-color);
  padding: 14px;
  border-radius: var(--radius-base);
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
  background: var(--bg-card);
  padding: 60px;
  border-radius: var(--radius-base);
}
</style>
