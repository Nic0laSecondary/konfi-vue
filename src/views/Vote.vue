<template>
  <v-container>
    <v-row v-if="isParameterChecking">
      <v-col offset="1" cols="10">
        <v-skeleton-loader
            type="image, image, image"
            max-width="1500"
        ></v-skeleton-loader>
      </v-col>
    </v-row>
    <VotingComponent v-if="isValidRoomName" :room-name="roomName"></VotingComponent>
    <VoteRoomFinder v-if="!isParameterChecking && !isValidRoomName" :is-loading="isServerRequestRunning" @joinRoom="checkRoom" v-model="roomName"></VoteRoomFinder>
  </v-container>
</template>

<script>
import VotingComponent from "@/components/VotingComponent";
import VoteRoomFinder from "@/components/VoteRoomFinder";
import axios from "axios";
export default {
  name: "Vote",
  components:{VotingComponent,VoteRoomFinder},
  created() {
    let queryRoomName = this.$route.query.room
    if (queryRoomName !== undefined && queryRoomName !== null &&  queryRoomName.length > 1){
      this.roomName = queryRoomName
      this.checkRoom();

    }
    else{
      this.isParameterChecking = false
    }
  },
  data: function () {
    return{
      serverUrl: process.env.VUE_APP_API_URL,
      roomNames: [],
      roomName: '',
      isParameterChecking: true,
      isValidRoomName: false,
      isServerRequestRunning: false,
    }
  },
  methods:{
    checkRoom(){

      if (this.roomNames.includes(this.roomName)){
        this.isParameterChecking = false;
        this.isValidRoomName = true;
        this.isServerRequestRunning = false;
        return;
      }
      this.isServerRequestRunning = true;
      axios({
        method: 'get',
        url: this.serverUrl + '/',
      }).then(response => {
        if (response.status === 200) {
          let rooms = response.data
          this.roomNames = []
          rooms.forEach((room)=>{
            if (room.roomName === this.roomName){
              this.isParameterChecking = false;
              this.isValidRoomName = true;
              this.isServerRequestRunning = false;
              return;
            }
            this.roomNames.push(room.roomName)
          })
        }
        this.isServerRequestRunning = false;
        this.isParameterChecking = false;

      })
    }
  },
}
</script>

<style scoped>

</style>