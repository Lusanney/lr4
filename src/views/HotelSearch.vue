<template>
  <div class="about">
    <v-container>
      <h1>Hotels</h1>
      <div class="d-flex flex-row flex-wrap">
        <v-card
          max-width="344"
          outlined
          class="mx-4 my-4"
          v-for="hotel in hotels"
          :key="hotel.id"
        >
          <v-list-item three-line>
            <v-list-item-content>
              <div class="text-overline mb-4">
                <v-icon> mdi-domain</v-icon> HOTEL
              </div>
              <v-list-item-title class="text-h5 mb-1">
                {{ hotel.name }}
              </v-list-item-title>
              <v-list-item-subtitle>{{
                hotel.description
              }}</v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-avatar
              tile
              size="80"
              color="grey"
            ></v-list-item-avatar>
          </v-list-item>

          <v-card-actions>
            <v-btn outlined rounded text @click="hotelDetails(hotel.id)">
              Details
            </v-btn>
          </v-card-actions>
        </v-card>
      </div>
      <HotelDetailsDialog
        :show="show"
        @onShowChanged="onShowChanged"
        :hotelDetails="selectedHotelDetails"
      />
    </v-container>
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
