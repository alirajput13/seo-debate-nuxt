<template>
    <div>
        <Categorybanner
            :seocategory="`${selectedCategory.title}`"
            :categorySubtext="`${selectedCategory.subtext}`"
        />

        <v-container class="category-card-spacer d-none d-md-block">
            <!-- -----------------------------------------------
	          Start Category Card
		      ----------------------------------------------- -->
            <v-card class="">
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
            <div class="featured-wrapper mt-15">
                <h2 class="font-weight-bold text-h4">Featured</h2>
                <div v-if="Object.values(selectedCategory.featured).length" class="featured-card">
                    <Featured
                        v-for="(featureditem, i) in selectedCategory.featured"
                        :featureditem="featureditem"
                        :key="i"
                    />
                </div>
                <v-alert
                    dense
                    outlined
                    type="error"
                    class="mt-15"
                    v-else
                >
                    No Items found
                </v-alert>
            </div>
            <!-------------------------------------------------
		          End Category Card
		      ----------------------------------------------- -->
        </v-container>
        <!-------------------------------------------------
		          Latest Category Card
		      ----------------------------------------------- -->
        <div class="featured-wrapper" id="Latestsection">
            <v-container>
                <h2 class="font-weight-bold text-h4">Latest</h2>
                <div
                    class="featured-card"
                    v-if="Object.values(selectedCategory.latest).length"
                >
                    <Latest
                        :latestitem="latestitem"
                        v-for="(latestitem, i) in visibleLatestItem"
                        :key="i"
                    />
                </div>
                <div
                    class="d-md-flex justify-content-space-between mt-10"
                    @click="scrollToSection"
                    v-if="Object.values(selectedCategory.latest).length"
                >
                    <v-pagination
                        class="theme-pagination ma-auto"
                        v-model="updatePage"
                        :length="Math.ceil(Object.values(selectedCategory.latest).length / perPage)"
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
                <v-alert
                    dense
                    outlined
                    type="error"
                    class="mt-15"
                    v-else
                >
                    No Latest Items found
                </v-alert>
            </v-container>
        </div>
        <!-------------------------------------------------
		          End Latest Category Card
		      ----------------------------------------------- -->
        <!-- -----------------------------------------------
	          faq Card
	      ----------------------------------------------- -->
        <div v-if="selectedCategory.content && selectedCategory.content.showFAQ" class="bg-light bottom-spacer no-underline">
            <v-container>
                <Faqs :faqs="selectedCategory.content.faq"/>
            </v-container>
        </div>

        <!-- -----------------------------------------------
	          End Faq Card
	      ----------------------------------------------- -->

        <!-- -----------------------------------------------
	          seo tips Card
	      ----------------------------------------------- -->
        <SeoTips
            v-if="selectedCategory.content && selectedCategory.content.showB"
            :layout="{
                h: selectedCategory.content.header2,
                s: selectedCategory.content.sub2,
                c: selectedCategory.content.content
            }"
        />
        <!-- -----------------------------------------------
	         end seo tips Card
	      ----------------------------------------------- -->
        <Newsletter />
    </div>
</template>

<script>
export default {
    name: "CategoryPage",
    data() {
        return {
            selectedCategory: {
                title : 'Category'
            },
            title: "",
            page: 1,
            perPage: 6
        };
    },
    computed: {
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
            return this.selectedCategory.latest.slice(
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

    async asyncData({ $axios, store, params, error }) {
        if (!store.state.latestCategories.length) {
            let categories = await $axios.$get("/categories");
            store.commit("update_latest_categories", categories);
        }
        const selectedCategory = await $axios.$get(`/category/${params.slug}`)
        .catch((err) => {
            error({ statusCode: 404, message: err.message })
        });
        return { selectedCategory }
    },
    head() {
        return {
            title: this.selectedCategory.title,
            link: [
                {
                    rel: 'canonical',
                    href: this.selectedCategory.canonical_link || 'https://seodebate.com' + this.$route.path
                }
            ],
            meta: [
                {
                    name: 'robots',
                    content: !!+this.selectedCategory.index ? 'index,follow' : 'noindex'
                },
                {
                    name: 'title',
                    content: this.selectedCategory.seo_title || 'SEO Debate homepage.'
                },
                {
                    name: 'description',
                    content: this.selectedCategory.description
                },
                {
                    property: 'og:title',
                    content: this.selectedCategory.seo_title || 'SEO Debate articles.'
                },
                {
                    property: 'og:description',
                    content: this.selectedCategory.description
                },
                {
                    property: 'og:url',
                    content: 'https://seodebate.com' + this.$route.path
                },
                {
                    property: 'twitter:title',
                    content: this.selectedCategory.seo_title || 'SEO Debate articles.'
                },
                {
                    property: 'twitter:description',
                    content: this.selectedCategory.description
                },
                {
                    property: 'twitter:url',
                    content: 'https://seodebate.com' + this.$route.path
                },
            ]
        };
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
    },
    watch:{
        page:function(){
            this.scrollToSection()
        }
    }
};
</script>
