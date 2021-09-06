<template>
  <v-card
      max-width="500"
  >
    <div class="text-overline mt-5 ml-3 mb-4">
      Join a Room
    </div>
    <v-container>
      <v-row>
        <v-col
            cols="8"
        >
          <v-text-field
              :loading="isLoading"
              :disabled="isLoading"
              color="accent"
              label="Room Name"
              :rules="rules"
              v-model="inputValue"
              @input="handleInput"
          >

          </v-text-field>
        </v-col>
        <v-col
            cols="3"
        >
          <v-btn
              elevation="2"
              @click="joinRoom"
          >
            Join
          </v-btn>
        </v-col>
      </v-row>
    </v-container>

  </v-card>
</template>

<script>
export default {
  name: "VoteRoomFinder",
  props: ['value','isLoading'],
  emits:['joinRoom'],
  data: function (){
    return{
      rules: [
        value => !!value || 'Required.',
        value => (value || '').length <= 20 || 'Max 20 characters',
      ],
      inputValue: this.value,
    }
  },
  methods:{
    handleInput(){
      this.$emit('input',this.inputValue)
    },
    joinRoom(){
      if (this.inputValue.length >= 1 && this.inputValue.length <= 20){
        this.$emit('joinRoom')
      }

    }
  },
}
</script>

<style scoped>

</style>