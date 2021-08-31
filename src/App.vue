<template>

  <v-app>

    <v-app-bar app>

      <router-link to="/">
        <v-btn
            color="accent"
            tile
            icon
        >
          <v-img
              :src="require('@/assets/logo.svg')"
              contain
              height="50"
          />
        </v-btn>
      </router-link>

      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-container fill-height>
          <v-row align="center"
                 justify="center">
            <v-col>
              <router-link to="/vote">
                <v-btn
                    text
                >
                  Vote
                </v-btn>
              </router-link>



              <router-link to="/admin">
                <v-btn
                    text
                >
                  Admin
                </v-btn>
              </router-link>
            </v-col>
          </v-row>
        </v-container>
      </v-toolbar-items>



    </v-app-bar>

    <!-- Sizes your content based upon application components -->
    <v-main>

      <!-- Provides the application the proper gutter -->
      <v-container fluid>

        <!-- If using vue-router -->
        <router-view>

        </router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped>
a{
  text-decoration: none;
}
</style>
