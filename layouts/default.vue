<template>
  <div>
    <FrontHeader></FrontHeader>

    <Nuxt />

    <FrontFooter></FrontFooter>
  </div>
</template>

<script>
import FrontHeader from '../components/partials/FrontHeader'
import FrontFooter from '../components/partials/FrontFooter'
export default {
  components: { FrontFooter, FrontHeader },
}
</script>
