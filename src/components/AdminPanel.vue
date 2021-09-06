<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card class="topCard">
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
              <v-col class="text-center pa-4">
                Room Name: {{roomName}}
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
      <v-col>
        <v-card class="topCard">
          <apexchart type="area" height="200" :options="chartOptions" :series="series"></apexchart>

        </v-card>
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
                  <v-container>
                    <v-row>
                      <v-col>
                        Reset Votes:
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="10" offset="">
                        <v-btn
                            color="blue"
                            class="pa-16 ma-4"
                            @click="resetRoom"
                        >
                          <v-icon
                              left
                              size="100"
                              class="ma-1 mr-12"
                          >
                            mdi-autorenew
                          </v-icon>
                          <div class="bigTextBtn">
                            Reset
                          </div>


                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-container>
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
import sha256 from 'crypto-js/sha256';
import Config from "@/config.json";

export default {
  name: "AdminPanel",
  props:['roomName'],
  data: function () {
    return{
      BaseUrl: Config.SERVER_URL,
      APIUrl: Config.API_URL,
      copyIconColor: "blue",
      voteCount: null,
      voteAvrage: null,
      intervalAPIRequest: null,
      lastRequestDataHash: null,

      series: [{
        name: "Results",
        data: [0,0,0,0,0],
      }],
      chartOptions: {
        chart: {
          type: 'area',
          height: 300,
          zoom: {
            enabled: false
          },
          animations: {
            enabled: true,
            speed: 1500,
            animateGradually: {
              enabled: true,
              delay: 250
            },
            dynamicAnimation: {
              enabled: true,
              speed: 1000
            }
          }
        },
        xaxis: {
          categories: [1,2,3,4,5]
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'smooth'
        },
        title: {
          text: 'Vote Results',
          align: 'left'
        },

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
    resetRoom(){
      axios({
        method: 'post',
        url: this.APIUrl + '/add/?roomName='+this.roomName,
      })
      this.clearData()

    },
    clearData(){
      this.voteCount = 0
      this.voteAvrage = null

      let seriesVoteData =  [{
        name: "Results",
        data: [0,0,0,0,0],
      }]
      this.series = seriesVoteData;
    },
    updateDataFromAPI(){
      axios({
        method: 'get',
        url: this.APIUrl + '/room/?roomName='+this.roomName,
      }).then(response => {
        if (response.status === 200 && response.data.length > 0) {
          let votes = response.data

          let currentResponseHash = sha256(JSON.stringify(votes))
          if (this.lastRequestDataHash === currentResponseHash){return;}
          this.lastRequestDataHash = currentResponseHash

          let count = votes.length
          if (count === 0){ // Clear all
            this.clearData()
            return;
          }
          this.voteCount = count
          let sum = 0
          let resultVoteData = {1:0,2:0,3:0,4:0,5:0}
          votes.forEach((vote)=>{
            let voteValue = parseInt(vote)
            sum += voteValue
            resultVoteData[voteValue]++
          })
          this.voteAvrage = parseFloat(sum / count).toFixed(2)

          let seriesVoteData =  [{
            name: "Results",
            data: Object.values(resultVoteData),
          }]
          this.series = seriesVoteData;

        }
      })
    },
  },
  created() {
    this.intervalAPIRequest = setInterval(()=>{ this.updateDataFromAPI() },3000)
  },
  beforeDestroy() {
    clearInterval(this.intervalAPIRequest)
  }
}
</script>

<style scoped>
.bigNumber{
  font-size: 8rem;
}
.bigTextBtn{
  font-size: 4rem;
}

</style>