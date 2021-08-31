<template>
    <v-container>
      <v-row class="text-center">
        <v-col cols="12">
          <v-img
              :src="require('../assets/logo.svg')"
              class="my-3"
              contain
              height="200"
          />
        </v-col>

        <v-col class="mb-4">
          <h1 class="display-2 font-weight-bold mb-3">
            Konfidencevote
          </h1>

          <p class="subheading font-weight-regular">
            Join the Konfidencevote now.
          </p>
        </v-col>

      </v-row>
      <v-row class="text-center">
        <v-col cols="12">
            <v-btn
                min-height="500"
                min-width="800"
                color="success"
                x-large
                class="ultra-lit-button-text"
                rounded
                @click="goVote"
            >
              Vote
            </v-btn>
        </v-col>
      </v-row>
    </v-container>
</template>

<script>


export default {
  name: 'Home',
  components: {
  },
  methods:{
    goVote(){
      this.$router.push({ path: 'vote' })
    }
  },
}
</script>
<style scoped>
.ultra-lit-button-text{
  font-size: 10em;
}
</style>
