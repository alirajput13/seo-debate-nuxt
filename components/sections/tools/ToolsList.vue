<template>
  <div>
    <v-card
      class="resource-card border-all elevation-0"
      v-for="(tools, i) in toolslist"
      :key="i"
    >
      <v-card-text>
        <v-row>
          <v-col cols="12" lg="6" class="py-8 py-md-0">
            <v-img :src="tools.img" :alt="tools.title" class="rounded" />
          </v-col>
          <v-col cols="12" lg="6" class="pt-0 pb-8 py-md-0">
            <div class="height-setting">
              <div class="title-area pb-0 pr-0 pt-10">
                <div class="d-md-flex align-start">
                  <div>
                    <NLink
                      :to="tools"
                      class="resource-title text-decoration-none text-blue hover-blue font-weight-semibold"
                      >{{ tools.title }}</NLink
                    >
                    <div class="d-md-flex align-center mt-5">
                      <div>
                        <span class="text-light-blue"
                          >In
                          <NLink
                            :to="tools.categorylink"
                            class="text-blue hover-blue no-effect-button"
                            >{{ tools.categorytitle }}</NLink
                          ></span
                        >
                      </div>
                    </div>
                  </div>
                  <div class="ml-auto" v-if="tools.featured == true">
                    <span
                      class="badge success white--text py-2 px-4 font-12 ml-11 featured-badge"
                      >Featured</span
                    >
                  </div>
                </div>
                <div class="mt-12 pt-0 pt-lg-10">
                  <p class="font-16 text-light-blue">{{ tools.subtext }}</p>
                </div>
              </div>
              <div class="download-counter pt-12" v-if="tools.trynow == true">
                <v-btn class="px-12" color="primary"> Try this tool </v-btn>
              </div>
              <div v-else class="download-counter pt-12">
                <v-btn class="px-12" color="success"> Coming Soon </v-btn>
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
  name: "ToolsList",
  data() {
    return {
      toolslist: [],
    };
  },
  async fetch() {
    this.toolslist = await fetch(
      "https://api.npoint.io/04b19e00ee6c29dd6f6a"
    ).then((res) => res.json());
  },
  components: {},
};
</script>

<style  lang="scss">
</style>