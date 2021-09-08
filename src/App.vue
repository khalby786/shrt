<template>
  <div id="nav">
    <h1>shrt.</h1>
    <p class="tagline">a really nice looking url shortener</p>
  </div>
  <router-view />
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {},
  created() {
    // this.lightsoff();
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Fira+Code:wght@300;400;500;600;700&display=swap");

* {
  transition: 150ms;
}

:root {
  --darkblue: #341e83;
  --blue: #3c50ff;
  --red: #e72f5b;
  --pink: #fc93f2;
  --lightpink: #ffdbff;
  --black: #000;
  --cyan: cyan;
  --sans: "Inter", "Arial", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
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
  font-family: "Inter", "Arial", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
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

label {
  text-align: left;
  font-size: 14px;
  font-family: var(--sans);
}

[type="url"],
[type="text"] {
  display: block;
  box-shadow: none;
  border: none;
  font-size: 72px;
  color: var(--blue);
  font-family: var(--mono);
  transition: 150ms;
  width: 100%;
  background-color: var(--lightpink);
  font-size: 26px;
  font-weight: 700;
}

[type="url"]:hover,
[type="text"]:hover {
  transition: 150ms;
}

[type="url"]:focus,
[type="text"]:focus {
  outline: none;
}

.prompt {
  background-color: var(--darkblue);
  color: white;
  border-bottom-left-radius: 3px;
  border-bottom-right-radius: 3px;
  padding: 3px 5px;
}

[type="submit"],
button {
  display: block;
  margin-top: 15px;
  box-shadow: none;
  color: white;
  font-family: var(--sans);
  transition: 150ms;
  padding: 10px 20px;
  cursor: pointer;
  background-color: var(--blue);
  border-radius: 3px;
  font-size: 20px;
  border: none;
  box-shadow: 0 2.3px 1.9px rgba(0, 0, 0, 0.013),
    0 5.4px 4.3px rgba(0, 0, 0, 0.019), 0 9.7px 7.7px rgba(0, 0, 0, 0.023),
    0 16.1px 12.8px rgba(0, 0, 0, 0.027), 0 26.5px 21.2px rgba(0, 0, 0, 0.031),
    0 46.2px 37px rgba(0, 0, 0, 0.037), 0 100px 80px rgba(0, 0, 0, 0.05);
  transition: 200ms;
}

[type="submit"]:hover,
button:hover {
  box-shadow: none;
  transition: 200ms;
}

[type="submit"]:active {
  background-color: white;
  color: var(--blue);
}

/* vue fade transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
