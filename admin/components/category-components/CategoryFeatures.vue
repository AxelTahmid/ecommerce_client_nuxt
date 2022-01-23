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
      <div class="row" style="margin-bottom: 5px">
        <div class="col-lg-4">
          <input
            type="text"
            name="field_title[]"
            class="form-control"
            placeholder="Feature title"
          />
        </div>
        <div class="col-lg-4">
          <select name="field_type[]" class="form-control">
            <option value="1">Text</option>
            <option value="2">Color</option>
          </select>
        </div>
        <div class="col-lg-4">
          <a href="#" class="btn btn-sm btn-danger"
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
  computed: {},
  mounted() {},
  methods: {
    addNewFeature() {},
  },
}
</script>

<style scoped></style>
