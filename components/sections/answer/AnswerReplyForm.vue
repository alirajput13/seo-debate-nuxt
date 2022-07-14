<template>
    <div class="add-comment-section border-top border-bottom">
        <v-form
            ref="replyForm"
            @submit.prevent="replyForm"
        >
            <v-row>
                <v-col
                    cols="12"
                    md="9"
                    class="py-0 d-flex align-stretch mb-6 mb-md-0"
                >
                    <v-text-field
                        class="form-line-control margin-0"
                        placeholder="Add your comment here"
                        :rules="[
                            v => !!v || 'Reply can\'t be empty',
                            v => !!v && v.length > 15 || 'Reply too short'
                        ]"
                        v-model="replyText"
                        outlined
                        hide-details="auto"
                    ></v-text-field>
                </v-col>
                <v-col cols="12" md="3" class="py-0 d-flex align-stretch">
                    <v-btn
                        type="submit"
                        block
                        depressed
                        class="py-11 d-flex align-stretch"
                        color="primary"
                    >
                        Reply
                    </v-btn>
                </v-col>
            </v-row>
        </v-form>
    </div>
</template>

<script>
export default {
    props: ["answer"],
    data() {
        return {
            replyText: ""
        };
    },
    methods:{
        replyForm() {
            if(!this.$auth.loggedIn){
                this.$nuxt.$emit('loginBox')
                return
            }
            if (this.$refs.replyForm.validate()) {
                this.$recaptcha.execute('answer_reply')
                .then(token => {
                    this.$axios
                        .post("answer-reply", {
                            answer: this.answer,
                            body: this.replyText,
                            recaptcha : token
                        })
                        .then(res => {
                            this.$refs.replyForm.reset();
                            this.$nuxt.$emit('insertReply',{
                                id: this.answer,
                                reply: res.data
                            })
                        })
                        .catch(err => {
                            this.$swal({
                                title: `Error ${err.response.status}!`,
                                text: err.response.data.message,
                                icon: "error"
                            });
                        });
                })
                .catch (error=> {
                    console.log('ReCaptcha error:', error)
                    this.$swal({
                        title: 'Error',
                        text: "ReCaptcha Validation error, Please try again later.",
                        icon: "error"
                    });
                })
            }
        }
    }
};
</script>
