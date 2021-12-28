<template>
  <div class="home">
    <h1>Hello change password</h1>

    <v-container>
      <v-form ref="form" lazy-validation>
        <v-text-field
          v-model="auth.oldPass"
          :append-icon="show.showOld ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="[rules.required]"
          :type="show.showOld ? 'text' : 'password'"
          name="old-pass"
          label="Old Password"
          counter
          @click:append="show.showOld = !show.showOld"
        ></v-text-field>

        <v-text-field
          v-model="auth.newPass"
          :append-icon="show.showNew ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="[rules.required]"
          :type="show.showNew ? 'text' : 'password'"
          name="new-pass"
          label="New Password"
          counter
          @click:append="show.showNew = !show.showNew"
        ></v-text-field>

        <v-text-field
          v-model="auth.confirmPass"
          :append-icon="show.showConfirm ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="[rules.required]"
          :type="show.showConfirm ? 'text' : 'password'"
          name="new-pass"
          label="New Password"
          counter
          @click:append="show.showConfirm = !show.showConfirm"
        ></v-text-field>

        <v-btn color="success" class="mr-4" @click="submit"> Submit </v-btn>
      </v-form>

      <h5 v-if="success">Success !</h5>
    </v-container>
  </div>
</template>

<script>
const baseApiUrl = "http://localhost:8000/auth/users/set_password/";

export default {
  name: "Home",
  components: {},
  data: () => ({
    auth: {
      oldPass: "",
      newPass: "",
      confirmPass: "",
    },
    rules: {
      required: (value) => !!value || "Required.",
    },
    show: {
      showOld: false,
      showNew: false,
      showConfirm: false,
    },
    success: false,
  }),
  methods: {
    async submit() {
      const response = await this.axios.post(
        baseApiUrl,
        {
          current_password: this.auth.oldPass,
          new_password: this.auth.newPass,
          re_new_password: this.auth.confirmPass,
        },
        {
          headers: {
            Authorization: `Token ${localStorage.authToken}`,
          },
        }
      );

      this.success = true;
      console.log(response);
    },
  },
};
</script>
