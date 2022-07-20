// import articlesdata from "../data/articles.json";
// import videosdata from "../data/videos.json";
// import questionsdata from "../data/questions.json";
// import resourcequestionsdata from "../data/resourcesquestions.json";
// import featureddata from "../data/featured.json";
// import categorydata from "../data/categories.json";
// import latestcategorydata from "../data/latest.json";

export const state = () => ({
    homeLayout: [],
    questionLayout: [],
    videoLayout: [],
    articleLayout: [],
    resourceLayout: [],
    privacyLayout:[],
    toolLayout: [],
    termsConditionLayout:[],
    latestCategories: [],

    allTermsCondition:[],
    allArticles: [],
    allVideos: [],
    allResources: [],
    allPrivacy:[],
    allQuestions: [],
    allTopics: [],

    featured: [],
    category: [],
    latestcategory: []
});

export const getters = {
    homeLayout: state => state.homeLayout,
    questionLayout: state => state.questionLayout,
    videoLayout: state => state.videoLayout,
    articleLayout: state => state.articleLayout,
    resourceLayout: state => state.resourceLayout,
    toolLayout: state => state.toolLayout,
    latestCategories: state => state.latestCategories,
    privacyLayout: state => state.privacyLayout,
    termsConditionLayout: state => state.termsConditionLayout,

    allArticles: state => state.allArticles,
    allVideos: state => state.allVideos,
    allResources: state => state.allResources,
    allQuestions: state => state.allQuestions,
    allPrivacy: state => state.allPrivacy,
    allTermsCondition: state => state.allTermsCondition,



    allTopics: state => state.allTopics,
    allFeatured: state => state.featured,
    categorylink: state => state.category,
    latestcategoryitems: state => state.latestcategory
    //filterCategories: state=> state.featured.filter(ct => ct.categorylink == this.route.param.slug)
    //filteredTagsArticles:state => state.articles.filter(el => el.category === state.articles.category)
};

export const mutations = {
    // This is for updating articles
    update_articles(state, payload) {
        state.allArticles = payload;
    },
    // This is for updating videos
    update_videos(state, payload) {
        state.allVideos = payload;
    },
    // This is for updating resource questions
    update_resources(state, payload) {
        state.allResources = payload;
    },
    // This is for upadting the privacy policy
    update_privacy(state, payload) {
        state.allPrivacy = payload;
    },
    // This is for updating questions
    update_questions(state, payload) {
        state.allQuestions = payload;
    },
    // This is for updating questions
    delete_question(state, index) {
        state.allQuestions.splice(index,1);
    },
    // This is for updating questions with newly created question
    add_new_question(state, payload) {
        state.allQuestions.unshift(payload);
    },
    // This is for updating question likes
    like_question(state, payload) {
        state.allQuestions.forEach(q => {
            if (q.id == payload) {
                if(q.i_dislike){
                    q.i_dislike = 0
                    q.dislikes = q.dislikes - 1;
                }
                q.likes = q.likes + 1;
                q.i_like = 1
            }
        });
    },
    dislike_question(state, payload) {
        state.allQuestions.forEach(q => {
            if (q.id == payload) {
                if(q.i_like){
                    q.likes = q.likes - 1
                    q.i_like = 0
                }
                q.dislikes = q.dislikes + 1;
                q.i_dislike = 1
            }
        });
    },

    // This is for updating featured data
    update_featured(state, payload) {
        state.featured = payload;
    },
    // This is for updating category
    update_category(state, payload) {
        state.category = payload;
    },
    // This is for updating latest data
    update_latestcategory(state, payload) {
        state.latestcategory = payload;
    },


    // This is for updating latest data
    update_topics(state, payload) {
        state.allTopics = payload;
    },
    // Page Layouts
    update_home_layout(state, payload) {
        state.homeLayout = payload;
    },
    update_question_layout(state, payload) {
        state.questionLayout = payload;
    },
    update_video_layout(state, payload) {
        state.videoLayout = payload;
    },
    update_article_layout(state, payload) {
        state.articleLayout = payload;
    },
    update_resource_layout(state, payload) {
        state.resourceLayout = payload;
    },
    update_privacy_layout(state, payload) {
        state.privacyLayout = payload;
    },
    update_terms_condition_layout(state, payload) {
        state.termsConditionLayout = payload;
    },
    update_tool_layout(state, payload) {
        state.toolLayout = payload;
    },
    update_latest_categories(state, payload) {
        state.latestCategories = payload;
    }
};

export const actions = {
    // async getHome({ commit }) {
    //     const data = await this.$axios.$get("/page?page=home&all=1");
    //     data.featured = JSON.parse(data.featured);
    //     data.latest = JSON.parse(data.latest);
    //     commit("update_home_layout", data);
    // }
};
