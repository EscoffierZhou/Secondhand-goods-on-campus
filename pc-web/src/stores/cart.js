import { defineStore } from 'pinia'
import {
  getCart,
  addToCart as storageAddToCart,
  removeFromCart as storageRemoveFromCart,
  clearCart as storageClearCart,
  createOrder
} from '../services/storage'
import { useUserStore } from './user'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: []
  }),

  getters: {
    totalCount: (state) => state.items.length,
    selectedItems: (state) => state.items.filter(item => item.selected),
    selectedCount: (state) => state.items.filter(item => item.selected).length,
    isAllSelected: (state) => state.items.length > 0 && state.items.every(item => item.selected),
    totalPrice: (state) => {
      const sum = state.items
        .filter(item => item.selected)
        .reduce((acc, cur) => acc + Number(cur.price || 0), 0)
      return sum.toFixed(2)
    },
    bookItems: (state) => state.items.filter(item => item.productType === 'book'),
    goodItems: (state) => state.items.filter(item => item.productType === 'good')
  },

  actions: {
    loadCart() {
      const userStore = useUserStore()
      this.items = getCart(userStore.studentId)
    },

    addItem(product, productType = 'book') {
      const userStore = useUserStore()
      if (!userStore.isLoggedIn) {
        userStore.openAuthDialog()
        return { success: false, message: '请先完成学生身份认证再加入购物车' }
      }

      const cartItem = {
        studentId: userStore.studentId,
        productId: productType === 'book' ? product.bookid : product.goodid,
        productType,
        title: productType === 'book' ? product.bname : product.gname,
        price: productType === 'book' ? product.bprice : product.gprice,
        picture: productType === 'book' ? product.picture : product.gpicture,
        college: productType === 'book' ? product.college : product.gcollege,
        statusDesc: productType === 'book' ? product.bstatus : product.gstatus,
        seller: product.usersname || '同学',
        sellerPhone: product.phone || ''
      }

      const res = storageAddToCart(cartItem)
      if (res.success) {
        this.loadCart()
      }
      return res
    },

    removeItem(cartId) {
      storageRemoveFromCart(cartId)
      this.loadCart()
    },

    toggleSelect(cartId) {
      const item = this.items.find(i => i.cartId === cartId)
      if (item) {
        item.selected = !item.selected
        // 同步到 storage
        const userStore = useUserStore()
        const all = getCart()
        const target = all.find(i => i.cartId === cartId)
        if (target) {
          target.selected = item.selected
          localStorage.setItem('campus_2nd_cart', JSON.stringify(all))
        }
      }
    },

    toggleAll(status) {
      this.items.forEach(i => (i.selected = status))
      const all = getCart()
      all.forEach(i => {
        if (this.items.some(item => item.cartId === i.cartId)) {
          i.selected = status
        }
      })
      localStorage.setItem('campus_2nd_cart', JSON.stringify(all))
    },

    checkout(reservationInfo) {
      const userStore = useUserStore()
      const selected = this.selectedItems
      if (selected.length === 0) {
        return { success: false, message: '请选择需要预约购买的物品' }
      }

      const order = createOrder({
        items: selected,
        totalAmount: Number(this.totalPrice),
        buyerStudentId: userStore.studentId,
        buyerName: reservationInfo.buyerName || userStore.nickName,
        buyerPhone: reservationInfo.buyerPhone || userStore.currentUser?.phone || '',
        campus: reservationInfo.campus || userStore.currentCampus,
        meetPlace: reservationInfo.meetPlace || '校内公共地点面交',
        meetTime: reservationInfo.meetTime || '按约定时间',
        note: reservationInfo.note || '无特殊备注'
      })

      // 从购物车移除已结算商品
      selected.forEach(item => {
        storageRemoveFromCart(item.cartId)
      })
      this.loadCart()

      return { success: true, order }
    }
  }
})
