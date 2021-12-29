<template>
  <div class="about">
    <v-container>
      <h1>Room Page</h1>
      <div class="d-flex flex-row flex-wrap">
        <v-card
          elevation="6"
          width="400"
          class="my-4 mx-4"
          shaped
          v-for="room in rooms"
          :key="room.id"
        >
          <v-card-title>
            Room {{ room.number }} of Hotel: {{ room.hotel.name }}
          </v-card-title>

          <v-card-subtitle>
            <v-icon> mdi-pin</v-icon>
            {{ room.hotel.address }}
          </v-card-subtitle>

          <v-card-text>
            {{ room.hotel.description }}
          </v-card-text>

          <v-divider> </v-divider>
          <v-card-actions>
            <v-card-text>
              <b class="subtitle-1">${{ room.price }} </b> / night
            </v-card-text>
            <v-btn
              class="mx-4"
              depressed
              elevation="2"
              @click="bookRoom(room.id)"
            >
              Book
            </v-btn>
          </v-card-actions>
        </v-card>
      </div>

      <BookingFormDialog
        :show="show"
        @onShowChanged="onShowChanged"
        :room="selectedRoom"
      />
    </v-container>
  </div>
</template>

<script>
import BookingFormDialog from "../components/BookingFormDialog.vue";
const baseApiUrl = "http://localhost:8000/api";

export default {
  name: "RoomSearch",
  components: {
    BookingFormDialog,
  },
  data: () => ({
    rooms: [],
    show: false,
    selectedRoom: null,
  }),

  methods: {
    onShowChanged(value) {
      this.show = value;
    },
    async getAllRooms() {
      try {
        const response = await this.axios.get(`${baseApiUrl}/rooms`, {
          headers: {
            Authorization: `Token ${localStorage.authToken}`,
          },
        });
        this.rooms = response.data;
      } catch (e) {
        this.$toasted.show("Could not get all rooms !!", {
          theme: "bubble",
          position: "top-right",
          duration: 2000,
        });
      }
    },
    async bookRoom(id) {
      this.selectedRoom = id;
      this.show = true;
    },
  },
  created() {
    this.getAllRooms();
  },
};
</script>
