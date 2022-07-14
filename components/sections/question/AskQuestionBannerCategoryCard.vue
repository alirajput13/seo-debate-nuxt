<template>
    <div>
        <v-container class="category-card-spacer d-none d-md-block">
            <!-- -----------------------------------------------
          Start Category Card
      ----------------------------------------------- -->
            <v-card>
                <v-card-text class="px-12 py-8">
                    <v-row>
                        <v-col
                            cols="12"
                            md="6"
                            lg="3"
                            class="py-8"
                            v-for="(topcategory, i) in $store.getters.latestCategories"
                            :key="i"
                        >
                            <NLink
                                :to="{name: 'slug',params: { slug: topcategory.slug }}"
                                class="hover-blue text-decoration-none"
                            >
                                <span
                                    class="d-flex align-center"
                                >
                                    <span
                                        class="sprite-img category-icon"
                                        :class="`category${i+1}`"
                                    />
                                    <span
                                        class="font-weight-bold text-blue hover-blue font-16 ml-7"
                                    >
                                        {{ topcategory.title }}
                                    </span>
                                </span>
                            </NLink>
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>
            <!-- -----------------------------------------------
          Start Category Card
      ----------------------------------------------- -->
        </v-container>
    </div>
</template>
<script>
export default {
    name: "AskQuestionBannerCategoryCard",
    methods: {},
    async fetch() {
        if(!this.$store.state.latestCategories.length){
            let data = await this.$axios.$get("/categories");
    
            this.$store.commit("update_latest_categories", data);
        }
    },
    components: {
        AskQuestionBannerBox: () =>
            import("@/components/sections/question/AskQuestionBannerBox"),
        AskQuestionBannerContent: () =>
            import("@/components/sections/question/AskQuestionBannerContent")
    }
};
</script>
