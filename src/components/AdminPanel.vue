<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card>
          <v-container>
            <v-row>
              <v-col>
                Code zum Beitretten:
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="10" offset="1">
                <v-text-field
                  readonly
                  :value="joinString"
                  ref="textToCopy"
                >
                  <v-btn
                      slot="append"
                      @click="copyURL"
                      icon
                  >
                    <v-icon
                        :color="copyIconColor"
                    >
                      mdi-content-copy
                    </v-icon>
                  </v-btn>
                </v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                Refresh thingy
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
      <v-col>
        Admin Vote
      </v-col>
    </v-row>
    <v-row>
      <v-col offset="1" cols="10">
        <v-card>
          <v-container>
            <v-row>
              <v-col>
                <v-card class="text-center ma-6 pa-6">
                  <p class="text-h4 text--primary">
                    Anzahl Stimmen
                  </p>
                  <h1 class="bigNumber">{{voteCount||0}}</h1>
                </v-card>
              </v-col>
              <v-col>
                <v-card class="text-center ma-6 pa-6">
                  <p class="text-h4 text--primary">
                    Durchschnitt
                  </p>
                  <h1 class="bigNumber">{{voteAvrage||"-"}}</h1>
                </v-card>
              </v-col>
              <v-col>
                <v-card class="text-center ma-6 pa-6">
                  <p class="text-h4 text--primary">
                    chart.... wip
                  </p>

                </v-card>
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
  name: "AdminPanel",
  props:['roomName'],
  data: function () {
    return{
      BaseUrl: process.env.VUE_APP_SERVER_URL,
      APIUrl: process.env.VUE_APP_API_URL,
      copyIconColor: "blue",
      voteCount: null,
      voteAvrage: null,
      voteData:{
        1:0,
        2:0,
        3:0,
        4:0,
        5:0,
      },
    }
  },
  computed:{
    joinString(){
      return this.BaseUrl+'/#/vote?room='+this.roomName
    }
  },
  methods:{
    copyURL() {
      let textToCopy = this.$refs.textToCopy.$el.querySelector('input');
      textToCopy.select()
      document.execCommand("copy");
      if (window.getSelection) {window.getSelection().removeAllRanges();}
      else if (document.selection) {document.selection.empty();}
      if (this.copyIconColor === "blue"){
        this.copyIconColor = "green";
        setTimeout(()=> this.copyIconColor = "blue",5000)
      }
    },
    updateDataFromAPI(){
      console.log("RequestToApiStarted")
      axios({
        method: 'get',
        url: this.APIUrl + '/room/?roomName='+this.roomName,
      }).then(response => {
        if (response.status === 200) {
          let votes = response.data
          let count = votes.length
          if (count === this.voteCount){return;}
          if (count === 0){ // Clear all
            this.voteCount = 0
            this.voteAvrage = null
            this.voteData = {1:0,2:0,3:0,4:0,5:0}
            return;
          }
          this.voteCount = count
          let sum = 0
          let resultVoteData = {1:0,2:0,3:0,4:0,5:0}
          votes.forEach((vote)=>{
            sum += vote
            resultVoteData[vote]++
          })
          this.voteAvrage = parseFloat(sum / count).toFixed(2)
          this.voteData = resultVoteData

        }
      })
    },
  },
  created() {
    setInterval(()=>{ this.updateDataFromAPI() },3000)
  }
}
</script>

<style scoped>
.bigNumber{
  font-size: 8rem;
}
</style>