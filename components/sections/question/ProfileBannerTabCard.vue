<template>
    <div>
        <v-container class="category-card-spacer">
            <!-- -----------------------------------------------
					Start Category Card
			----------------------------------------------- -->
            <v-row>
                <v-col cols="12" class="py-2">
                    <v-tabs
                        class="profile-tab"
                        color="primary"
                        show-arrows
                        slider-color="transparent"
                        v-model="tab"
                    >
                        <v-tab class="text-capitalize ml-0">Profile</v-tab>
                        <v-tab class="text-capitalize">Answers ({{profileData.answers.length}})</v-tab>
                        <v-tab class="text-capitalize">Questions ({{profileData.questions.length}})</v-tab>
                        <!-- <v-tab class="text-capitalize">Followers (2574)</v-tab>
                        <v-tab class="text-capitalize">Following (74)</v-tab> -->
                        <div class="ml-auto">
                            <v-btn
                                @click="answerClicked"
                                class="d-none d-lg-flex btn-hover mt-10"
                                color="primary"
                                elevation="0"
                            >
                                Ask Question
                            </v-btn>
                        </div>
                    </v-tabs>
                    <v-row>
                        <v-col cols="12" md="12" lg="8" class="mt-12">
                            <v-tabs-items v-model="tab">
                                <v-tab-item>
                                    <v-container fluid class="px-0 px-md-8 py-0 py-lg-8">
                                        <v-row>
                                            <v-col md="12">
                                                <v-row justify="end">
                                                    <v-col md="4" sm="12">
                                                        <v-btn
                                                            @click="answerClicked"
                                                            class="d-sm-block d-lg-none btn-hover mb-8"
                                                            color="primary"
                                                            elevation="0"
                                                            block
                                                        >
                                                            Ask Question
                                                        </v-btn>
                                                    </v-col>
                                                </v-row>
                                                <v-card
                                                    class="ask-question-banner mb-10 no-underline elevation-0 border-all w-100"
                                                    v-if="answerClicked">
                                                    <div class="browser-actions">
                                                        <v-icon color="error">mdi-brightness-1</v-icon>
                                                        <v-icon color="warning">mdi-brightness-1</v-icon>
                                                        <v-icon color="success">mdi-brightness-1</v-icon>
                                                    </div>
                                                    <v-textarea
                                                        name="askquestion"
                                                        placeholder="Ask a Question"
                                                        rows="3"
                                                        class="font-weight-semibold text-blue"
                                                        no-resize
                                                    ></v-textarea>
                                                    <div class="text-right">
                                                        <v-btn @click="answerClicked" color="primary">Ask</v-btn>
                                                    </div>
                                                </v-card>
                                                <QuestionList
                                                    :question="question"
                                                    v-for="(question,
                                                    i) in visibleQuestions"
                                                    :key="i"
                                                />
                                                <div
                                                    v-if="profileData.questions.length"
                                                    class="d-md-flex justify-content-space-between mt-10"
                                                >
                                                    <v-pagination
                                                        class="theme-pagination ma-auto"
                                                        v-model="updateQPage"
                                                        :length="Math.ceil(profileData.questions.length / perPage)"
                                                        :total-visible="perPage"
                                                    ></v-pagination>
                                                </div>
                                            </v-col>
                                        </v-row>
                                    </v-container>
                                </v-tab-item>
                                <v-tab-item>
                                    <v-container
                                        fluid
                                        class="px-0 px-md-8 py-0 py-lg-8"
                                    >
                                        <v-row>
                                            <v-col cols="12">
                                                <answer-list :answers="visibleAnswers"/>
                                                <div
                                                    v-if="profileData.answers.length"
                                                    class="d-md-flex justify-content-space-between mt-10"
                                                >
                                                    <v-pagination
                                                        class="theme-pagination ma-auto"
                                                        v-model="updateAPage"
                                                        :length="Math.ceil(profileData.answers.length / perPage)"
                                                        :total-visible="perPage"
                                                    ></v-pagination>
                                                </div>
                                            </v-col>
                                        </v-row>
                                    </v-container>
                                </v-tab-item>
                                <v-tab-item>
                                    <v-container
                                        fluid
                                        class="px-0 px-md-8 py-0 py-lg-8"
                                    >
                                        <v-row>
                                            <v-col cols="12">
                                                <QuestionList
                                                    :question="question"
                                                    v-for="(question,
                                                    i) in visibleQuestions"
                                                    :key="i"
                                                />
                                                <div
                                                    v-if="profileData.questions.length"
                                                    class="d-md-flex justify-content-space-between mt-10"
                                                >
                                                    <v-pagination
                                                        class="theme-pagination ma-auto"
                                                        v-model="updateQPage"
                                                        :length="Math.ceil(profileData.questions.length / perPage)"
                                                        :total-visible="perPage"
                                                    ></v-pagination>
                                                </div>
                                            </v-col>
                                        </v-row>
                                    </v-container>
                                </v-tab-item>
                                <!-- <v-tab-item>
                                    <v-container fluid>
                                        <v-row>
                                            <v-col cols="12" class="pt-8">
                                                <v-card
                                                    class="border-all elevation-0"
                                                >
                                                    <v-card-text>
                                                        <div
                                                            class="d-md-flex align-center py-5 py-sm-8 border-bottom"
                                                            v-for="(followerlist,
                                                            j) in followerlists"
                                                            :key="j"
                                                        >
                                                            <div
                                                                class="d-flex align-center"
                                                            >
                                                                <v-img
                                                                    :src="
                                                                        followerlist.uimg
                                                                    "
                                                                    class="rounded-circle img-fluid user-img"
                                                                    width="36"
                                                                />
                                                                <h4
                                                                    class="font-16 font-weight-semibold ml-6"
                                                                >
                                                                    {{
                                                                        followerlist.uname
                                                                    }}
                                                                    <template
                                                                        v-if="
                                                                            followerlist.expertClicked ==
                                                                                true
                                                                        "
                                                                    >
                                                                        <span
                                                                            class="ml-4 badge success-border"
                                                                            >Expert</span
                                                                        >
                                                                    </template>
                                                                </h4>
                                                            </div>
                                                            <div
                                                                class="ml-auto text-right"
                                                            >
                                                                <template
                                                                    v-if="
                                                                        followerlist.isfollowing ==
                                                                            true
                                                                    "
                                                                >
                                                                    <v-btn
                                                                        class="ma-2"
                                                                        outlined
                                                                        color="primary"
                                                                    >
                                                                        Follow
                                                                    </v-btn>
                                                                </template>
                                                                <template
                                                                    v-else
                                                                >
                                                                    <v-btn
                                                                        class="ma-2"
                                                                        depressed
                                                                        color="primary"
                                                                    >
                                                                        Following
                                                                    </v-btn>
                                                                </template>
                                                            </div>
                                                        </div>
                                                    </v-card-text>
                                                </v-card>
                                            </v-col>
                                        </v-row>
                                    </v-container>
                                </v-tab-item>
                                <v-tab-item>
                                    <v-container fluid>
                                        Following List will be here
                                    </v-container>
                                </v-tab-item> -->
                            </v-tabs-items>
                        </v-col>
                        <v-col md="12" lg="4" class="gutter-left-space">
                            <ProfileSidebar :profileData="profileData" />
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
            <!-- -----------------------------------------------
					Start Category Card
			----------------------------------------------- -->
        </v-container>
    </div>
</template>
<script>
export default {
    name: "ProfileBannerTabCard",
    props: ["profileData"],
    data() {
        return {
            tab: null,
            data: [],
            qpage: 1,
            apage: 1,
            perPage: 6,

            // followerlists: [
            //     {
            //         uimg: "/img/users/user2.jpg",
            //         uname: "Andrew Jonthan",
            //         expertClicked: true,
            //         isfollowing: true
            //     },
            //     {
            //         uimg: "/img/users/user3.jpg",
            //         uname: "Rebecca Flintoff",
            //         expertClicked: false,
            //         isfollowing: false
            //     },
            //     {
            //         uimg: "/img/users/user4.jpg",
            //         uname: "Asgar Ali",
            //         expertClicked: false,
            //         isfollowing: true
            //     },
            //     {
            //         uimg: "/img/users/user2.jpg",
            //         uname: "Matthew Doe",
            //         expertClicked: false,
            //         isfollowing: false
            //     },
            //     {
            //         uimg: "/img/users/user3.jpg",
            //         uname: "Maclom Marshell",
            //         expertClicked: false,
            //         isfollowing: true
            //     },
            //     {
            //         uimg: "/img/users/user4.jpg",
            //         uname: "John Doe",
            //         expertClicked: false,
            //         isfollowing: false
            //     },
            //     {
            //         uimg: "/img/users/user2.jpg",
            //         uname: "Kartina Kaif",
            //         expertClicked: false,
            //         isfollowing: false
            //     },
            //     {
            //         uimg: "/img/users/user3.jpg",
            //         uname: "Noora Jackline",
            //         expertClicked: false,
            //         isfollowing: false
            //     },
            //     {
            //         uimg: "/img/users/user4.jpg",
            //         uname: "Kartina Kaif",
            //         expertClicked: false,
            //         isfollowing: false
            //     }
            // ]
        };
    },
    methods: {
        answerClicked(){
            this.$router.push({name: 'questions', params:{ editor: true }})
        }
    },
    computed:{
        updateAPage: {
            get: function() {
                return this.apage;
            },
            set: function(pagenumber) {
                var pagenum = parseInt(pagenumber);
                this.apage = pagenum;
            }
        },
        updateQPage: {
            get: function() {
                return this.qpage;
            },
            set: function(pagenumber) {
                var pagenum = parseInt(pagenumber);
                this.qpage = pagenum;
            }
        },
        visibleQuestions() {
            return this.profileData.questions.slice(
                (this.qpage - 1) * this.perPage,
                this.qpage * this.perPage
            );
        },
        visibleAnswers() {
            return this.profileData.answers.slice(
                (this.apage - 1) * this.perPage,
                this.apage * this.perPage
            );
        },
    },
    components: {
        // AnswerEditor: () => import("@/components/sections/answer/AnswerEditor"),
        ProfileSidebar: () => import("@/components/sections/question/ProfileSidebar"),
        AnswerList: () => import("@/components/sections/answer/AnswerList.vue"),
        QuestionList: () => import("@/components/sections/question/QuestionList.vue"),
    }
};
</script>

<style lang="scss">
@media (max-width: 767px) {
    .user-img.v-image {
        max-width: 50px;
    }
}
</style>
