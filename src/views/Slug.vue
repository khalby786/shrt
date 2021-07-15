<template>
  <div class="redirect-text">
    <p class="loading" v-if="url === null"><i>Loading...</i></p>
    <p v-if="url === true">Hang on, you're being redirected!</p>
    <p v-if="url === true">You are being redirected to {{ url }}.</p>
    <p v-if="url === false">Slug doesn't exist!</p>
    <p v-if="url === false"><router-link to="/">Let's go back home!</router-link></p>
  </div>
</template>

<script>
const clipboardListener = require('clipboard-event');

export default {
  name: "Slug",
  data() {
    return {
      slug: this.$route.params.slug,
      url: null,
    };  
  },
  created: function () {
    console.log(this.$route.params.slug);
    fetch("/api/fetch?slug=" + this.slug)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 400) {
          this.url = false;
          // window.location.replace("/");
        }
        console.log("going to add 1 to counter!");
        // fetch("/api/counter?slug=" + this.slug)
        //     .then(res => res.text())
        //     .then(data => console.log(data))
        (async () => {
          console.log(this.slug);
          let request = await fetch("/api/counter?slug=" + this.slug);
          let response = await request.text();
          console.log(response);

          window.location.replace(decodeURIComponent(data.data.url));
          if (
            data.data.url ===
            "https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DdQw4w9WgXcQ"
          ) {
            this.url = "rickrolled";
          } else {
            this.url = decodeURIComponent(data.data.url);
          }
        })();
      });
  },
};
</script>

<style scoped>
.redirect-text {
  text-align: center;
  margin-top: 100px;
  font-family: "Fira Mono", monospace;
}

.loading {
  max-width: 200px;
  margin: 0 auto;
  background-color: var(--blue);
  font-family: var(--sans);
  margin-top: 15px;
  box-shadow: none;
  color: white;
  transition: 150ms;
  padding: 10px 20px;
  border-radius: 3px;
  font-size: 22px;
  border: none;
  box-shadow: 0 2.3px 1.9px rgba(0, 0, 0, 0.013),
    0 5.4px 4.3px rgba(0, 0, 0, 0.019), 0 9.7px 7.7px rgba(0, 0, 0, 0.023),
    0 16.1px 12.8px rgba(0, 0, 0, 0.027), 0 26.5px 21.2px rgba(0, 0, 0, 0.031),
    0 46.2px 37px rgba(0, 0, 0, 0.037), 0 100px 80px rgba(0, 0, 0, 0.05);
  transition: 200ms;
}
</style>