<template>
  <nav v-if="showPaginator()">
    <ul class="pagination">
      <li>
        <a class="page-link" href="#">First</a>
      </li>

      <li class="page-item">
        <a class="page-link" href="#">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>

      <li class="page-item">
        <a class="page-link" href="#">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>

      <li class="page-item">
        <a class="page-link" href="#">Last</a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'Pagination',
  mounted() {},
  methods: {
    showPaginator() {
      return true
    },
  },
}
</script>

<style scoped></style>
