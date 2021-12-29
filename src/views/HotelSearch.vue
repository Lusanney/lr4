<template>
  <div class="about">
    <h1>This is an hotel search page</h1>
    <ul>
      <li v-for="hotel in hotels" :key="hotel.id">
        {{ `Hotel: ${hotel.name}` }}
        <v-btn depressed elevation="2" @click="hotelDetails(hotel.id)">
          Details
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
      const response = await this.axios.get(`${baseApiUrl}/hotels/${id}/info`, {
        headers: {
          Authorization: `Token ${localStorage.authToken}`,
        },
      });
      return response.data;
    },
    async getAllHotels() {
      try {
        const response = await this.axios.get(`${baseApiUrl}/hotels`, {
          headers: {
            Authorization: `Token ${localStorage.authToken}`,
          },
        });
        this.hotels = response.data;
      } catch (e) {
        this.$toasted.show("Could not get hotels !!", {
          theme: "bubble",
          position: "top-right",
          duration: 2000,
        });
      }
    },
  },
  created() {
    this.getAllHotels();
  },
};
</script>
