<template>
  <div>
    <v-container class="resource-tips-wrapper pb-0">
      <v-row class="pb-0">
        <v-col cols="12" lg="8" class="pb-0">
          <h2 class="line-title font-weight-bold">
            {{layout.h}}
          </h2>
          <p class="text-h4 blue--text font-weight-semibold pb-8">
            {{layout.s}}
          </p>

          <div v-html="layout.c"></div>
        </v-col>
        <v-col cols="12" lg="4" class="pb-0 d-flex align-end mb-4">
          <img
            src="/img/resource-tip-img.jpg"
            alt="resource-tip"
            class="mb-4 responsive-img mx-auto"
          />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
export default {
  name: "SeoTips",
  props:['layout']
};
</script>

<style  lang="scss">
.text-h4 {
  line-height: 25px !important;
}
@media (max-width: 767px) {
  .responsive-img {
    width: 100%;
  }
}
</style>