<template>
  <header>
    <div class="navbar">
      <p class="navbar-text">
        <span class="navbar-github"><a href="https://github.com/khalby786/shrt">GitHub</a></span>
      </p>
    </div>
  </header>
  <div id="nav">
    <h1>shrt.</h1>
    <p class="tagline">
      a really nice looking url shortener
    </p>
  </div>
  <router-view />
</template>

<script>
export default {
  data() {
    return {

    };
  },
  methods: {
  },
  created() {
    // this.lightsoff();
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap");
@import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@300;400;500;600;700&display=swap');

:root {
  --darkblue: #341E83;
  --blue: #3C50FF;
  --red: #E72F5B;
  --pink: #FC93F2;
  --lightpink: #FFDBFF;
  --black: #000;
  --cyan: cyan;
  --sans: "Inter", "Arial", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
    sans-serif;
  --mono: "Fira Code", "IBM Plex Mono", "Consolas", monospace;
}

body {
  /* margin: 15vw; */
  color: var(--black);
  font-family: var(--mono);
  transition: 300ms;
  margin: 0 auto;
  max-width: 700px;
  padding-top: 50px;
  padding-bottom: 50px;
  background-color: var(--lightpink);
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
  text-decoration-color: var(--pink);
}

a {
  color: inherit;
  text-decoration: none;
}

header {
  
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
