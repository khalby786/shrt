<template>
  <form @submit.prevent="addUrl()">
    <label for="url">enter url to shorten.</label>
    <input
      id="url"
      type="url"
      placeholder="https://google.com"
      v-model="url"
      name="url"
      @keyup="validateURL()"
      required
    />
    <div class="prompt" v-if="showUrlPrompt === true">
      {{ urlPrompt }}
    </div>
    <br />
    <label for="slug">enter slug for shortened url.</label>
    <input
      id="slug"
      type="text"
      placeholder="myshorturl"
      v-model="slug"
      name="slug"
      @input="slugify(this.slug)"
      required
    /><br />
    <input id="submit-url" type="submit" value="small-ify!" />
  </form>

  <transition name="fade">
    <p class="message" v-if="showResultPrompt === true">
      {{ message }} &nbsp;
      <a v-if="loadingOverlay.shortenedUrl === true && message !== ''" :href="location + slugFromResponse">{{
        location + slugFromResponse
      }}</a>

      <span class="right-text">
        <span class="url-share" v-if="loadingOverlay.share === true">{{ shareText }}</span
        >&nbsp;
        <span class="dismiss-text" @click="this.showResultPrompt = false"
          >ALRIGHT, COOL!</span
        >
      </span>
    </p>
  </transition>

  <br /><br />

  <button class="stats" @click="wannaViewStats = true">slug stats</button><br />
  <input
    v-if="wannaViewStats"
    type="text"
    placeholder="enter slug to view stats. eg.: /myshorturl"
    v-model="statSlug"
  />

  <div class="loading-overlay" v-if="showLoadingOverlay === true">
    <p>Loading...</p>
  </div>
</template>

<script>
const isUrl = require("is-valid-http-url");
const friendlyWords = require("friendly-words");

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
      location: window.location,
      urlPrompt: "",
      shareText: "COPY TO CLIPBOARD!",
      showResultPrompt: false,
      showLoadingOverlay: false,
      loadingOverlay: {
        share: false,
        shortenedUrl: false
      }
    };
  },
  watch: {
    slug: function (raw, formated) {
      this.slugify();
    },
  },
  mounted() {
    let that = this;
    function generateRandomString() {
      let randomSlug =
        friendlyWords.predicates[
          Math.floor(Math.random() * friendlyWords.predicates.length)
        ] +
        "-" +
        friendlyWords.objects[
          Math.floor(Math.random() * friendlyWords.objects.length)
        ];
      fetch("/api/existence?slug=" + encodeURIComponent(randomSlug))
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.status === 400) {
            console.log("slug does not exist!");
            that.slug = randomSlug;
          } else {
            generateRandomString.call(this);
          }
        });
    }

    generateRandomString();
  },
  methods: {
    validURL: function (str) {
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
    slugify: function () {
      const a =
        "àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;";
      const b =
        "aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------";
      const p = new RegExp(a.split("").join("|"), "g");

      this.slug = this.slug
        .toString()
        .toLowerCase()
        .replace(/\s+/g, "-") // Replace spaces with -
        .replace(p, (c) => b.charAt(a.indexOf(c))) // Replace special characters
        .replace(/&/g, "-and-") // Replace & with 'and'
        .replace(/[^\w\-]+/g, "") // Remove all non-word characters
        .replace(/\-\-+/g, "-") // Replace multiple - with single -
        .replace(/^-+/, "") // Trim - from start of text
        .replace(/-+$/, ""); // Trim - from end of text
    },
    validateURL: function () {
      if (!/^(ftp|http|https):\/\/[^ "]+$/.test(this.url)) {
        this.showUrlPrompt = true;
        this.urlPrompt = "Invalid URL!";
      } else {
        this.showUrlPrompt = false;
      }
    },
    addUrl: function () {
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

      this.showLoadingOverlay = true;

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
          this.showLoadingOverlay = false;
          console.log(data);
          if (data.status === 200) {
            this.loadingOverlay.share = true;
            this.loadingOverlay.shortenedUrl = true;
          }
          this.showResultPrompt = true;
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

#submit-url {
  display: block;
  margin-top: 15px;
  box-shadow: none;
  color: white;
  font-family: var(--sans);
  transition: 150ms;
  padding: 10px 20px;
  cursor: pointer;
  background-color: var(--darkblue);
  border-radius: 3px;
  font-size: 22px;
  border: none;
  box-shadow: 0 2.3px 1.9px rgba(0, 0, 0, 0.013),
    0 5.4px 4.3px rgba(0, 0, 0, 0.019), 0 9.7px 7.7px rgba(0, 0, 0, 0.023),
    0 16.1px 12.8px rgba(0, 0, 0, 0.027), 0 26.5px 21.2px rgba(0, 0, 0, 0.031),
    0 46.2px 37px rgba(0, 0, 0, 0.037), 0 100px 80px rgba(0, 0, 0, 0.05);
  transition: 200ms;
}

#submit-url:hover {
  box-shadow: none;
  transition: 200ms;
}

#submit-url:active {
  background-color: white;
  color: var(--darkblue);
}

[type="submit"],
button {
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

[type="submit"]:hover,
button:hover {
  background-color: black;
  color: white;
  transition: 150ms;
}

[type="submit"]:active {
  background-color: yellow;
  color: black;
  transition: 150ms;
}

.loading-overlay {
  z-index: 9;
  position: fixed;
  top: 0px;
  right: 0px;
  left: 0px;
  background-color: rgba(0, 0, 0, 0.5);
  height: 100%;
  width: 100%;
  font-family: var(--sans);
  font-weight: 500;
  font-size: 24px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}

.loading-overlay > * {
  margin: auto;
  padding: 0 5px 8px 0;
  background: repeating-linear-gradient(90deg, currentColor 0 8%, #0000 0 10%)
    200% 100%/200% 3px no-repeat;
  animation: c3 2s steps(6) infinite;
  color: white;
}

@keyframes c3 {
  to {
    background-position: 80% 100%;
  }
}

.message {
  text-align: left;
  font-family: var(--sans);
  background-color: var(--darkblue);
  border-radius: 3px;
  padding: 10px 20px;
  color: white;
  position: fixed;
  left: 10px;
  bottom: 10px;
  right: 10px;
  margin: 0px;
}

.message > a {
  color: var(--cyan);
  font-family: var(--mono);
}

.message > .right-text {
  float: right;
  font-family: var(--mono);
}

.dismiss-text {
  cursor: pointer;
  color: var(--cyan);
  font-weight: bold;
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

@media only screen and (max-width: 600px) {
  body {
    padding: 5vw;
  }

  /* [type="url"],
  [type="text"] {
    width: 50%;
  } */
}
</style>