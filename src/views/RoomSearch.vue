<template>
  <div class="about">
    <h1>This is an Room search page</h1>
    <ul>
      <li v-for="room in rooms" :key="room.id">
        {{ `Room: ${room.number} - Hotel: ${room.hotel.name}` }}
        <v-btn depressed elevation="2" @click="bookRoom(room.id)"> Book </v-btn>
      </li>
    </ul>

    <BookingFormDialog
      :show="show"
      @onShowChanged="onShowChanged"
      :room="selectedRoom"
    />
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
