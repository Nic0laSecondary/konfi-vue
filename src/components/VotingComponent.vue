<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card>
          <v-container>
            <v-row>
              <v-col></v-col>
            </v-row>
            <v-row>
              <v-col class="text-center">
                <v-rating
                    v-model="currentVote"
                    full-icon="$konfi"
                    empty-icon="$konfi_grey"
                    size="12rem"
                >
                </v-rating>
              </v-col>
            </v-row>
            <v-row>
              <v-divider></v-divider>
            </v-row>
            <v-row>
              <v-col cols="2" offset="5">
                <v-btn
                    @click="sendVote"
                  large
                  color="blue"
                >
                  Send
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: "VotingComponent",
  props:['roomName'],
  data:function () {
    return{
      currentVote: 0,
      hasVoted: false,
      serverUrl: process.env.VUE_APP_API_URL,
      myFakeCookie: 0,
    }
  },
  methods:{
    sendVote(){
      if (this.hasVoted === false) {
        console.log('votingNow')
        axios({
          method: 'post',
          url: this.serverUrl + '/vote/?roomName='+this.roomName+'&vote='+this.currentVote+ '&fakeCookie='+this.myFakeCookie,
        }).then(response => {
          if (response.status === 200) {
            this.myFakeCookie = parseInt(response.data)
          }

        })

      }
      else {
        console.log('hasVoted')
      }
    }
  }

}
</script>

<style scoped>

</style>