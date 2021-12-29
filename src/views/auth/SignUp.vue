<template>
  <v-card class="px-5 py-5 mx-auto mt-5" width="400">
    <v-card-title>Sign Up</v-card-title>
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

      <v-text-field
        v-model="auth.first_name"
        label="First Name"
        required
      ></v-text-field>

      <v-text-field
        v-model="auth.last_name"
        label="Last Name"
        required
      ></v-text-field>

      <v-btn color="success" class="mr-4" @click="submit"> Submit </v-btn>
      <v-btn :to="'/signin'" class="mr-4" color="primary">
        <v-icon left dark> mdi-key</v-icon>
        Sign In
      </v-btn>
    </v-form>
  </v-card>
</template>

<script>
const baseApiUrl = "http://localhost:8000";

export default {
  name: "SignUp",
  data: () => ({
    auth: {
      username: "",
      password: "",
      first_name: "",
      last_name: "",
    },
    show: false,
    rules: {
      required: (value) => !!value || "Required.",
    },
  }),
  methods: {
    async submit() {
      try {
        await this.axios.post(`${baseApiUrl}/api/visitors/create`, {
          ...this.auth,
        });

        const signInResponse = await this.axios.post(
          `${baseApiUrl}/auth/token/login`,
          { ...this.auth }
        );

        localStorage.authToken = signInResponse.data.auth_token;

        // get me
        const meResponse = await this.axios.get(`${baseApiUrl}/auth/users/me`, {
          headers: {
            Authorization: `Token ${signInResponse.data.auth_token}`,
          },
        });

        localStorage.meId = meResponse.data.id;

        this.$store.commit("setAuthToken", localStorage.authToken);
        this.$router.push({
          name: "Home",
        });

        this.$toasted.show("Sgined up !!", {
          theme: "toasted-primary",
          position: "top-right",
          duration: 2000,
        });
      } catch (e) {
        this.$toasted.show("Could not sign up !!", {
          theme: "bubble",
          position: "top-right",
          duration: 2000,
        });
      }
    },
  },
};
</script>
