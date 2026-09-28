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

                <!-- AI 赋能助手条 -->
                <div class="ai-assist-bar">
                  <div class="ai-badge-group">
                    <span class="ai-tag-badge">🤖 数媒AI估价</span>
                    <span class="ai-hint-text">不确定二手书定多少钱合适？让AI测算校园最易出手的流转区间</span>
                  </div>
                  <el-button type="success" size="small" plain @click="openPricingDialog('book')">
                    ✨ AI 智能估价 & 行情测算
                  </el-button>
                </div>

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
                  <div class="field-header-row">
                    <span class="field-tip">可说明书本画线笔记情况、版本版次、有无课后题答案等</span>
                    <el-button type="primary" size="small" plain @click="openCopywriterDialog('book')">
                      ✨ AI 一键生成文案
                    </el-button>
                  </div>
                  <el-input
                    v-model="bookForm.bnote"
                    type="textarea"
                    rows="3"
                    placeholder="可详细说明书本画线笔记情况、版本版次、有无课后题答案、附带资料等..."
                  />
                  <div class="quick-style-tags">
                    <span class="tag-title">常用风格一键应用：</span>
                    <el-tag
                      v-for="s in quickBookStyles"
                      :key="s.key"
                      class="style-chip"
                      @click="applyQuickStyle('book', s.key)"
                    >
                      {{ s.name }}
                    </el-tag>
                  </div>
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
                </el-row>

                <!-- AI 赋能助手条 -->
                <div class="ai-assist-bar">
                  <div class="ai-badge-group">
                    <span class="ai-tag-badge">🤖 数媒AI估价</span>
                    <span class="ai-hint-text">根据物品损耗与品牌，快速测算校园二手好物合理价</span>
                  </div>
                  <el-button type="success" size="small" plain @click="openPricingDialog('good')">
                    ✨ AI 智能估价 & 行情测算
                  </el-button>
                </div>

                <el-row :gutter="20">
                  <el-col :span="12">
                    <el-form-item label="联系电话" prop="phone">
                      <el-input v-model="goodForm.phone" placeholder="请输入联系电话" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="物品实拍图">
                      <div class="img-uploader-row">
                        <input type="file" accept="image/*" @change="e => handleImgUpload(e, 'good')" />
                        <div v-if="goodForm.gpicture" class="img-preview-thumb">
                          <img :src="goodForm.gpicture" alt="实拍预览" />
                        </div>
                      </div>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-form-item label="详情与备注" prop="gnote">
                  <div class="field-header-row">
                    <span class="field-tip">可详述使用体验、转让原因、功能测试说明、附赠配件等</span>
                    <el-button type="primary" size="small" plain @click="openCopywriterDialog('good')">
                      ✨ AI 一键生成文案
                    </el-button>
                  </div>
                  <el-input
                    v-model="goodForm.gnote"
                    type="textarea"
                    rows="3"
                    placeholder="可详述使用体验、转让原因（如毕业带不走）、功能测试说明、附赠配件等..."
                  />
                  <div class="quick-style-tags">
                    <span class="tag-title">常用风格一键应用：</span>
                    <el-tag
                      v-for="s in quickGoodStyles"
                      :key="s.key"
                      class="style-chip"
                      @click="applyQuickStyle('good', s.key)"
                    >
                      {{ s.name }}
                    </el-tag>
                  </div>
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

      <!-- 弹窗 1: AI 智能估价 & 行情测算 -->
      <el-dialog
        v-model="aiPricingDialogVisible"
        title="✨ 校园二手 AI 科学估价与行情测算助手"
        width="560px"
        destroy-on-close
      >
        <div class="ai-modal-content">
          <div class="ai-modal-header">
            <span class="ai-model-tag">数媒大赛·智能算法加持</span>
            <p class="ai-modal-desc">
              基于校园供需模型、成色折损曲线及近 30 天校内流转数据综合推演。
            </p>
          </div>

          <div class="valuation-card">
            <div class="valuation-target">
              <span class="label">测算对象：</span>
              <span class="value">{{ aiPricingResult.name }}</span>
            </div>
            <div class="valuation-meta-row">
              <span>参考原价：¥{{ aiPricingResult.originalPrice.toFixed(2) }}</span>
              <span>成色级别：{{ aiPricingResult.condition }}</span>
              <span>建议折率：{{ aiPricingResult.discountRate }}</span>
            </div>

            <div class="valuation-result-box">
              <div class="result-price-col">
                <span class="sub-label">推荐校内速出价</span>
                <div class="big-price">
                  <span class="currency">¥</span>
                  <span class="number">{{ aiPricingResult.suggestedPrice.toFixed(2) }}</span>
                </div>
              </div>
              <div class="result-range-col">
                <span class="sub-label">建议定价区间</span>
                <span class="range-val">
                  ¥{{ aiPricingResult.minPrice.toFixed(2) }} ~ ¥{{ aiPricingResult.maxPrice.toFixed(2) }}
                </span>
              </div>
            </div>

            <div class="valuation-reasoning">
              <div class="reason-title">💡 AI 市场行情分析与定价建议：</div>
              <p class="reason-text">{{ aiPricingResult.reasoning }}</p>
            </div>
          </div>
        </div>

        <template #footer>
          <span class="dialog-footer">
            <el-button @click="aiPricingDialogVisible = false">取消</el-button>
            <el-button type="success" @click="applyAiPricing">
              采纳此推荐价 (¥{{ aiPricingResult.suggestedPrice.toFixed(2) }}) 并填入
            </el-button>
          </span>
        </template>
      </el-dialog>

      <!-- 弹窗 2: AI 校园特色文案生成器 -->
      <el-dialog
        v-model="aiCopyDialogVisible"
        title="✨ 校园特色 AI 转让文案一键生成"
        width="600px"
        destroy-on-close
      >
        <div class="ai-modal-content">
          <div class="style-select-box">
            <span class="select-label">选择文案风格模式：</span>
            <el-radio-group v-model="aiCopyForm.style" @change="generateAiCopyText">
              <el-radio-button label="study">🎓 学霸传承型</el-radio-button>
              <el-radio-button label="graduation">🏃‍♂️ 毕业急转型</el-radio-button>
              <el-radio-button label="funny">🎈 幽默生动型</el-radio-button>
              <el-radio-button label="concise">📋 客观实况型</el-radio-button>
            </el-radio-group>
          </div>

          <div class="extras-select-box">
            <span class="select-label">附加买家关切亮点：</span>
            <el-checkbox-group v-model="aiCopyForm.extras" @change="generateAiCopyText">
              <el-checkbox label="宿舍楼下当面验货">宿舍楼下当面验货</el-checkbox>
              <el-checkbox label="支持小刀">支持小刀</el-checkbox>
              <el-checkbox label="附送考研笔记/小配件">附送考研笔记/小配件</el-checkbox>
              <el-checkbox label="字迹工整无明显折痕">字迹工整无折痕</el-checkbox>
            </el-checkbox-group>
          </div>

          <div class="preview-copy-box">
            <div class="preview-header">
              <span>生成结果预览 (支持直接微调)：</span>
              <el-button type="primary" link size="small" :loading="aiCopyForm.generating" @click="generateAiCopyText">
                🔄 重新生成
              </el-button>
            </div>
            <el-input
              v-model="aiCopyForm.generatedText"
              type="textarea"
              rows="5"
              placeholder="AI 正在生成文案中..."
            />
          </div>
        </div>

        <template #footer>
          <span class="dialog-footer">
            <el-button @click="aiCopyDialogVisible = false">取消</el-button>
            <el-button type="primary" @click="applyAiCopy">
              一键应用到发布表单
            </el-button>
          </span>
        </template>
      </el-dialog>
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

// --- AI 科学估价与文案生成（数媒大赛核心亮点） ---
const aiPricingDialogVisible = ref(false)
const aiCopyDialogVisible = ref(false)
const currentAiType = ref('book')

const quickBookStyles = [
  { name: '🎓 学霸传承型', key: 'study' },
  { name: '🏃‍♂️ 诚恳急转型', key: 'graduation' },
  { name: '🎈 幽默生动型', key: 'funny' },
  { name: '📋 极简实况型', key: 'concise' }
]

const quickGoodStyles = [
  { name: '🏃‍♂️ 毕业搬迁甩卖', key: 'graduation' },
  { name: '🎈 幽默断舍离', key: 'funny' },
  { name: '📋 客观实况评测', key: 'concise' }
]

const aiPricingResult = reactive({
  name: '',
  originalPrice: 0,
  condition: '',
  minPrice: 0,
  maxPrice: 0,
  suggestedPrice: 0,
  discountRate: '',
  reasoning: ''
})

const aiCopyForm = reactive({
  style: 'study',
  extras: ['宿舍楼下当面验货', '支持小刀'],
  generatedText: '',
  generating: false
})

const openPricingDialog = (type) => {
  currentAiType.value = type
  const isBook = type === 'book'
  const name = isBook ? (bookForm.bname || '未命名教材') : (goodForm.gname || '未命名闲置')
  const original = isBook ? (Number(bookForm.originalPrice) || 45) : (Number(goodForm.originalPrice) || 88)
  const condition = isBook ? bookForm.bstatus : goodForm.gstatus
  const campus = isBook ? bookForm.college : goodForm.gcollege

  let minRate = 0.25
  let maxRate = 0.45
  let rateText = '3折 ~ 4.5折'
  let reason = ''

  if (isBook) {
    if (condition === '全新') {
      minRate = 0.50; maxRate = 0.65; rateText = '5折 ~ 6.5折'
      reason = `《${name}》处于全新未翻折状态。教材类属于刚需，建议挂牌5~6.5折，既让买家获得显著优惠，又能极高效率转让。`
    } else if (condition === '几乎全新') {
      minRate = 0.40; maxRate = 0.50; rateText = '4折 ~ 5折'
      reason = `《${name}》品相近新，结合${campus}往期同类教材流通热度，4~5折是兼顾吸引力与自身回血的最佳平衡区间。`
    } else if (condition === '少量笔记') {
      minRate = 0.30; maxRate = 0.40; rateText = '3折 ~ 4折'
      reason = `带有老师课堂重点划线的教材在大学内具有独特的“学霸笔记附加价值”，3~4折极容易在学期初或考前被抢购。`
    } else if (condition === '较多笔记') {
      minRate = 0.20; maxRate = 0.30; rateText = '2折 ~ 3折'
      reason = `笔迹较多但文字清晰不影响复习，建议2~3折亲民价转让，帮助低年级同学低成本获取课程复习资料。`
    } else {
      minRate = 0.10; maxRate = 0.20; rateText = '1折 ~ 2折'
      reason = `成色有明显翻阅磨损，建议一杯奶茶钱顺水转让，重点在于绿色循环与知识传承。`
    }
  } else {
    if (condition === '全新') {
      minRate = 0.65; maxRate = 0.80; rateText = '6.5折 ~ 8折'
      reason = `【${name}】为全新闲置，在校内直接面交省去快递运费与等待，6.5~8折相比电商平台有极强即时优势。`
    } else if (condition.includes('九成') || condition.includes('几乎全新')) {
      minRate = 0.50; maxRate = 0.65; rateText = '5折 ~ 6.5折'
      reason = `成色优异无明显瑕疵，校园数码与生活好物在5~6.5折属于极高周转率区间，预计2天内促成校内面交。`
    } else if (condition.includes('八成')) {
      minRate = 0.35; maxRate = 0.50; rateText = '3.5折 ~ 5折'
      reason = `物品外观有正常使用痕迹但核心功能完好，以3.5~5折定价具备性价比优势，深受在校学子青睐。`
    } else if (condition.includes('七成') || condition.includes('六成')) {
      minRate = 0.25; maxRate = 0.35; rateText = '2.5折 ~ 3.5折'
      reason = `适合宿舍短周期过渡使用，建议以2.5~3.5折诚意让利转出，加快宿舍减负速度。`
    } else {
      minRate = 0.15; maxRate = 0.25; rateText = '1.5折 ~ 2.5折'
      reason = `超低折价诚意断舍离，随缘转给同校有需要的同学。`
    }
  }

  const minP = Math.max(1, Math.round(original * minRate))
  const maxP = Math.max(minP + 1, Math.round(original * maxRate))
  const sugP = Math.round((minP + maxP) / 2)

  aiPricingResult.name = name
  aiPricingResult.originalPrice = original
  aiPricingResult.condition = condition
  aiPricingResult.minPrice = minP
  aiPricingResult.maxPrice = maxP
  aiPricingResult.suggestedPrice = sugP
  aiPricingResult.discountRate = rateText
  aiPricingResult.reasoning = reason

  aiPricingDialogVisible.value = true
}

const applyAiPricing = () => {
  if (currentAiType.value === 'book') {
    bookForm.bprice = aiPricingResult.suggestedPrice
    if (!bookForm.originalPrice && aiPricingResult.originalPrice) {
      bookForm.originalPrice = aiPricingResult.originalPrice
    }
  } else {
    goodForm.gprice = aiPricingResult.suggestedPrice
    if (!goodForm.originalPrice && aiPricingResult.originalPrice) {
      goodForm.originalPrice = aiPricingResult.originalPrice
    }
  }
  aiPricingDialogVisible.value = false
  ElMessage.success(`已应用 AI 推荐定价：¥${aiPricingResult.suggestedPrice.toFixed(2)}`)
}

const openCopywriterDialog = (type) => {
  currentAiType.value = type
  if (type === 'book') {
    aiCopyForm.style = 'study'
  } else {
    aiCopyForm.style = 'graduation'
  }
  generateAiCopyText()
  aiCopyDialogVisible.value = true
}

const generateAiCopyText = () => {
  aiCopyForm.generating = true
  setTimeout(() => {
    const isBook = currentAiType.value === 'book'
    const name = isBook ? (bookForm.bname || '专业课教材') : (goodForm.gname || '精选闲置好物')
    const condition = isBook ? bookForm.bstatus : goodForm.gstatus
    const origPrice = isBook ? (bookForm.originalPrice || 48) : (goodForm.originalPrice || 99)
    const campus = isBook ? bookForm.college : goodForm.gcollege
    const extraStr = aiCopyForm.extras.length > 0 ? `【交易承诺】${aiCopyForm.extras.join(' · ')}。` : ''

    let text = ''
    if (aiCopyForm.style === 'study') {
      text = `【学霸传承·考研/期末必备】转让《${name}》。教材成色【${condition}】，关键章节核心考点与课后重点习题均有清晰标划，字迹工整不杂乱。原价 ¥${origPrice}，现白菜价转给有需要的学弟学妹！${extraStr} 祝大家期末高分飘过、考研一战成硕！可约${campus}随时当面交接。`
    } else if (aiCopyForm.style === 'graduation') {
      text = `【毕业清仓·诚心急转回血】马上要毕业离校了，东西实在带不走，诚意出【${name}】！自用非常爱惜，成色有【${condition}】，平时保养好，功能细节完全没毛病。原价 ¥${origPrice}，现在骨折价出，能省一点是一点。${extraStr} 支持${campus}宿舍楼下当面验货，爽快同学直接送小赠品！`
    } else if (aiCopyForm.style === 'funny') {
      text = `【救救孩子的宿舍吧！】宿管阿姨已经严正警告我的书桌不能再堆积了，含泪断舍离出【${name}】！虽然陪伴我度过了快乐的时光，但它成色依然坚挺在【${condition}】。价格已经降到地板上了，希望它能在下一位校园搭子手里继续发光发热！${extraStr} 一食堂门口或图书馆随时碰头~`
    } else {
      text = `【闲置物品转让说明】\n1. 物品名称：${name}\n2. 成色状态：${condition}，保管良好，外观无破损，功能完好；\n3. 购置参考：原价 ¥${origPrice}；\n4. 交易地点：${campus}校内；\n5. 说明补充：${extraStr}`
    }

    aiCopyForm.generatedText = text
    aiCopyForm.generating = false
  }, 200)
}

const applyAiCopy = () => {
  if (currentAiType.value === 'book') {
    bookForm.bnote = aiCopyForm.generatedText
  } else {
    goodForm.gnote = aiCopyForm.generatedText
  }
  aiCopyDialogVisible.value = false
  ElMessage.success('AI 文案已成功填入表单！')
}

const applyQuickStyle = (type, styleKey) => {
  currentAiType.value = type
  aiCopyForm.style = styleKey
  generateAiCopyText()
  setTimeout(() => {
    if (type === 'book') {
      bookForm.bnote = aiCopyForm.generatedText
    } else {
      goodForm.gnote = aiCopyForm.generatedText
    }
    ElMessage.success('已应用所选风格文案！')
  }, 250)
}
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

/* AI 助手条与小标签 */
.ai-assist-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #f0fdf4;
  border: 1px solid #bbf7d0;
  padding: 8px 14px;
  border-radius: 6px;
  margin-bottom: 18px;
}

.ai-badge-group {
  display: flex;
  align-items: center;
  gap: 10px;
}

.ai-tag-badge {
  background: #16a34a;
  color: #ffffff;
  font-size: 11px;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 4px;
}

.ai-hint-text {
  font-size: 12px;
  color: #15803d;
}

.field-header-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 6px;
}

.field-tip {
  font-size: 12px;
  color: #94a3b8;
}

.quick-style-tags {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
  flex-wrap: wrap;
}

.tag-title {
  font-size: 12px;
  color: #64748b;
}

.style-chip {
  cursor: pointer;
  transition: all 0.2s;
}

.style-chip:hover {
  background-color: #eff6ff;
  color: var(--primary-color);
  border-color: var(--primary-color);
}

/* AI 估价弹窗样式 */
.ai-modal-content {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.ai-modal-header {
  border-bottom: 1px solid #f1f5f9;
  padding-bottom: 10px;
}

.ai-model-tag {
  background: #eff6ff;
  color: var(--primary-color);
  font-size: 11px;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 4px;
  display: inline-block;
  margin-bottom: 4px;
}

.ai-modal-desc {
  font-size: 12px;
  color: #64748b;
  margin: 0;
}

.valuation-card {
  background: #f8fafc;
  border-radius: 8px;
  padding: 16px;
  border: 1px solid #e2e8f0;
}

.valuation-target {
  font-size: 14px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 8px;
}

.valuation-meta-row {
  display: flex;
  gap: 16px;
  font-size: 12px;
  color: #64748b;
  margin-bottom: 16px;
}

.valuation-result-box {
  display: flex;
  background: #ffffff;
  border-radius: 8px;
  padding: 16px;
  border: 1px solid #cbd5e1;
  margin-bottom: 14px;
}

.result-price-col {
  flex: 1;
  border-right: 1px solid #e2e8f0;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.sub-label {
  font-size: 12px;
  color: #64748b;
}

.big-price {
  color: #16a34a;
  font-weight: 800;
  font-size: 26px;
}

.currency {
  font-size: 16px;
  margin-right: 2px;
}

.result-range-col {
  flex: 1;
  padding-left: 20px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  justify-content: center;
}

.range-val {
  font-size: 16px;
  font-weight: 700;
  color: #1e293b;
}

.valuation-reasoning {
  background: #ffffff;
  border-radius: 6px;
  padding: 12px;
  border-left: 3px solid #16a34a;
}

.reason-title {
  font-size: 13px;
  font-weight: 600;
  color: #15803d;
  margin-bottom: 4px;
}

.reason-text {
  font-size: 12px;
  line-height: 1.6;
  color: #334155;
  margin: 0;
}

.style-select-box, .extras-select-box {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.select-label {
  font-size: 13px;
  font-weight: 600;
  color: #1e293b;
}

.preview-copy-box {
  margin-top: 8px;
}

.preview-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 6px;
}
</style>
