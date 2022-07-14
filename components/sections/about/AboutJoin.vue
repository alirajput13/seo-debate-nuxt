<template>
  <div
    class="aboutjoin-bg"
    :style="{
      backgroundImage: `url('/img/about/join-bg.jpg')`,
    }"
  >
    <v-container>
      <v-row justify="center">
        <v-col lg="8" md="10" cols="12" class="text-center">
          <span class="sprite-img join-img"></span>
          <h2 class="white--text mt-12">
            With 12 years of extensive experience in SEO, our founder Shahid
            Maqbool set out to fill this knowledge gap.
          </h2>
          <p class="my-10 font-18">
            The result of his efforts is SEODebate, a platform that anyone
            interested in SEO can use to ask questions and share information
            with professionals in the field.
          </p>
          <v-btn depressed :to="{name: 'register'}" color="primary" class="mt-10 btn-custom-md font-16">
            Join for Free
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
export default {
  name: "AboutJoin"
};
</script>

<style  lang="scss">
.aboutjoin-bg {
  background-size: cover;
  background-position: center;
  padding: 80px 0;
}
</style>