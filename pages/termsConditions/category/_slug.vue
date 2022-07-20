<template>
  <div>
    <div class="section-bg-img"  :style="{
          backgroundImage: `url('/img/article-bg.jpg')`
        }">
      <v-container class="inner-top-spacer">
        <v-row>
          <v-col md="12" cols="12">
            <Breadcrumb :items="bdcrumbs" :pagetitle="selectedResCategory.categorytitle" />
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col md="12" class="mt-15">
            <v-row>
              <!-- <ResoucesQuestionList :resourcequestion="resourcequestion" v-for="(resourcequestion, i) in filteredCategory" :key="i" /> -->
            </v-row>
            <!-- Pagination -->
           
          </v-col>
        </v-row>
      </v-container>
      <v-container>
          <Faqs />  
      </v-container>
      <Newsletter />
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      page: 1,
      perPage: 6,
      selectedResCategory:[],
      bdcrumbs: [
        {
          text: "Home",
          disabled: false,
          to: "/",
        },
        {
          text: "Resource",
          disabled: false,
          to: "/terms-Condition",
        },
        {
          text: this.$route.params.slug,
          disabled: true,
          to: "/terms-Condition",
        },
      ],
    }
  },
  head() {
      return {
          title: 'Terms & Condition page'
      }
  },
  methods: {
  },
  computed: {
    ...mapGetters(["allResQuestions"]),

    filteredCategory: function () {
      return this.allResQuestions.filter(res => res.categorytitle === this.selectedResCategory.categorytitle)
    },
    
  },
  mounted(){
    this.selectedResCategory=this.allResQuestions.find((rs)=> rs.categorylink == this.$route.params.slug);
  },
  components: {
    ResoucesQuestionList: () => import("@/components/sections/resources/ResoucesQuestionList"),
    Faqs: () => import("@/components/sections/shared/Faqs"),
    Newsletter: () => import("@/components/sections/shared/Newsletter"),
  }    
};
</script>