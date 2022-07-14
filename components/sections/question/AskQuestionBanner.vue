<template>
  <div class="inner-banner-wrapper">
    <div class="question-banner-bg" :style="{
        backgroundImage: `url('/img/question-bg.png')`
      }">
      <v-container>
        <!-- -----------------------------------------------
            Start Banner
        ----------------------------------------------- -->
        <v-row justify="start">
          <v-col lg="3" md="6" cols="12">
            <AskQuestionBannerContent/>
          </v-col>
          <v-col lg="7" offset-lg="1" md="6" cols="12" class="d-flex align-center">
            <AskQuestionBannerBox :addQst="addQst"/>
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
  name: "AskQuestionBanner",
  props:["addQst"],
  components: {
    AskQuestionBannerBox: () => import("@/components/sections/question/AskQuestionBannerBox"),
    AskQuestionBannerContent: () => import("@/components/sections/question/AskQuestionBannerContent"),
    
  },   
};
</script>

<style  lang="scss">
</style>