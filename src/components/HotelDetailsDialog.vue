<template>
  <v-dialog v-model="show" width="500">
    <v-card v-if="hotelDetails">
      <v-container>
        <v-card color="#385F73" dark>
          <v-card-title class="text-h5">
            {{ hotelDetails.Hotel.name }}
          </v-card-title>

          <v-card-subtitle>{{
            hotelDetails.Hotel.description
          }}</v-card-subtitle>
          <v-card-text>
            <v-icon> mdi-pin</v-icon> {{ hotelDetails.Hotel.address }}
          </v-card-text>
        </v-card>

        <div class="mt-5">
          <strong>Owner Contact</strong>

          <div v-if="hotelDetails">
            <v-card color="#385F73" dark class="px-5 py-5">
              <p>
                <v-icon> mdi-pen</v-icon>
                {{
                  hotelDetails.Hotel.owner.first_name +
                  " " +
                  hotelDetails.Hotel.owner.last_name
                }}
              </p>
              <p>
                <v-icon> mdi-pen</v-icon>
                {{ hotelDetails.Hotel.owner.username }}
              </p>
              <p><v-icon> mdi-pin</v-icon> {{ hotelDetails.Hotel.address }}</p>
              <p>
                <v-icon> mdi-email</v-icon> {{ hotelDetails.Hotel.owner.email }}
              </p>
              <p>
                <v-icon> mdi-phone</v-icon> {{ hotelDetails.Hotel.owner.phone }}
              </p>
            </v-card>
          </div>
        </div>

        <v-divider></v-divider>

        <div class="mt-3">
          <strong>Extra info</strong>
          <v-card color="#385F73" dark>
            <v-card-text>
             <strong>Total Rooms: </strong> {{ hotelDetails.Hotel.address }}
            </v-card-text>
            <v-card-text>
             <strong>Min Price: </strong> {{ hotelDetails.Info.min_price }}
            </v-card-text>
            <v-card-text>
             <strong>Max Price: </strong> {{ hotelDetails.Info.max_price }}
            </v-card-text>
          </v-card>
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
