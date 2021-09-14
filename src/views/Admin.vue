<template>
  <v-container>
    <RoomCreator v-if="!roomExits" v-model="roomName" :isLoading="isLoading" @roomCreate="createRoom"></RoomCreator>

    <AdminPanel v-else :roomName="roomName"></AdminPanel>


    <v-snackbar
        v-model="snackbar"
        :timeout="5000"
        shaped
    >
      {{ snacktext }}

      <template v-slot:action="{ attrs }">
        <v-btn
            color="red"
            text
            v-bind="attrs"
            @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>

import RoomCreator from "@/components/RoomCreator.vue";
import AdminPanel from "@/components/AdminPanel";
import axios from "axios";
export default {
  name: "Admin",
  components: {RoomCreator,AdminPanel},
  data:function (){
    return {
      snackbar: false,
      snacktext: 'error',
      roomName: "",
      isLoading: false,
      serverAdress: process.env.VUE_APP_API_URL,
      roomExits: false
    }
  },
  methods:{
    createRoom(){
      this.isLoading = true;
      console.log(this.roomName);
      axios({
        method: 'post',
        url: this.serverAdress + '/add?roomName='+this.roomName,
      }).then(response => {
        if (response.status === 200) {
          this.roomExits = true;
        }
        else {
          this.snacktext = 'Server error'
          this.snackbar = true;
        }
        this.isLoading = false;
      }).finally(()=>{
        this.isLoading = false;
      })

    }
  },

}
</script>

<style scoped>

</style>