<template>
    <div>
        <ToolsBanner />
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
                            v-for="(topcategory, j) in $store.getters.latestCategories"
                            :key="j"
                        >
                            <BannerCategoryCard :topcategory="topcategory" :j="j" />
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>
            <!-- -----------------------------------------------
          End Category Card
      ----------------------------------------------- -->
        </v-container>
        <div
            class="section-bg-img"
            :style="{
                backgroundImage: `url('/img/article-bg.jpg')`
            }"
        >
            <v-container class="inner-top-spacer">
                <v-row justify="center">
                    <v-col md="12">
                        <ToolsList />
                    </v-col>
                </v-row>
            </v-container>
            <div class="bg-light bottom-spacer no-underline">
                <v-container v-if="$store.state.toolLayout.showFAQ">
                    <Faqs :faqs="$store.state.toolLayout.faq"/>
                </v-container>
            </div>
            <SeoTips
                v-if="$store.state.toolLayout.showB"
                :layout="{
                    h: $store.state.toolLayout.header2,
                    s: $store.state.toolLayout.sub2,
                    c: $store.state.toolLayout.content
                }"
            />
            <Newsletter />
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            //
        };
    },
    head() {
        return {
            title: "Tools",
            link: [
                {
                    rel: 'canonical',
                    href: this.$store.state.toolLayout.canonical_link || 'https://seodebate.com' + this.$route.path
                }
            ],
            meta: [
                {
                    name: 'robots',
                    content: !!+this.$store.state.toolLayout.index ? 'index,follow' : 'noindex'
                },
                {
                    name: 'title',
                    content: this.$store.state.toolLayout.seo_title || 'SEO Debate homepage.'
                },
                {
                    name: 'description',
                    content: this.$store.state.toolLayout.description
                },
                {
                    property: 'og:title',
                    content: this.$store.state.toolLayout.seo_title || 'SEO Debate articles.'
                },
                {
                    property: 'og:description',
                    content: this.$store.state.toolLayout.description
                },
                {
                    property: 'og:url',
                    content: 'https://seodebate.com' + this.$route.path
                },
                {
                    property: 'twitter:title',
                    content: this.$store.state.toolLayout.seo_title || 'SEO Debate articles.'
                },
                {
                    property: 'twitter:description',
                    content: this.$store.state.toolLayout.description
                },
                {
                    property: 'twitter:url',
                    content: 'https://seodebate.com' + this.$route.path
                },
            ]
        };
    },
    async fetch() {
        if(!this.$store.state.latestCategories.length){
            let categories = await this.$axios.$get("/categories");
    
            this.$store.commit("update_latest_categories", categories);
        }
        let data = await this.$axios.$get("/page?page=tool");

        this.$store.commit("update_tool_layout", data);
    },
    components: {
        ToolsBanner: () => import("@/components/sections/tools/ToolsBanner"),
        ToolsList: () => import("@/components/sections/tools/ToolsList"),
        BannerCategoryCard: () =>
            import("@/components/sections/shared/BannerCategoryCard"),
        Faqs: () => import("@/components/sections/shared/Faqs"),
        SeoTips: () => import("@/components/sections/shared/SeoTips"),
        Newsletter: () => import("@/components/sections/shared/Newsletter")
    }
};
</script>
