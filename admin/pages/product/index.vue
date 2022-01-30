<template>
  <div class="main-content">
    <div class="section__content section__content--p30">
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-12">
            <loader></loader>
            <status-messages></status-messages>
          </div>
          <div class="col-md-12">
            <!-- DATA TABLE-->
            <div class="table-responsive m-b-40">
              <table class="table table-borderless table-data3">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Title</th>
                    <th>Images</th>
                    <th>Price</th>
                    <th>Inventory</th>
                    <th>Category</th>
                    <th>By</th>
                    <th>Options</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>
                      Samsung 32 Inch HD Smart TV with Built-in Receiver -
                      Black, UA32N5300ASXEG
                    </td>
                    <td></td>
                    <td><span class="badge badge-info">200 $</span></td>
                    <td><strong class="inventory">10</strong></td>
                    <td>Mobiles</td>
                    <td>admin</td>
                    <td>
                      <ul class="nav nav-tabs options-dropdown">
                        <li class="nav-item dropdown">
                          <a
                            class="nav-link"
                            data-toggle="dropdown"
                            href="#"
                            role="button"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            <svg
                              width="1em"
                              height="1em"
                              viewBox="0 0 16 16"
                              class="bi bi-three-dots-vertical"
                              fill="currentColor"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"
                              />
                            </svg>
                          </a>
                          <div class="dropdown-menu">
                            <a
                              href="#"
                              class="dropdown-item btn btn-info btn-sm"
                              ><i class="fa fa-edit"></i> Edit</a
                            >
                            <a
                              href="#"
                              class="dropdown-item btn btn-danger btn-sm"
                              ><i class="fa fa-remove"></i> Remove</a
                            >
                          </div>
                        </li>
                      </ul>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <Pagination
              v-if="productList.data"
              :data="productList"
              @handlePagination="handlePagination"
            ></Pagination>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Loader from '../../components/helpers/loader'
import StatusMessages from '../../components/helpers/statusMessages'
import Pagination from '../../components/helpers/Pagination'
export default {
  name: 'Index',
  components: {
    Pagination,
    StatusMessages,
    Loader,
  },
  fetch() {},
  computed: {
    productList() {
      return this.$store.state.product.product_list
    },
  },
  methods: {
    handlePagination(pageNumber) {},
  },
}
</script>

<style scoped></style>
