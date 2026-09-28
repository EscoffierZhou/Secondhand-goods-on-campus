<template>
  <div class="app-layout">
    <Navbar />
    <main class="main-content">
      <router-view />
    </main>
    <Footer />
    <AuthDialog />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import AuthDialog from './components/AuthDialog.vue'
import { useMarketStore } from './stores/market'
import { useCartStore } from './stores/cart'

const marketStore = useMarketStore()
const cartStore = useCartStore()

onMounted(() => {
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
