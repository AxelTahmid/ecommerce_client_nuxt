<template>
  <form method="get" action="#" style="margin-bottom: 10px">
    <h4>Filter</h4>
    <div class="row">
      <div class="col-1">
        <input
          type="text"
          class="form-control"
          placeholder="Id"
          name="id"
          :value="this.$store.state.brand.filterData.id"
          @change="handleFiltering($event)"
        />
      </div>
      <div class="col-3">
        <input
          type="text"
          class="form-control"
          placeholder="Title"
          name="title"
          :value="this.$store.state.brand.filterData.title"
          @change="handleFiltering($event)"
        />
      </div>

      <div class="col-8">
        <a
          href="#"
          class="btn btn-success pull-right"
          @click.prevent="createBrand()"
          ><i class="fa fa-plus-square"></i> Create</a
        >
      </div>
    </div>
  </form>
</template>

<script>
export default {
  name: 'BrandFilter',
  methods: {
    handleFiltering(event) {
      this.$emit('Filtering', event.target.name, event.target.value)
    },
    createBrand() {
      this.$emit('createBrand')
    },
  },
}
</script>

<style scoped></style>
