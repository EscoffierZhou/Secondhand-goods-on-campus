import {
  INITIAL_BOOKS,
  INITIAL_GOODS,
  INITIAL_JOBS,
  INITIAL_NOTICES
} from '../mock/initialData'

const STORAGE_KEYS = {
  INIT_FLAG: 'campus_2nd_initialized_v1',
  BOOKS: 'campus_2nd_books',
  GOODS: 'campus_2nd_goods',
  JOBS: 'campus_2nd_jobs',
  CART: 'campus_2nd_cart',
  ORDERS: 'campus_2nd_orders',
  USER: 'campus_2nd_user',
  NOTICES: 'campus_2nd_notices',
  COMMENTS: 'campus_2nd_comments',
  FAVORITES: 'campus_2nd_favorites'
}

// 确保基础数据已加载
export function initLocalStorage() {
  if (!localStorage.getItem(STORAGE_KEYS.INIT_FLAG)) {
    resetAllData()
  }
}

// 重置所有数据为初始演示状态
export function resetAllData() {
  localStorage.setItem(STORAGE_KEYS.BOOKS, JSON.stringify(INITIAL_BOOKS))
  localStorage.setItem(STORAGE_KEYS.GOODS, JSON.stringify(INITIAL_GOODS))
  localStorage.setItem(STORAGE_KEYS.JOBS, JSON.stringify(INITIAL_JOBS))
  localStorage.setItem(STORAGE_KEYS.NOTICES, JSON.stringify(INITIAL_NOTICES))
  localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify([]))
  localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify([
    {
      orderId: 'ORD_2024051801',
      createdAt: '2024-05-18 10:20',
      status: 'pending', // pending, completed, cancelled
      items: [
        {
          id: 'b_1001',
          type: 'book',
          title: '高等数学（第七版 上下册合订）',
          price: 15.00,
          college: '温泉校区',
          picture: './images/tuijian.png',
          seller: '李学长 (理学院)',
          sellerPhone: '13871234567'
        }
      ],
      totalAmount: 15.00,
      buyerStudentId: '20151621029',
      buyerName: '朱同学',
      buyerPhone: '13888888888',
      campus: '温泉校区',
      meetPlace: '一号教学楼大厅',
      meetTime: '明天中午 12:30',
      note: '下课后在教学楼一楼大厅碰头'
    }
  ]))
  localStorage.setItem(STORAGE_KEYS.INIT_FLAG, 'true')
}

// --- 图书 Books ---
export function getBooks() {
  initLocalStorage()
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.BOOKS) || '[]')
  } catch {
    return INITIAL_BOOKS
  }
}

export function getBookById(bookId) {
  const books = getBooks()
  return books.find(b => String(b.bookid) === String(bookId)) || null
}

export function saveBook(book) {
  const books = getBooks()
  const newBook = {
    bookid: 'b_' + Date.now(),
    views: 1,
    createdAt: new Date().toLocaleString(),
    ...book
  }
  books.unshift(newBook)
  localStorage.setItem(STORAGE_KEYS.BOOKS, JSON.stringify(books))
  return newBook
}

export function deleteBook(bookId) {
  let books = getBooks()
  books = books.filter(b => String(b.bookid) !== String(bookId))
  localStorage.setItem(STORAGE_KEYS.BOOKS, JSON.stringify(books))
}

// --- 闲置物品 Goods ---
export function getGoods() {
  initLocalStorage()
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.GOODS) || '[]')
  } catch {
    return INITIAL_GOODS
  }
}

export function getGoodById(goodId) {
  const goods = getGoods()
  return goods.find(g => String(g.goodid) === String(goodId)) || null
}

export function saveGood(good) {
  const goods = getGoods()
  const newGood = {
    goodid: 'g_' + Date.now(),
    views: 1,
    createdAt: new Date().toLocaleString(),
    ...good
  }
  goods.unshift(newGood)
  localStorage.setItem(STORAGE_KEYS.GOODS, JSON.stringify(goods))
  return newGood
}

export function deleteGood(goodId) {
  let goods = getGoods()
  goods = goods.filter(g => String(g.goodid) !== String(goodId))
  localStorage.setItem(STORAGE_KEYS.GOODS, JSON.stringify(goods))
}

// --- 校园兼职 Jobs ---
export function getJobs() {
  initLocalStorage()
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.JOBS) || '[]')
  } catch {
    return INITIAL_JOBS
  }
}

export function getJobById(jobId) {
  const jobs = getJobs()
  return jobs.find(j => String(j.jobid) === String(jobId)) || null
}

export function saveJob(job) {
  const jobs = getJobs()
  const newJob = {
    jobid: 'j_' + Date.now(),
    createdAt: new Date().toLocaleString(),
    ...job
  }
  jobs.unshift(newJob)
  localStorage.setItem(STORAGE_KEYS.JOBS, JSON.stringify(jobs))
  return newJob
}

export function deleteJob(jobId) {
  let jobs = getJobs()
  jobs = jobs.filter(j => String(j.jobid) !== String(jobId))
  localStorage.setItem(STORAGE_KEYS.JOBS, JSON.stringify(jobs))
}

// --- 购物车 Cart ---
export function getCart(studentId) {
  initLocalStorage()
  try {
    const list = JSON.parse(localStorage.getItem(STORAGE_KEYS.CART) || '[]')
    if (!studentId) return list
    return list.filter(item => item.studentId === studentId)
  } catch {
    return []
  }
}

export function addToCart(cartItem) {
  initLocalStorage()
  const list = JSON.parse(localStorage.getItem(STORAGE_KEYS.CART) || '[]')
  // 检查是否重复
  const exists = list.find(item => item.studentId === cartItem.studentId && item.productId === cartItem.productId && item.productType === cartItem.productType)
  if (exists) {
    return { success: false, message: '该物品已在购物车中，请勿重复添加' }
  }
  const item = {
    cartId: 'c_' + Date.now() + Math.random().toString(36).substring(2, 6),
    selected: true,
    addedAt: new Date().toLocaleString(),
    ...cartItem
  }
  list.unshift(item)
  localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(list))
  return { success: true, item }
}

export function removeFromCart(cartId) {
  let list = JSON.parse(localStorage.getItem(STORAGE_KEYS.CART) || '[]')
  list = list.filter(item => item.cartId !== cartId)
  localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(list))
}

export function clearCart(studentId) {
  let list = JSON.parse(localStorage.getItem(STORAGE_KEYS.CART) || '[]')
  if (studentId) {
    list = list.filter(item => item.studentId !== studentId)
  } else {
    list = []
  }
  localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(list))
}

// --- 订单与预约 Orders ---
export function getOrders(studentId) {
  initLocalStorage()
  try {
    const list = JSON.parse(localStorage.getItem(STORAGE_KEYS.ORDERS) || '[]')
    if (!studentId) return list
    return list.filter(o => o.buyerStudentId === studentId || o.sellerStudentId === studentId)
  } catch {
    return []
  }
}

export function createOrder(orderData) {
  initLocalStorage()
  const list = JSON.parse(localStorage.getItem(STORAGE_KEYS.ORDERS) || '[]')
  const newOrder = {
    orderId: 'ORD_' + Date.now(),
    createdAt: new Date().toLocaleString(),
    status: 'pending', // pending, completed, cancelled
    ...orderData
  }
  list.unshift(newOrder)
  localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(list))
  return newOrder
}

export function updateOrderStatus(orderId, status) {
  const list = JSON.parse(localStorage.getItem(STORAGE_KEYS.ORDERS) || '[]')
  const order = list.find(o => o.orderId === orderId)
  if (order) {
    order.status = status
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(list))
  }
}

// --- 身份验证 Student Auth ---
export function verifyStudentAccount(studentId, passWord) {
  // 原项目测试账号
  if (studentId === '20151621029' && passWord === '666666') {
    return {
      success: true,
      user: {
        studentId: '20151621029',
        nickName: '朱同学',
        college: '咸安校区',
        department: '计算机与信息工程学院',
        phone: '13888888888',
        avatarUrl: './images/tabBar/mine.fill.png'
      }
    }
  }

  // 校验11位学号与6位密码规则，支持任意学生体验登录
  if (/^\d{11}$/.test(studentId) && /^\d{6}$/.test(passWord)) {
    return {
      success: true,
      user: {
        studentId: studentId,
        nickName: '同学_' + studentId.slice(-4),
        college: '咸安校区',
        department: '校园认证学子',
        phone: '138' + studentId.slice(-8),
        avatarUrl: './images/tabBar/mine.fill.png'
      }
    }
  }

  return {
    success: false,
    message: '学号或密码格式不正确（学号为11位数字，密码为6位数字）'
  }
}

// 快速游客登录模式
export function createGuestSession() {
  return {
    studentId: '20151621029',
    nickName: '朱同学 (演示认证)',
    college: '咸安校区',
    department: '计算机与信息工程学院',
    phone: '13888888888',
    avatarUrl: './images/tabBar/mine.fill.png'
  }
}

// --- 物品留言板 Comments ---
export function getComments(productId) {
  initLocalStorage()
  try {
    const all = JSON.parse(localStorage.getItem(STORAGE_KEYS.COMMENTS) || '{}')
    if (!all[productId]) {
      // 提供针对初始物品的真实问答种子数据
      all[productId] = [
        {
          id: 'cm_1',
          author: '学弟 (计科系)',
          authorAvatar: './images/tabBar/mine.fill.png',
          content: '请问学长，平时上课或期末考试重点都有用荧光笔记号勾选吗？',
          time: '2天前',
          reply: '有的，老师考前圈出的核心题型和习题都有详细红笔标注，可以直接复习。'
        }
      ]
      localStorage.setItem(STORAGE_KEYS.COMMENTS, JSON.stringify(all))
    }
    return all[productId] || []
  } catch {
    return []
  }
}

export function addComment(productId, commentData) {
  initLocalStorage()
  const all = JSON.parse(localStorage.getItem(STORAGE_KEYS.COMMENTS) || '{}')
  if (!all[productId]) {
    all[productId] = []
  }
  const newComment = {
    id: 'cm_' + Date.now(),
    time: '刚刚',
    reply: '',
    ...commentData
  }
  all[productId].unshift(newComment)
  localStorage.setItem(STORAGE_KEYS.COMMENTS, JSON.stringify(all))
  return newComment
}

export function replyComment(productId, commentId, replyText) {
  initLocalStorage()
  const all = JSON.parse(localStorage.getItem(STORAGE_KEYS.COMMENTS) || '{}')
  if (all[productId]) {
    const target = all[productId].find(c => c.id === commentId)
    if (target) {
      target.reply = replyText
      localStorage.setItem(STORAGE_KEYS.COMMENTS, JSON.stringify(all))
    }
  }
}

// --- 个人收藏 Favorites ---
export function getFavorites(studentId) {
  initLocalStorage()
  try {
    const all = JSON.parse(localStorage.getItem(STORAGE_KEYS.FAVORITES) || '[]')
    if (!studentId) return all
    return all.filter(f => f.studentId === studentId)
  } catch {
    return []
  }
}

export function isFavorite(studentId, productId) {
  if (!studentId) return false
  const list = getFavorites(studentId)
  return list.some(f => String(f.productId) === String(productId))
}

export function toggleFavorite(studentId, item, type = 'book') {
  initLocalStorage()
  let list = JSON.parse(localStorage.getItem(STORAGE_KEYS.FAVORITES) || '[]')
  const productId = type === 'book' ? item.bookid : item.goodid
  const existsIndex = list.findIndex(f => f.studentId === studentId && String(f.productId) === String(productId))

  if (existsIndex >= 0) {
    list.splice(existsIndex, 1)
    localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(list))
    return { favorited: false, message: '已取消收藏' }
  } else {
    list.unshift({
      favoriteId: 'fav_' + Date.now(),
      studentId,
      productId,
      type,
      title: type === 'book' ? item.bname : item.gname,
      price: type === 'book' ? item.bprice : item.gprice,
      picture: type === 'book' ? item.picture : item.gpicture,
      college: type === 'book' ? item.college : item.gcollege,
      status: type === 'book' ? item.bstatus : item.gstatus,
      savedAt: new Date().toLocaleDateString()
    })
    localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(list))
    return { favorited: true, message: '收藏成功！可前往【学生中心-我的收藏】查看' }
  }
}

export function removeFavorite(favoriteId) {
  initLocalStorage()
  let list = JSON.parse(localStorage.getItem(STORAGE_KEYS.FAVORITES) || '[]')
  list = list.filter(f => f.favoriteId !== favoriteId)
  localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(list))
}

// --- 管理后台 Admin Management ---
export function getAllItemsForAdmin() {
  const books = getBooks().map(b => ({
    id: b.bookid,
    type: 'book',
    typeName: '二手图书',
    title: b.bname,
    price: b.bprice,
    seller: b.usersname,
    studentId: b.studentId,
    college: b.college,
    status: b.isBanned ? 'banned' : 'active',
    createdAt: b.createdAt
  }))

  const goods = getGoods().map(g => ({
    id: g.goodid,
    type: 'good',
    typeName: '闲置杂货',
    title: g.gname,
    price: g.gprice,
    seller: g.usersname,
    studentId: g.studentId,
    college: g.gcollege,
    status: g.isBanned ? 'banned' : 'active',
    createdAt: g.createdAt
  }))

  return [...books, ...goods]
}

export function updateItemStatus(type, id, status) {
  if (type === 'book') {
    const books = getBooks()
    const target = books.find(b => String(b.bookid) === String(id))
    if (target) {
      target.isBanned = status === 'banned'
      localStorage.setItem(STORAGE_KEYS.BOOKS, JSON.stringify(books))
    }
  } else {
    const goods = getGoods()
    const target = goods.find(g => String(g.goodid) === String(id))
    if (target) {
      target.isBanned = status === 'banned'
      localStorage.setItem(STORAGE_KEYS.GOODS, JSON.stringify(goods))
    }
  }
}

