<template>
    <div>
        <AskQuestionBanner />
        <AskQuestionBannerCategoryCard class="d-none d-md-block"/>
        <div
            class="section-bg-img"
            :style="{backgroundImage: `url('/img/article-bg.jpg')`}">
            <v-container class="inner-top-spacer">
                <v-row justify="start">
                    <v-col lg="3" sm="12" md="12">
                        <div class="d-flex align-center filter-bg">
                            <p class="label-title font-weight-regular mb-0 mb-lg-0">
                                Filters
                            </p>
                            <div class="ml-auto">
                                <a
                                    class="d-block d-lg-none"
                                    @click="
                                        showfiltersidebar = !showfiltersidebar
                                    "
                                    ><v-icon class=""
                                        >mdi-filter-variant</v-icon
                                    ></a
                                >
                            </div>
                        </div>

                        <div
                            class="left-sidebar"
                            :class="
                                showfiltersidebar
                                    ? 'hidefiltersidebar'
                                    : 'showmobilesidebar'
                            "
                        >
                            <div class="d-flex align-center d-md-none">
                                <div>
                                    <h4 class="font-18 font-weight-semibold">
                                        Filter
                                    </h4>
                                </div>
                                <!-- Close button -->
                                <v-btn
                                    @click="
                                        showfiltersidebar = !showfiltersidebar
                                    "
                                    small
                                    elevation="0"
                                    class="white px-0 custom-sm-btn ml-auto"
                                >
                                    <v-icon>mdi-window-close</v-icon>
                                </v-btn>
                            </div>
                            <Filtersidebar />
                        </div>
                    </v-col>
                    <v-col lg="8" offset-lg="1" md="12" id="categorybox">
                        <!-- end example of login dialog on answer text click -->
                        <!-- -------------------------------------------- -->
                        <div id="Qlist"></div>
                        <QuestionList
                            :question="question"
                            v-for="(question, i) in visibleQuestions"
                            :key="i"
                        />
                        <!-- Pagination -->
                        <div
                            v-if="visibleQuestions.length"
                            class="d-md-flex justify-content-space-between mt-10"
                        >
                            <v-pagination
                                class="theme-pagination ma-auto"
                                v-model="updatePage"
                                :length="Math.ceil($store.state.allQuestions.length / perPage)"
                                :total-visible="3"
                            ></v-pagination>
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
                        <C2a />
                    </v-col>
                </v-row>
                <v-row justify="center">
                    <v-col v-if="$store.state.questionLayout.showFAQ" md="12">
                        <Faqs :faqs="$store.state.questionLayout.faq" />
                    </v-col>
                </v-row>
            </v-container>
            <div v-if="$store.state.questionLayout.showB" md="12">
                <SeoTips :layout="{h: $store.state.questionLayout.header2, s: $store.state.questionLayout.sub2, c: $store.state.questionLayout.content}" />
            </div>
            <Newsletter />
        </div>
    </div>
</template>
<script>
export default {
    auth: false,
    head() {
        return {
            title: 'Questions',
            link: [
                {
                    rel: 'canonical',
                    href: this.$store.state.questionLayout.canonical_link || 'https://seodebate.com' + this.$route.path
                }
            ],
            meta: [
                {
                    name: 'robots',
                    content: !!+this.$store.state.questionLayout.index ? 'index,follow' : 'noindex'
                },
                {
                    name: 'title',
                    content: this.$store.state.questionLayout.seo_title || 'SEO Debate questions.'
                },
                {
                    name: 'description',
                    content: this.$store.state.questionLayout.description
                },
                {
                    property: 'og:title',
                    content: this.$store.state.questionLayout.seo_title || 'SEO Debate questions.'
                },
                {
                    property: 'og:description',
                    content: this.$store.state.questionLayout.description
                },
                {
                    property: 'og:url',
                    content: 'https://seodebate.com' + this.$route.path
                },
                {
                    property: 'twitter:title',
                    content: this.$store.state.questionLayout.seo_title || 'SEO Debate questions.'
                },
                {
                    property: 'twitter:description',
                    content: this.$store.state.questionLayout.description
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
            page: 1,
            perPage: 6,
            showfiltersidebar: true,
            dialog: false,
            allQuestions: [],
            layout: this.$store.state.questionLayout
        };
    },
    async asyncData({ $axios, store }) {
        if(!Object.values(store.state.questionLayout).length){
            let data = await $axios.$get("/page?page=question");
            store.commit("update_question_layout", data);
        }
        if(!store.state.allQuestions.length){
            let questions = await $axios.$get("/questions");
            store.commit("update_questions", questions);
        }
    },
    methods: {
        scrollTopoint(index) {
            // setTimeout(function() {
                const el = document.querySelector(index);

                if (el) {
                    const scrollTo = el.getBoundingClientRect().top;
                    window.scrollBy({
                        top: scrollTo - 120,
                        left: 0,
                        behavior: "smooth"
                    });
                }
            // }, 800);
        }
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
        visibleQuestions() {
            return this.$store.state.allQuestions.slice(
                (this.page - 1) * this.perPage,
                this.page * this.perPage
            );
        },
    },
    mounted(){
        if(this.$route.params.editor){
            setTimeout(()=>{
                if(this.$auth.loggedIn){
                    this.$nuxt.$emit('AskQuestionOpen')
                }else{
                    this.$nuxt.$emit('loginBox')
                }
            },500)
        }
        this.$nuxt.$on('scroll2Q', () => {
            this.scrollTopoint('#Qlist')
        })
    },
    watch:{
        page(){
            this.scrollTopoint('#Qlist')
        }
    },
    components: {
        Faqs: () => import("@/components/sections/shared/Faqs"),
        SeoTips: () => import("@/components/sections/shared/SeoTips"),
        AskQuestionBanner: () =>
            import("@/components/sections/question/AskQuestionBanner"),
        QuestionList: () =>
            import("@/components/sections/question/QuestionList"),
        Filtersidebar: () =>
            import("@/components/sections/question/Filtersidebar"),
        C2a: () => import("@/components/sections/shared/C2a"),
        AskQuestionBannerCategoryCard: () =>
            import(
                "@/components/sections/question/AskQuestionBannerCategoryCard"
            ),
        Newsletter: () => import("@/components/sections/shared/Newsletter")
    }
};
</script>

<style lang="scss">
.custom-sm-btn {
    min-width: 30px !important;
}
</style>
