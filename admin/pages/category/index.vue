<template>
  <div class="main-content">
    <div class="section__content section__content--p30">
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-12">
            <loader></loader>
            <status-messages></status-messages>

            <CategoryFilter></CategoryFilter>
          </div>
          <div class="col-md-12">
            <!-- DATA TABLE-->
            <div class="table-responsive m-b-40">
              <table class="table table-borderless table-data3">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Title</th>
                    <th>Parent</th>
                    <th>Featured</th>
                    <th>Options</th>
                  </tr>
                </thead>
                <tbody>
                  <CategoryRow></CategoryRow>
                </tbody>
              </table>
            </div>
            <Pagination></Pagination>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Loader from '../../components/helpers/loader'
import statusMessages from '../../components/helpers/statusMessages'
import CategoryRow from '../../components/category-components/Row'
import Pagination from '../../components/helpers/Pagination'
import CategoryFilter from '../../components/category-components/CategoryFilter'

export default {
  name: 'Index',
  components: {
    CategoryFilter,
    Pagination,
    CategoryRow,
    Loader,
    statusMessages,
  },
  middleware: 'auth',
  computed: {},
  methods: {},
}
</script>

<style scoped></style>
