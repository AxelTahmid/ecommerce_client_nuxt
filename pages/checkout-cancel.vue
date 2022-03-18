<template>
  <section id="cart_items">
    <div class="container">
      <div class="alert alert-danger">Order cancelled</div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'CheckoutCancel',
  mounted() {
    setTimeout(() => {
      this.$router.push('/orders')
    }, 3000)
  },
}
</script>
