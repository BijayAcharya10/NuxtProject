<template>
  <b-container>
    <b-row>
      <b-col cols="6" class="mx-auto">
        <b-card title="Public Home Page">
          Home
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  middleware: "auth"
};
</script>

<style></style>
