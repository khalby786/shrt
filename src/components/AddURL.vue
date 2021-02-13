<template>
  <form @submit.prevent="addUrl()">
    <center>
      <input
        id="url"
        type="url"
        placeholder="enter url to shorten. eg.: https://google.com"
        v-model="url"
      /><br />
      <input
        id="slug"
        type="text"
        placeholder="enter slug for shortened url. eg.: /myshorturl"
        v-model="slug"
      /><br />
    </center>
    <input id="submit-url" type="submit" value="small-ify!" />
  </form>

  <p class="message">
    {{ message }}<br>
    <a v-if="message !== ''" :href="location + slugFromResponse">{{location + slugFromResponse}}</a>
  </p>

  <br /><br />

  <button class="stats" @click="wannaViewStats = true">slug stats</button><br /> 
  <input v-if="wannaViewStats" type="text" placeholder="enter slug to view stats. eg.: /myshorturl" v-model="statSlug" />
</template>

<script>
export default {
  name: "AddURL",
  data() {
    return {
      url: null,
      slug: null,
      message: "",
      wannaViewStats: false,
      statSlug: null,
      slugFromResponse: "",
      location: window.location
    };
  },
  methods: {
    validURL: function(str) {
      var pattern = new RegExp(
        "^(https?:\\/\\/)?" + // protocol
          "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
          "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
          "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
          "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
          "(\\#[-a-z\\d_]*)?$",
        "i"
      ); // fragment locator
      return !!pattern.test(str);
    },
    addUrl: function() {
      console.log(this.url);
      console.log(this.slug);
      console.log(process.env.PROJECT_KEY);

      var that = this;

      // fetch("/api/existence?slug" + this.slug)
      //     .then(res => res.json())
      //     .then(data => {
      //         console.log(data);
      //         if (data !== null) {
      //             console.log("slug exists!")
      //             return;
      //         }
      //     })

      if (this.validURL(this.url) === false) {
        // not a valid url
        this.message = "Please enter a valid URL!";
        return;
      }

      fetch(`/api/new`, {
        method: "POST",
        body: JSON.stringify({
          url: encodeURIComponent(this.url),
          slug: this.slug,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          that.message = data.message;
          that.slugFromResponse = data.slug;
        });
    },
  },
};
</script>

<style>
a {
  color: #6b17e6;
}

form {
  padding: 5vw;
}

[type="url"],
[type="text"] {
  display: block;
  padding: 10px 20px;
  box-shadow: none;
  border: 1px solid grey;
  color: black;
  font-family: "Fira Code", monospace;
  transition: 150ms;
  margin: 0 auto;
  width: 100%;
}

[type="url"]:hover,
[type="text"]:hover {
  border: 1px solid black;
  transition: 150ms;
}

[type="submit"], button {
  display: block;
  margin-top: 15px;
  box-shadow: none;
  border: 1px solid grey;
  color: black;
  font-family: "Fira Code", monospace;
  transition: 150ms;
  padding: 10px 20px;
  cursor: pointer;
  background-color: white;
  /* margin: 0 auto; */
}

[type="submit"]:hover, button:hover {
  background-color: black;
  color: white;
  transition: 150ms;
}

[type="submit"]:active {
  background-color: yellow;
  color: black;
  transition: 150ms;
}

.message {
  text-align: center;
  font-family: "Inter", -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

@media only screen and (max-width: 600px) {
  body {
    padding: 5vw;
  }

  [type="url"], [type="text"] {
    width: 50%;
  }
}
</style>