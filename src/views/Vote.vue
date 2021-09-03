<template>
  <v-container>
    <VotingComponent :room-name="roomName"></VotingComponent>
  </v-container>
</template>

<script>
import VotingComponent from "@/components/VotingComponent";
export default {
  name: "Vote",
  components:{VotingComponent},
  created() {
    this. roomName = this.$route.query.room
  },
  data: function () {
    return{
      roomName: ''
    }
  },
}
</script>

<style scoped>

</style>