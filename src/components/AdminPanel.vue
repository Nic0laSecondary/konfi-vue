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
                >
                  <v-btn
                      slot="append"
                      @click="console.log('test')"
                      icon
                  >
                    <v-icon
                        color="blue"
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
      <v-col offset="2" cols="8">
        <v-card>test</v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "AdminPanel",
  props:['roomName'],
  data: function () {
    return{

    }
  },
  computed:{
    joinString(){
      return 'localhost:8080/vote?room='+this.roomName
    }
  },
}
</script>

<style scoped>

</style>