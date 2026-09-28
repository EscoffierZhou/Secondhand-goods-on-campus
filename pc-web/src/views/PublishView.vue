<template>
  <div class="publish-view page-container">
    <div class="pc-container">
      <div class="page-title-row">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>发布中心</el-breadcrumb-item>
        </el-breadcrumb>
      </div>

      <div class="publish-card">
        <!-- 未登录拦截提示 -->
        <div v-if="!userStore.isLoggedIn" class="auth-gate">
          <el-alert
            title="请先完成学生身份认证"
            type="warning"
            show-icon
            description="根据校园绿色二手交易准则，仅认证学生身份后可发布物品与兼职，请先登录认证。"
            style="margin-bottom: 20px;"
          />
          <el-button type="primary" size="large" @click="userStore.openAuthDialog">
            立即进行学生身份认证
          </el-button>
        </div>

        <template v-else>
          <div class="publish-header-box">
            <h2 class="publish-main-title">发布校园流转信息</h2>
            <p class="publish-sub-title">请真实、详尽填写物品或职位信息，共建诚信绿色的校园互助生态</p>
          </div>

          <el-tabs v-model="activeTab" class="publish-tabs" type="border-card">
            <!-- Tab 1: 发布二手图书 -->
            <el-tab-pane label="发布二手图书" name="book">
              <el-form
                :model="bookForm"
                :rules="bookRules"
                ref="bookFormRef"
                label-width="110px"
                class="form-container"
              >
                <el-row :gutter="20">
                  <el-col :span="12">
                    <el-form-item label="图书书名" prop="bname">
                      <el-input v-model="bookForm.bname" placeholder="请输入完整图书书名，如：高等数学第七版" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="著者/译者" prop="author">
                      <el-input v-model="bookForm.author" placeholder="请输入图书作者，如：同济大学数学系" />
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row :gutter="20">
                  <el-col :span="12">
                    <el-form-item label="出版机构" prop="press">
                      <el-input v-model="bookForm.press" placeholder="请输入出版社，如：高等教育出版社" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="是否教材" prop="reference">
                      <el-switch
                        v-model="bookForm.reference"
                        active-text="专业课程教材 / 考研笔记资料"
                        inactive-text="普通课外读物"
                      />
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row :gutter="20">
                  <el-col :span="12">
                    <el-form-item label="成色评级" prop="bstatus">
                      <el-select v-model="bookForm.bstatus" placeholder="请选择书籍成色" style="width: 100%;">
                        <el-option label="全新" value="全新" />
                        <el-option label="几乎全新" value="几乎全新" />
                        <el-option label="少量笔记" value="少量笔记" />
                        <el-option label="较多笔记" value="较多笔记" />
                        <el-option label="不影响阅读" value="不影响阅读" />
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="所在校区" prop="college">
                      <el-radio-group v-model="bookForm.college">
                        <el-radio label="咸安校区">咸安校区</el-radio>
                        <el-radio label="温泉校区">温泉校区</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row :gutter="20">
                  <el-col :span="12">
                    <el-form-item label="转让价格" prop="bprice">
                      <el-input-number
                        v-model="bookForm.bprice"
                        :precision="2"
                        :step="1"
                        :min="0"
                        style="width: 180px;"
                      />
                      <span class="unit-text">元</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="参考原价">
                      <el-input-number
                        v-model="bookForm.originalPrice"
                        :precision="2"
                        :step="5"
                        :min="0"
                        style="width: 180px;"
                      />
                      <span class="unit-text">元 (选填)</span>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row :gutter="20">
                  <el-col :span="12">
                    <el-form-item label="联系电话" prop="phone">
                      <el-input v-model="bookForm.phone" placeholder="请输入您的手机号便于当面面交" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="封面图片">
                      <div class="img-uploader-row">
                        <input type="file" accept="image/*" @change="e => handleImgUpload(e, 'book')" />
                        <div v-if="bookForm.picture" class="img-preview-thumb">
                          <img :src="bookForm.picture" alt="封面预览" />
                        </div>
                      </div>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-form-item label="批注与描述" prop="bnote">
                  <el-input
                    v-model="bookForm.bnote"
                    type="textarea"
                    rows="3"
                    placeholder="可详细说明书本画线笔记情况、版本版次、有无课后题答案、附带资料等..."
                  />
                </el-form-item>

                <el-form-item>
                  <el-button type="primary" size="large" :loading="submitLoading" @click="submitBook">
                    确认立即发布二手图书
                  </el-button>
                  <el-button size="large" @click="resetBookForm">清空重填</el-button>
                </el-form-item>
              </el-form>
            </el-tab-pane>

            <!-- Tab 2: 发布闲置好物 -->
            <el-tab-pane label="发布闲置好物" name="good">
              <el-form
                :model="goodForm"
                :rules="goodRules"
                ref="goodFormRef"
                label-width="110px"
                class="form-container"
              >
                <el-row :gutter="20">
                  <el-col :span="14">
                    <el-form-item label="物品名称" prop="gname">
                      <el-input v-model="goodForm.gname" placeholder="请输入物品品牌及型号，如：捷安特山地自行车" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="所在校区" prop="gcollege">
                      <el-radio-group v-model="goodForm.gcollege">
                        <el-radio label="咸安校区">咸安校区</el-radio>
                        <el-radio label="温泉校区">温泉校区</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row :gutter="20">
                  <el-col :span="12">
                    <el-form-item label="成色描述" prop="gstatus">
                      <el-select v-model="goodForm.gstatus" placeholder="请选择物品成色" style="width: 100%;">
                        <el-option label="全新" value="全新" />
                        <el-option label="几乎全新" value="几乎全新" />
                        <el-option label="九成新" value="九成新" />
                        <el-option label="八成新" value="八成新" />
                        <el-option label="七成新" value="七成新" />
                        <el-option label="六成新" value="六成新" />
                        <el-option label="五成新及以下" value="五成新及以下" />
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="转让价格" prop="gprice">
                      <el-input-number
                        v-model="goodForm.gprice"
                        :precision="2"
                        :step="5"
                        :min="0"
                        style="width: 180px;"
                      />
                      <span class="unit-text">元</span>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row :gutter="20">
                  <el-col :span="12">
                    <el-form-item label="参考原价">
                      <el-input-number
                        v-model="goodForm.originalPrice"
                        :precision="2"
                        :step="10"
                        :min="0"
                        style="width: 180px;"
                      />
                      <span class="unit-text">元 (选填)</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="联系电话" prop="phone">
                      <el-input v-model="goodForm.phone" placeholder="请输入联系电话" />
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-form-item label="物品实拍图">
                  <div class="img-uploader-row">
                    <input type="file" accept="image/*" @change="e => handleImgUpload(e, 'good')" />
                    <div v-if="goodForm.gpicture" class="img-preview-thumb">
                      <img :src="goodForm.gpicture" alt="实拍预览" />
                    </div>
                  </div>
                </el-form-item>

                <el-form-item label="详情与备注" prop="gnote">
                  <el-input
                    v-model="goodForm.gnote"
                    type="textarea"
                    rows="3"
                    placeholder="可详述使用体验、转让原因（如毕业带不走）、功能测试说明、附赠配件等..."
                  />
                </el-form-item>

                <el-form-item>
                  <el-button type="primary" size="large" :loading="submitLoading" @click="submitGood">
                    确认立即发布闲置物品
                  </el-button>
                  <el-button size="large" @click="resetGoodForm">清空重填</el-button>
                </el-form-item>
              </el-form>
            </el-tab-pane>

            <!-- Tab 3: 发布兼职岗位 -->
            <el-tab-pane label="发布校园兼职" name="job">
              <el-form
                :model="jobForm"
                :rules="jobRules"
                ref="jobFormRef"
                label-width="110px"
                class="form-container"
              >
                <el-row :gutter="20">
                  <el-col :span="14">
                    <el-form-item label="兼职名称" prop="title">
                      <el-input v-model="jobForm.title" placeholder="如：图书馆阅览室整理员、周末初中数学家教" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="薪资待遇" prop="workpay">
                      <el-input v-model="jobForm.workpay" placeholder="如：20元/小时、80元/半天" />
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row :gutter="20">
                  <el-col :span="12">
                    <el-form-item label="工作地点" prop="workplace">
                      <el-input v-model="jobForm.workplace" placeholder="如：温泉校区图书馆、咸安教师公寓" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="工作时间" prop="worktime">
                      <el-input v-model="jobForm.worktime" placeholder="如：周一至周五晚18:30-21:00" />
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row :gutter="20">
                  <el-col :span="12">
                    <el-form-item label="发布者主体" prop="username">
                      <el-input v-model="jobForm.username" placeholder="如：图书馆管理科、张女士" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="联系方式" prop="workcontact">
                      <el-input v-model="jobForm.workcontact" placeholder="如：13800000000 (微信同号)" />
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-form-item label="人员要求" prop="workrequirement">
                  <el-input
                    v-model="jobForm.workrequirement"
                    type="textarea"
                    rows="2"
                    placeholder="如：全日制在校生，细心耐心，能服从调度，有家教经验优先..."
                  />
                </el-form-item>

                <el-form-item label="职责详情" prop="discription">
                  <el-input
                    v-model="jobForm.discription"
                    type="textarea"
                    rows="3"
                    placeholder="详细描述具体工作流程、有无提供餐食交通补贴等..."
                  />
                </el-form-item>

                <el-form-item>
                  <el-button type="primary" size="large" :loading="submitLoading" @click="submitJob">
                    确认立即发布兼职招聘
                  </el-button>
                  <el-button size="large" @click="resetJobForm">清空重填</el-button>
                </el-form-item>
              </el-form>
            </el-tab-pane>
          </el-tabs>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { useUserStore } from '../stores/user'
import { useMarketStore } from '../stores/market'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const marketStore = useMarketStore()

const activeTab = ref('book')
const submitLoading = ref(false)

const bookFormRef = ref(null)
const goodFormRef = ref(null)
const jobFormRef = ref(null)

// 1. 图书表单
const bookForm = reactive({
  bname: '',
  author: '',
  press: '',
  reference: true,
  bstatus: '少量笔记',
  college: '咸安校区',
  bprice: 15.00,
  originalPrice: 48.00,
  phone: '',
  picture: './images/tuijian.png',
  bnote: ''
})

const bookRules = {
  bname: [{ required: true, message: '请输入图书书名', trigger: 'blur' }],
  author: [{ required: true, message: '请输入作者', trigger: 'blur' }],
  press: [{ required: true, message: '请输入出版社', trigger: 'blur' }],
  bstatus: [{ required: true, message: '请选择成色', trigger: 'change' }],
  college: [{ required: true, message: '请选择校区', trigger: 'change' }],
  bprice: [{ required: true, message: '请输入售价', trigger: 'blur' }],
  phone: [{ required: true, message: '请输入联系电话', trigger: 'blur' }]
}

// 2. 物品表单
const goodForm = reactive({
  gname: '',
  gcollege: '咸安校区',
  gstatus: '八成新',
  gprice: 35.00,
  originalPrice: 99.00,
  phone: '',
  gpicture: './images/zahuopu.png',
  gnote: ''
})

const goodRules = {
  gname: [{ required: true, message: '请输入物品名称', trigger: 'blur' }],
  gstatus: [{ required: true, message: '请选择物品成色', trigger: 'change' }],
  gprice: [{ required: true, message: '请输入转让价格', trigger: 'blur' }],
  phone: [{ required: true, message: '请输入联系电话', trigger: 'blur' }]
}

// 3. 兼职表单
const jobForm = reactive({
  title: '',
  workpay: '20 元 / 小时',
  workplace: '咸安校区',
  worktime: '课余空闲时间',
  username: '',
  workcontact: '',
  workrequirement: '在校学生，工作细心负责，守时诚信。',
  discription: ''
})

const jobRules = {
  title: [{ required: true, message: '请输入兼职职位名称', trigger: 'blur' }],
  workpay: [{ required: true, message: '请输入薪资待遇', trigger: 'blur' }],
  workplace: [{ required: true, message: '请输入工作地点', trigger: 'blur' }],
  worktime: [{ required: true, message: '请输入工作时间', trigger: 'blur' }],
  workcontact: [{ required: true, message: '请输入联系方式', trigger: 'blur' }]
}

onMounted(() => {
  if (route.query.tab) {
    activeTab.value = String(route.query.tab)
  }
  if (userStore.isLoggedIn) {
    bookForm.phone = userStore.currentUser?.phone || ''
    bookForm.college = userStore.currentCampus
    goodForm.phone = userStore.currentUser?.phone || ''
    goodForm.gcollege = userStore.currentCampus
    jobForm.username = userStore.nickName
    jobForm.workcontact = userStore.currentUser?.phone || ''
  }
})

// 处理本地图片 Base64 快速预览与保存
const handleImgUpload = (e, type) => {
  const file = e.target.files[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = (uploadEvent) => {
    if (type === 'book') {
      bookForm.picture = uploadEvent.target.result
    } else {
      goodForm.gpicture = uploadEvent.target.result
    }
    ElMessage.success('实物图片上传成功！')
  }
  reader.readAsDataURL(file)
}

// 提交图书
const submitBook = async () => {
  if (!bookFormRef.value) return
  await bookFormRef.value.validate((valid) => {
    if (valid) {
      submitLoading.value = true
      setTimeout(() => {
        const newBook = marketStore.publishBook({
          ...bookForm,
          studentId: userStore.studentId,
          usersname: userStore.nickName
        })
        submitLoading.value = false
        ElMessage.success('二手图书发布成功！')
        router.push(`/book/${newBook.bookid}`)
      }, 500)
    }
  })
}

// 提交闲置物品
const submitGood = async () => {
  if (!goodFormRef.value) return
  await goodFormRef.value.validate((valid) => {
    if (valid) {
      submitLoading.value = true
      setTimeout(() => {
        const newGood = marketStore.publishGood({
          ...goodForm,
          studentId: userStore.studentId,
          usersname: userStore.nickName
        })
        submitLoading.value = false
        ElMessage.success('闲置好物发布成功！')
        router.push(`/good/${newGood.goodid}`)
      }, 500)
    }
  })
}

// 提交兼职
const submitJob = async () => {
  if (!jobFormRef.value) return
  await jobFormRef.value.validate((valid) => {
    if (valid) {
      submitLoading.value = true
      setTimeout(() => {
        const newJob = marketStore.publishJob({
          ...jobForm,
          studentId: userStore.studentId
        })
        submitLoading.value = false
        ElMessage.success('兼职招聘发布成功！')
        router.push(`/job/${newJob.jobid}`)
      }, 500)
    }
  })
}

const resetBookForm = () => bookFormRef.value?.resetFields()
const resetGoodForm = () => goodFormRef.value?.resetFields()
const resetJobForm = () => jobFormRef.value?.resetFields()
</script>

<style scoped>
.page-title-row {
  margin-bottom: 20px;
}

.publish-card {
  background: #ffffff;
  border-radius: var(--radius-lg);
  padding: 30px;
  border: 1px solid #ebeef5;
  box-shadow: var(--shadow-sm);
}

.auth-gate {
  padding: 40px;
  text-align: center;
}

.publish-header-box {
  margin-bottom: 24px;
}

.publish-main-title {
  font-size: 22px;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 6px;
}

.publish-sub-title {
  font-size: 13px;
  color: #64748b;
}

.form-container {
  padding: 24px 20px;
}

.unit-text {
  margin-left: 8px;
  font-size: 13px;
  color: #64748b;
}

.img-uploader-row {
  display: flex;
  align-items: center;
  gap: 16px;
}

.img-preview-thumb {
  width: 50px;
  height: 50px;
  border-radius: 6px;
  overflow: hidden;
  border: 1px solid #cbd5e1;
}

.img-preview-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
