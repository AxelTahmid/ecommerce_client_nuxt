<template>
  <section id="slider">
    <div class="container">
      <div class="row">
        <div class="col-sm-12">
          <div id="slider-carousel" class="carousel slide" data-ride="carousel">
            <ol class="carousel-indicators">
              <li
                v-for="(item, index) in this.sliderProducts"
                :key="item.id"
                data-target="#slider-carousel"
                :data-slide-to="item.id"
                :class="{ active: index === 0 }"
              ></li>
            </ol>

            <div class="carousel-inner">
              <div
                v-for="(item, index) in this.sliderProducts"
                :key="item.id"
                :class="'item ' + (index === 0 ? 'active' : '')"
              >
                <div class="col-sm-6">
                  <h1>{{ item.title_short }}</h1>
                  <p v-if="item.description_short != ''">
                    {{ item.description_short }}
                  </p>
                  <nuxt-link
                    :to="'/p/' + item.id + '/' + item.slug"
                    class="btn btn-default get"
                    >Get it now</nuxt-link
                  >
                </div>
                <div class="col-sm-6">
                  <img
                    :src="item.gallery[0].image_url.main_slider"
                    class="girl img-responsive"
                    alt=""
                  />
                  <div class="pricing-badge">
                    <strong>Only</strong>
                    <span>${{ item.price_after_discount }}</span>
                  </div>
                </div>
              </div>
            </div>

            <a
              href="#slider-carousel"
              class="left control-carousel hidden-xs"
              data-slide="prev"
            >
              <i class="fa fa-angle-left"></i>
            </a>
            <a
              href="#slider-carousel"
              class="right control-carousel hidden-xs"
              data-slide="next"
            >
              <i class="fa fa-angle-right"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Slider',
  // eslint-disable-next-line vue/require-prop-types
  props: ['sliderProducts'],
  mounted() {
    if (this.sliderProducts && this.sliderProducts.length) {
      // re-initialize carousal
      // eslint-disable-next-line no-undef
      $('.carousel').carousel()
    }
  },
}
</script>

<style scoped></style>
