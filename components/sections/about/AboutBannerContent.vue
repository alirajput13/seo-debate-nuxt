<template>
  <div>
    <h1 class="line-title font-weight-bold">
      Platform for sharing and exchanging SEO expertise.
    </h1>
    <p class="font-16">
      SEODebate connects SEO experts with people looking for guidance. Simply
      sign up for free on our website & join the community.
    </p>
    <v-btn @click="$vuetify.goTo('#story')" depressed color="primary" class="mt-10 btn-custom-md font-16">
      Check our Story
    </v-btn>
  </div>
</template>
<script>
export default {
  name: "AboutBannerContent",
};
</script>

<style  lang="scss">
.btn-custom-md {
  height: 50px !important;
  padding: 0 39px !important;
  min-width: 180px !important;
}
</style>