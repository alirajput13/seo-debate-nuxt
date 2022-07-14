<template>
  <div class="mt-12 pt-12">
    <v-card class="resource-card border-all elevation-0" v-for="(resource, i) in resourcefeaturecard"
          :key="i">
      <v-card-text>
        <v-row>
          <v-col cols="12" md="6" class="py-lg-0">
            <v-img :src="resource.img" :alt="resource.title" class="rounded" />
          </v-col>
          <v-col cols="12" md="6" class="py-lg-0">
            <div class="height-setting">
              <div>
                <span class="badge success white--text featured-badge px-4 font-12 ml-11">Featured</span>
              </div>
              <div class="title-area">
                <NLink :to="resource.link" class="resource-title text-decoration-none text-blue hover-blue font-weight-semibold">{{resource.title}}</NLink>
                <div class="d-md-flex align-center mt-8">
                  <div class="pr-7 border-right border-sm-right-0">
                    <span class="text-light-blue">In
                      <NLink
                        :to="resource.categorylink"
                        class="text-blue hover-blue no-effect-button"
                        >{{ resource.categorytitle }}</NLink
                      ></span>
                  </div>
                  <div class="ml-0 ml-md-7 d-flex mt-4 mt-md-0">
                      <div class="py-2 py-md-0 pr-7 meta-text">
                        <span class="text-light-blue">{{ resource.date }}</span>
                      </div>
                  </div>
                </div>
              </div>
              <div class="download-counter">
                <div class="d-flex align-center">
                  <div class="d-flex font-16 align-center">
                    <span class="sprite-img download-count-icon mr-2"></span>
                    <span class="text-blue font-weight-semibold mr-2">{{resource.downloadcount}}</span> 
                    <span class="text-light-blue">downloads</span>
                  </div>
                  <div class="ml-auto">
                    <a href="javascript:void(0)">
                      <span :class="resource.filetype" class="sprite-img file-type"></span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
export default {
  name: "ResouceswithImg",
  data() {
    return {
       resourcefeaturecard: [
        {
          "img": "/img/feature-img.jpg",
          "link": "/",
          "title": "How to become SEO Expert with easy tips in few months?",
          "categorytitle": "On Page Seo",
          "categorylink": "/",
          "date": "Sep 25, 2020",
          "downloadcount": "25,567",
          "filetype": "pdf"
        }
      ]
    }
  },   
};
</script>

<style  lang="scss">
</style>