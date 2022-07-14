<template>
  <div class="section-bg-img"  :style="{
        backgroundImage: `url('/img/article-bg.jpg')`
      }">
    <!-- -----------------------------------------
      Start Question Detail
    ----------------------------------------- -->
    <v-container class="inner-top-spacer">
      <!-- ------------------------------------------------- -->
      <!-- Breacrumb -->
      <!-- ------------------------------------------------- -->
      <v-row>
        <v-col md="12" cols="12">
          <!-- <Breadcrumb :items="bdcrumbs" :pagetitle="selectedQuestion.title" /> -->
        </v-col>
      </v-row>
      <v-row class="mt-12">
        <v-col lg="3" md="12">
          <h4 class="text-uppercase mb-0 font-14 font-weight-regular">Categories</h4>
          <div class="mt-7">
            <NLink :to="category.link" v-for="(category, i) in categorylist" :key="i" class="d-flex align-center hover-blue py-7 border-bottom text-decoration-none">
              <span class="sprite-img category-icon" :class="category.icon" />
              <span class="font-weight-bold text-blue hover-blue font-16 ml-7">
                {{category.text}}
              </span>
            </NLink>
          </div>
        </v-col>
        <v-col lg="8" offset-lg="1" md="12">
          <v-card class="article-detail-part pl-0 elevation-0 border-all">
            <v-card-text>
              <div class="d-flex align-center">
                <h2 class="article-detail-title mb-0" id="intro">Introduction</h2>
                <div class="ml-auto">
                  <span class="sprite-img file-type doc"></span>
                </div>
              </div>
              
              <p class="mt-12 font-18 text-light-blue lh-30">
                These days there are so many career choices to take in the
                programmer world. But one of the most successful and important
                ones is Web Development.
              </p>
              <p class="mt-10 m-0 font-18 text-light-blue lh-30">
                There are so many companies out there that are on the constant
                look for web developers and designers.
              </p>
              <v-btn block
                large class="elevation-0 mt-12"
                color="primary"
                dark
              >
                <span class="mr-2">Free Downloads</span> 
                <span class="white--text op-5">(25,567 downloads)</span>
              </v-btn>
              <v-img src="/img/video.jpg" class="article-img" />
              <h4 class="text-h4">Pay attention</h4>
              <p class="mt-12 font-18 text-light-blue lh-30">
                Because the results of what I'm about to share...
              </p>
              <div class="warning-alerts font-weight-bold">
                Could save you thousands f dollars in wasted WordPress hosting
              </div>
              <p class="mb-0 font-18 text-light-blue lh-30">
                Choosing fast hosting solution is absolutely critical to the
                success of your business site, because if your WordPress website
                loads slowly you will suffer from.
              </p>
              <v-btn block
                large class="elevation-0 mt-12"
                color="primary"
                dark
              >
                <span class="mr-2">Free Downloads</span> 
                <span class="white--text op-5">(25,567 downloads)</span>
              </v-btn>
              
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <!-- ------------------------------------------------- -->
      <!-- Related article -->
      <!-- ------------------------------------------------- -->
      <div class="pt-12 mt-10">
        <h2 class="text-h2">Related Resources</h2>
        <!-- <v-row>
          <v-col class="py-0"
            md="12"
            v-for="(blog, i) in filteredRelatedArticles.splice(0, 3)"
            :key="i"
          >
            <RelatedArticle :blog="blog" />
          </v-col>
        </v-row> -->
      </div>
    </v-container>
    <!-- -----------------------------------------
      End Question Detail
    ----------------------------------------- -->
  </div>
</template>
<script>
export default {
  head() {
    return {
      title: "Resource Detail",
      meta: [
        {
          hid: "Resource detail description",
          name: "SEO Debate",
          content: "SEO Debate is the best way",
        },
      ],
    }
  },
  data() {
    return {
      // selectedQuestion: [],
      bdcrumbs: [
        {
          text: "Home",
          disabled: false,
          to: "/",
        },
        {
          text: "Resource",
          disabled: false,
          to: "/resources",
        },
      ],
      categorylist: [
        {
          "link": "./category/identification",
          "icon": "category1",
          "text": "Identification"
        },
        {
          "link": "./category/technical-seo",
          "icon": "category2",
          "text": "Technical Seo"
        },
        {
          "link": "./category/on-page-seo",
          "icon": "category3",
          "text": "On Page Seo"
        },
        {
          "link": "./category/off-page-seo",
          "icon": "category4",
          "text": "Off Page Seo"
        },
      ]
    };
  },
};
</script>

<style  lang="scss">
.lh-30 {
  line-height: 30px !important;
}
.op-5 {
  opacity: 0.5;
}
</style>