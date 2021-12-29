<template>
  <v-container>
    <v-form ref="form" lazy-validation>
      <v-text-field
        v-model="auth.username"
        label="Username"
        required
      ></v-text-field>

      <v-text-field
        v-model="auth.password"
        :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
        :rules="[rules.required]"
        :type="show ? 'text' : 'password'"
        name="input-10-1"
        label="Password"
        counter
        @click:append="show = !show"
      ></v-text-field>
      <v-btn color="success" class="mr-4" @click="submit"> Submit </v-btn>
    </v-form>
  </v-container>
</template>

<script>
const baseApiUrl = "http://localhost:8000/auth";

export default {
  name: "SignIn",
  data: () => ({
    auth: {
      username: "",
      password: "",
    },
    show: false,
    rules: {
      required: (value) => !!value || "Required.",
    },
  }),
  methods: {
    async submit() {
      try {
        const response = await this.axios.post(`${baseApiUrl}/token/login`, {
          ...this.auth,
        });
        localStorage.authToken = response.data.auth_token;

        // get me
        const meResponse = await this.axios.get(`${baseApiUrl}/users/me`, {
          headers: {
            Authorization: `Token ${response.data.auth_token}`,
          },
        });

        localStorage.meId = meResponse.data.id;

        this.$store.commit("setAuthToken", localStorage.authToken);
        this.$router.push({
          name: "Home",
        });

        this.$toasted.show("Logged in !!", {
          theme: "toasted-primary",
          position: "top-right",
          duration: 2000,
        });
      } catch (e) {
        this.$toasted.show("Could not sign in !!", {
          theme: "bubble",
          position: "top-right",
          duration: 2000,
        });
      }
    },
  },
};
</script>
