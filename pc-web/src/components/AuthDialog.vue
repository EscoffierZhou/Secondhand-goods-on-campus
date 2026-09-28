<template>
  <el-dialog
    v-model="userStore.authDialogOpen"
    title="学生身份认证 / 登录"
    width="440px"
    :close-on-click-modal="false"
    append-to-body
    class="auth-dialog"
  >
    <div class="auth-tips">
      <el-alert
        title="提示：系统需验证在校学生身份后才可进行发布与购买"
        type="info"
        show-icon
        :closable="false"
      />
    </div>

    <el-form :model="form" :rules="rules" ref="formRef" label-position="top">
      <el-form-item label="学生学号 (11位数字)" prop="studentId">
        <el-input
          v-model="form.studentId"
          placeholder="请输入学号，如：20151621029"
          maxlength="11"
          clearable
          :prefix-icon="User"
        />
      </el-form-item>

      <el-form-item label="认证密码 (6位数字)" prop="passWord">
        <el-input
          v-model="form.passWord"
          type="password"
          placeholder="请输入6位密码，默认：666666"
          maxlength="6"
          show-password
          clearable
          :prefix-icon="Lock"
          @keyup.enter="handleLogin"
        />
      </el-form-item>
    </el-form>

    <div class="quick-fill-box">
      <div class="fill-title">快捷测试：</div>
      <el-button size="small" type="primary" plain @click="fillTestAccount">
        填入原项目测试账号 (20151621029 / 666666)
      </el-button>
    </div>

    <template #footer>
      <div class="dialog-footer">
        <el-button @click="handleGuestLogin">游客极速体验</el-button>
        <el-button type="primary" :loading="loading" @click="handleLogin">
          立即认证登录
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { User, Lock } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { useUserStore } from '../stores/user'

const userStore = useUserStore()
const formRef = ref(null)
const loading = ref(false)

const form = reactive({
  studentId: '20151621029',
  passWord: '666666'
})

const rules = {
  studentId: [
    { required: true, message: '请输入学生学号', trigger: 'blur' },
    { pattern: /^\d{11}$/, message: '学号必须为11位数字', trigger: 'blur' }
  ],
  passWord: [
    { required: true, message: '请输入认证密码', trigger: 'blur' },
    { pattern: /^\d{6}$/, message: '密码必须为6位数字', trigger: 'blur' }
  ]
}

const fillTestAccount = () => {
  form.studentId = '20151621029'
  form.passWord = '666666'
  ElMessage.success('已自动填入原小程序测试账号')
}

const handleLogin = async () => {
  if (!formRef.value) return
  await formRef.value.validate((valid) => {
    if (valid) {
      loading.value = true
      setTimeout(() => {
        const res = userStore.login(form.studentId, form.passWord)
        loading.value = false
        if (res.success) {
          ElMessage.success('学生身份认证成功！欢迎来到校园二手交易平台')
          userStore.closeAuthDialog()
        } else {
          ElMessage.error(res.message || '认证失败，请检查学号与密码')
        }
      }, 400)
    }
  })
}

const handleGuestLogin = () => {
  userStore.loginAsGuest()
  ElMessage.success('已切换为演示认证模式！')
  userStore.closeAuthDialog()
}
</script>

<style scoped>
.auth-tips {
  margin-bottom: 16px;
}

.quick-fill-box {
  background: #f8fafc;
  padding: 12px;
  border-radius: 6px;
  border: 1px dashed #dcdfe6;
  margin-top: 8px;
}

.fill-title {
  font-size: 12px;
  color: #909399;
  margin-bottom: 6px;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}
</style>
