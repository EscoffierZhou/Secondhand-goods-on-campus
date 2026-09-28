<template>
  <div class="comment-section">
    <div class="section-top">
      <div class="title-row">
        <el-icon color="#1E68C9" :size="20"><ChatDotRound /></el-icon>
        <h3 class="section-title-text">物品留言沟通板</h3>
        <span class="count-badge">({{ comments.length }} 条留言)</span>
      </div>
      <span class="privacy-tip-inline">
        <el-icon><Lock /></el-icon> 保护个人隐私，推荐优先使用站内留言答疑
      </span>
    </div>

    <!-- 快捷提问词条 -->
    <div class="quick-tags">
      <span class="quick-title">快捷提问：</span>
      <el-tag
        v-for="q in quickQuestions"
        :key="q"
        size="small"
        effect="plain"
        class="quick-tag"
        @click="fillQuestion(q)"
      >
        {{ q }}
      </el-tag>
    </div>

    <!-- 留言输入框 -->
    <div class="comment-input-box">
      <el-input
        v-model="inputContent"
        type="textarea"
        rows="2"
        maxlength="200"
        show-word-limit
        placeholder="向卖家询问成色细节、笔记情况、自提碰头时间等..."
      />
      <div class="input-actions">
        <el-button
          type="primary"
          size="small"
          :loading="submitting"
          @click="submitComment"
        >
          发送留言咨询
        </el-button>
      </div>
    </div>

    <!-- 留言列表 -->
    <div v-if="comments.length > 0" class="comments-list">
      <div v-for="c in comments" :key="c.id" class="comment-item">
        <div class="comment-avatar">
          <el-avatar :size="36" :src="c.authorAvatar || './images/tabBar/mine.fill.png'" />
        </div>
        <div class="comment-main">
          <div class="comment-meta">
            <span class="comment-author">{{ c.author }}</span>
            <span class="comment-time">{{ c.time }}</span>
          </div>
          <p class="comment-body">{{ c.content }}</p>

          <!-- 卖家回复显示 -->
          <div v-if="c.reply" class="reply-box">
            <span class="reply-tag">卖家回复：</span>
            <span class="reply-text">{{ c.reply }}</span>
          </div>

          <!-- 回复操作区 -->
          <div v-else-if="isSeller" class="reply-trigger-box">
            <el-button
              v-if="replyingId !== c.id"
              link
              type="primary"
              size="small"
              @click="replyingId = c.id"
            >
              回复此留言
            </el-button>
            <div v-else class="reply-input-row">
              <el-input
                v-model="replyText"
                size="small"
                placeholder="输入回复内容..."
                style="max-width: 320px;"
              />
              <el-button type="primary" size="small" @click="handleSendReply(c.id)">确认</el-button>
              <el-button size="small" @click="replyingId = null">取消</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="no-comments">
      <span>暂无同学提问，快来抢先留下第一条咨询吧！</span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { ChatDotRound, Lock } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { useUserStore } from '../stores/user'
import { getComments, addComment, replyComment } from '../services/storage'

const props = defineProps({
  productId: {
    type: String,
    required: true
  },
  sellerStudentId: {
    type: String,
    default: ''
  }
})

const userStore = useUserStore()
const comments = ref([])
const inputContent = ref('')
const submitting = ref(false)
const replyingId = ref(null)
const replyText = ref('')

const quickQuestions = [
  '请问实物成色和描述相符吗？',
  '支持在宿舍楼下自提验货吗？',
  '期末考试重点有画线或做笔记吗？',
  '今天下午或晚上方便碰头交接吗？'
]

const isSeller = ref(false)

const loadComments = () => {
  comments.value = getComments(props.productId)
  if (userStore.studentId && props.sellerStudentId) {
    isSeller.value = String(userStore.studentId) === String(props.sellerStudentId)
  }
}

onMounted(() => {
  loadComments()
})

const fillQuestion = (q) => {
  inputContent.value = q
}

const submitComment = () => {
  if (!userStore.isLoggedIn) {
    userStore.openAuthDialog()
    return
  }
  if (!inputContent.value.trim()) {
    ElMessage.warning('请输入留言内容')
    return
  }

  submitting.value = true
  setTimeout(() => {
    addComment(props.productId, {
      author: userStore.nickName || '在校同学',
      authorAvatar: userStore.currentUser?.avatarUrl || './images/tabBar/mine.fill.png',
      content: inputContent.value.trim()
    })
    submitting.value = false
    inputContent.value = ''
    loadComments()
    ElMessage.success('留言已成功发送！')
  }, 300)
}

const handleSendReply = (commentId) => {
  if (!replyText.value.trim()) {
    ElMessage.warning('请输入回复内容')
    return
  }
  replyComment(props.productId, commentId, replyText.value.trim())
  replyingId.value = null
  replyText.value = ''
  loadComments()
  ElMessage.success('回复成功！')
}
</script>

<style scoped>
.comment-section {
  background: #ffffff;
  border-radius: var(--radius-lg);
  padding: 24px;
  border: 1px solid #ebeef5;
  margin-top: 24px;
}

.section-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  border-bottom: 1px solid #f0f2f5;
  padding-bottom: 12px;
}

.title-row {
  display: flex;
  align-items: center;
  gap: 8px;
}

.section-title-text {
  font-size: 17px;
  font-weight: 600;
  color: #1e293b;
}

.count-badge {
  font-size: 13px;
  color: #94a3b8;
}

.privacy-tip-inline {
  font-size: 12px;
  color: #10b981;
  display: flex;
  align-items: center;
  gap: 4px;
  background: #ecfdf5;
  padding: 2px 8px;
  border-radius: 4px;
}

.quick-tags {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
  flex-wrap: wrap;
}

.quick-title {
  font-size: 12px;
  color: #64748b;
}

.quick-tag {
  cursor: pointer;
  transition: all 0.2s;
}

.quick-tag:hover {
  background-color: var(--primary-light);
  color: var(--primary-color);
}

.comment-input-box {
  margin-bottom: 20px;
}

.input-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 8px;
}

.comments-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.comment-item {
  display: flex;
  gap: 12px;
  padding-bottom: 14px;
  border-bottom: 1px dashed #f1f5f9;
}

.comment-main {
  flex: 1;
}

.comment-meta {
  display: flex;
  justify-content: space-between;
  margin-bottom: 4px;
}

.comment-author {
  font-size: 13px;
  font-weight: 600;
  color: #334155;
}

.comment-time {
  font-size: 12px;
  color: #94a3b8;
}

.comment-body {
  font-size: 14px;
  color: #475569;
  line-height: 1.5;
  margin-bottom: 8px;
}

.reply-box {
  background: #f8fafc;
  border-left: 3px solid var(--primary-color);
  padding: 8px 12px;
  border-radius: 4px;
  font-size: 13px;
  color: #1e293b;
}

.reply-tag {
  color: var(--primary-color);
  font-weight: 600;
}

.reply-trigger-box {
  margin-top: 4px;
}

.reply-input-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 6px;
}

.no-comments {
  text-align: center;
  padding: 24px;
  font-size: 13px;
  color: #94a3b8;
}
</style>
