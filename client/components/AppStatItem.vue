<template>
  <div>
    <v-row>
      <v-col style="min-width:560px;">
        <v-card
          dark
          class="mr-4 rounded-lg elevation-0 accent-2"
          :class="color"
        >
          <v-row>
            <v-col md="2">
              <img
                width="50rem"
                height="50rem"
                class="ml-2 mt-2"
                :src="require(`../assets/images/icons/${src}`)"
              />
            </v-col>
            <v-col>
              <v-card-title>
                <span class="headline"> {{ type }}: {{ count }} </span>
              </v-card-title>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  // props: ["type", "count", "src", "color"]
  props: {
    type: {
      type: String,
      default: "Stats"
    },
    count: {
      type: Number,
      default: 0
    },
    src: {
      type: String,
      default: "study.svg"
    },
    color: {
      type: String,
      default: "light-blue"
    }
  }
};
</script>

<style scoped></style>
