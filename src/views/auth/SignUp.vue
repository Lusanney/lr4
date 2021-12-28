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

      <v-select
        v-model="select"
        :items="roles"
        label="Select"
        data-vv-name="select"
        required
      ></v-select>

      <v-btn color="success" class="mr-4" @click="submit"> Submit </v-btn>
    </v-form>
  </v-container>
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
    select: null,
    roles: ["Visitors", "Hosts"],
  }),
  methods: {
    async submit() {
      try {
        await this.axios.post(
          `${baseApiUrl}/api/${this.select.toLowerCase()}/create`,
          { ...this.auth }
        );

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
      } catch (e) {
        console.error(e);
      }
    },
  },
};
</script>
