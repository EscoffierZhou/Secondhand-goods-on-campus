import { defineStore } from 'pinia'
import { ref } from 'vue'

export const THEME_PALETTES = {
  blue: {
    key: 'blue',
    name: '清爽学术蓝',
    desc: '沉稳严谨 · 现代科技感',
    primary: '#2563eb',
    hover: '#1d4ed8',
    light: '#eff6ff',
    badge: '#dbeafe',
    shadow: 'rgba(37, 99, 235, 0.16)'
  },
  emerald: {
    key: 'emerald',
    name: '低碳自然绿',
    desc: '生态循环 · 绿色校园感',
    primary: '#059669',
    hover: '#047857',
    light: '#ecfdf5',
    badge: '#d1fae5',
    shadow: 'rgba(5, 150, 105, 0.16)'
  },
  purple: {
    key: 'purple',
    name: '数媒极光紫',
    desc: '先锋艺术 · 赛道创意感',
    primary: '#7c3aed',
    hover: '#6d28d9',
    light: '#f5f3ff',
    badge: '#ede9fe',
    shadow: 'rgba(124, 58, 237, 0.16)'
  },
  orange: {
    key: 'orange',
    name: '暖阳活力橙',
    desc: '校园市集 · 热情亲和力',
    primary: '#ea580c',
    hover: '#c2410c',
    light: '#fff7ed',
    badge: '#ffedd5',
    shadow: 'rgba(234, 88, 12, 0.16)'
  },
  slate: {
    key: 'slate',
    name: '极简冷色灰',
    desc: '性冷淡风 · 高级克制简约',
    primary: '#334155',
    hover: '#1e293b',
    light: '#f8fafc',
    badge: '#e2e8f0',
    shadow: 'rgba(51, 65, 85, 0.16)'
  }
}

export const useThemeStore = defineStore('theme', () => {
  const isDark = ref(localStorage.getItem('campus_2nd_dark') === 'true')
  const colorKey = ref(localStorage.getItem('campus_2nd_color') || 'blue')
  const density = ref(localStorage.getItem('campus_2nd_density') || 'spacious') // spacious 或 compact
  const isDrawerOpen = ref(false)

  // 辅助函数：调整HEX颜色亮度
  const adjustHex = (hex, percent) => {
    let num = parseInt(hex.replace('#', ''), 16)
    let amt = Math.round(2.55 * percent)
    let R = (num >> 16) + amt
    let G = (num >> 8 & 0x00FF) + amt
    let B = (num & 0x0000FF) + amt
    return '#' + (
      0x1000000 +
      (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
      (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
      (B < 255 ? (B < 1 ? 0 : B) : 255)
    ).toString(16).slice(1)
  }

  const applyTheme = () => {
    const root = document.documentElement
    const palette = THEME_PALETTES[colorKey.value] || THEME_PALETTES.blue

    // 1. 暗黑模式切换
    if (isDark.value) {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }

    // 2. 页面密度属性
    root.setAttribute('data-density', density.value)

    // 3. 动态注入 CSS 主题变量
    root.style.setProperty('--primary-color', palette.primary)
    root.style.setProperty('--primary-hover', palette.hover)
    root.style.setProperty('--primary-light', isDark.value ? '#1e293b' : palette.light)
    root.style.setProperty('--primary-badge', palette.badge)
    root.style.setProperty('--shadow-hover', `0 12px 28px -4px ${palette.shadow}`)

    // 4. 同步 Element Plus 官方主题变量
    root.style.setProperty('--el-color-primary', palette.primary)
    root.style.setProperty('--el-color-primary-light-3', adjustHex(palette.primary, 30))
    root.style.setProperty('--el-color-primary-light-5', adjustHex(palette.primary, 50))
    root.style.setProperty('--el-color-primary-light-7', adjustHex(palette.primary, 70))
    root.style.setProperty('--el-color-primary-light-8', adjustHex(palette.primary, 80))
    root.style.setProperty('--el-color-primary-light-9', isDark.value ? '#1e293b' : palette.light)
    root.style.setProperty('--el-color-primary-dark-2', palette.hover)

    // 持久化存储
    localStorage.setItem('campus_2nd_dark', isDark.value ? 'true' : 'false')
    localStorage.setItem('campus_2nd_color', colorKey.value)
    localStorage.setItem('campus_2nd_density', density.value)
  }

  const toggleDark = () => {
    isDark.value = !isDark.value
    applyTheme()
  }

  const setColor = (key) => {
    if (THEME_PALETTES[key]) {
      colorKey.value = key
      applyTheme()
    }
  }

  const setDensity = (mode) => {
    density.value = mode
    applyTheme()
  }

  const resetTheme = () => {
    isDark.value = false
    colorKey.value = 'blue'
    density.value = 'spacious'
    applyTheme()
  }

  const openDrawer = () => {
    isDrawerOpen.value = true
  }

  const closeDrawer = () => {
    isDrawerOpen.value = false
  }

  return {
    isDark,
    colorKey,
    density,
    isDrawerOpen,
    palettes: THEME_PALETTES,
    applyTheme,
    toggleDark,
    setColor,
    setDensity,
    resetTheme,
    openDrawer,
    closeDrawer
  }
})
