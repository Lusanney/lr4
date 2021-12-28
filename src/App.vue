<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">Hotel App</div>
      <v-spacer></v-spacer>

      <div v-if="!loggedout">
        <v-btn depressed elevation="2" @click="signout">Sign out</v-btn>
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
    //
    loggedout: false,
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

        this.loggedout = true;
      } catch (e) {
        console.log(e.data);
      }
    },
  },
};
</script>
