<template>
  <div id="all">
    <div id="nav">
      <h1>smallurll.</h1>
      <p class="tagline">
        a really nice looking url shortener
      </p>
    </div>
    <router-view />
    <footer>
      <button @click="togglelights()">turn off lights</button>
    </footer>
  </div>
</template>

<script>

  export default {
    data() {
      return {
        dark: false
      }
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
        console.log("toggle");
        console.log(this.dark)
        if (this.dark === false) {
          console.log("dark mode!")
          this.lightsoff();
        } else {
          this.lightson();
        }
      }
    },  
    created () {
      // this.lightsoff();
    },
  }

</script>

<style>

  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Fira+Code&display=swap');

  body {
    border: 3px solid black;
    /* margin: 15vw; */
    margin: 1vw;
    color: black;
    font-family: "Fira Code", "Inter", "Arial", -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    transition: 300ms;
  }

  #all {
    margin: 13vw;
  }

  h1 {
    text-align: center;
    font-weight: 800;
    font-size: 4rem;
    margin-bottom: 0px;
    text-decoration: underline;
    text-decoration-color: yellow;
  }

  .tagline {
    margin-top: 3px;
    text-align: center;
  }

</style>
