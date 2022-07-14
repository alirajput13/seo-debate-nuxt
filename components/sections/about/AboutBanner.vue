<template>
  <div class="inner-banner-wrapper inner-bg2">
    <div
      class="question-banner-bg aboutbanner-sm-spacer"
      :style="{
        backgroundImage: `url('/img/about-bg.png')`,
      }"
    >
      <v-container>
        <!-- -----------------------------------------------
            Start Banner
        ----------------------------------------------- -->
        <v-row justify="start" align="center">
          <v-col
            lg="4"
            md="6"
            cols="12"
            class="order-2 order-md-1 mt-10 mt-md-0"
          >
            <AboutBannerContent />
          </v-col>
          <v-col
            lg="7"
            offset-lg="1"
            md="6"
            cols="12"
            class="d-flex align-center justify-center order-1 order-md-2"
          >
            <v-img
              src="/img/about/about-right-img.png"
              min-height="300"
              max-height="400"
              height="100%"
              min-width="300"
              max-width="400"
              width="100%"
              class="about-right-img"
            />
          </v-col>
        </v-row>
        <!-- -----------------------------------------------
            Start Banner
        ----------------------------------------------- -->
      </v-container>
    </div>
  </div>
</template>
<script>
export default {
  name: "AboutBanner",
  components: {
    AboutBannerContent: () =>
      import("@/components/sections/about/AboutBannerContent"),
  },
};
</script>

<style  lang="scss">
@media (max-width: 767px) {
  .about-right-img {
    max-width: 300px !important;
  }
  .aboutbanner-sm-spacer {
    padding-bottom: 40px !important;
  }
}
</style>