<template>
    <div>
        <div class="inner-banner-wrapper">
            <div
                class="question-banner-bg"
                :style="{
                    backgroundImage: `url('/img/innerpage-bg-img.png')`
                }"
            >
                <v-container>
                    <!-- -----------------------------------------------
              Start Banner
          ----------------------------------------------- -->
                    <v-row justify="start">
                        <v-col lg="5" md="6" cols="12">
                            <h1 class="line-title font-weight-bold">
                                {{ $store.state.articleLayout.header1 }}
                            </h1>
                            <p class="font-16">
                                {{ $store.state.articleLayout.sub1 }}
                            </p>
                            <!-- <Breadcrumb :items="bdcrumbs" pagetitle="Articles" /> -->
                        </v-col>
                        <v-col
                            lg="7"
                            offset-lg="1"
                            md="6"
                            cols="12"
                            class="d-flex align-center"
                        >
                        </v-col>
                    </v-row>
                    <!-- -----------------------------------------------
              Start Banner
          ----------------------------------------------- -->
                </v-container>
            </div>
        </div>
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
            <!-- -----------------------------------------
      ArticlesGrid
      ----------------------------------------- -->
            <v-container class="inner-top-spacer">
                <v-row>
                    <v-col
                        md="6"
                        lg="4"
                        v-for="(blog, i) in visibleposts"
                        :key="i"
                    >
                        <ArticlesGrid :blog="blog" />
                    </v-col>
                    <v-col md="12">
                        <div
                            class="d-md-flex justify-content-space-between mt-10"
                        >
                            <v-pagination
                                class="theme-pagination ma-auto"
                                v-model="updatePage"
                                :length="
                                    Math.ceil(allArticles.length / perPage)
                                "
                                :total-visible="7"
                            ></v-pagination>
                        </div>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col v-if="$store.state.articleLayout.showFAQ" cols="12">
                        <Faqs :faqs="$store.state.articleLayout.faq" />
                    </v-col>
                </v-row>
            </v-container>
            <div v-if="$store.state.articleLayout.showB">
                <SeoTips
                    :layout="{
                        h: $store.state.articleLayout.header2,
                        s: $store.state.articleLayout.sub2,
                        c: $store.state.articleLayout.content
                    }"
                />
            </div>
            <!-- <LearnSeo /> -->
            <Newsletter />
        </div>
    </div>
</template>

<script>
export default {
    head() {
        return {
            title: "Articles",
            link: [
                {
                    rel: 'canonical',
                    href: this.$store.state.articleLayout.canonical_link || 'https://seodebate.com' + this.$route.path
                }
            ],
            meta: [
                {
                    name: 'robots',
                    content: !!+this.$store.state.articleLayout.index ? 'index,follow' : 'noindex'
                },
                {
                    name: 'title',
                    content: this.$store.state.articleLayout.seo_title || 'SEO Debate articles.'
                },
                {
                    name: 'description',
                    content: this.$store.state.articleLayout.description
                },
                {
                    property: 'og:title',
                    content: this.$store.state.articleLayout.seo_title || 'SEO Debate articles.'
                },
                {
                    property: 'og:description',
                    content: this.$store.state.articleLayout.description
                },
                {
                    property: 'og:url',
                    content: 'https://seodebate.com' + this.$route.path
                },
                {
                    property: 'twitter:title',
                    content: this.$store.state.articleLayout.seo_title || 'SEO Debate articles.'
                },
                {
                    property: 'twitter:description',
                    content: this.$store.state.articleLayout.description
                },
                {
                    property: 'twitter:url',
                    content: 'https://seodebate.com' + this.$route.path
                },
            ]
        };
    },
    data() {
        return {
            page: 1,
            perPage: 6,
            bdcrumbs: [
                {
                    text: "Home",
                    disabled: false,
                    to: "/"
                },
                {
                    text: "Articles",
                    disabled: true,
                    to: "/"
                }
            ],
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
        visibleposts() {
            return this.allArticles.slice(
                (this.page - 1) * this.perPage,
                this.page * this.perPage
            );
        },
        allArticles(){
            return this.$store.getters.allArticles
        }
    },
    async asyncData({ $axios, store }) {
        if(!store.state.latestCategories.length){
            let categories = await $axios.$get("/categories");
    
            store.commit("update_latest_categories", categories);
        }
        if(!Object.values(store.state.articleLayout).length){
            let data = await $axios.$get("/page?page=article");
            store.commit("update_article_layout", data);
        }
        if(!store.state.allArticles.length){
            let articles = await $axios.$get("/articles");
            store.commit("update_articles", articles);
        }
    },
    components: {
        ArticlesGrid: () =>
            import("@/components/sections/article/ArticlesGrid"),
        SeoTips: () => import("@/components/sections/shared/SeoTips"),
        Faqs: () => import("@/components/sections/shared/Faqs"),
        Newsletter: () => import("@/components/sections/shared/Newsletter"),
        Breadcrumb: () => import("@/components/sections/shared/Breadcrumb"),
        BannerCategoryCard: () =>
            import("@/components/sections/shared/BannerCategoryCard")
    }
};
</script>
