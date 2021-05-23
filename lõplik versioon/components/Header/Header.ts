import Vue from "vue";
import { Component } from "vue-property-decorator";

interface NavigationButtons {
  text: string;
  to: string;
}

@Component({
  components: {},
})
export default class Header extends Vue {
  navigationButtons: NavigationButtons[] = [
    //{ text: "Kasutaja", to: "/user" },
    { text: "Teenused", to: "/services" },
    { text: "Lisa teenus", to: "/services/add" },
    { text: "Log out", to: "/log-out" },
  ];
}
