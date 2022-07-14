<template>
  <div class="inner-banner-wrapper">
    <div
      class="question-banner-bg"
      :style="{
        backgroundImage: `url('/img/innerpage-bg-img.png')`,
      }"
    >
      <v-container>
        <!-- -----------------------------------------------
            Start Banner
        ----------------------------------------------- -->
        <v-row justify="start">
          <v-col lg="5" md="6" cols="12" class="d-flex align-center">
            <ResoucesBannerContent />
          </v-col>
          <v-col
            lg="5"
            offset-lg="1"
            md="6"
            cols="12"
            class="d-flex align-center"
          >
            <!--<ResoucesBannerVideo/>-->
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
  name: "ResoucesBanner",
  components: {
    ResoucesBannerVideo: () =>
      import("@/components/sections/resources/ResoucesBannerVideo"),
    ResoucesBannerContent: () =>
      import("@/components/sections/resources/ResoucesBannerContent"),
  },
};
</script>

<style  lang="scss">
</style>