<template>
    <div
        class="section-bg-img"
        :style="{
            backgroundImage: `url('/img/article-bg.jpg')`
        }"
    >
        <!-- -----------------------------------------
      Start Question Detail
    ----------------------------------------- -->
        <v-container class="inner-top-spacer">
            <v-row class="mt-12">
                <v-col lg="8" md="12">
                    <!-- ------------------------------------------------- -->
                    <!-- Start Current click Card -->
                    <!-- ------------------------------------------------- -->
                    <QuestionList :standAlone="true" :question="data"/>
                    <!-- ------------------------------------------------- -->
                    <!-- End Current click Card -->
                    <!-- ------------------------------------------------- -->
                    <v-card class="border-all elevation-0">
                        <answer-editor :question="data.id"/>
                    </v-card>
                    <!-- ------------------------------------------------- -->
                    <!-- Start Answer Card -->
                    <!-- ------------------------------------------------- -->
                    <p id="answers" v-if="data && data.answers" class="text-h4 blue--text mb-10 mt-15">{{data.answers.length}} Answers</p>
                    <AnswerList :answers="data.answers" />
                    <!-- ------------------------------------------------- -->
                    <!-- End Answer Card -->
                    <!-- ------------------------------------------------- -->
                </v-col>
                <v-col lg="4" md="12" class="mt-8">
                    <p class="text-uppercase mb-0 font-14 font-weight-regular">
                        Related Questions
                    </p>
                    <div class="mt-7">
                        <div class="mb-8">
                            <div
                                class="border-bottom py-9 px-0"
                                v-for="(rquestion,
                                i) in filteredQuestions"
                                :key="i"
                            >
                                <RelatedQuestion :rquestion="rquestion" />
                            </div>
                        </div>

                    </div>
                    <!-- ask question modal -->
                    <v-btn
                        block
                        color="primary"
                        @click="OpenQuestion"
                        class="mt-8">
                        Ask Question
                    </v-btn>
                    <!-- end ask question modal -->
                </v-col>
            </v-row>
        </v-container>
        <!-- -----------------------------------------
      Start Question Detail
    ----------------------------------------- -->
    <newsletter/>
    </div>
</template>

<script>
export default {
    auth: false,
    head() {
        return {
            title: this.data.title,
            link: [
                {
                    rel: 'canonical',
                    href: this.data.canonical_link || 'https://seodebate.com' + this.$route.path
                }
            ],
            meta: [
                {
                    name: 'robots',
                    content: !!+this.data.index ? 'index,follow' : 'noindex'
                },
                {
                    name: 'title',
                    content: this.data.seo_title || this.data.title
                },
                {
                    name: 'description',
                    content: this.data.description
                },
                {
                    property: 'og:title',
                    content: this.data.seo_title || this.data.title
                },
                {
                    property: 'og:description',
                    content: this.data.description
                },
                {
                    property: 'og:url',
                    content: 'https://seodebate.com' + this.$route.path
                },
                {
                    property: 'twitter:title',
                    content: this.data.seo_title || this.data.title
                },
                {
                    property: 'twitter:description',
                    content: this.data.description
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
            data: [],
            selectedQuestion: [],
            content: '',
            error: ""
        };
    },
    mounted(){
        this.$nuxt.$on('answered', (res) => {
            this.data.answers.splice(1,0,res)
            setTimeout(()=> {
                this.$vuetify.goTo(`#answer-${res.id}`,{
                    duration: 800,
                    offset: 100
                })
            },200)
        })
    },
    methods:{
        OpenQuestion(){
            if(this.$auth.loggedIn){
                this.$router.push({name: 'questions', params:{ editor: true }})
            }else{
                this.$nuxt.$emit('loginBox')
            }
        },
        login(){
            if(this.$refs.login.validate()){
                let data = {
                    email : this.email,
                    password : this.password
                }
                this.$auth.loginWith('laravelJWT', { data })
                .then(() => {
                    this.dialog = false
                })
            }
        }
    },
    computed: {
        filteredQuestions() {
            let questions = this.$store.getters.allQuestions

            return questions.filter(q => {
                return q.title !== this.data.title
            }).splice(0, 4)
        },
    },
    async asyncData({ $axios, params, error }) {
        let data = await $axios.$get(`question/${params.slug}`)
        .catch((err) => {
            error({ statusCode: 404, message: err.message })
        });
        return { data }
    },
    async fetch() {
        if(!this.$store.state.allQuestions.length){
            let questions = await this.$axios.$get("/questions");
            this.$store.commit("update_questions", questions);
        }
    },
    components: {
        AnswerEditor: () => import("@/components/sections/answer/AnswerEditor"),
        QuestionList: () => import("@/components/sections/question/QuestionList"),
        RelatedQuestion: () => import("@/components/sections/question/RelatedQuestion"),
        // TiptapVuetify,
        AnswerList: () => import("@/components/sections/answer/AnswerList"),
        Newsletter: () => import("@/components/sections/shared/Newsletter")
    },
};
</script>
