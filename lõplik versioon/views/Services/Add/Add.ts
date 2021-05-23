import Vue from "vue";
import { Component } from "vue-property-decorator";
import { Service } from "@/types/services";

@Component({
  components: {},
})
export default class Add extends Vue {
  serviceData: Service = {
    service: "",
    contact: "",
    client: "",
    server: "",
    url: "",
    location: "",
    version: "",
    platform: "",
    comment: "",
    notifications: false,
  };

  logData() {
    console.log(JSON.parse(JSON.stringify(this.serviceData)));
  }
}
