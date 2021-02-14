<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
          style="text-decoration:none"
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app color="primary" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" class="drawer-item" />
      <v-toolbar-title>Shangrila</v-toolbar-title>
      <v-spacer></v-spacer>
      <template v-if="$auth.loggedIn">
        <NuxtLink to="/home" style="text-decoration: none;"
          ><v-btn depressed color="primary" class="navitem">
            <v-icon style="margin-right: 5px">mdi-home</v-icon> Home
          </v-btn>
        </NuxtLink>
        <NuxtLink to="/dashboard" style="text-decoration: none;"
          ><v-btn depressed color="primary" class="navitem">
            <v-icon style="margin-right: 5px">mdi-apps</v-icon> Dashboard
          </v-btn>
        </NuxtLink>
        <NuxtLink to="/" style="text-decoration:none;"
          ><v-btn
            depressed
            color="primary"
            class="navitem"
            @click.prevent="logout()"
          >
            <v-icon style="margin-right: 5px">mdi-logout</v-icon>Log Out
          </v-btn>
        </NuxtLink>
      </template>
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Dashboard',
          to: '/dashboard'
        },
        {
          icon: 'mdi-account-circle',
          title: 'Users',
          to: '/users'
        }
      ],
      miniVariant: false
    };
  },
  methods: {
    async logout() {
      try {
        await this.$auth.logout();
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>

<style>
.side-drawer {
  text-decoration: none;
}
</style>
