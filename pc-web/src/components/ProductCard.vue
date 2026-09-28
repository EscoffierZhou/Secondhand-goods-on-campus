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

        <div class="card-btn-group">
          <el-button
            :type="isFav ? 'warning' : 'default'"
            size="small"
            circle
            :icon="Star"
            class="fav-btn"
            @click.stop="handleToggleFav"
            :title="isFav ? '已收藏' : '加入收藏'"
          />
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
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ShoppingCart, User, Star } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { useCartStore } from '../stores/cart'
import { useUserStore } from '../stores/user'
import { isFavorite, toggleFavorite } from '../services/storage'

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
const userStore = useUserStore()

const isFav = ref(false)

const checkFav = () => {
  if (userStore.studentId) {
    const id = props.type === 'book' ? props.item.bookid : props.item.goodid
    isFav.value = isFavorite(userStore.studentId, id)
  }
}

onMounted(checkFav)

const handleToggleFav = () => {
  if (!userStore.isLoggedIn) {
    userStore.openAuthDialog()
    return
  }
  const res = toggleFavorite(userStore.studentId, props.item, props.type)
  isFav.value = res.favorited
  if (res.favorited) {
    ElMessage.success(res.message)
  } else {
    ElMessage.info(res.message)
  }
}

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
  background: var(--bg-card);
  border-radius: var(--radius-lg);
  overflow: hidden;
  border: 1px solid var(--border-color);
  cursor: pointer;
  display: flex;
  flex-direction: column;
  box-shadow: var(--shadow-sm);
  transition: all 0.28s cubic-bezier(0.16, 1, 0.3, 1);
}

.product-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-hover);
  border-color: var(--primary-color);
}

.img-wrapper {
  position: relative;
  width: 100%;
  height: 190px;
  background-color: var(--bg-card-subtle);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.product-img {
  max-width: 88%;
  max-height: 88%;
  object-fit: contain;
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}

.product-card:hover .product-img {
  transform: scale(1.06);
}

.campus-tag {
  position: absolute;
  top: 10px;
  left: 10px;
  background: rgba(15, 23, 42, 0.65);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  color: #ffffff;
  font-size: 11px;
  font-weight: 500;
  padding: 3px 8px;
  border-radius: var(--radius-full);
}

.textbook-tag {
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(16, 185, 129, 0.88);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  color: #ffffff;
  font-size: 11px;
  font-weight: 500;
  padding: 3px 8px;
  border-radius: var(--radius-full);
}

.card-body {
  padding: var(--card-inner-padding, 16px);
  display: flex;
  flex-direction: column;
  flex: 1;
}

.card-status-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.condition-badge {
  font-size: 11px;
  border-radius: 4px;
}

.views-text {
  font-size: 11px;
  color: var(--text-secondary);
}

.product-title {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-main);
  line-height: 1.5;
  height: 42px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  margin-bottom: 10px;
  transition: color 0.2s;
}

.product-card:hover .product-title {
  color: var(--primary-color);
}

.seller-row {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 12px;
  color: var(--text-secondary);
  margin-bottom: 12px;
}

.card-footer {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-top: auto;
  padding-top: 10px;
  border-top: 1px dashed var(--border-subtle);
}

.price-box {
  display: flex;
  align-items: baseline;
  gap: 2px;
}

.original-price {
  font-size: 12px;
  color: var(--text-secondary);
  text-decoration: line-through;
  margin-left: 6px;
}

.card-btn-group {
  display: flex;
  align-items: center;
  gap: 6px;
}

.fav-btn {
  transition: all 0.2s ease;
}

.add-cart-btn {
  background-color: var(--primary-color);
  border-color: var(--primary-color);
  transition: background-color 0.2s ease;
}

.add-cart-btn:hover {
  background-color: var(--primary-hover);
  border-color: var(--primary-hover);
}
</style>
