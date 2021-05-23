<template>
  <v-app-bar app elevation="5">
    <v-btn :to="{ name: 'Home' }" text> Stormzy</v-btn>
    <v-spacer />
    <v-btn
      v-for="(button, index) in navigationButtons"
      :key="index"
      :to="button.to"
      class="mx-2"
      >{{ button.text }}
    </v-btn>
  </v-app-bar>
</template>
<script src="./Header.ts" type="ts" />
