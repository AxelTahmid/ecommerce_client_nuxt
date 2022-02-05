<template>
  <ul v-if="showPaginator()" class="pagination">
    <li v-if="data.current_page > 1">
      <a href="#" @click.prevent="displayPage(data.current_page - 1)"
        >&laquo;</a
      >
    </li>

    <li
      v-for="page in numPages()"
      :key="page"
      :class="data.current_page == page ? ' active' : ''"
    >
      <a href="#" @click.prevent="displayPage(page)">{{ page }}</a>
    </li>

    <li v-if="data.current_page < data.last_page">
      <a href="#" @click.prevent="displayPage(data.current_page + 1)">
        &raquo;
      </a>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'FrontPagination',
  props: ['data'],
  methods: {
    numPages() {
      return Math.ceil(this.data.total / this.data.per_page)
    },
    showPaginator() {
      if (this.numPages() > 1) {
        return true
      }

      return false
    },
    displayPage(pageNumber) {
      this.$emit('handlePagination', pageNumber)
    },
  },
}
</script>

<style scoped>
.pagination {
  margin-top: 50px !important;
}
</style>
