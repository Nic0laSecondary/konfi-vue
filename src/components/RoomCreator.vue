<template>
  <v-card
    max-width="500"
  >
    <div class="text-overline mt-5 ml-3 mb-4">
      Create a new Voting Room
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
              @click="createRoom"
          >
            Erstellen
          </v-btn>
        </v-col>
      </v-row>
    </v-container>

    <v-snackbar
        v-model="snackbar"
        :timeout="5000"
        shaped
    >
      {{ snacktext }}

      <template v-slot:action="{ attrs }">
        <v-btn
            color="pink"
            text
            v-bind="attrs"
            @click="snackbar = false"
            :disabled="isLoading"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>

  </v-card>
</template>

<script>
export default {
  name: "RoomCreator",
  props: ['value','isLoading'],
  emits:['roomCreate'],
  computed:{
    /*inputValue(){
      return this.value;
    }*/
  },
  data: function (){
    return{
      rules: [
        value => !!value || 'Required.',
        value => (value || '').length <= 20 || 'Max 20 characters',
      ],
      snackbar: false,
      snacktext: 'Please enter a better Room Name',
      inputValue: this.value,
    }
  },
  methods:{
    handleInput(){
      this.$emit('input',this.inputValue)
    },
    createRoom(){
      if (this.inputValue.length >= 1 && this.inputValue.length <= 20){
        this.$emit('roomCreate')
      }
      else{
        this.snackbar = true
      }

    }
  },
}
</script>

<style scoped>

</style>