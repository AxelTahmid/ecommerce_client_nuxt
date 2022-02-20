<template>
  <div class="container">
    <div class="bg">
      <div class="row">
        <div class="col-sm-12">
          <h2 class="title text-left">My Profile</h2>
        </div>
      </div>

      <div class="row">
        <div class="col-md-3">
          <account-sidebar></account-sidebar>
        </div>

        <div class="col-sm-9 col-md-9">
          <div class="well well-sm">
            <div class="row">
              <div class="col-sm-12">
                <h4>
                  {{ user_data.name ? user_data.name : '' }}
                </h4>

                <ul>
                  <li title="email">
                    <i class="glyphicon glyphicon-envelope"></i>
                    {{ user_data.email ? user_data.email : '' }}
                  </li>
                  <li title="date joined">
                    <i class="glyphicon glyphicon-gift"></i>
                    {{
                      user_data.created_at
                        ? this.getFormattedDate(user_data.created_at)
                        : ''
                    }}
                  </li>
                </ul>

                <nuxt-link to="/edit-account" class="btn btn-primary"
                  ><i class="fa fa-edit"></i> Edit Profile</nuxt-link
                >
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

export default {
  name: 'MyAccount',
  components: {
    AccountSidebar,
  },
  middleware: 'auth',
  head() {
    return {
      title: 'My Profile',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'My Profile',
        },
      ],
    }
  },
  computed: {
    user_data() {
      return this.$store.state.general.auth.user_data
    },
  },
  methods: {
    getFormattedDate(date) {
      return new Date(date).toISOString().slice(0, 10)
    },
  },
}
</script>
