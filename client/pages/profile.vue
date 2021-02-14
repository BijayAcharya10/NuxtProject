<template>
  <v-card class="mx-auto" max-width="300">
    <v-card-text>
      <p class="display-1 text--primary">
        {{ $auth.user.name }}
      </p>
      <p>{{ $auth.user.email }}</p>
      <div class="text--primary">
        well meaning and kindly.<br />
        "a benevolent smile"
      </div>
    </v-card-text>
    <!-- <v-card-actions>
      <v-btn text color="deep-purple accent-4">
        Learn More
      </v-btn>
    </v-card-actions> -->
  </v-card>
</template>
