<template>
  <div class="loading-overlay" v-if="showLoadingOverlay === true">
    <p>
      <i>Loading...</i><br />
      <span class="funnies">{{ funniesLoadingText }}</span>
    </p>
  </div>
</template>

<script>
import Funnies from "funnies";
let funnies = new Funnies();

export default {
  name: "Loading",
  props: {
    showLoadingOverlay: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      funniesLoadingText: funnies.message(),
    };
  },
};
</script>

<style scoped>
.loading-overlay {
  z-index: 9;
  position: fixed;
  top: 0px;
  right: 0px;
  left: 0px;
  background-color: rgba(0, 0, 0, 0.9);
  height: 100%;
  width: 100%;
  font-family: var(--sans);
  font-weight: 400;
  font-size: 24px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}

.loading-overlay > * {
  margin: auto;
  color: var(--pink);
  font-family: var(--mono);
}

.funnies {
  font-size: 18px;
  color: white;
  font-family: var(--sans);
}
</style>