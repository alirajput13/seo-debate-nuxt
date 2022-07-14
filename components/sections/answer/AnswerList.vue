<template>
    <div>
        <!-- -----------------------------------------------
        Start Answer List
    ----------------------------------------------- -->
        <v-card
            class="question-card elevation-0"
            :class="answer.recommended ? 'border-success-all success lighten-4 position-relative' : 'border-all'"
            v-for="(answer, i) in answers"
            :id="`answer-${answer.id}`"
            :key="i">
            <v-card-text>
                <div class="d-flex align-start align-md-center mb-12">
                    <v-img
                        class="question-img"
                        :src="answer.author.avatar"
                        :alt="answer.author.username"
                    ></v-img>
                    <div class="ml-7">
                        <div class="d-flex align-center">
                            <NLink
                                :to="answer.author.link"
                                class="user-name text-decoration-none font-weight-semibold mb-0"
                            >
                                {{ answer.author.fullname }}
                            </NLink>
                            <span v-if="answer.author.badge" style="line-height:1.5" class="ml-4 font-weight-bold py-0 badge success-border">{{answer.author.badge}}</span>
                        </div>
                        <div class="d-md-flex align-center">
                            <div class="d-md-flex mt-4 mt-md-0">
                                <div
                                    class="py-2 py-md-0 pr-7 border-right border-sm-right-0 meta-text"
                                >
                                    <span class="text-light-blue"
                                        >Answered on {{ answer.date }}</span
                                    >
                                </div>
                                <!-- <div class="ml-0 ml-md-7 py-2 py-md-0">
                          <span class="meta-text text-light-blue">{{ answer.likes }} Likes </span>
                        </div> -->
                            </div>
                        </div>
                    </div>
                    <div class="ml-auto recommand-badge">
                        <span v-if="answer.recommended" class="badge success white--text pb-2">Recommended</span>
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
                                    <v-list-item @click="report('answer', answer.id)">
                                        <v-list-item-title>Report an abuse</v-list-item-title>
                                    </v-list-item>
                                    <v-list-item @click="markFeatured(answer.id)" v-if="$auth.loggedIn&&$auth.user.role=='admin'">
                                        <v-list-item-title>Mark as featured</v-list-item-title>
                                    </v-list-item>
                                    <v-list-item 
                                        @click="deleteAns(answer.id,i)" 
                                        v-if="$auth.loggedIn &&($auth.user.role=='admin' || $auth.user.id==answer.author.id)">
                                        <v-list-item-title>Delete</v-list-item-title>
                                    </v-list-item>
                                </v-list-item-group>
                            </v-list>
                        </v-menu>
                    </div>
                </div>
                <div class="question-subtext mb-8" v-html="answer.subtext"></div>
                <div class="reply-widget">
                    <div class="d-flex align-center">
                        <a
                            @click="like(answer.id)"
                            text
                            class="no-effect-button hover-blue d-flex border-right pr-6 align-center text-decoration-none text-blue"
                            :class="answer.i_like ? 'active' : ''"
                        >
                            <span class="sprite-img like-icon blue"></span>
                            <span class="ml-4 font-16">{{
                                new Intl.NumberFormat('en-GB',{compactDisplay:"short", notation: "compact"})
                                .format(answer.likes - answer.dislikes)
                            }}</span>
                        </a>
                        <a
                            @click="dislike(answer.id)"
                            text
                            class="no-effect-button hover-blue text-decoration-none pl-6 text-blue"
                            :class="answer.i_dislike ? 'active' : ''"
                        >
                            <span class="sprite-img dislike-icon"></span>
                            <span class="ml-4 font-16"></span>
                        </a>
                    </div>
                    <div class="ml-auto">
                        <a @click="loadReplies(answer.id)" class="no-effect-button hover-blue d-flex align-center text-decoration-none text-blue">
                            <span class="sprite-img comment-icon"></span>
                            <span class="ml-4 font-16">{{
                                answer.reply_count
                            }}</span>
                        </a>
                    </div>
                </div>
                <answer-reply-form v-if="show" :answer="answer.id" />
                <AnswerComments :replies="answer.replies"/>
            </v-card-text>
        </v-card>
        <!-- -----------------------------------------------
        End Answer List
    ----------------------------------------------- -->
    </div>
</template>

<script>
export default {
    name: "AnswerList",
    props: ["answers"],
    data(){
        return {
            show: false
        }
    },
    methods:{
        markFeatured(id){
            this.$axios.post(`answer-recommend/${id}`)
            .then((res) => {
                this.$swal({
                    title: "Success!",
                    text: res.data.message,
                    icon: "success",
                });
            })
            .catch((err) => {
                this.$swal({
                    title: `Error ${err.response.status}!`,
                    text: err.response.data.message,
                    icon: "error"
                });
            })
        },
        like(id) {
            if(!this.$auth.loggedIn){
                this.$nuxt.$emit('loginBox')
                return
            }
            let answer = this.answers.filter(a => a.id == id)[0]
            if(!answer.i_like){
                this.$axios.post(`answer-like`,{
                    liked: 1,
                    id: id,
                })
                .then(() => {
                    this.answers.forEach(a => {
                        if(a.id == id){
                            a.likes += 1
                            a.i_like = 1
                            if(a.i_dislike) a.dislikes -= 1
                            a.i_dislike = 0
                        }
                    });
                })
            }
        },
        dislike(id) {
            if(!this.$auth.loggedIn){
                this.$router.push({name: 'login'})
                return
            }
            let answer = this.answers.filter(a => a.id == id)[0]
            if(!answer.i_dislike){
                this.$axios.post(`answer-like`,{
                    liked: 0,
                    id: id
                })
                .then(() => {
                    this.answers.forEach(a => {
                        if(a.id == id){
                            if(a.i_like) a.likes -= 1
                            a.dislikes += 1
                            a.i_like = 0
                            a.i_dislike = 1
                        }
                    })
                })
            }
        },
        loadReplies(id){
            this.$axios.get(`answer/${id}`)
            .then(res => {
                this.answers.forEach(a => {
                    if(a.id == id) a.replies = res.data
                })
                this.show = true
            })
            .catch(err => {
                this.$swal({
                    title: `Error ${err.response.status}!`,
                    text: err.response.data.message,
                    icon: "error"
                });
            })
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
        deleteAns(id, index){
            this.$axios.post(`answer/${id}`,{
                _method: 'DELETE'
            })
            .then(res => {
                this.answers.splice(index,1)
                this.$swal({
                    title: "Success!",
                    text: res.data.message,
                    icon: "success",
                });
            })
            .catch((err) => {
                this.$swal({
                    title: `Error ${err.response.status}!`,
                    text: err.response.data.message,
                    icon: "error"
                });
            })
        }
    },
    mounted(){
        this.$nuxt.$on('insertReply',({id,reply}) => {
            this.answers.forEach(a => {
                if(a.id == id && a.replies.filter(r => r.id == reply.id).length == 0){
                    a.replies.unshift(reply)
                }
            })
        })
    },
    components: {
        AnswerComments: () => import("@/components/sections/answer/AnswerComments"),
        AnswerReplyForm: () => import("@/components/sections/answer/AnswerReplyForm")
    }
};
</script>
