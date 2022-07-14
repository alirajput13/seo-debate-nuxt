<template>
    <div>
        <Categorybanner
            :seocategory="selectedTopic.title"
            :categorySubtext="selectedTopic.subtext"
        />

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
                            v-for="(topcategory, j) in $store.state.latestCategories"
                            :key="j"
                        >
                            <BannerCategoryCard
                                :topcategory="topcategory"
                                :j="j"
                            />
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>
            <!-- -----------------------------------------------
          End Category Card
      ----------------------------------------------- -->
        </v-container>
        <v-container class="inner-top-spacer">
            <!-- -----------------------------------------------
          Featured Card
      ----------------------------------------------- -->
            <div class="featured-wrapper mt-0 mt-md-15 pt-sm-0">
                <h4 class="font-weight-bold text-h4">Featured</h4>
                <div class="featured-card">
                    <Featured
                        :featureditem="featureditem"
                        v-for="(featureditem, i) in selectedTopic.featured"
                        :key="i"
                    />
                </div>
            </div>
            <!-- -----------------------------------------------
          End Featured Card
      ----------------------------------------------- -->
        </v-container>
        <!-- -----------------------------------------------
          Latest Card
      ----------------------------------------------- -->
        <div class="featured-wrapper" id="Latestsection">
            <v-container>
                <h4 class="font-weight-bold text-h4">Latest</h4>
                <div class="featured-card">
                    <Latest
                        :latestitem="latestitem"
                        v-for="(latestitem, i) in visibleLatestItem"
                        :key="i"
                    />
                </div>
                <div
                    class="d-md-flex justify-content-space-between mt-10"
                    @click="scrollToSection"
                >
                    <v-pagination
                        class="theme-pagination ma-auto"
                        v-model="updatePage"
                        :length="Math.ceil(selectedTopic.latest.length / perPage)"
                        :total-visible="7"
                    ></v-pagination>
                    <div
                        class="d-flex align-center justify-center mt-10 mt-md-0"
                    >
                        Go to
                        <input
                            type="text"
                            v-model.lazy="updatePage"
                            class="form-control ml-3"
                        />
                        <v-btn color="primary" small class="ml-3 custom-button">
                            <v-icon>mdi-check</v-icon>
                        </v-btn>
                    </div>
                </div>
            </v-container>
        </div>
        <!-- -----------------------------------------------
          End latest Card
      ----------------------------------------------- -->

        <!-- -----------------------------------------------
          faq Card
      ----------------------------------------------- -->
        <div class="bg-light bottom-spacer no-underline">
            <v-container>
                <v-row>
                    <v-col v-if="selectedTopic.content && selectedTopic.content.showFAQ" class="bg-light bottom-spacer no-underline" cols="12">
                        <Faqs :faqs="selectedTopic.content.faq" />
                    </v-col>
                </v-row>
            </v-container>
        </div>

        <!-- -----------------------------------------------
          End Faq Card
      ----------------------------------------------- -->

        <!-- -----------------------------------------------
          seo tips Card
      ----------------------------------------------- -->
        <div v-if="selectedTopic.content && selectedTopic.content.showB">
            <SeoTips
                :layout="{
                    h: selectedTopic.content.header2,
                    s: selectedTopic.content.sub2,
                    c: selectedTopic.content.content
                }"
            />
        </div>
        <!-- -----------------------------------------------
         end seo tips Card
      ----------------------------------------------- -->
        <Newsletter />
    </div>
</template>

<script>
export default {
    name: "topics",
    head(){
        return{
            title: this.selectedTopic.title,
            link: [
                {
                    rel: 'canonical',
                    href: this.selectedTopic.canonical_link || 'https://seodebate.com' + this.$route.path
                }
            ],
            meta: [
                {
                    name: 'robots',
                    content: !!+this.selectedTopic.index ? 'index,follow' : 'noindex'
                },
                {
                    name: 'title',
                    content: this.selectedTopic.seo_title || 'SEO Debate homepage.'
                },
                {
                    name: 'description',
                    content: this.selectedTopic.description
                },
                {
                    property: 'og:title',
                    content: this.selectedTopic.seo_title || 'SEO Debate articles.'
                },
                {
                    property: 'og:description',
                    content: this.selectedTopic.description
                },
                {
                    property: 'og:url',
                    content: 'https://seodebate.com' + this.$route.path
                },
                {
                    property: 'twitter:title',
                    content: this.selectedTopic.seo_title || 'SEO Debate articles.'
                },
                {
                    property: 'twitter:description',
                    content: this.selectedTopic.description
                },
                {
                    property: 'twitter:url',
                    content: 'https://seodebate.com' + this.$route.path
                },
            ]
        }
    },
    data() {
        return {
            featureditems: [],
            latestitems: [],
            page: 1,
            perPage: 6
        };
    },

    computed: {
        // ...mapGetters(["allFeatured", "latestcategoryitems"]),
        updatePage: {
            get: function() {
                return this.page;
            },
            set: function(pagenumber) {
                var pagenum = parseInt(pagenumber);
                this.page = pagenum;
            }
        },
        visibleLatestItem() {
            return this.selectedTopic.latest.slice(
                (this.page - 1) * this.perPage,
                this.page * this.perPage
            );
        }
    },
    methods: {
        scrollToSection() {
            const el = document.querySelector("#Latestsection");
            if (el) {
                const scrollTo = el.getBoundingClientRect().top;
                window.scrollBy({
                    top: scrollTo - 120,
                    left: 0,
                    behavior: "smooth"
                });
            }
        }
    },
    watch:{
        page: function(){
            this.scrollToSection()
        }
    },
    async asyncData({ $axios, store, params, error }) {
        if (!store.state.latestCategories.length) {
            let categories = await $axios.$get("/categories");
            store.commit("update_latest_categories", categories);
        }
        const selectedTopic = await $axios.$get(`/topic/${params.slug}`)
        .catch((err) => {
            error({ statusCode: 404, message: err.message })
        });
        return { selectedTopic }
    },
    components: {
        Categorybanner: () =>
            import("@/components/sections/categorybanner/Categorybanner"),
        Featured: () => import("@/components/sections/home/Featured"),
        Latest: () => import("@/components/sections/home/Latest"),
        BannerCategoryCard: () =>
            import("@/components/sections/shared/BannerCategoryCard"),
        Faqs: () => import("@/components/sections/shared/Faqs"),
        SeoTips: () => import("@/components/sections/shared/SeoTips"),
        Newsletter: () => import("@/components/sections/shared/Newsletter")
    }
};
</script>
