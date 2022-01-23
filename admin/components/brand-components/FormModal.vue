<template>
  <div class="modal brand-form-modal" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">
            {{
              this.$store.state.brand.brand.id == ''
                ? 'Create Brand'
                : 'Edit Brand #' + this.$store.state.brand.brand.id
            }}
          </h5>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
            @click="dismiss()"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <loader></loader>
          <status-messages></status-messages>
          <form id="brand-form" method="post" @submit.prevent="submit()">
            <div class="form-group">
              <label for="title">Title</label>
              <input
                id="title"
                v-model="title"
                type="text"
                name="title"
                class="form-control"
              />
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="submit" form="brand-form" class="btn btn-primary">
            Save
          </button>
          <button
            type="button"
            class="btn btn-secondary"
            data-dismiss="modal"
            @click="dismiss()"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import StatusMessages from '../helpers/statusMessages'
import Loader from '../helpers/loader'
export default {
  name: 'FormModal',
  components: {
    Loader,
    StatusMessages,
  },
  computed: {
    title: {
      set(title) {
        this.$store.commit('brand/setTitle', title)
      },
      get() {
        return this.$store.state.brand.brand.title
      },
    },
  },
  methods: {
    dismiss() {
      // eslint-disable-next-line no-undef
      $('.brand-form-modal').modal('hide')

      this.$store.commit('brand/resetBrand')
    },
    submit() {
      if (this.$store.state.brand.brand.id === '') {
        this.$store.dispatch('brand/create', {
          onSuccess: () => this.dismiss(),
        })
      } else {
        this.$store.dispatch('brand/updateBrand', {
          onSuccess: () => this.dismiss(),
        })
      }
    },
  },
}
</script>

<style scoped></style>
