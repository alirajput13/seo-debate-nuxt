AboutGetBoard

<template>
  <div class="aboutgetboard-bg primary">
    <img src="/img/about/right-img.png" class="right-img img-fluid" />
    <img src="/img/about/left-img.png" class="left-img img-fluid" />
    <!-- <v-img
      src="/img/about/right-img.png"
      max-width="200"
      max-height="200"
      class="right-img img-fluid"
    ></v-img>
    <v-img
      src="/img/about/left-img.png"
      max-width="200"
      max-height="200"
      class="left-img img-fluid"
    ></v-img> -->
    <v-container>
      <v-row justify="center">
        <v-col lg="7" md="10" cols="12">
          <div class="text-center">
            <h2 class="white--text mt-12">Get on board</h2>
            <p class="my-10 font-18 white--text op-5">
              SEODebate can only grow with your support! Sign up today and start
              sharing your SEO expertise.
            </p>
            <v-btn
              depressed
              :to="{name: 'register'}"
              color="white"
              class="text-blue2 font-weight-semibold mt-10 btn-custom-md font-16"
            >
              Join for Free
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
export default {
  name: "AboutGetBoard"
};
</script>

<style  lang="scss">
@media (min-width: 768px) and (max-width: 1023px) {
  .aboutgetboard-bg {
    padding: 60px 0;
    background-position: right -117px center;
  }
}

@media (max-width: 767px) {
  .aboutgetboard-bg {
    padding: 40px 0;
  }
}
</style>