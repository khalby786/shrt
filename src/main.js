import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
// import Toasted from 'vue-toasted';

createApp(App)
  .use(router)
  // .use(Toasted)
  .mount("#app");
