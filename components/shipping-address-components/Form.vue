<template>
  <div class="modal" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <button
            type="button"
            class="close"
            aria-label="Close"
            @click="dismiss()"
          >
            <span aria-hidden="true">&times;</span>
          </button>
          <h4 class="modal-title">
            {{ this.is_edit ? 'Edit' : 'Add' }} Shipping Address
          </h4>
        </div>
        <div class="modal-body">
          <div v-if="this.success_message != ''" class="alert alert-success">
            {{ this.success_message }}
          </div>
          <div v-if="this.error_message != ''" class="alert alert-danger">
            {{ this.error_message }}
          </div>

          <ul
            v-if="this.validation_errors.length"
            class="sufee-alert alert with-close alert-danger alert-dismissible"
          >
            <li v-for="(error, index) in this.validation_errors" :key="index">
              {{ error }}
            </li>
          </ul>

          <form class="form-horizontal">
            <div class="form-group">
              <label>Country</label>
              <Countries
                :country="country"
                @countryUpdated="setCountry"
              ></Countries>
            </div>

            <div class="form-group">
              <label>City</label>
              <input
                v-model="city"
                type="text"
                placeholder="City"
                name="city"
                class="form-control"
              />
            </div>

            <div class="form-group">
              <label>Address</label>
              <input
                v-model="address"
                type="text"
                placeholder="Address"
                name="address"
                class="form-control"
              />
            </div>

            <div class="form-group">
              <label>Postal Code</label>
              <input
                v-model="postal_code"
                type="text"
                placeholder="Postal Code"
                name="postal_code"
                class="form-control"
              />
            </div>

            <div class="form-group">
              <label>Mobile</label>
              <input
                v-model="mobile"
                type="text"
                placeholder="Mobile"
                name="mobile"
                class="form-control"
              />
            </div>

            <div class="form-group">
              <label>Is Primary</label>
              <input v-model="is_primary" type="checkbox" name="is_primary" />
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" @click="dismiss()">
            Close
          </button>
          <button type="button" class="btn btn-primary" @click="saveAddress()">
            Save
          </button>
        </div>
      </div>
      <!-- /.modal-content -->
    </div>
    <!-- /.modal-dialog -->
  </div>
</template>

<script>
import { ShippingAddressApi } from '../../api/shipping-address'
import Countries from './Countries'

export default {
  name: 'ShippingAddressForm',
  components: { Countries },
  // eslint-disable-next-line vue/prop-name-casing
  props: ['is_edit', 'editShippingAddress'],
  data() {
    return {
      address: '',
      country: '',
      city: '',
      postal_code: '',
      mobile: '',
      is_primary: false,
      success_message: true,
      error_message: false,
      validation_errors: [],
    }
  },
  mounted() {
    this.resetForm()

    if (this.is_edit) {
      this.address = this.editShippingAddress.address
      this.mobile = this.editShippingAddress.mobile
      this.country = this.editShippingAddress.country
      this.city = this.editShippingAddress.city
      this.postal_code = this.editShippingAddress.postal_code
      this.is_primary = !!this.editShippingAddress.is_primary
    }
  },
  methods: {
    dismiss() {
      this.$emit('dismissModal')
    },
    setCountry(event) {
      this.country = event
    },
    saveAddress() {
      this.success_message = ''
      this.error_message = ''
      this.validation_errors = []

      const data = {
        address: this.address,
        mobile: this.mobile,
        country: this.country,
        city: this.city,
        postal_code: this.postal_code,
      }

      if (this.is_primary) {
        data.is_primary = 1
      }

      let api

      if (!this.is_edit) {
        api = ShippingAddressApi.store(this.$axios, data)
      } else {
        api = ShippingAddressApi.update(
          this.$axios,
          data,
          this.editShippingAddress.id
        )
      }

      api
        .then((response) => {
          if (response.success) {
            this.success_message = response.message
            this.$emit('submitForm')

            setTimeout(() => {
              this.resetForm()
              this.dismiss()
            }, 1000)
          }
        })
        .catch((err) => {
          this.error_message = err.response.data.message
          if (err.response.data.errors) {
            const errors = []
            for (const key in err.response.data.errors) {
              errors.push(err.response.data.errors[key][0])
            }

            this.validation_errors = errors
          }
        })
    },
    resetForm() {
      this.address = ''
      this.mobile = ''
      this.country = ''
      this.city = ''
      this.postal_code = ''
      this.is_primary = false

      this.success_message = ''
      this.error_message = ''
      this.validation_errors = []
    },
  },
}
</script>

<style scoped>
div.modal {
  display: inline-block !important;
}
</style>
