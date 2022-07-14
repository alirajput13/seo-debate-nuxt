<template>
  <div class="inner-banner-wrapper">
    <div class="question-banner-bg" :style="{
        backgroundImage: `url('/img/innerpage-bg-img.png')`
      }">
      <v-container>
        <!-- -----------------------------------------------
            Start Banner
        ----------------------------------------------- -->
        <v-row justify="start">
          <v-col lg="4" md="6" cols="12">
            <h1 class="line-title font-weight-bold">{{seocategory}}</h1>
            <p class="font-16">{{categorySubtext}}</p>
          </v-col>
          <v-col lg="7" offset-lg="1" md="6" cols="12" class="d-flex align-center">
            
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
  props: ["seocategory", "categorySubtext"],  
};
</script>