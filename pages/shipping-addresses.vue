<template>
  <div class="container">
    <div class="bg">
      <div class="row">
        <div class="col-sm-12">
          <h2 class="title text-center">Shipping Addresses</h2>
        </div>
      </div>

      <div class="row">
        <div class="col-md-3">
          <account-sidebar></account-sidebar>
        </div>

        <div class="col-sm-9 col-md-9">
          <button
            type="button"
            class="btn btn-primary pull-right"
            @click.prevent="createAddress()"
          >
            Add Address
          </button>
          <div class="well well-sm">
            <div class="row">
              <div class="col-sm-12" style="margin-top: 5px">
                <p
                  v-if="!this.shipping_addresses.length"
                  class="alert alert-info"
                >
                  No shipping addresses!
                  <a href="#" @click.prevent="createAddress()">Add Address</a>
                </p>
                <table
                  v-if="this.shipping_addresses.length > 0"
                  class="table table-condensed"
                >
                  <thead>
                    <tr>
                      <th>Address</th>
                      <th>Country</th>
                      <th>City</th>
                      <th>Postal Code</th>
                      <th class="text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="address in this.shipping_addresses"
                      :key="address.id"
                    >
                      <td>
                        <address>
                          <strong v-if="address.is_primary == 1"
                            >{{ address.address }} (Primary)</strong
                          >
                          <span v-if="address.is_primary == 0">{{
                            address.address
                          }}</span>
                          <span style="display: block">{{
                            address.mobile
                          }}</span>
                        </address>
                      </td>
                      <td>{{ address.country }}</td>
                      <td>{{ address.city }}</td>
                      <td>{{ address.postal_code }}</td>
                      <td class="text-center">
                        <a
                          href="#"
                          class="btn btn-info btn-sm"
                          @click.prevent="showAddress(address.id)"
                          ><i class="fa fa-edit"></i
                        ></a>
                        <a
                          href="#"
                          class="btn btn-danger btn-sm"
                          @click.prevent="deleteAddress(address.id)"
                          ><i class="fa fa-trash-o"></i
                        ></a>
                      </td>
                    </tr>
                  </tbody>
                </table>

                <shipping-address-form
                  v-if="this.showForm"
                  :edit-shipping-address="edit_shipping_address"
                  :is_edit="is_edit"
                  @dismissModal="dismiss()"
                  @submitForm="refresh()"
                ></shipping-address-form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AccountSidebar from '../components/account-components/AccountSidebar'
import { ShippingAddressApi } from '../api/shipping-address'
import ShippingAddressForm from '../components/shipping-address-components/Form'

export default {
  name: 'ShippingAddresses',
  components: { ShippingAddressForm, AccountSidebar },
  middleware: 'auth',
  data() {
    return {
      shipping_addresses: [],
      showForm: false,
      is_edit: false,
      edit_shipping_address: {},
    }
  },
  head() {
    return {
      title: 'Online Shop | My Shipping Addresses',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'My Shipping Addresses Page',
        },
      ],
    }
  },
  mounted() {
    this.fetchAddresses()
  },
  methods: {
    fetchAddresses() {
      ShippingAddressApi.list(this.$axios).then((response) => {
        this.shipping_addresses = response.shipping_addresses
      })
    },
    createAddress() {
      this.showForm = true
      this.is_edit = false
    },
    dismiss() {
      this.showForm = false
    },
    refresh() {
      this.fetchAddresses()
    },
    showAddress(id) {
      this.is_edit = true
      ShippingAddressApi.show(this.$axios, id).then((response) => {
        this.edit_shipping_address = response.shipping_address
        this.showForm = true
      })
    },
    deleteAddress(id) {
      if (confirm('Are your sure?')) {
        ShippingAddressApi.delete(this.$axios, id).then((response) => {
          if (response.success) {
            this.fetchAddresses()
          }
        })
      }
    },
  },
}
</script>
