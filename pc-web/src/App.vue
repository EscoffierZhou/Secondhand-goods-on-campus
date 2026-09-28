<template>
  <div class="app-layout">
    <Navbar />
    <main class="main-content">
      <router-view />
    </main>
    <Footer />
    <AuthDialog />
    <ThemeDrawer />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import AuthDialog from './components/AuthDialog.vue'
import ThemeDrawer from './components/ThemeDrawer.vue'
import { useMarketStore } from './stores/market'
import { useCartStore } from './stores/cart'
import { useThemeStore } from './stores/theme'

const marketStore = useMarketStore()
const cartStore = useCartStore()
const themeStore = useThemeStore()

onMounted(() => {
  themeStore.applyTheme()
  marketStore.loadAll()
  cartStore.loadCart()
})
</script>

<style scoped>
.app-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
}
</style>
