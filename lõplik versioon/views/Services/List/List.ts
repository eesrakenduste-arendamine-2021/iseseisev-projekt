import Vue from "vue";
import { Component } from "vue-property-decorator";
import { ServiceListData } from "@/DummyData/ServiceListData";
import Header from "@/components/Header/Header.vue";
import { Service } from "@/types/services";

@Component({
  components: {
    Header,
  },
})
export default class List extends Vue {
  servicesArray: Service[] = ServiceListData;

  serviceKeys: string[] = [
    "Teenus",
    "url",
    "platform",
    "versioon",
    "server",
    "asukoht serveris",
    "tehniline kontakt",
    "tellija",
    "kommentaarid",
    "Teated",
  ];
}
