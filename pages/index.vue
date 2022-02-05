<template>
  <div>
    <Slider></Slider>

    <section>
      <div class="container">
        <div class="row">
          <div class="col-sm-12 padding-right">
            <LatestItems></LatestItems>

            <FeaturedCategories></FeaturedCategories>

            <FeaturedProducts></FeaturedProducts>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Slider from '../components/home-components/Slider'
import LatestItems from '../components/home-components/LatestItems'
import FeaturedCategories from '../components/home-components/FeaturedCategories'
import FeaturedProducts from '../components/home-components/FeaturedProducts'

export default {
  components: {
    FeaturedProducts,
    FeaturedCategories,
    LatestItems,
    Slider,
  },
  head() {
    return {
      title: 'Online Shop | Home',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Online Shop Home Page',
        },
      ],
    }
  },
}
</script>

<style></style>
