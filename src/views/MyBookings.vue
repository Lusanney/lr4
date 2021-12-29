<template>
  <div class="home">
    <v-container>
      <h1>My bookings</h1>

      <div class="d-flex flex-row flex-wrap">
        <v-card
          class="my-4 mx-4"
          width="344"
          v-for="booking in bookings"
          :key="booking.id"
        >
          <v-card-text>
            <div><v-icon> mdi-ticket </v-icon> Booking</div>
            <p class="text-h4 text--primary">{{ booking.booking_code }}</p>
            <p>
              <v-icon class="mx-2"> mdi-calendar </v-icon
              >{{ booking.date_checkin }} -
              <v-icon class="mx-2"> mdi-calendar </v-icon
              >{{ booking.date_checkout }}
            </p>

            <div class="text--primary">
              Room: <b>{{ booking.room.number }}</b> of Hotel:
              <b>{{ booking.room.hotel.name }}</b>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-btn
              text
              color="deep-purple accent-4"
              @click="showBookingDetails(booking.id)"
            >
              Details
            </v-btn>
          </v-card-actions>
        </v-card>
      </div>
    </v-container>

    <BookingDetailsDialog
      :show="show"
      @onShowChanged="onShowChanged"
      :booking="bookingReport"
    />
  </div>
</template>

<script>
import BookingDetailsDialog from "../components/BookingDetailsDialog.vue";
const baseApiUrl = "http://localhost:8000/api";

export default {
  name: "Home",
  components: {
    BookingDetailsDialog,
  },
  data: () => ({
    bookings: [],
    show: false,
    bookingReport: null,
  }),
  methods: {
    onShowChanged(value) {
      this.show = value;
    },
    async showBookingDetails(id) {
      const bookingReport = await this.getBookingReport(id);
      this.show = true;
      this.bookingReport = bookingReport;
    },
    async getMyBookings() {
      const response = await this.axios.get(
        `${baseApiUrl}/visitors/${localStorage.meId}/bookings`,
        {
          headers: {
            Authorization: `Token ${localStorage.authToken}`,
          },
        }
      );

      this.bookings = response.data;
    },
    async getBookingReport(id) {
      const response = await this.axios.get(
        `${baseApiUrl}/bookings/${id}/report`,
        {
          headers: {
            Authorization: `Token ${localStorage.authToken}`,
          },
        }
      );

      return response.data;
    },
  },
  created() {
    this.getMyBookings();
  },
};
</script>
