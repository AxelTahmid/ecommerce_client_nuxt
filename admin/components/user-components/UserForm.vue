<template>
  <div class="row">
    <div class="col-lg-12">
      <div class="card">
        <div class="card-header">
          <strong>{{
            this.$route.params.edit
              ? 'Edit User #' + this.$route.params.edit
              : 'Create New User'
          }}</strong>
        </div>
        <div class="card-body card-block">
          <div class="form-group">
            <label for="name" class="form-control-label"
              >Name <span class="required-in">*</span></label
            >
            <input
              id="name"
              v-model="name"
              type="text"
              name="name"
              placeholder="Name"
              class="form-control"
            />
          </div>
          <div class="form-group">
            <label for="email" class="form-control-label"
              >Email <span class="required-in">*</span></label
            >
            <input
              id="email"
              v-model="email"
              type="text"
              name="email"
              placeholder="Email"
              class="form-control"
            />
          </div>
          <button
            v-if="this.$route.params.edit"
            type="button"
            class="btn btn-info"
            @click="togglePasswordBlock()"
          >
            Change Password
          </button>
          <div v-if="!this.$route.params.edit || showEditPassword">
            <div class="form-group">
              <label for="password" class="form-control-label"
                >Password <span class="required-in">*</span></label
              >
              <input
                id="password"
                v-model="password"
                type="password"
                name="password"
                placeholder="Password"
                class="form-control"
              />
            </div>
            <div class="form-group">
              <label for="password_confirmation" class="form-control-label"
                >Password Confirmation <span class="required-in">*</span></label
              >
              <input
                id="password_confirmation"
                v-model="password_confirmation"
                type="password"
                name="password_confirmation"
                placeholder="Password Confirmation"
                class="form-control"
              />
            </div>
          </div>
          <br />
          <div class="form-group">
            <label for="is_super_admin" class="form-control-label"
              >Is Super Admin</label
            >
            <label class="switch switch-default switch-primary mr-2" size="lg">
              <input
                id="is_super_admin"
                v-model="is_super_admin"
                type="checkbox"
                class="switch-input"
                name="is_super_admin"
                value="1"
              />
              <span class="switch-label"></span>
              <span class="switch-handle"></span>
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserForm',
  data() {
    return {
      showEditPassword: false,
    }
  },
  computed: {
    name: {
      get() {
        return this.$store.state.user.user.name
      },
      set(value) {
        this.$store.commit('user/setUser', { key: 'name', value })
      },
    },
    email: {
      get() {
        return this.$store.state.user.user.email
      },
      set(value) {
        this.$store.commit('user/setUser', { key: 'email', value })
      },
    },
    password: {
      get() {
        return this.$store.state.user.user.password
      },
      set(value) {
        this.$store.commit('user/setUser', { key: 'password', value })
      },
    },
    password_confirmation: {
      get() {
        return this.$store.state.user.user.password_confirmation
      },
      set(value) {
        this.$store.commit('user/setUser', {
          key: 'password_confirmation',
          value,
        })
      },
    },
    is_super_admin: {
      get() {
        return this.$store.state.user.user.is_super_admin
      },
      set(value) {
        value = value === true ? 1 : 0
        this.$store.commit('user/setUser', { key: 'is_super_admin', value })
      },
    },
  },
  methods: {
    togglePasswordBlock() {
      this.showEditPassword = !this.showEditPassword
    },
  },
}
</script>

<style scoped></style>
