<template>
  <div class="about">
    <h1>This is an hotel search page</h1>
    <ul>
      <li v-for="hotel in hotels" :key="hotel.id">
        {{ `Hotel: ${hotel.name}` }}
        <v-btn depressed elevation="2" @click="hotelDetails(hotel.id)">
          Book
        </v-btn>
      </li>
    </ul>
    <HotelDetailsDialog
      :show="show"
      @onShowChanged="onShowChanged"
      :hotelDetails="selectedHotelDetails"
    />
  </div>
</template>

<script>
import HotelDetailsDialog from "../components/HotelDetailsDialog.vue";
const baseApiUrl = "http://localhost:8000/api";

export default {
  name: "HotelSearch",
  components: {
    HotelDetailsDialog,
  },
  data: () => ({
    hotels: [],
    selectedHotelDetails: null,
    show: false,
  }),
  methods: {
    onShowChanged(value) {
      this.show = value;
    },
    async hotelDetails(id) {
      const hotelDetails = await this.getHotelDetails(id);
      this.selectedHotelDetails = hotelDetails;
      this.show = true;
    },
    async getHotelDetails(id) {
      const response = await this.axios.get(`${baseApiUrl}/hotels/${id}/info`);
      return response.data;
    },
    async getAllHotels() {
      try {
        const response = await this.axios.get(`${baseApiUrl}/hotels`);
        this.hotels = response.data;
      } catch (e) {
        console.error(e);
      }
    },
  },
  created() {
    this.getAllHotels();
  },
};
</script>
