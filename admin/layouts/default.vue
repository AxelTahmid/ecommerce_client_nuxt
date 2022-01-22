<template>
  <div class="page-wrapper">
    <mobile-header></mobile-header>
    <admin-sidebar></admin-sidebar>
    <div class="page-container">
      <admin-header></admin-header>
      <Nuxt />
    </div>
  </div>
</template>
<script>
import MobileHeader from '../components/partials/MobileHeader'
import AdminSidebar from '../components/partials/AdminSidebar'
import AdminHeader from '../components/partials/AdminHeader'
export default {
  components: { AdminHeader, AdminSidebar, MobileHeader },
  mounted() {
    const script = document.createElement('script')
    script.src = '/js/main.js'
    script.type = 'text/javascript'
    document.head.appendChild(script)
  },
}
</script>
<style scoped></style>
