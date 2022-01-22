<template>
  <header class="header-mobile d-block d-lg-none">
    <div class="header-mobile__bar">
      <div class="container-fluid">
        <div class="header-mobile-inner">
          <a class="logo" href="#"> Online <strong>Shop</strong> </a>
          <button class="hamburger hamburger--slider" type="button">
            <span class="hamburger-box">
              <span class="hamburger-inner"></span>
            </span>
          </button>
        </div>
      </div>
    </div>
    <nav class="navbar-mobile">
      <div class="container-fluid">
        <nav-menu ulclass="navbar-mobile__list list-unstyled"></nav-menu>
      </div>
    </nav>
  </header>
</template>

<script>
import NavMenu from './NavMenu'
export default {
  name: 'MobileHeader',
  components: { NavMenu },
}
</script>

<style scoped>
a.logo {
  color: #6c757d;
  font-size: 31px;
}
</style>
