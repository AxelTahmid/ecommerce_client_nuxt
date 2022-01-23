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
          :value="this.$store.state.category.filterData.id"
          @change="handleFiltering($event)"
        />
      </div>
      <div class="col-3">
        <input
          type="text"
          class="form-control"
          placeholder="Title"
          name="title"
          :value="this.$store.state.category.filterData.title"
          @change="handleFiltering($event)"
        />
      </div>
      <div class="col-3">
        <select
          class="form-control"
          name="parent_id"
          :value="this.$store.state.category.filterData.parent_id"
          @change="handleFiltering($event)"
          v-html="this.$store.state.category.categoryHtmlTree"
        >
          <option value="">select parent</option>
        </select>
      </div>

      <div class="col-5">
        <nuxt-link to="/category/create" class="btn btn-success pull-right"
          ><i class="fa fa-plus-square"></i> Create</nuxt-link
        >
      </div>
    </div>
  </form>
</template>

<script>
export default {
  name: 'CategoryFilter',
  methods: {
    handleFiltering(event) {
      this.$emit('Filtering', event.target.name, event.target.value)
    },
  },
}
</script>

<style scoped></style>
