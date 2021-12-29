<template>
  <v-dialog v-model="show" width="500">
    <v-card>
      <v-card-title class="text-h5 grey lighten-2">
        Booking Code:
        {{ booking ? booking.Booking.booking_code : "" }}
      </v-card-title>

      <v-container>
        <v-card-text>
          Check-in: {{ booking ? booking.Booking.date_checkin : "" }}
        </v-card-text>

        <v-card-text>
          Check-out: {{ booking ? booking.Booking.date_checkout : "" }}
        </v-card-text>

        <div class="mt-5">
          <strong>Bills</strong>
          <div v-if="booking">
            <v-card v-for="bill in booking.Booking.bills" :key="bill.id">
              <v-card-text> Service: {{ bill.service_name }} </v-card-text>
              <v-card-text> Description: {{ bill.description }} </v-card-text>
              <v-card-text> Total: {{ bill.total }} </v-card-text>
            </v-card>
          </div>
        </div>

        <v-divider></v-divider>

        <div class="mt-3">
          <v-card-text>
            <strong>Total Pay: </strong> {{ booking.Report.total_price }}
          </v-card-text>
          <v-card-text>
            <strong>Total Days stay: </strong> {{ booking.Report.total_days }}
          </v-card-text>
        </div>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "BookingDetails",
  props: ["booking", "show"],
  methods: {},
  watch: {
    show: function (value) {
      this.$emit("onShowChanged", value);
    },
  },
};
</script>
