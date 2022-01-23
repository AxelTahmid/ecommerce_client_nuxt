<template>
  <div>
    <div class="row" style="margin-bottom: 5px">
      <div class="col-lg-12">
        <button
          type="button"
          class="btn btn-success btn-sm pull-right"
          style="margin-top: 5px"
          @click="addNewFeature()"
        >
          <i class="fa fa-plus-square"></i> Add new Feature
        </button>
      </div>
    </div>
    <div>
      <div
        v-for="feature in this.features"
        :key="feature.id"
        class="row"
        style="margin-bottom: 5px"
      >
        <div class="col-lg-4">
          <input
            type="text"
            name="field_title[]"
            :value="feature.field_title"
            placeholder="Feature title"
            class="form-control"
            @change="updateFieldTitle($event, feature.id)"
          />
        </div>
        <div class="col-lg-4">
          <select
            name="field_type[]"
            class="form-control"
            :value="feature.field_type"
            @change="updateFieldType($event, feature.id)"
          >
            <option value="1">Text</option>
            <option value="2">Color</option>
          </select>
        </div>
        <div class="col-lg-4">
          <a
            href="#"
            class="btn btn-sm btn-danger"
            @click.prevent="removeFeature(feature.id)"
            ><i class="fa fa-remove"></i
          ></a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CategoryFeatures',
  computed: {
    features: {
      get() {
        return this.$store.state.category.features
      },
    },
  },
  mounted() {},
  methods: {
    addNewFeature() {
      this.$store.commit('category/addToFeatures', {
        id: Math.floor(Math.random() * 1000),
        field_title: '',
        field_type: 1,
        category_id: '',
      })
    },
    removeFeature(id) {
      this.$store.commit('category/removeFromFeature', id)
    },
    updateFieldTitle(e, id) {
      this.$store.commit('category/updateFeatureTitle', {
        id,
        value: e.target.value,
      })
    },
    updateFieldType(e, id) {
      this.$store.commit('category/updateFeatureType', {
        id,
        value: e.target.value,
      })
    },
  },
}
</script>

<style scoped></style>
