<template>
  <div>
    <AskQuestionBanner/>
    <AskQuestionBannerCategoryCard :scrollTopoint="scrollTopoint"/>  
    <div class="section-bg-img" :style="{
          backgroundImage: `url('/img/article-bg.jpg')`
        }">
      <!-- -----------------------------------------
      ArticlesGrid
      ----------------------------------------- -->
       <v-container class="inner-top-spacer">
          <v-row>
              <v-col lg="3" sm="12" md="12">
                <div class="d-flex align-center">
                  <h5 class="label-title font-weight-regular mb-0 mb-lg-0">Filters</h5>
                  <div class="ml-auto">
                    <a class="d-block d-lg-none" @click="showfiltersidebar = !showfiltersidebar"><v-icon>mdi-dots-horizontal</v-icon></a>
                  </div>
                </div>
                
                <div class="left-sidebar" :class="showfiltersidebar ? 'hidefiltersidebar' : 'showmobilesidebar'">
                  <Filtersidebar/>
                </div>
              </v-col>
              <v-col md="8" lg="8" offset-lg="1" id="categorybox">
                <QuestionList :question="question" v-for="(question, i) in filteredCategory" :key="i" :increment="increment" :decrement="decrement"/>
              </v-col> 
          </v-row>    
      </v-container>
    </div>
  </div> 
</template>

<script>
import { mapGetters } from "vuex";
export default {
  head() {
    return {
      title: "Question category",
      meta: [
        {
          hid: "Question category description",
          name: "SEO Debate",
          content: "SEO Debate is the best way",
        },
      ],
    };
  },
  data() {
    return{
      data:[],
      showfiltersidebar: true,
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
          text: this.$route.params.slug,
          disabled: true,
          to: "/",
        }
        ],
        categorylist: [
        {
          "link": "/questions/category/identification",
          "icon": "category1",
          "text": "Identification"
        },
        {
          "link": "/questions/category/technical-seo",
          "icon": "category2",
          "text": "Technical Seo"
        },
        {
          "link": "/questions/category/on-page-seo",
          "icon": "category3",
          "text": "On Page Seo"
        },
        {
          "link": "/questions/category/off-page-seo",
          "icon": "category4",
          "text": "Off Page Seo"
        },
      ]
    }
  },
  computed: {
    ...mapGetters(["allQuestions"]),
    filteredCategory: function () {
      return this.allQuestions.filter(question => question.categorytitle === this.data.categorytitle)
    }
  },
  methods: {
    increment(payload) {
      this.$store.commit('increment', payload);
    },

    decrement(payload) {
      this.$store.commit('decrement', payload);
    },
    scrollTopoint(index) {
      setTimeout(function () {
      const el = document.querySelector(index)
      
      if (el) {
        const scrollTo = el.getBoundingClientRect().top
        window.scrollBy({ top: scrollTo - 120, left: 0, behavior: 'smooth' })
      }
    }, 800)
    }
  },
   mounted () {
      this.data = this.allQuestions.find(question => question.categorylink == this.$route.params.slug);
  }, 
  
  
  
  components: {
    ArticlesGrid: () => import("@/components/sections/article/ArticlesGrid"),
  },
};
</script>
