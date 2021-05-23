<template>
  <div>
    <v-container>
      <v-card class="mt-10 rounded-xl" elevation="12">
        <v-card-text>
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th
                    v-for="(key, index) in serviceKeys"
                    :key="index"
                    class="body-1 text-capitalize"
                  >
                    {{ key }}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in servicesArray" :key="index">
                  <td class="body-2">{{ item.service }}</td>
                  <td class="body-2">{{ item.url }}</td>
                  <td class="body-2">{{ item.platform }}</td>
                  <td class="body-2">{{ item.version }}</td>
                  <td class="body-2">{{ item.server }}</td>
                  <td class="body-2">{{ item.location }}</td>
                  <td class="body-2">{{ item.contact }}</td>
                  <td class="body-2">{{ item.client }}</td>
                  <td class="body-2">{{ item.comment }}</td>
                  <td class="body-2"><v-checkbox readonly v-model="item.notifications"/></td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card-text>
      </v-card>
    </v-container>
  </div>
</template>

<script src="./List.ts" type="ts" />
