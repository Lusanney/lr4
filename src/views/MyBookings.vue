<template>
  <div class="home">
    <h1>Hello my booking page</h1>

    <ul>
      <li v-for="booking in bookings" :key="booking.id">
        {{ `Booking code: ${booking.booking_code}` }}

        <v-btn depressed elevation="2" @click="showBookingDetails(booking.id)">
          Details
        </v-btn>
      </li>
    </ul>

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
        `${baseApiUrl}/visitors/${localStorage.meId}/bookings`
      );

      this.bookings = response.data;
    },
    async getBookingReport(id) {
      const response = await this.axios.get(
        `${baseApiUrl}/bookings/${id}/report`
      );

      return response.data;
    },
  },
  created() {
    this.getMyBookings();
  },
};
</script>
