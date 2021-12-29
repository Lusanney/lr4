<template>
  <v-dialog v-model="show" width="500">
    <v-card>
      <v-card-title class="text-h5 grey lighten-2">
        Booking Form for Room {{ room }}
      </v-card-title>

      <v-menu
        ref="menu_checkin"
        v-model="menu_checkin"
        :close-on-content-click="false"
        :return-value.sync="bookingForm.date_checkin"
        transition="scale-transition"
        offset-y
        min-width="auto"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="bookingForm.date_checkin"
            label="Date Check-in"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker v-model="bookingForm.date_checkin" no-title scrollable>
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="menu_checkin = false">
            Cancel
          </v-btn>
          <v-btn
            text
            color="primary"
            @click="$refs.menu_checkin.save(bookingForm.date_checkin)"
          >
            OK
          </v-btn>
        </v-date-picker>
      </v-menu>

      <v-menu
        ref="menu_checkout"
        v-model="menu_checkout"
        :close-on-content-click="false"
        :return-value.sync="bookingForm.date_checkout"
        transition="scale-transition"
        offset-y
        min-width="auto"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="bookingForm.date_checkout"
            label="Date Check-out"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker v-model="bookingForm.date_checkout" no-title scrollable>
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="menu_checkout = false">
            Cancel
          </v-btn>
          <v-btn
            text
            color="primary"
            @click="$refs.menu_checkout.save(bookingForm.date_checkout)"
          >
            OK
          </v-btn>
        </v-date-picker>
      </v-menu>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="createBooking"> I accept </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
const baseApiUrl = "http://localhost:8000/api/bookings/create";

export default {
  name: "BookingFormDialog",
  props: ["show", "room"],
  data: () => ({
    bookingForm: {
      date_checkin: new Date(
        Date.now() - new Date().getTimezoneOffset() * 60000
      )
        .toISOString()
        .substr(0, 10),
      date_checkout: new Date(
        Date.now() - new Date().getTimezoneOffset() * 60000
      )
        .toISOString()
        .substr(0, 10),
    },
    menu_checkin: false,
    menu_checkout: false,
    rules: {
      required: (value) => !!value || "Required.",
    },
  }),
  methods: {
    async createBooking() {
      try {
        const response = await this.axios.post(baseApiUrl, {
          ...this.bookingForm,
          main_guest: localStorage.meId,
          room: this.room,
        });

        console.log(response.data);
        this.$emit("onShowChanged", false);
      } catch (e) {
        this.$toasted.show("Could not create booking !!", {
          theme: "bubble",
          position: "top-right",
          duration: 2000,
        });
      }
    },
  },
  watch: {
    show: function (value) {
      this.$emit("onShowChanged", value);
    },
  },
};
</script>
