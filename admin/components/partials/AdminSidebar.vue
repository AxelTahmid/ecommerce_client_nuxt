<template>
  <aside class="menu-sidebar d-none d-lg-block">
    <div class="logo">
      <a href="#"> Online <strong>Shop</strong> </a>
    </div>
    <div class="menu-sidebar__content js-scrollbar1 ps">
      <nav class="navbar-sidebar">
        <nav-menu ulclass="list-unstyled navbar__list"></nav-menu>
      </nav>
      <div class="ps__rail-x" style="left: 0px; bottom: 0px">
        <div
          class="ps__thumb-x"
          tabindex="0"
          style="left: 0px; width: 0px"
        ></div>
      </div>
      <div class="ps__rail-y" style="top: 0px; right: 0px">
        <div
          class="ps__thumb-y"
          tabindex="0"
          style="top: 0px; height: 0px"
        ></div>
      </div>
    </div>
  </aside>
</template>

<script>
import NavMenu from './NavMenu'
export default {
  name: 'AdminSidebar',
  components: { NavMenu },
}
</script>

<style scoped>
.logo a {
  color: #6c757d;
  font-size: 31px;
}
</style>
