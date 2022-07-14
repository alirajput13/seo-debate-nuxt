<template>
    <!-- -----------------------------------------------
        Start Question List
    ----------------------------------------------- -->
    <v-card class="question-card elevation-0 border-all">
        <v-card-text>
            <div class="d-flex align-start align-md-center mb-12">
                <v-img
                    class="question-img"
                    :src="question.author.avatar"
                    :alt="question.author.fullname"
                ></v-img>
                <div class="ml-5">
                    <div class="d-flex align-center">
                        <a
                            @click="viewPro(question.author.username)"
                            class="user-name text-decoration-none font-weight-semibold mb-0"
                            >{{ question.author.fullname }}</a
                        >
                        <span
                            v-if="question.author.badge"
                            style="line-height:1.5"
                            class="ml-4 font-weight-bold py-0 badge success-border"
                            >
                            {{ question.author.badge }}
                        </span>
                    </div>
                    <div class="d-md-flex align-center">
                        <div class="pr-7 border-right border-sm-right-0">
                            <span class="text-light-blue"
                                >In
                                <NLink
                                    :to="{
                                        name: 'slug',
                                        params: { slug: question.category.slug }
                                    }"
                                    class="text-blue hover-blue no-effect-button"
                                    >{{ question.category.title }}</NLink
                                ></span
                            >
                        </div>
                        <div class="ml-0 ml-md-7 d-flex mt-4 mt-md-0">
                            <div
                                class="py-2 py-md-0 pr-7 border-right border-sm-right-0 meta-text"
                            >
                                <span class="text-light-blue">{{
                                    question.createdAt
                                }}</span>
                            </div>
                            <div class="ml-0 ml-md-7 py-2 py-md-0">
                                <span class="meta-text text-light-blue"
                                    >{{ question.views }} Views
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="ml-auto" v-if="standAlone">
                    <v-menu v-if="$auth.loggedIn" offset-y left>
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn
                                class="no-effect-button mw-unset pa-0"
                                text
                                v-bind="attrs"
                                v-on="on"
                            >
                                <v-icon class="text-muted"
                                    >mdi-dots-vertical</v-icon
                                >
                            </v-btn>
                        </template>
                        <v-list>
                            <v-list-item-group color="primary">
                                <v-list-item>
                                    <v-list-item-title
                                        @click="report('question', question.id)"
                                        >Report an abuse</v-list-item-title
                                    >
                                </v-list-item>
                                <v-list-item v-if="$auth.loggedIn &&($auth.user.role=='admin' || $auth.user.id==answer.author.id)">
                                    <v-list-item-title @click="deleteQues(question.id)">Delete</v-list-item-title>
                                </v-list-item>
                            </v-list-item-group>
                        </v-list>
                    </v-menu>
                </div>
            </div>
            <NLink
                :to="{
                    name: 'questions-slug',
                    params: { slug: question.slug }
                }"
                class="question-title text-decoration-none font-weight-semibold"
                >{{ question.title }}</NLink
            >
            <div
                v-if="question.video_type && question.video_id"
                class="video-card rounded my-11"
            >
                <iframe
                    width="100%"
                    height="350"
                    :src="
                        `https://www.youtube-nocookie.com/embed/${question.video_id}`
                    "
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                ></iframe>
            </div>
            <div class="question-subtext" v-html="question.subtext"></div>

            <div class="reply-widget">
                <a
                    @click="answer(question.slug)"
                    class="no-effect-button hover-blue d-flex align-center text-decoration-none font-weight-semibold text-blue"
                >
                    <span class="sprite-img answer-icon"></span>
                    <span class="ml-4 font-16"
                        >{{ question.answers_count }}
                        {{
                            `Answer${question.answers_count > 1 ? "s" : ""}`
                        }}</span
                    >
                </a>
                <!--<a @click="answerClicked = true" class="no-effect-button hover-blue d-flex align-center text-decoration-none font-weight-semibold text-blue">
                    <span class="sprite-img answer-icon"></span>
                    <span class="ml-4 font-16">Answer</span>
                </a>-->
                <div class="ml-auto">
                    <div class="d-flex align-center">
                        <a
                            @click="like(question.id)"
                            text
                            class="no-effect-button hover-blue d-flex border-right pr-6 align-center text-decoration-none text-blue"
                            :class="question.i_like ? 'active' : ''"
                        >
                            <span class="sprite-img like-icon blue"></span>
                            <span class="ml-4 font-16">{{
                                new Intl.NumberFormat("en-GB", {
                                    compactDisplay: "short",
                                    notation: "compact"
                                }).format(question.likes - question.dislikes)
                            }}</span>
                        </a>
                        <a
                            @click="dislike(question.id)"
                            text
                            class="no-effect-button hover-blue text-decoration-none pl-6 text-blue"
                            :class="question.i_dislike ? 'active' : ''"
                        >
                            <span class="sprite-img dislike-icon"></span>
                            <span class="ml-4 font-16"></span>
                        </a>
                    </div>
                </div>
            </div>
        </v-card-text>
    </v-card>
    <!-- -----------------------------------------------
        End Question List
    ----------------------------------------------- -->
</template>

<script>
export default {
    name: "QuestionList",
    props: {
        question: Object,
        standAlone: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            readMoreActivated: false,
            answerClicked: false
        };
    },
    methods: {
        like(question) {
            if (!this.$auth.loggedIn) {
                this.$nuxt.$emit("loginBox");
                return;
            }
            if (!this.question.i_like) {
                this.$axios
                    .post(`question-like/${question}`, {
                        liked: 1
                    })
                    .then(() => {
                        if (this.standAlone) {
                            this.question.likes += 1;
                            this.question.dislikes -= 1;
                            this.question.i_like = 1;
                            this.question.i_dislike = 0;
                        } else {
                            this.$store.commit("like_question", question);
                        }
                    });
            }
        },
        dislike(question) {
            if (!this.$auth.loggedIn) {
                this.$nuxt.$emit("loginBox");
                return;
            }
            if (!this.question.i_dislike) {
                this.$axios
                    .post(`question-like/${question}`, {
                        liked: 0
                    })
                    .then(() => {
                        if (this.standAlone) {
                            this.question.likes -= 1;
                            this.question.dislikes += 1;
                            this.question.i_like = 0;
                            this.question.i_dislike = 1;
                        } else {
                            this.$store.commit("dislike_question", question);
                        }
                    });
            }
        },
        answer(slug) {
            if (this.$auth.loggedIn) {
                this.$router.push({ name: "questions-slug", params: { slug } });
            } else {
                this.$nuxt.$emit("loginBox");
            }
        },
        report(t, id) {
            this.$swal({
                title: "Are you sure?",
                text: "You want to report this " + t + "?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Yes, Report!",
                cancelButtonText: "No, cancel it!"
            }).then(({ isConfirmed }) => {
                if (isConfirmed) {
                    this.$axios
                        .post("abuse-report", {
                            thing: t,
                            thing_id: id
                        })
                        .then(res => {
                            this.$swal({
                                title: `Success!`,
                                text: res.data.message,
                                icon: "success"
                            });
                        })
                        .catch(err => {
                            if (err.response.status == 422) {
                                this.$swal({
                                    title: `Error ${err.response.status}!`,
                                    text:
                                        err.response.data.errors[
                                            Object.keys(
                                                err.response.data.errors
                                            )[0]
                                        ][0],
                                    icon: "error"
                                });
                            } else {
                                this.$swal({
                                    title: `Error ${err.response.status}!`,
                                    text: err.response.data.message,
                                    icon: "error"
                                });
                            }
                        });
                }
            });
        },
        viewPro(username) {
            if (this.$auth.loggedIn) {
                this.$router.push({
                    name: "users-username-profile",
                    params: { username }
                });
            } else {
                this.$nuxt.$emit("loginBox");
            }
        },
        deleteQues(id){
            let index = this.$store.getters.allQuestions.map(q => q.id ).indexOf(id)
            this.$axios.post(`questions/${id}`,{
                _method: 'DELETE'
            })
            .then(res => {
                if(index){
                    this.$store.commit('delete_question',index)
                }
                this.$swal({
                    title: "Success!",
                    text: res.data.message,
                    icon: "success",
                });
                this.$router.push('/questions/')
            })
            .catch((err) => {
                this.$swal({
                    title: `Error ${err.response.status}!`,
                    text: err.response.data.message,
                    icon: "error"
                });
            })
        }
    }
};
</script>
