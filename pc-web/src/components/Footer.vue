<template>
  <footer class="footer-wrapper">
    <div class="pc-container footer-inner">
      <div class="footer-top">
        <div class="footer-col brand-col">
          <div class="footer-logo">
            <el-icon :size="20"><Reading /></el-icon>
            <span>校园二手交易平台</span>
          </div>
          <p class="brand-desc">
            面向广大在校师生打造的绿色二手交易与兼职互助平台。提倡低碳生活、资源再利用，解决毕业季旧书旧物闲置难题。
          </p>
          <div class="campus-badges">
            <el-tag size="small" type="info">咸安校区</el-tag>
            <el-tag size="small" type="info">温泉校区</el-tag>
            <el-tag size="small" type="success">学生实名认证</el-tag>
          </div>
        </div>

        <div class="footer-col">
          <h4 class="col-title">交易分类</h4>
          <ul class="footer-links">
            <li><router-link to="/books">二手专业教材</router-link></li>
            <li><router-link to="/books">考研/四六级资料</router-link></li>
            <li><router-link to="/goods">数码电子/配件</router-link></li>
            <li><router-link to="/goods">宿舍生活/代步单车</router-link></li>
          </ul>
        </div>

        <div class="footer-col">
          <h4 class="col-title">互助与服务</h4>
          <ul class="footer-links">
            <li><router-link to="/jobs">校园兼职招聘</router-link></li>
            <li><router-link to="/publish">发布闲置二手</router-link></li>
            <li><router-link to="/cart">购物车与预约单</router-link></li>
            <li><router-link to="/profile">学生身份中心</router-link></li>
          </ul>
        </div>

        <div class="footer-col safety-col">
          <h4 class="col-title">交易安全准则</h4>
          <p class="safety-tip">
            1. 推荐在校内白天公共区域（如一餐、二餐、图书馆前广场）当面验货交接。<br/>
            2. 请核验对方学生证件或学号认证信息。<br/>
            3. 谨防任何提前要求点击外部链接或保证金转账行为。
          </p>
        </div>
      </div>

      <div class="footer-bottom">
        <p>© 2024 校园二手交易平台 (PC Web端) · 静态演示版 · 支持直接部署于 GitHub Pages</p>
        <p class="sub-credit">
          基于原微信小程序架构逆向重构 · Vue 3 + Vite + Element Plus + Pinia
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { Reading } from '@element-plus/icons-vue'
</script>

<style scoped>
.footer-wrapper {
  background-color: #1e293b;
  color: #94a3b8;
  padding: 40px 0 20px;
  margin-top: 50px;
}

.footer-inner {
  display: flex;
  flex-direction: column;
}

.footer-top {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 2fr;
  gap: 30px;
  padding-bottom: 30px;
  border-bottom: 1px solid #334155;
}

.footer-logo {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #ffffff;
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 12px;
}

.brand-desc {
  font-size: 13px;
  line-height: 1.6;
  margin-bottom: 12px;
}

.campus-badges {
  display: flex;
  gap: 6px;
}

.col-title {
  color: #ffffff;
  font-size: 15px;
  margin-bottom: 14px;
}

.footer-links {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 13px;
}

.footer-links a {
  color: #94a3b8;
  transition: color 0.2s;
}

.footer-links a:hover {
  color: #ffffff;
}

.safety-tip {
  font-size: 12px;
  line-height: 1.8;
  color: #cbd5e1;
  background: rgba(255, 255, 255, 0.05);
  padding: 10px 12px;
  border-radius: 6px;
  border-left: 3px solid var(--primary-color);
}

.footer-bottom {
  padding-top: 20px;
  text-align: center;
  font-size: 12px;
  color: #64748b;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.sub-credit {
  color: #475569;
}
</style>
