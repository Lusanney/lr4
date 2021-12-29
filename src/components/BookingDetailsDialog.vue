<template>
  <v-dialog v-model="show" width="500">
    <v-card v-if="booking">
      <v-card-title class="text-h5 grey lighten-2">
        Booking Code:
        {{ booking.Booking.booking_code }}
      </v-card-title>

      <v-container>
        <v-card color="#385F73" dark>
          <v-card-text>
            <v-icon class="mx-3"> mdi-calendar</v-icon>
            {{ booking.Booking.date_checkin }} -
            <v-icon class="mx-3"> mdi-calendar</v-icon>
            {{ booking.Booking.date_checkout }}
          </v-card-text>
        </v-card>

        <div class="mt-5">
          <strong>Bills</strong>
          <div v-if="booking">
            <v-card
              v-for="bill in booking.Booking.bills"
              :key="bill.id"
              color="#385F73"
              dark
            >
              <v-card-text> Service: {{ bill.service_name }} </v-card-text>
              <v-card-text> Description: {{ bill.description }} </v-card-text>
              <v-card-text> Total: ${{ bill.total }} </v-card-text>
            </v-card>
          </div>
        </div>

        <v-divider></v-divider>

        <div class="mt-3">
          <strong>Report</strong>
          <v-card color="#385F73" dark>
            <v-card-text>
              <strong>Total Pay: </strong> ${{ booking.Report.total_price }}
            </v-card-text>
            <v-card-text>
              <strong>Total Days stay: </strong> {{ booking.Report.total_days }}
            </v-card-text>
          </v-card>
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
