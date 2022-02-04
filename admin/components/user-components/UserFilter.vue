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
          :value="this.$store.state.user.filterData.id"
          @change="handleFiltering($event)"
        />
      </div>
      <div class="col-3">
        <input
          type="text"
          class="form-control"
          placeholder="Name"
          name="name"
          :value="this.$store.state.user.filterData.name"
          @change="handleFiltering($event)"
        />
      </div>
      <div class="col-3">
        <input
          type="text"
          class="form-control"
          placeholder="Email"
          name="email"
          :value="this.$store.state.user.filterData.email"
          @change="handleFiltering($event)"
        />
      </div>

      <div class="col-5">
        <nuxt-link to="/user/create" class="btn btn-success pull-right"
          ><i class="fa fa-plus-square"></i> Create</nuxt-link
        >
      </div>
    </div>
  </form>
</template>

<script>
export default {
  name: 'UserFilter',
  methods: {
    handleFiltering(event) {
      this.$emit('Filtering', event.target.name, event.target.value)
    },
  },
}
</script>

<style scoped></style>
