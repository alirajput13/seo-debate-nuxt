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
                                {{ $store.state.videoLayout.header1 }}
                            </h1>
                            <p class="font-16">
                                {{ $store.state.videoLayout.sub1 }}
                            </p>
                            <!-- <Breadcrumb :items="bdcrumbs" pagetitle="Videos" /> -->
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
                            <BannerCategoryCard :topcategory="topcategory" :j="j"/>
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
      Videos page
      ----------------------------------------- -->
            <v-container class="inner-top-spacer">
                <v-row>
                    <v-col
                        md="6"
                        lg="4"
                        v-for="(video, i) in visibleposts"
                        :key="i"
                    >
                        <VideosGrid :video="video" />
                    </v-col>
                    <v-col md="12">
                        <div
                            class="d-md-flex justify-content-space-between mt-10"
                        >
                            <v-pagination
                                class="theme-pagination ma-auto"
                                v-model="updatePage"
                                :length="Math.ceil($store.state.allVideos.length / perPage)"
                                :total-visible="7"
                            ></v-pagination>
                        </div>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col v-if="$store.state.videoLayout.showFAQ" cols="12">
                        <Faqs :faqs="$store.state.videoLayout.faq" />
                    </v-col>
                </v-row>
            </v-container>
            <div v-if="$store.state.videoLayout.showB">
                <SeoTips :layout="{h: $store.state.videoLayout.header2, s: $store.state.videoLayout.sub2, c: $store.state.videoLayout.content}" />
            </div>
            <Newsletter />
        </div>
    </div>
</template>

<script>
export default {
    head() {
        return {
            title: "Videos Page",
            meta: [
                {
                    hid: "description",
                    name: "SEO Debate",
                    content: "SEO Debate is the best way"
                }
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
                    text: "Videos",
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
            return this.$store.state.allVideos.slice(
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
        if(!Object.values(store.state.videoLayout).length){
            let data = await $axios.$get("/page?page=video");
            store.commit("update_video_layout", data);
        }
        if(!store.state.allVideos.length){
            let videos = await $axios.$get("/videos");
            store.commit("update_videos", videos);
        }
    },
    components: {
        VideosGrid: () => import("@/components/sections/video/VideosGrid"),
        LearnSeo: () => import("@/components/sections/shared/LearnSeo"),
        Faqs: () => import("@/components/sections/shared/Faqs"),
        SeoTips: () => import("@/components/sections/shared/SeoTips"),
        Newsletter: () => import("@/components/sections/shared/Newsletter"),
        Breadcrumb: () => import("@/components/sections/shared/Breadcrumb"),
        BannerCategoryCard: () =>
            import("@/components/sections/shared/BannerCategoryCard")
    }
};
</script>

<style lang="scss"></style>
