<template>
  <b-container>
    <b-row>
      <b-col cols="6" class="mx-auto">
        <b-card title="Private Home Page">
          Welcome <b>{{ $auth.user.name }}</b>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  layout: "defafult.vue",
  middleware: "auth" //enabling middleware and redirecting to loginpage for only this page
};
</script>

<style></style>
