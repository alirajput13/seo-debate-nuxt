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
              <Breadcrumb :items="bdcrumbs"  :pagetitle="data.authorname"/>
            </v-col>
            <v-col md="12" lg="12">              
                <v-row>
                    <v-col md="6" lg="4" v-for="(video, i) in filteredAuthor" :key="i">
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
      title: "Author Detail",
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
          text: "Autor",
          disabled: true,
          to: "/videos",
        },
        
      ],
    }
  },
  computed: {
    ...mapGetters(["allVideos"]),
    filteredAuthor: function () {
      return this.allVideos.filter(video => video.authorname === this.data.authorname)
    }
  },
  methods: {
    
  },
   mounted () {
      this.data = this.allVideos.find(video => video.authorlink == this.$route.params.slug);
  }, 
  
  
  
  components: {
    VideosGrid: () => import("@/components/sections/video/VideosGrid"),
  },
};
</script>
