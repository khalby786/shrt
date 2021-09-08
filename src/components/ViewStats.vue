<!-- this file is void -->

<template>
  <div class="stats">
    <button class="stats-btn" @click="wannaViewStats = true">
      view stats for slugs</button
    ><br />
    <transition name="fade">
      <form @submit.prevent="getStats()" v-if="wannaViewStats">
        <label for="slug-stat-input">enter slug to view stats.</label>
        <input
          type="text"
          placeholder="shortened-url-slug"
          v-model="statSlug"
          class="slug-stat-input"
          @input="slugify()"
          required
        />
        <input type="submit" value="check stats" class="check-stats" />
      </form>
    </transition>
  </div>
</template>

<script>
export default {
  name: "ViewStats",
  data() {
    return {
      wannaViewStats: false,
      statSlug: null,
    };
  },
  methods: {
    getStats() {
      // check if slug exists
      if (this.statSlug !== null) {
        // check if slug is valid - thanks github copilot
        if (this.statSlug.length > 0) {
          // get stats
          // fetch("/api/counter?slug=" + encodeURIComponent(this.statSlug))
          //   .then((res) => res.json())
          //   .then((data) => {
          //     // if slug exists, show stats
          //   });
        }
      }
    },
    slugify() {
      const a =
        "àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;";
      const b =
        "aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------";
      const p = new RegExp(a.split("").join("|"), "g");

      this.statSlug = this.statSlug
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
  },
};
</script>

<style scoped>
.stats {
  padding-top: 50px;
  border-top: 2px solid var(--pink);
  max-width: 600px;
  margin: 0 auto;
}

.slug-stat-input {
  background-color: rgba(255, 255, 255, 0);
}

.check-stats {
  font-size: 16px;
}
</style>