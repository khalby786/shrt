<template>
  <div class="home">
    <AddURL />
    <!-- <ViewStats /> -->
  </div>
</template>

<script>
import AddURL from "@/components/AddURL.vue";
// import ViewStats from "@/components/ViewStats.vue";

export default {
  name: "Home",
  components: {
    AddURL,
  },
};
</script>
