<template>
  <div>
    <div class="inner-banner-wrapper">
      <div
        class="question-banner-bg"
        :style="{
          backgroundImage: `url('/img/question-bg.png')`,
        }"
      >
        <v-container>
          <!-- -----------------------------------------------
						Start Banner
				----------------------------------------------- -->
          <v-row justify="start">
            <v-col lg="5" md="8" cols="12" class="d-flex align-center">
              <div class="d-flex align-start align-md-center">
                <div class="position-relative">
                  <v-img
                    :src="imageData"
                    class="rounded-circle profile-img"
                    width="100"
                  />
                  <div class="with-overlay">
                    
                    <div class="text-center">
                      <v-icon class="white--text">mdi-camera</v-icon>
                      <input type="file" @change="previewImage" class="inputfile pointer" accept="image/*">
                      <div class="white--text ">change</div>
                    </div>
                  </div>
                </div>

                <div class="ml-9">
                  <h2>
                    Andrew Johnson
                    <span class="ml-4 badge success-border">Expert</span>
                  </h2>
                  <p>Lead Designer & Co-Founder WrapPixel</p>
                </div>
              </div>
            </v-col>
          </v-row>
          <!-- -----------------------------------------------
						Start Banner
				----------------------------------------------- -->
        </v-container>
      </div>
    </div>
    <div
      class="section-bg-img"
      :style="{
        backgroundImage: `url('/img/article-bg.jpg')`,
      }"
    >
      <!-- -----------------------------------------
      Profile Section
      ----------------------------------------- -->
      <EditProfileBannerTabCard />
      <Newsletter />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  head() {
    return {
      title: "User Profile Detail",
      meta: [
        {
          hid: "Question Author description",
          name: "SEO Debate",
          content: "SEO Debate is the best way",
        },
      ],
    };
  },
  data() {
    return {
      data: [],
      imageData:"../../../../../img/users/user4.jpg",
      slug: this.$route.params.slug,
      bdcrumbs: [
        {
          text: "Home",
          disabled: false,
          to: "/",
        },
        {
          text: "Questions",
          disabled: false,
          to: "/questions",
        },
        {
          text: "Profile",
          disabled: true,
          to: "/",
        },
      ],
    };
  },
  computed: {},
  methods: {
        previewImage: function(event) {
            // Reference to the DOM input element
            var input = event.target;
            // Ensure that you have a file before attempting to read it
            if (input.files && input.files[0]) {
                // create a new FileReader to read this image and convert to base64 format
                var reader = new FileReader();
                // Define a callback function to run, when FileReader finishes its job
                reader.onload = (e) => {
                    // Note: arrow function used here, so that "this.imageData" refers to the imageData of Vue component
                    // Read image as base64 and set to imageData
                    this.imageData = e.target.result;
                }
                // Start the reader job - read file as a data url (base64 format)
                reader.readAsDataURL(input.files[0]);
            }
        }
    },
  components: {
    ProfileBanner: () => import("@/components/sections/question/ProfileBanner"),
    Newsletter: () => import("@/components/sections/shared/Newsletter"),
    EditProfileBannerTabCard: () =>
      import("@/components/sections/question/EditProfileBannerTabCard"),
  },
  mounted() {},
};
</script>
