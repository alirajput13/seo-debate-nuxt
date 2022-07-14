<template>
    <div class="homepage">
        <!-- -----------------------------------------
    Banner
    ----------------------------------------- -->
        <Banner :banner="{ h: homeLayout.header1, cards: homeLayout.cards }" />
        <GrowLearn
            :layout="{
                h2: homeLayout.header2,
                s2: homeLayout.sub2,
                cards: homeLayout.cards1,
                v: {
                    thumb: homeLayout.vthumb,
                    h: homeLayout.vheader,
                    s: homeLayout.vsub,
                    video: homeLayout.video
                }
            }"
        />
        <!-- -----------------------------------------
    Banner
    ----------------------------------------- -->
        <div class="featured-wrapper" v-if="homeLayout.featured">
            <v-container>
                <h2 class="font-weight-bold text-h4">Featured</h2>
                <div class="featured-card">
                    <Featured
                        v-for="(featureditem, i) in homeLayout.featured"
                        :key="i"
                        :featureditem="featureditem"
                    />
                </div>
            </v-container>
        </div>
        <!-- -----------------------------------------
    Banner
    ----------------------------------------- -->
        <SeoFeatureCards
            :layout="{
                h3: homeLayout.header3,
                s3: homeLayout.sub3,
                cards: homeLayout.cards2
            }"
        />
        <LearnSeo
            :layout="{ h4: homeLayout.header4, topics: homeLayout.topics }"
        />
        <!-- -----------------------------------------
    Banner
    ----------------------------------------- -->
        <div class="featured-wrapper" id="Latestsection" v-if="homeLayout.latest">
            <v-container>
                <h2 class="font-weight-bold text-h4">Latest</h2>
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
                        :length="Math.ceil(homeLayout.latest.length / perPage)"
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
        <!-- -----------------------------------------
    Banner
    ----------------------------------------- -->
        <Newsletter />
    </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
    head() {
        return {
            title: this.$store.state.homeLayout.seo_title || 'SEO Debate',
            link: [
                {
                    rel: 'canonical',
                    href: this.$store.state.homeLayout.canonical_link || 'https://seodebate.com' + this.$route.path
                }
            ],
            meta: [
                {
                    name: 'robots',
                    content: !!+this.$store.state.homeLayout.index ? 'index,follow' : 'noindex'
                },
                {
                    name: 'title',
                    content: this.$store.state.homeLayout.seo_title || 'SEO Debate homepage.'
                },
                {
                    name: 'description',
                    content: this.$store.state.homeLayout.description
                },
                {
                    property: 'og:title',
                    content: this.$store.state.homeLayout.seo_title || 'SEO Debate homepage.'
                },
                {
                    property: 'og:description',
                    content: this.$store.state.homeLayout.description
                },
                {
                    property: 'og:url',
                    content: 'https://seodebate.com' + this.$route.path
                },
                {
                    property: 'twitter:title',
                    content: this.$store.state.homeLayout.seo_title || 'SEO Debate homepage.'
                },
                {
                    property: 'twitter:description',
                    content: this.$store.state.homeLayout.description
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
            featureditems: [],
            latestitems: [],
            page: 1,
            perPage: 6
        };
    },
    computed: {
        ...mapGetters(["homeLayout"]),
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
            return this.homeLayout.latest.slice(
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
    components: {
        Banner: () => import("@/components/sections/home/Banner"),
        GrowLearn: () => import("@/components/sections/home/GrowLearn"),
        Featured: () => import("@/components/sections/home/Featured"),
        SeoFeatureCards: () =>
            import("@/components/sections/home/SeoFeatureCards"),
        Latest: () => import("@/components/sections/home/Latest"),
        Newsletter: () => import("@/components/sections/shared/Newsletter"),
        LearnSeo: () => import("@/components/sections/shared/LearnSeo")
    },
    async asyncData({ $axios, store }) {
        if(!Object.values(store.state.homeLayout).length){
            let data = await $axios.$get("/page?page=home&all=1");
            store.commit("update_home_layout", data);
        }
    }
};
</script>
