<template>
  <v-container class="ma-16">
    <v-card class="rounded-xl" elevation="10">
      <v-card-title><h1 class="display-1">Lisa teenus</h1></v-card-title>
      <v-card-text>
        <v-row>
          <v-col
            v-for="(item, index) in Object.keys(serviceData)"
            :key="index"
            md="6"
            sm="12"
          >
            <v-text-field
              v-if="serviceData[item] !== serviceData.notifications"
              v-model="serviceData[item]"
              :label="item"
              class="text-capitalize"
              dense
              filled
            ></v-text-field>
          </v-col>
        </v-row>

        <v-divider class="mt-7" />

        <h1 class="body-1">Saa teateid</h1>
        <v-switch
          v-model="serviceData.notifications"
          :label="serviceData.notifications ? 'soovin' : 'ei soovi'"
        ></v-switch>
      </v-card-text>
      <v-card-actions>
        <v-btn class="ma-2 primary" @click="logData">Lisa teenus</v-btn>
        <v-btn class="ma-2">Tagasi</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>
<script src="./Add.ts" type="ts" />
