<template>
  <div class="section-bg-img" :style="{
        backgroundImage: `url('/img/article-bg.jpg')`
      }">
    <!-- -----------------------------------------
    ArticlesGrid
    ----------------------------------------- -->
     <v-container class="inner-top-spacer">
        <v-row>
          <v-col md="12" cols="12">
              <!-- <Breadcrumb :items="bdcrumbs" pagetitle="Articles" /> -->
              <Breadcrumb :items="bdcrumbs"  :pagetitle="data.authorname"/>
            </v-col>
            <v-col md="12" lg="12">
              
                <v-row>
                    <v-col md="6" lg="4" v-for="(blog, i) in filteredAuthor" :key="i">
                      <ArticlesGrid :blog="blog" />
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
          hid: "Artical detail description",
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
          text: "Articles",
          disabled: false,
          to: "/articles",
        },
        {
          text: "Autor",
          disabled: true,
          to: "/articles",
        },
        
      ],
    }
  },
  computed: {
    ...mapGetters(["allArticles"]),
    filteredAuthor: function () {
      return this.allArticles.filter(blog => blog.authorname === this.data.authorname)
    }
  },
  methods: {
    
  },
   mounted () {
      this.data = this.allArticles.find(blog => blog.authorlink == this.$route.params.slug);
  }, 
  
  
  
  components: {
    ArticlesGrid: () => import("@/components/sections/article/ArticlesGrid"),
  },
};
</script>
