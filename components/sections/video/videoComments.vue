<template>
    <div>
        <!-- -----------------------------------------------
        Start Comments
    ----------------------------------------------- -->
        <!-- <div class="article-spacer-title blue--text article-spacer">
            All Comments ({{ comments.length }})
        </div> -->
        <div class=" comment-widget-video ">
            <div class="comment-item" v-for="(comment, i) in comments" :key="i" :id="`comment-${comment.id}`">
                <div class="d-flex align-start">
                    <!-- user icon -->
                    <div>
                        <v-avatar size="40">
                            <img
                                :src="comment.commentor.avatar"
                                :alt="comment.commentor.fullname"/>
                        </v-avatar>
                    </div>
                    <!-- content -->
                    <div class="comment-part">
                        <div class="d-flex align-center user-details">
                            <h4 class="comment-user">
                                {{ comment.commentor.fullname }},
                            </h4>
                        </div>
                        <div class="d-md-flex align-center">
                            <div class="d-flex mt-4 mt-md-0">
                                <div class="py-2 py-md-0 pr-7 meta-text">
                                <span class="text-light-blue"
                                    >On {{ comment.time }}</span
                                >
                                </div>
                            </div>
                            </div>
                        <p class="comment-text">{{ comment.commenttext }}</p>
                        <a
                            href="javascript:void(0)"
                            class="text-decoration-none font-14"
                            @click="replyD(comment.id)"
                            >Reply</a
                        >
                    </div>

                    <!-- Actions -->
                    <v-menu v-if="$auth.loggedIn" offset-y left>
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn
                                class="no-effect-button mw-unset pa-0 ml-auto"
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
                                <v-list-item @click="report('comment', comment.id)">
                                    <v-list-item-title>Report an abuse</v-list-item-title>
                                </v-list-item>
                                <v-list-item 
                                    @click="deleteComment(comment.id,i)" 
                                    v-if="$auth.loggedIn &&($auth.user.role=='admin' || $auth.user.id==comment.commentor.id)">
                                    <v-list-item-title>Delete</v-list-item-title>
                                </v-list-item>
                            </v-list-item-group>
                        </v-list>
                    </v-menu>
                </div>
                <!-- Child comment -->
                        <div v-if="comment.children">
                            <div
                                class="comment-item-child question-card
                                "
                                v-for="(reply, index) in comment.children"
                                :key="index"
                            >
                             <div class="d-flex align-start">
                        <!-- user icon -->
                             <div> 
                        <v-avatar size="40">
                            <img
                            class="question-img"
                                :src="reply.replyer.avatar"
                                :alt="reply.replyer.fullname"/>
                        </v-avatar>
                    </div>
                           <!-- content -->
                    <div class="comment-part">
                        <div class="d-flex align-center user-details">
                            <h4 class="comment-user">
                                {{ reply.replyer.fullname }},
                            </h4>
                        </div>
                        <div class="d-md-flex align-center">
                            <div class="d-flex mt-4 mt-md-0">
                                <div class="py-2 py-md-0 pr-7 meta-text">
                                <span class="text-light-blue"
                                    >On {{ reply.time }}</span
                                >
                                </div>
                            </div>
                            </div>
                         <p class="comment-text">{{ reply.commenttext }}</p>
                        <a
                            href="javascript:void(0)"
                            class="text-decoration-none font-14"
                            @click="replyD(comment.id)"
                            >Reply</a
                        >
                    </div>
                  <!-- Actions -->
                   <div class="d-flex align-end">
                    <v-menu v-if="$auth.loggedIn" offset-y left >
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
                                <v-list-item @click="report('comment', reply.id)">
                                    <v-list-item-title>Report an abuse</v-list-item-title>
                                </v-list-item>
                                <v-list-item 
                                    @click="deleteComment(reply.id,i)" 
                                    v-if="$auth.loggedIn &&($auth.user.role=='admin' || $auth.user.id==reply.replyer.id)">
                                    <v-list-item-title>Delete</v-list-item-title>
                                </v-list-item>
                            </v-list-item-group>
                        </v-list>
                    </v-menu>
                    </div>
                </div>  
            </div>
        </div>
    </div>
        <!-- -----------------------------------------------
        End Comments
    ----------------------------------------------- -->
        <!-- --------------------------------- -->
        <!-- Comment Dialog -->
        <!-- --------------------------------- -->
        <v-dialog v-model="replydialog" width="500">
            <v-card>
                <v-card-title class="headline grey lighten-2">
                    Post Reply
                </v-card-title>

                <v-card-text class="mt-12">
                    <v-form ref="reply1" @submit.prevent="replyD">
                        <v-row>
                            <v-col cols="12" md="12" class="py-0">
                                <v-textarea
                                    class="form-line-control"
                                    label="Message"
                                    outlined
                                    :rules="[v => !!v || 'Please type something first']"
                                    v-model="reply_text"
                                    hide-details="auto"
                                ></v-textarea>
                            </v-col>
                        </v-row>
                    </v-form>
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions class="py-4">
                    <v-spacer></v-spacer>
                    <v-btn color="primary" @click="reply">
                        Post
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        </div>
    </div>
</template>

<script>
export default {
    name: "Comments",
    props: ["comments", "link"],
    components: {},
    data: () => ({
        replydialog: false,
        reply_text: '',
        comment_id: null
    }),

    computed: {},
    methods: {
        replyD(id){
            if(this.$auth.loggedIn){
                this.comment_id = id
                this.replydialog = true
            }else{
                this.$nuxt.$emit('loginBox')
            }
        },
        reply(){
            if(this.$refs.reply1.validate()){
                this.$recaptcha.execute('reply')
                .then(token => {
                    // Post reply
                    let data = {
                        comment_id : this.comment_id,
                        reply : this.reply_text,
                        recaptcha : token
                    }
                    this.$axios.$post(this.link,data)
                    .then((res) => {
                        this.$nuxt.$emit('UpdateCommentReply', {res, comment_id : this.comment_id})
                        this.$refs.reply1.reset()
                        this.replydialog = false
                    })

                })
                .catch( error => {
                    console.log('ReCaptcha error:', error)
                    this.$swal({
                        title: 'Error',
                        text: "ReCaptcha Validation error, Please try again later.",
                        icon: "error"
                    });
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
        deleteComment(id, index){
            this.$axios.post(`comment/${id}`,{
                _method: 'DELETE'
            })
            .then(res => {
                this.comments.splice(index,1)
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
        deleteCommentR(id, commentIndex, replyIndex){
            this.$axios.post(`comment-reply/${id}`,{
                _method: 'DELETE'
            })
            .then(res => {
                this.comments[commentIndex].children.splice(replyIndex,1)
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

<style lang="scss"></style>
