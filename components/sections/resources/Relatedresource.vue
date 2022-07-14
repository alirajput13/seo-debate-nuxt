<template>
  <v-col cols="12" md="6" lg="4" class="py-0 px-xs-0">
    <v-card class="resource-card with-question border-all elevation-0">
      <v-card-text>
        <div class="height-setting">
          <div class="title-area">
            <NLink
              :to="{name: 'resources-slug',params: { slug: resourcequestion.slug }}"
              class="resource-title text-decoration-none text-blue hover-blue font-weight-semibold"
              >{{ resourcequestion.title }}</NLink
            >
            <div class="d-md-flex align-center mt-8">
              <div class="pr-7 border-right border-sm-right-0">
                <span class="text-light-blue"
                  >In
                  <NLink
                    :to="{name: 'slug',params: { slug: resourcequestion.category.slug }}"
                    class="text-blue hover-blue no-effect-button"
                    >{{ resourcequestion.category.title }}</NLink
                  ></span
                >
              </div>
              <div class="ml-0 ml-md-7 d-flex mt-4 mt-md-0">
                <div class="py-2 py-md-0 pr-7 meta-text">
                  <span class="text-light-blue">{{
                    resourcequestion.date
                  }}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="download-counter pl-0">
            <div class="d-flex align-center">
              <div class="d-flex font-16 align-center">
                <span class="sprite-img download-count-icon mr-2"></span>
                <span class="text-blue font-weight-semibold mr-2">{{
                  resourcequestion.downloads || '000'
                }}</span>
                <span class="text-light-blue">downloads</span>
              </div>
              <div class="ml-auto">
                <span :class="resourcequestion.file_type" class="sprite-img file-type"></span>
              </div>
            </div>
          </div>
        </div>
      </v-card-text>
    </v-card>
  </v-col>
</template>
<script>
export default {
  name: "RelatedResoucesQuestionList",
  props: ["resourcequestion"],
};
</script>