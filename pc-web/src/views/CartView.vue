<template>
  <div class="cart-view page-container">
    <div class="pc-container">
      <div class="page-title-row">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>购物车与预订中心</el-breadcrumb-item>
        </el-breadcrumb>
        <span class="cart-tip">共 {{ cartStore.totalCount }} 件选中的商品</span>
      </div>

      <!-- 未登录提示 -->
      <div v-if="!userStore.isLoggedIn" class="login-prompt-card">
        <el-empty description="请先进行学生身份认证，方可查看与管理购物车">
          <el-button type="primary" @click="userStore.openAuthDialog">立即认证登录</el-button>
        </el-empty>
      </div>

      <!-- 购物车主体 -->
      <div v-else-if="cartStore.items.length > 0" class="cart-content">
        <!-- 分类切换过滤标签 -->
        <div class="cart-tabs-bar">
          <div class="tabs-left">
            <span
              :class="['cart-tab', { active: currentTab === 'all' }]"
              @click="currentTab = 'all'"
            >
              全部 ({{ cartStore.items.length }})
            </span>
            <span
              :class="['cart-tab', { active: currentTab === 'book' }]"
              @click="currentTab = 'book'"
            >
              二手图书 ({{ cartStore.bookItems.length }})
            </span>
            <span
              :class="['cart-tab', { active: currentTab === 'good' }]"
              @click="currentTab = 'good'"
            >
              闲置杂货 ({{ cartStore.goodItems.length }})
            </span>
          </div>

          <div class="tabs-right">
            <el-button link type="danger" size="small" @click="handleBatchDelete">
              清空购物车
            </el-button>
          </div>
        </div>

        <!-- 列表表格 -->
        <div class="cart-table-card">
          <div class="table-header">
            <div class="col-chk">
              <el-checkbox
                :model-value="cartStore.isAllSelected"
                @change="val => cartStore.toggleAll(val)"
              >
                全选
              </el-checkbox>
            </div>
            <div class="col-info">商品信息</div>
            <div class="col-campus">所在校区</div>
            <div class="col-price">转让单价</div>
            <div class="col-seller">卖家信息</div>
            <div class="col-action">操作</div>
          </div>

          <div class="table-body">
            <div
              v-for="item in displayedItems"
              :key="item.cartId"
              class="cart-row"
            >
              <div class="col-chk">
                <el-checkbox
                  :model-value="item.selected"
                  @change="() => cartStore.toggleSelect(item.cartId)"
                />
              </div>

              <div class="col-info item-info-box" @click="goToProduct(item)">
                <img :src="item.picture || './images/tuijian.png'" class="item-thumb" />
                <div class="item-text">
                  <h4 class="item-title">{{ item.title }}</h4>
                  <div class="item-tags">
                    <el-tag size="small" type="info">{{ item.statusDesc }}</el-tag>
                    <el-tag v-if="item.productType === 'book'" size="small" type="success">图书</el-tag>
                    <el-tag v-else size="small" type="warning">闲置物品</el-tag>
                  </div>
                </div>
              </div>

              <div class="col-campus">
                <span class="campus-tag-table">{{ item.college }}</span>
              </div>

              <div class="col-price">
                <span class="price-symbol">¥</span>
                <span class="price-val-table">{{ Number(item.price).toFixed(2) }}</span>
              </div>

              <div class="col-seller">
                <span class="seller-name-table">{{ item.seller }}</span>
                <span class="seller-phone-table">{{ item.sellerPhone }}</span>
              </div>

              <div class="col-action">
                <el-button link type="danger" @click="cartStore.removeItem(item.cartId)">
                  移除
                </el-button>
              </div>
            </div>
          </div>
        </div>

        <!-- 底部吸底结算工具栏 -->
        <div class="cart-bottom-bar">
          <div class="bar-left">
            <el-checkbox
              :model-value="cartStore.isAllSelected"
              @change="val => cartStore.toggleAll(val)"
            >
              全选 ({{ cartStore.selectedCount }}/{{ cartStore.totalCount }})
            </el-checkbox>
            <el-button link type="danger" size="small" @click="handleDeleteSelected">
              删除选中商品
            </el-button>
          </div>

          <div class="bar-right">
            <div class="total-box">
              <span class="total-label">合计预购金额：</span>
              <span class="price-symbol">¥</span>
              <span class="total-price-number">{{ cartStore.totalPrice }}</span>
            </div>

            <el-button
              type="primary"
              size="large"
              class="checkout-btn"
              :disabled="cartStore.selectedCount === 0"
              @click="openCheckoutDialog"
            >
              立即预约面交结算 ({{ cartStore.selectedCount }})
            </el-button>
          </div>
        </div>
      </div>

      <!-- 空购物车状态 -->
      <div v-else class="empty-state">
        <el-empty description="购物车空空如也，快去淘些二手教材与好物吧！">
          <div class="empty-actions">
            <el-button type="primary" @click="router.push('/books')">去逛二手书</el-button>
            <el-button @click="router.push('/goods')">去挑闲置物</el-button>
          </div>
        </el-empty>
      </div>

      <!-- 结算预约确认模态框 -->
      <el-dialog
        v-model="checkoutDialogVisible"
        title="校园二手面交 · 预约结算确认"
        width="600px"
        :close-on-click-modal="false"
      >
        <div class="checkout-dialog-content">
          <el-alert
            title="线下自提安全约定：下单后系统将生成预约凭证，无需线上付款，由买卖双方线下当面验货无误后再付现金或扫码！"
            type="success"
            show-icon
            :closable="false"
            style="margin-bottom: 20px;"
          />

          <div class="order-summary-box">
            <h4 class="summary-title">预约清单概览 ({{ cartStore.selectedCount }} 件)：</h4>
            <div class="summary-items">
              <div v-for="it in cartStore.selectedItems" :key="it.cartId" class="summary-item">
                <span class="item-name">{{ it.title }}</span>
                <span class="item-price">¥{{ Number(it.price).toFixed(2) }}</span>
              </div>
            </div>
            <div class="summary-total">
              <span>合计总金额：</span>
              <span class="price-number">¥{{ cartStore.totalPrice }}</span>
            </div>
          </div>

          <el-form :model="checkoutForm" label-width="100px" class="checkout-form">
            <el-form-item label="买家姓名" required>
              <el-input v-model="checkoutForm.buyerName" placeholder="买家真实姓名或常用称呼" />
            </el-form-item>
            <el-form-item label="联系电话" required>
              <el-input v-model="checkoutForm.buyerPhone" placeholder="手机号便于卖家当面联络" />
            </el-form-item>
            <el-form-item label="面交校区" required>
              <el-radio-group v-model="checkoutForm.campus">
                <el-radio label="咸安校区">咸安校区</el-radio>
                <el-radio label="温泉校区">温泉校区</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="自提地点" required>
              <el-input v-model="checkoutForm.meetPlace" placeholder="如：一号教学楼门口、图书馆、二食堂" />
            </el-form-item>
            <el-form-item label="预约时间" required>
              <el-input v-model="checkoutForm.meetTime" placeholder="如：明天中午12:30、课后17:30" />
            </el-form-item>
            <el-form-item label="备注留言">
              <el-input
                v-model="checkoutForm.note"
                type="textarea"
                rows="2"
                placeholder="给卖家的留言，如特定自提习惯或注意事项"
              />
            </el-form-item>
          </el-form>
        </div>

        <template #footer>
          <div class="dialog-footer">
            <el-button @click="checkoutDialogVisible = false">返回购物车修改</el-button>
            <el-button type="primary" :loading="checkoutLoading" @click="handleConfirmCheckout">
              确认提交预约订单
            </el-button>
          </div>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useCartStore } from '../stores/cart'
import { useUserStore } from '../stores/user'

const router = useRouter()
const cartStore = useCartStore()
const userStore = useUserStore()

const currentTab = ref('all')
const checkoutDialogVisible = ref(false)
const checkoutLoading = ref(false)

const checkoutForm = reactive({
  buyerName: '',
  buyerPhone: '',
  campus: '咸安校区',
  meetPlace: '一号教学楼大厅',
  meetTime: '明天中午 12:30',
  note: ''
})

const displayedItems = computed(() => {
  if (currentTab.value === 'book') return cartStore.bookItems
  if (currentTab.value === 'good') return cartStore.goodItems
  return cartStore.items
})

const goToProduct = (item) => {
  if (item.productType === 'book') {
    router.push(`/book/${item.productId}`)
  } else {
    router.push(`/good/${item.productId}`)
  }
}

const handleBatchDelete = () => {
  ElMessageBox.confirm('确定要清空购物车中的所有商品吗？', '清空提示', {
    type: 'warning'
  }).then(() => {
    cartStore.items.forEach(i => cartStore.removeItem(i.cartId))
    ElMessage.success('购物车已清空')
  }).catch(() => {})
}

const handleDeleteSelected = () => {
  ElMessageBox.confirm('确定要删除选中的商品吗？', '删除提示', {
    type: 'warning'
  }).then(() => {
    cartStore.selectedItems.forEach(i => cartStore.removeItem(i.cartId))
    ElMessage.success('已删除选中商品')
  }).catch(() => {})
}

const openCheckoutDialog = () => {
  checkoutForm.buyerName = userStore.currentUser?.nickName || ''
  checkoutForm.buyerPhone = userStore.currentUser?.phone || ''
  checkoutForm.campus = userStore.currentCampus
  checkoutDialogVisible.value = true
}

const handleConfirmCheckout = () => {
  if (!checkoutForm.buyerPhone) {
    ElMessage.warning('请填写买家手机号码')
    return
  }

  checkoutLoading.value = true
  setTimeout(() => {
    const res = cartStore.checkout(checkoutForm)
    checkoutLoading.value = false
    if (res.success) {
      checkoutDialogVisible.value = false
      ElMessage.success('预约订单创建成功！请前往个人中心查看或线下履约')
      router.push('/profile')
    } else {
      ElMessage.error(res.message || '结算失败')
    }
  }, 500)
}
</script>

<style scoped>
.page-title-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.cart-tip {
  font-size: 13px;
  color: var(--text-secondary);
}

.cart-tabs-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--bg-card);
  padding: 12px 20px;
  border-radius: var(--radius-base) var(--radius-base) 0 0;
  border: 1px solid var(--border-color);
  border-bottom: none;
}

.tabs-left {
  display: flex;
  gap: 20px;
}

.cart-tab {
  font-size: 14px;
  color: var(--text-secondary);
  cursor: pointer;
  padding-bottom: 4px;
  border-bottom: 2px solid transparent;
}

.cart-tab.active {
  color: var(--primary-color);
  font-weight: 600;
  border-bottom-color: var(--primary-color);
}

.cart-table-card {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 0 0 var(--radius-lg) var(--radius-lg);
  box-shadow: var(--shadow-sm);
  margin-bottom: 20px;
  overflow: hidden;
}

.table-header {
  display: flex;
  align-items: center;
  background: var(--bg-card-subtle);
  padding: 12px 20px;
  font-size: 13px;
  color: var(--text-secondary);
  border-bottom: 1px solid var(--border-color);
}

.col-chk { width: 80px; }
.col-info { flex: 2; }
.col-campus { width: 140px; text-align: center; }
.col-price { width: 140px; text-align: center; }
.col-seller { width: 180px; }
.col-action { width: 80px; text-align: right; }

.cart-row {
  display: flex;
  align-items: center;
  padding: 18px 20px;
  border-bottom: 1px solid var(--border-color);
  transition: background-color 0.2s;
}

.cart-row:hover {
  background-color: var(--bg-card-subtle);
}

.item-info-box {
  display: flex;
  gap: 14px;
  align-items: center;
  cursor: pointer;
}

.item-thumb {
  width: 60px;
  height: 60px;
  object-fit: contain;
  border-radius: 6px;
  background: var(--bg-card-subtle);
  border: 1px solid var(--border-color);
}

.item-text {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.item-title {
  font-size: 14px;
  color: var(--text-main);
  line-height: 1.4;
}

.item-tags {
  display: flex;
  gap: 6px;
}

.campus-tag-table {
  font-size: 13px;
  color: var(--text-secondary);
}

.price-val-table {
  font-size: 16px;
  font-weight: 700;
  color: var(--price-color);
  font-family: 'DIN Alternate', sans-serif;
}

.seller-name-table {
  display: block;
  font-size: 13px;
  color: var(--text-main);
  font-weight: 500;
}

.seller-phone-table {
  display: block;
  font-size: 12px;
  color: var(--text-muted);
}

/* 底部结算栏 */
.cart-bottom-bar {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  box-shadow: var(--shadow-md);
  border-radius: var(--radius-base);
  padding: 16px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  bottom: 10px;
  z-index: 100;
}

.bar-left {
  display: flex;
  align-items: center;
  gap: 20px;
}

.bar-right {
  display: flex;
  align-items: center;
  gap: 24px;
}

.total-box {
  display: flex;
  align-items: baseline;
  gap: 4px;
}

.total-label {
  font-size: 14px;
  color: var(--text-secondary);
}

.total-price-number {
  font-size: 26px;
  font-weight: 800;
  color: var(--price-color);
  font-family: 'DIN Alternate', sans-serif;
}

.checkout-btn {
  background-color: var(--primary-color);
  border-color: var(--primary-color);
  padding: 14px 28px;
  font-size: 15px;
  font-weight: 600;
}

.empty-state {
  background: var(--bg-card);
  border-radius: var(--radius-base);
  padding: 60px;
  border: 1px solid var(--border-color);
}

.empty-actions {
  display: flex;
  gap: 16px;
  margin-top: 14px;
}

.order-summary-box {
  background: var(--bg-card-subtle);
  padding: 14px;
  border-radius: 6px;
  border: 1px solid var(--border-color);
  margin-bottom: 20px;
}

.summary-title {
  font-size: 13px;
  color: var(--text-secondary);
  margin-bottom: 8px;
}

.summary-items {
  max-height: 120px;
  overflow-y: auto;
  margin-bottom: 10px;
}

.summary-item {
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  padding: 4px 0;
  color: var(--text-regular);
}

.summary-total {
  display: flex;
  justify-content: flex-end;
  align-items: baseline;
  padding-top: 8px;
  border-top: 1px dashed var(--border-color);
  font-size: 14px;
  color: var(--text-main);
}
</style>
