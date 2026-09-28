<template>
  <div class="product-card hover-card" @click="goToDetail">
    <div class="img-wrapper">
      <img :src="itemImage" :alt="itemTitle" class="product-img" @error="handleImgError" />
      <span class="campus-tag">{{ itemCollege }}</span>
      <span v-if="isTextbook" class="textbook-tag">教材资料</span>
    </div>

    <div class="card-body">
      <div class="card-status-row">
        <el-tag size="small" effect="plain" type="info" class="condition-badge">
          {{ itemCondition }}
        </el-tag>
        <span class="views-text">{{ item.views || 100 }} 次浏览</span>
      </div>

      <h3 class="product-title" :title="itemTitle">
        {{ itemTitle }}
      </h3>

      <div class="seller-row">
        <el-icon><User /></el-icon>
        <span class="seller-name">{{ itemSeller }}</span>
      </div>

      <div class="card-footer">
        <div class="price-box">
          <span class="price-symbol">¥</span>
          <span class="price-number">{{ Number(itemPrice).toFixed(2) }}</span>
          <span v-if="itemOriginalPrice" class="original-price">
            ¥{{ Number(itemOriginalPrice).toFixed(2) }}
          </span>
        </div>

        <el-button
          type="primary"
          size="small"
          circle
          :icon="ShoppingCart"
          class="add-cart-btn"
          @click.stop="handleAddToCart"
          title="加入购物车"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { ShoppingCart, User } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { useCartStore } from '../stores/cart'

const props = defineProps({
  item: {
    type: Object,
    required: true
  },
  type: {
    type: String,
    default: 'book' // 'book' or 'good'
  }
})

const router = useRouter()
const cartStore = useCartStore()

const itemTitle = computed(() => {
  return props.type === 'book' ? props.item.bname : props.item.gname
})

const itemPrice = computed(() => {
  return props.type === 'book' ? props.item.bprice : props.item.gprice
})

const itemOriginalPrice = computed(() => {
  return props.item.originalPrice || null
})

const itemCollege = computed(() => {
  return props.type === 'book' ? props.item.college : props.item.gcollege
})

const itemCondition = computed(() => {
  return props.type === 'book' ? props.item.bstatus : props.item.gstatus
})

const itemSeller = computed(() => {
  return props.item.usersname || '在校同学'
})

const isTextbook = computed(() => {
  return props.type === 'book' && props.item.reference
})

const itemImage = computed(() => {
  if (props.type === 'book') {
    return props.item.picture || './images/tuijian.png'
  }
  return props.item.gpicture || './images/zahuopu.png'
})

const handleImgError = (e) => {
  e.target.src = props.type === 'book' ? './images/tuijian.png' : './images/zahuopu.png'
}

const goToDetail = () => {
  if (props.type === 'book') {
    router.push(`/book/${props.item.bookid}`)
  } else {
    router.push(`/good/${props.item.goodid}`)
  }
}

const handleAddToCart = () => {
  const res = cartStore.addItem(props.item, props.type)
  if (res.success) {
    ElMessage.success('已加入购物车！')
  } else if (res.message) {
    ElMessage.warning(res.message)
  }
}
</script>

<style scoped>
.product-card {
  background: #ffffff;
  border-radius: var(--radius-base);
  overflow: hidden;
  border: 1px solid #ebeef5;
  cursor: pointer;
  display: flex;
  flex-direction: column;
}

.img-wrapper {
  position: relative;
  width: 100%;
  height: 180px;
  background-color: #f7f9fc;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.product-img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  transition: transform 0.3s ease;
}

.product-card:hover .product-img {
  transform: scale(1.05);
}

.campus-tag {
  position: absolute;
  top: 8px;
  left: 8px;
  background: rgba(30, 104, 201, 0.85);
  color: #fff;
  font-size: 11px;
  padding: 2px 6px;
  border-radius: 4px;
}

.textbook-tag {
  position: absolute;
  top: 8px;
  right: 8px;
  background: rgba(103, 194, 58, 0.9);
  color: #fff;
  font-size: 11px;
  padding: 2px 6px;
  border-radius: 4px;
}

.card-body {
  padding: 12px;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.card-status-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
}

.views-text {
  font-size: 11px;
  color: #909399;
}

.product-title {
  font-size: 14px;
  font-weight: 600;
  color: #2c3e50;
  line-height: 1.4;
  height: 40px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  margin-bottom: 8px;
}

.seller-row {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: #909399;
  margin-bottom: 10px;
}

.card-footer {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-top: auto;
  padding-top: 6px;
  border-top: 1px dashed #f0f2f5;
}

.price-box {
  display: flex;
  align-items: baseline;
  gap: 2px;
}

.original-price {
  font-size: 12px;
  color: #c0c4cc;
  text-decoration: line-through;
  margin-left: 6px;
}

.add-cart-btn {
  background-color: var(--primary-color);
  border-color: var(--primary-color);
}
.add-cart-btn:hover {
  background-color: var(--primary-hover);
}
</style>
