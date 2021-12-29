<template>
  <v-dialog v-model="show" width="500">
    <v-card v-if="hotelDetails">
      <v-card-title class="text-h5 grey lighten-2">
        Hotel Details for
        {{ hotelDetails.Hotel.name }}
      </v-card-title>

      <v-container>
        <v-card-text> Address: {{ hotelDetails.Hotel.address }} </v-card-text>

        <v-card-text>
          description: {{ hotelDetails.Hotel.description }}
        </v-card-text>

        <div class="mt-5">
          <strong>Owner Contact</strong>
          <div v-if="hotelDetails">
            <v-card>
              <v-card-text>
                username: {{ hotelDetails.Hotel.owner.username }}
              </v-card-text>
              <v-card-text>
                full name:
                {{
                  hotelDetails.Hotel.owner.first_name +
                  " " +
                  hotelDetails.Hotel.owner.last_name
                }}
              </v-card-text>
              <v-card-text>
                email: {{ hotelDetails.Hotel.owner.email }}
              </v-card-text>
              <v-card-text>
                phone: {{ hotelDetails.Hotel.owner.phone }}
              </v-card-text>
            </v-card>
          </div>
        </div>

        <v-divider></v-divider>

        <div class="mt-3">
          <strong>Extra info</strong>
          <v-card-text>
            <strong>Total Rooms: </strong> {{ hotelDetails.Info.total_rooms }}
          </v-card-text>
          <v-card-text>
            <strong>Available Rooms: </strong>
            {{ hotelDetails.Info.available_rooms }}
          </v-card-text>
          <v-card-text>
            <strong>Min Price: </strong> {{ hotelDetails.Info.min_price }}
          </v-card-text>
          <v-card-text>
            <strong>Max Price: </strong> {{ hotelDetails.Info.max_price }}
          </v-card-text>
          <v-card-text>
            <strong>Average Price: </strong>
            {{ hotelDetails.Info.average_price }}
          </v-card-text>
        </div>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "HotelDetails",
  props: ["hotelDetails", "show"],
  methods: {},
  watch: {
    show: function (value) {
      this.$emit("onShowChanged", value);
    },
  },
};
</script>
