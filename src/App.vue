<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-app-bar-title>
        <div class="d-flex align-center">Hotel App</div>
      </v-app-bar-title>

      <v-btn
        text
        v-for="item in menuItems"
        :key="item.title"
        :to="item.path"
        class="ml-4"
      >
        <v-icon left dark>{{ item.icon }}</v-icon>
        {{ item.title }}
      </v-btn>

      <v-spacer></v-spacer>

      <div v-if="authenticated">
        <v-btn
          text
          v-for="item in functionalItems"
          :key="item.title"
          :to="item.path"
          class="mr-4"
        >
          <div v-if="item.title">
            <v-icon left dark>{{ item.icon }}</v-icon>
            {{ item.title }}
          </div>
          <div v-else>
            <v-icon dark>{{ item.icon }}</v-icon>
          </div>
        </v-btn>

        <v-btn depressed elevation="2" @click="signout"
          ><v-icon>mdi-logout</v-icon></v-btn
        >
      </div>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
const baseApiUrl = "http://localhost:8000";

export default {
  name: "App",

  data: () => ({
    menuItems: [
      { title: "Home", path: "/home", icon: "mdi-home" },
      { title: "Room", path: "/rooms", icon: "mdi-bed" },
      { title: "Hotel", path: "/hotels", icon: "mdi-domain" },
    ],
    functionalItems: [
      { title: "My Bookings", path: "/me/bookings", icon: "mdi-bed" },
      { path: "/me/changepassword", icon: "mdi-key" },
    ],
  }),
  methods: {
    async signout() {
      try {
        await this.axios.post(
          `${baseApiUrl}/auth/token/logout/`,
          {},
          {
            headers: {
              Authorization: `Token ${localStorage.authToken}`,
            },
          }
        );

        localStorage.removeItem("authToken");
        this.$store.commit("setAuthToken", null);
        window.location.reload();
      } catch (e) {
        this.$toasted.show("Could not log you out !!", {
          theme: "bubble",
          position: "top-right",
          duration: 2000,
        });
      }
    },
  },
  computed: {
    authenticated() {
      let key;
      if (localStorage.authToken && localStorage.authToken !== "") {
        key = localStorage.authToken;
        this.$store.commit("setAuthToken", key);
      } else if (
        this.$store.getters.getAuthToken &&
        this.$store.getters.getAuthToken !== ""
      ) {
        key = this.$store.getters.getAuthToken;
      }

      return key;
    },
  },
  created() {
    this.loggedout = !localStorage.authToken;
  },
};
</script>
