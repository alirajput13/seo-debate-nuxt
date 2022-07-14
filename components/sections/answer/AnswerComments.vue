<template>
    <div>
        <!-- -----------------------------------------------
        Start Answer Comments
    ----------------------------------------------- -->

        <div class="comment-widget answer-comment-widget">
            <div
                class="comment-item question-card"
                v-for="(reply, i) in replies"
                :key="i"
            >
                <div class="d-flex align-start align-md-center mb-12">
                    <v-img
                        class="question-img"
                        :src="reply.author.avatar"
                        :alt="reply.img"
                    ></v-img>
                    <div class="ml-7">
                        <div class="d-flex align-center">
                            <nuxt-link
                                :to="reply.author.link"
                                class="user-name text-decoration-none font-weight-semibold mb-0"
                                >{{ reply.author.fullname }}</nuxt-link
                            >
                            <span v-if="reply.author.badge" style="line-height:1.5" class="ml-4 font-weight-bold py-0 badge success-border">{{reply.author.badge}}</span>
                        </div>
                        <div class="d-md-flex align-center">
                            <div class="d-flex mt-4 mt-md-0">
                                <div class="py-2 py-md-0 pr-7 meta-text">
                                    <span class="text-light-blue"
                                        >On {{ reply.date }}</span
                                    >
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="ml-auto">
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
                                    <v-list-item @click="report('reply',reply.id)">
                                        <v-list-item-title>
                                            Report an abuse
                                        </v-list-item-title>
                                    </v-list-item>
                                    <v-list-item 
                                        @click="deleteRply(reply.id,i)"
                                        v-if="$auth.loggedIn && ($auth.user.role=='admin' || $auth.user.id == reply.author.id)">
                                        <v-list-item-title>Delete</v-list-item-title>
                                    </v-list-item>
                                </v-list-item-group>
                            </v-list>
                        </v-menu>
                    </div>
                </div>
                <p class="question-subtext mb-8" v-html="reply.body"></p>
                <div class="reply-widget">
                    <div class="d-flex align-center">
                        <a
                            @click="like(reply)"
                            text
                            class="no-effect-button hover-blue d-flex border-right pr-6 align-center text-decoration-none text-blue"
                            :class="reply.i_like ? 'active' : ''"
                        >
                            <span class="sprite-img like-icon blue"></span>
                            <span class="ml-4 font-16">{{
                                new Intl.NumberFormat('en-GB',{compactDisplay:"short", notation: "compact"})
                                .format(reply.likes - reply.dislikes)
                            }}</span>
                        </a>
                        <a
                            @click="dislike(reply)"
                            text
                            class="no-effect-button hover-blue text-decoration-none pl-6 text-blue"
                            :class="reply.i_dislike ? 'active' : ''"
                        >
                            <span class="sprite-img dislike-icon"></span>
                            <span class="ml-4 font-16"></span>
                        </a>
                        <!-- <div class="ml-9 mb-3">
                  <a href="javascript:void(0)" class="text-decoration-none font-14" @click="replydialog = true">Reply</a>
                </div> -->
                    </div>
                </div>

                <!-- Child comment -->
                <!-- <div v-if="reply.children">
                    <div
                        class="comment-item question-card child-item"
                        v-for="(reply, index) in reply.children"
                        :key="index"
                    >
                        <div>
                            <div
                                class="d-flex align-start align-md-center mb-12"
                            >
                                <v-img
                                    class="question-img"
                                    :src="reply.img"
                                    :alt="reply.img"
                                ></v-img>
                                <div class="ml-7">
                                    <span
                                        class="user-name text-decoration-none font-weight-semibold mb-0"
                                        >{{ reply.username }}</span
                                    >
                                    <div class="d-md-flex align-center">
                                        <div class="d-flex mt-4 mt-md-0">
                                            <div
                                                class="py-2 py-md-0 pr-7 meta-text"
                                            >
                                                <span class="text-light-blue"
                                                    >On {{ reply.date }}</span
                                                >
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="ml-auto">
                                    <v-menu offset-y left>
                                        <template
                                            v-slot:activator="{ on, attrs }"
                                        >
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
                                                        >Report an
                                                        abuse</v-list-item-title
                                                    >
                                                </v-list-item>
                                            </v-list-item-group>
                                        </v-list>
                                    </v-menu>
                                </div>
                            </div>
                            <p class="question-subtext mb-8">
                                {{ reply.subtext }}
                            </p>
                            <div class="reply-widget">
                                <div class="d-flex align-center">
                                    <a
                                        href="javascript:void(0)"
                                        text
                                        class="no-effect-button hover-blue d-flex border-right pr-6 align-center text-decoration-none text-blue"
                                    >
                                        <span
                                            class="sprite-img like-icon"
                                        ></span>
                                        <span class="ml-4 font-16">{{
                                            reply.likecount
                                        }}</span>
                                    </a>
                                    <a
                                        href="javascript:void(0)"
                                        text
                                        class="no-effect-button hover-blue text-decoration-none pl-6 text-blue"
                                    >
                                        <span
                                            class="sprite-img dislike-icon"
                                        ></span>
                                        <span class="ml-4 font-16"></span>
                                    </a>
                                    <div class="ml-9 mb-3">
                                        <a
                                            href="javascript:void(0)"
                                            class="text-decoration-none font-14"
                                            @click="replydialog = true"
                                            >Reply</a
                                        >
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> -->
            </div>
        </div>
        <!-- -----------------------------------------------
        End Answer Comments
    ----------------------------------------------- -->
        <!-- --------------------------------- -->
        <!-- Comment Dialog -->
        <!-- --------------------------------- -->
        <!-- <v-dialog v-model="replydialog" width="500">
            <v-card>
                <v-card-title class="headline grey lighten-2">
                    Post Comment
                </v-card-title>

                <v-card-text class="mt-12">
                    <form>
                        <v-row>
                            <v-col cols="12" md="12" class="py-0">
                                <v-textarea
                                    class="form-line-control"
                                    label="Message"
                                    outlined
                                    hide-details
                                ></v-textarea>
                            </v-col>
                        </v-row>
                    </form>
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions class="py-4">
                    <v-spacer></v-spacer>
                    <v-btn color="primary" @click="replydialog = false">
                        Post
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog> -->
    </div>
</template>

<script>
export default {
    name: "Replies",
    props: ["replies"],
    components: {},
    // data: () => ({
    //     replydialog: false
    // }),
    computed: {},
    methods: {
        like({id, i_like, i_dislike}) {
            if(!this.$auth.loggedIn){
                this.$nuxt.$emit('loginBox')
                return
            }
            if(!i_like){
                this.$axios.post(`reply-like`,{
                    liked: 1,
                    id: id,
                })
                .then(() => {
                    this.replies.forEach(a => {
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
        dislike({id, i_like, i_dislike}) {
            if(!this.$auth.loggedIn){
                this.$nuxt.$emit('loginBox')
                return
            }
            if(!i_dislike){
                this.$axios.post(`reply-like`,{
                    liked: 0,
                    id: id
                })
                .then(() => {
                    this.replies.forEach(a => {
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
        deleteRply(id, index){
            this.$axios.post(`answer-reply/${id}`,{
                _method: 'DELETE'
            })
            .then(res => {
                this.replies.splice(index,1)
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
    }
};
</script>
