<template>
  <div class="inner-banner-wrapper inner-bg2">
    <div
      class="question-banner-bg contactbanner-bg aboutbanner-sm-spacer"
      :style="{
        backgroundImage: `url('/img/contact/contact-bg.jpg')`,
      }"
    >
      <v-container>
        <!-- -----------------------------------------------
            Start Banner
        ----------------------------------------------- -->
        <v-row justify="start">
          <v-col
            lg="8"
            md="10"
            cols="12"
            class="order-2 order-md-1 mt-10 mt-md-0"
          >
            <ContactBannerContent />
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
  name: "ContactBanner",
  components: {
    ContactBannerContent: () =>
      import("@/components/sections/contact/ContactBannerContent"),
  },
};
</script>

<style  lang="scss">
.contactbanner-bg {
  background-size: cover;
  background-repeat: no-repeat;
  background-position: top 85px center !important;
}

@media (min-width: 1500px) {
  .contactbanner-bg {
    background-size: contain;
  }
}

@media (min-width: 1024px) {
  .contact-right-img {
    margin-left: -124px;
    margin-top: -180px;
  }
}

@media (min-width: 768px) and (max-width: 1023px) {
  .contact-right-img {
    max-width: 300px !important;
  }
}

@media (max-width: 767px) {
  .contact-right-img {
    max-width: 300px !important;
  }
  .aboutbanner-sm-spacer {
    padding-bottom: 40px !important;
  }
}
</style>