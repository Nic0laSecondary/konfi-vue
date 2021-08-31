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
              <v-col>
                <v-rating
                    v-model="currentVote"
                    full-icon="$konfi"
                    empty-icon="$konfi_grey"
                    size="300"
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
export default {
  name: "VotingComponent",
  props:['roomName'],
  data:function () {
    return{
      currentVote: 0,
    }
  },
  methods:{
    sendVote(){

    }
  }

}
</script>

<style scoped>

</style>