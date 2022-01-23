<template>
  <div>
    <div
      v-if="this.$store.state.shared.status_messages.success_message != ''"
      class="sufee-alert alert with-close alert-success alert-dismissible"
    >
      <span class="badge badge-pill badge-success">Success</span>
      {{ this.$store.state.shared.status_messages.success_message }}
    </div>

    <div
      v-if="this.$store.state.shared.status_messages.error_message != ''"
      class="sufee-alert alert with-close alert-danger alert-dismissible"
    >
      <span class="badge badge-pill badge-success">Error</span>
      {{ this.$store.state.shared.status_messages.error_message }}
    </div>

    <div
      v-if="this.$store.state.shared.status_messages.validation_errors.length"
      class="sufee-alert alert with-close alert-danger alert-dismissible"
    >
      <ul
        v-for="(error, index) in this.$store.state.shared.status_messages
          .validation_errors"
        :key="index"
      >
        <li>{{ error }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StatusMessages',
  mounted() {},
}
</script>

<style scoped></style>
