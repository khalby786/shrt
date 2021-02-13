<template>
  <div id="nav">
    <h1>smallurll.</h1>
    <p class="tagline">
      a really nice looking url shortener
    </p>
  </div>
  <router-view />
  <footer>
    <p class="switch" @click="togglelights">turn {{mode}} lights</p>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      dark: false,
      darkmode: new Darkmode(),
      mode: "off"
    };
  },
  methods: {
    lightsoff() {
      document.body.style.backgroundColor = "#17141d";
      document.body.style.color = "white";
      this.dark = true;
    },
    lightson() {
      document.body.style.backgroundColor = "white";
      document.body.style.color = "black";
      this.dark = false;
    },
    togglelights() {
      // this.darkmode = ;
      this.darkmode.toggle();
      if (this.darkmode.isActivated() === true) {
        this.mode = "on"
      } else {
        this.mode = "off"
      }
    },
  },
  created() {
    // this.lightsoff();
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Fira+Code&display=swap");

body {
  /* margin: 15vw; */
  padding: 15vw;
  color: black;
  font-family: "Fira Code", "Inter", "Arial", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
    sans-serif;
  transition: 300ms;
}

h1 {
  font-family: "Inter", "Arial", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
    sans-serif;
  text-align: center;
  font-weight: 800;
  font-size: 5vw;
  margin-bottom: 0px;
  text-decoration: underline;
  text-decoration-color: yellow;
}

a {
  color: inherit;
  text-decoration: none;
}

.tagline {
  margin-top: 3px;
  text-align: center;
}

.switch {
  position: fixed;
  bottom: 30px;
  right: 30px;
  background-color: yellow;
  cursor: pointer;
}
</style>
