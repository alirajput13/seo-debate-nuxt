<template>
    <div>
        <PolicyBanner />
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
                    <!-- <v-col md="12" v-if="allResources">
                         <ResoucesOffer /> 

                        <v-row class="mt-15">
                            <ResoucesQuestionList
                                :resourcequestion="resourcequestion"
                                v-for="(resourcequestion,
                                i) in visbleresquestions"
                                :key="i"
                            />
                        </v-row>
                        <div
                            class="d-md-flex justify-content-space-between mt-10 bottom-spacer"
                        >
                            <v-pagination
                                class="theme-pagination ma-auto"
                                v-model="updatePage"
                                :length="
                                    Math.ceil(allResources.length / perPage)
                                "
                                :total-visible="7"
                            ></v-pagination>
                        </div>
                    </v-col> -->
                </v-row>
            </v-container>
            <div class="bg-light bottom-spacer no-underline">
                <v-container>
                    <v-row>
                        <v-col v-if="$store.state.privacyLayout.showFAQ" class="bg-light bottom-spacer no-underline" cols="12">
                            <Faqs :faqs="$store.state.privacyLayout.faq" />
                        </v-col>
                    </v-row>
                </v-container>
            </div>
            <div v-if="$store.state.privacyLayout.showB">
                <SeoTips
                    :layout="{
                        h: $store.state.privacyLayout.header2,
                        s: $store.state.privacyLayout.sub2,
                        c: $store.state.privacyLayout.content
                    }"
                />
            </div>
            <!-- <SeoTips /> -->
            <Newsletter />
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            page: 1,
            perPage: 7,
        };
    },
    head() {
        return {
            title: "Privacy Policy",
            link: [
                {
                    rel: 'canonical',
                    href: this.$store.state.privacyLayout.canonical_link || 'https://seodebate.com' + this.$route.path
                }
            ],
            meta: [
                {
                    name: 'robots',
                    content: !!+this.$store.state.privacyLayout.index ? 'index,follow' : 'noindex'
                },
                {
                    name: 'title',
                    content: this.$store.state.privacyLayout.seo_title || 'SEO Debate resources.'
                },
                {
                    name: 'description',
                    content: this.$store.state.privacyLayout.description
                },
                {
                    property: 'og:title',
                    content: this.$store.state.privacyLayout.seo_title || 'SEO Debate resources.'
                },
                {
                    property: 'og:description',
                    content: this.$store.state.privacyLayout.description
                },
                {
                    property: 'og:url',
                    content: 'https://seodebate.com' + this.$route.path
                },
                {
                    property: 'twitter:title',
                    content: this.$store.state.privacyLayout.seo_title || 'SEO Debate resources.'
                },
                {
                    property: 'twitter:description',
                    content: this.$store.state.privacyLayout.description
                },
                {
                    property: 'twitter:url',
                    content: 'https://seodebate.com' + this.$route.path
                },
            ]
        };
    },
    methods: {},
    computed: {
        allPrivacy(){
            return this.$store.getters.allPrivacy
        },
        updatePage: {
            get: function() {
                return this.page;
            },
            set: function(pagenumber) {
                var pagenum = parseInt(pagenumber);
                this.page = pagenum;
            }
        },
        visbleresquestions() {
            return this.allPrivacy.slice(
                (this.page - 1) * this.perPage,
                this.page * this.perPage
            );
        }
    },
    async asyncData({ $axios, store }) {
        if(!store.state.latestCategories.length){
            let categories = await $axios.$get("/categories");
            store.commit("update_latest_categories", categories);
        }
        if(!Object.values(store.state.privacyLayout).length){
            let data = await $axios.$get("/page?page=privacy-policy");
            store.commit("update_privacy_layout", data);
        }
    },
    components: {
        PolicyBanner: () =>
            import("@/components/sections/privacyPolicy/PolicyBanner"),
        BannerCategoryCard: () =>
            import("@/components/sections/shared/BannerCategoryCard"),
        Faqs: () => import("@/components/sections/shared/Faqs"),
        SeoTips: () => import("@/components/sections/shared/SeoTips"),
        Newsletter: () => import("@/components/sections/shared/Newsletter")
    }
};
</script>
