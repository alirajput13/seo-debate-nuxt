<template>
  <div class="section-bg-img" :style="{
        backgroundImage: `url('/img/article-bg.jpg')`
      }">
    <!-- -----------------------------------------
    VideosGrid
    ----------------------------------------- -->
     <v-container class="inner-top-spacer">
        <v-row>
            <v-col md="12" cols="12">
              <!-- <Breadcrumb :items="bdcrumbs" pagetitle="Articles" /> -->
              <Breadcrumb :items="bdcrumbs"  :pagetitle="data.category"/>
            </v-col>  
            <v-col md="12" lg="12">
                <v-row>
                    <v-col md="6" lg="4" v-for="(video, i) in filteredTags" :key="i">
                      <VideosGrid :video="video" />
                    </v-col>  
                </v-row>
            </v-col>  
        </v-row>    
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  head() {
    return {
      title: "Category Detail",
      meta: [
        {
          hid: "Videos detail description",
          name: "SEO Debate",
          content: "SEO Debate is the best way",
        },
      ],
    };
  },
  data() {
    return{
      data:[],
      slug: this.$route.params.slug,
      bdcrumbs: [
        {
          text: "Home",
          disabled: false,
          to: "/",
        },
        {
          text: "Videos",
          disabled: false,
          to: "/videos",
        },
        {
          text: this.$route.params.slug,
          disabled: true,
          to: "/",
        }
        ],
    }
  },
  computed: {
    ...mapGetters(["allVideos"]),
    filteredTags: function () {
      return this.allVideos.filter(video => video.category === this.data.category)
    }
  },
  methods: {
    whiteSpace: function (a) {
            return a.toLowerCase().replace(/[\s\/]/g, '-');
        }
  },
   mounted () {
      this.data = this.allVideos.find(video => this.whiteSpace(video.category) == this.$route.params.slug);
  }, 
  
  
  
  components: {
    VideosGrid: () => import("@/components/sections/video/VideosGrid"),
  },
};
</script>
